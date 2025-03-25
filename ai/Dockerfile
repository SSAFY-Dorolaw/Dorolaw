# python 3.8 이미지
From python:3.8

# 작업 디렉토리 설정
WORKDIR /app

# requirements 파일과 main.py만 복사
COPY requirements.txt main.py ./

# 의존성 설치
RUN pip install -r requirements.txt

# FastAPI 애플리케이션 코드를 컨테이너로 복사
COPY . .

expose 5000

# 애플리케이션 실행
CMD ["python3", "main.py"]
# CMD ["fastapi", "dev", "main.py", "--port", "5000"]
