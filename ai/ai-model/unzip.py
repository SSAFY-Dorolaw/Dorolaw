import zipfile
import os

# zip_path = "datasets/accident_aihub/raw/원천데이터_231108_add/VS_차대차_이미지_고속도로(자동차전용도로)포함.zip"             # 압축 파일 경로
# zip_path = "datasets/accident_aihub/raw/원천데이터_231108_add/VS_차대차_이미지_사거리교차로(신호등없음).zip"             # 압축 파일 경로
# zip_path = "datasets/accident_aihub/raw/원천데이터_231108_add/VS_차대차_영상_사거리교차로(신호등있음).zip"             # 압축 파일 경로
# zip_path = "datasets/accident_aihub/raw/원천데이터_231108_add/VS_차대차_영상_주차장(또는차도가아닌장소).zip"             # 압축 파일 경로
# zip_path = "datasets/accident_aihub/raw/원천데이터_231108_add/VS_차대차_영상_직선도로.zip"             # 압축 파일 경로
# zip_path = "datasets/accident_aihub/raw/원천데이터_231108_add/VS_차대차_영상_차도와차도가아닌장소.zip"             # 압축 파일 경로
# zip_path = "datasets/accident_aihub/raw/원천데이터_231108_add/VS_차대차_영상_회전교차로.zip"             # 압축 파일 경로
zip_path = "datasets/accident_aihub/raw/원천데이터_231108_add/VS_차대차_영상_T자형교차로.zip"             # 압축 파일 경로

# extract_path = "datasets/accident_aihub/raw/videos"   # 압축을 풀 폴더 이름
extract_path = "datasets/accident_aihub/raw/images"   # 압축을 풀 폴더 이름4

# 압축 해제 함수
def extract_zip(zip_path, extract_to):
    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            print("📦 ZIP 파일 안에 들어있는 항목 목록:")
            zip_ref.printdir()
            
            # 압축 해제
            zip_ref.extractall(extract_to)
            print(f"\n✅ 압축 해제 완료! → 폴더: '{extract_to}'")
    except zipfile.BadZipFile:
        print("❗ 오류: 이 파일은 올바른 ZIP 형식이 아니거나 손상되었습니다.")
    except FileNotFoundError:
        print(f"❗ 오류: '{zip_path}' 파일을 찾을 수 없습니다.")
    except Exception as e:
        print(f"❗ 예기치 않은 오류 발생: {e}")

# 함수 실행
extract_zip(zip_path, extract_path)
