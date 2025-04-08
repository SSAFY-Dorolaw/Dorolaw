from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import shutil
import os
import sys
import threading
import json
import requests
import time
import pika

RABBITMQ_HOST = 'rabbitmq'
QUEUES_CONFIG = {
    'main_diagnosis_queue': {
        'result_endpoint': 'http://backend:8080/api/alarms/analysis'
    },
    'requests_queue': {
        'result_endpoint': 'http://backend:8080/api/alarms/requests'
    }
}

# Importing recognizer modules
sys.path.append('/dorolaw/ai-model/')
from recognizer.single_tsn_recognizer import Single_tsn_recognizer
from recognizer.yolo_tsn_recognizer import Yolo_tsn_recognizer

# FastAPI 애플리케이션 초기화
app = FastAPI(title="main", description="AI recognition for fault analysis", version="1.0")

# Recognizer 인스턴스 초기화
rcn = Single_tsn_recognizer()
# rcn = Yolo_tsn_recognizer()

# 템플릿 디렉토리 설정
templates = Jinja2Templates(directory="templates")

# 정적 파일 서빙 설정 (예: CSS 파일)
app.mount("/ai/static", StaticFiles(directory="static"), name="static")

def map_result_to_payload(request_id, result, member_id, queue_name, data):
    """AI 분석 결과를 백엔드 요청 형식에 맞게 매핑"""
    # 공통 형식의 페이로드 생성
    payload = {
        "memberId": member_id,
        "accidentObject": result.get('AccidentObject', '차량'),
        "accidentLocation": result.get('AccidentLocation', '도로'),
        "accidentLocationCharacteristics": result.get('AccidentLocationCharacteristics', '일반도로'),
        "directionOfA": result.get('DirectionOfA', '직진'),
        "directionOfB": result.get('DirectionOfB', '직진'),
        "faultRatioA": result.get('FaultRatioA', 50),
        "faultRatioB": result.get('FaultRatioB', 50),
        "accidentType": result.get('AccidentType', 1)
    }
    
    # 큐별로 다른 content 설정
    if queue_name == 'main_diagnosis_queue':
        payload["faultAnalysisId"] = data.get('faultAnalysisId')
        payload["content"] = f"교통 사고 분석이 완료되었습니다. ID: {payload['faultAnalysisId']}"
    elif queue_name == 'requests_queue':
        payload["requestId"] = request_id
        payload["content"] = f"상담 요청에 대한 분석이 완료되었습니다. ID: {request_id}"
    
    return payload

def send_result_to_backend(payload, endpoint):
    """분석 결과를 백엔드 서비스로 전송"""
    try:
        print(payload)
        response = requests.post(
            endpoint,
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            print(f"✅ 결과 전송 성공: {endpoint}, requestId={payload['requestId']}")
            return True
        else:
            print(f"⚠️ 결과 전송 실패: {endpoint}, status={response.status_code}, response={response.text}")
            return False
    except Exception as e:
        print(f"🚨 결과 전송 오류: {endpoint}, error={e}")
        return False

def process_message(body, queue_name):
    """메시지 처리 로직 작성"""
    try:
        # 먼저 바이트 데이터를 UTF-8 문자열로 변환
        message_str = body.decode('utf-8')
        data = json.loads(message_str)
        print("🔔 진단 요청 처리:", data)

        # 여기 처리 로직 들어가면 됨
        # JSON에서 필요한 정보 추출
        request_id = data.get('requestId')
        file_name = data.get('fileName')
        member_id = data.get('memberId')
        
        if not file_name:
            print("❌ 파일 이름이 제공되지 않았습니다")
            return
            
        # 파일 경로 구성
        video_path = f"/home/ubuntu/videos/{file_name}"
        
        if not os.path.exists(video_path):
            print(f"❌ 파일을 찾을 수 없습니다: {video_path}")
            return
            
        print(f"🎬 비디오 분석 시작: {video_path}")
        
        # AI 분석 실행
        result = rcn.predict(video_path)
        
        print(f"✅ 분석 결과: {result}")

        
        # 결과를 백엔드 API 요청 형식에 맞게 변환
        payload = map_result_to_payload(request_id, result, member_id, queue_name, data)
        
        # 결과를 백엔드로 전송
        endpoint = QUEUES_CONFIG[queue_name]['result_endpoint']
        send_result_to_backend(payload, endpoint)
        
        # 여기서 분석 결과를 다른 서비스로 전송하는 로직 추가
        # 예: publish_result(request_id, result)

    except Exception as e:
        print("🚨 처리 오류:", e)

def start_queue_consumer(queue_name):
    """RabbitMQ 소비자 함수"""
    # 최대 재시도 횟수
    max_retries = 30
    retry_interval = 2  # 초
    
    for attempt in range(max_retries):
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    host=RABBITMQ_HOST, 
                    credentials=pika.PlainCredentials('guest', 'guest'),
                    connection_attempts=3,
                    retry_delay=2
                )
            )
            channel = connection.channel()
            channel.queue_declare(queue=queue_name, durable=True)
            
            def callback(ch, method, properties, body):
                process_message(body, queue_name)
                ch.basic_ack(delivery_tag=method.delivery_tag)
                
            channel.basic_qos(prefetch_count=1)
            channel.basic_consume(queue=queue_name, on_message_callback=callback)
            print("▶️ RabbitMQ 소비자 시작 성공...")
            channel.start_consuming()
            break  # 성공적으로 연결되면 루프 종료
            
        except Exception as e:
            print(f"RabbitMQ 연결 시도 {attempt+1}/{max_retries} 실패: {e}")
            if attempt < max_retries - 1:
                print(f"{retry_interval}초 후 재시도...")
                time.sleep(retry_interval)
            else:
                print("최대 재시도 횟수 초과. RabbitMQ 연결 실패.")

@app.on_event("startup")
def startup_event():
    # FastAPI 서버 시작 시 모든 큐 소비자 스레드 시작
    print("▶️ FastAPI 서버 시작...")
    
    # 각 큐마다 별도의 소비자 스레드 시작
    for queue_name in QUEUES_CONFIG.keys():
        consumer_thread = threading.Thread(
            target=start_queue_consumer,
            args=(queue_name,),
            daemon=True
        )
        consumer_thread.start()
        print(f"▶️ {queue_name} 소비자 스레드 시작됨")

# 기본 경로 정의
@app.get("/ai")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# 비디오 예측 엔드포인트 정의
@app.post("/ai/predict")
async def predict(video: UploadFile = File(...)):
    save_path = f"./video_save/{video.filename}"
    try:
        # 비디오 파일을 저장
        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

        # 비디오 파일을 처리하는 함수 호출
        result = rcn.predict(save_path)

        # 결과를 JSON 형식으로 반환
        return JSONResponse(content=result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        # 파일 삭제
        if os.path.exists(save_path):
            os.remove(save_path)

# FastAPI 애플리케이션 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
