import os
import random
import shutil

# 비율 설정
TOTAL_COUNT = 1779
TEST_RATIO = 0.10
VAL_RATIO = 0.20

# ✅ 절대경로 기준 경로 설정
BASE_DIR = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub'

VIDEO_DIR = os.path.join(BASE_DIR, 'raw/videos')
LABEL_DIR = os.path.join(BASE_DIR, 'raw/labels')

OUTPUT_DIR = os.path.join(BASE_DIR, 'processed')
TRAIN_VIDEO_DIR = os.path.join(OUTPUT_DIR, 'train/videos')
VAL_VIDEO_DIR   = os.path.join(OUTPUT_DIR, 'val/videos')
TEST_VIDEO_DIR  = os.path.join(OUTPUT_DIR, 'test/videos')

TRAIN_LABEL_DIR = os.path.join(OUTPUT_DIR, 'train/labels')
VAL_LABEL_DIR   = os.path.join(OUTPUT_DIR, 'val/labels')
TEST_LABEL_DIR  = os.path.join(OUTPUT_DIR, 'test/labels')

# 비디오 파일 리스트
video_files = [f for f in os.listdir(VIDEO_DIR) if f.endswith('.mp4')]
video_files.sort()
print(f'🎬 전체 영상 수: {len(video_files)}개')

# 셔플
random.seed(42)
random.shuffle(video_files)

# 개수 계산
num_test = int(TOTAL_COUNT * TEST_RATIO)   # 약 177개
num_val  = int(TOTAL_COUNT * VAL_RATIO)    # 약 355개
num_train = TOTAL_COUNT - num_test - num_val  # 약 1247개

test_videos = video_files[:num_test]
val_videos  = video_files[num_test:num_test+num_val]
train_videos = video_files[num_test+num_val:]

# 출력 폴더 생성
for d in [TRAIN_VIDEO_DIR, VAL_VIDEO_DIR, TEST_VIDEO_DIR,
          TRAIN_LABEL_DIR, VAL_LABEL_DIR, TEST_LABEL_DIR]:
    os.makedirs(d, exist_ok=True)

# 복사 함수
def copy_files(video_list, video_out_dir, label_out_dir):
    for video in video_list:
        video_src = os.path.join(VIDEO_DIR, video)
        video_dst = os.path.join(video_out_dir, video)

        label_name = video.replace('.mp4', '.json')
        label_src = os.path.join(LABEL_DIR, label_name)
        label_dst = os.path.join(label_out_dir, label_name)

        if os.path.exists(video_src):
            shutil.copy2(video_src, video_dst)
        else:
            print(f"❌ 영상 없음: {video_src}")

        if os.path.exists(label_src):
            shutil.copy2(label_src, label_dst)
        else:
            print(f"⚠️ 라벨 파일 없음: {label_name}")

# 파일 복사 실행
print('📁 파일 복사 중...')
copy_files(train_videos, TRAIN_VIDEO_DIR, TRAIN_LABEL_DIR)
copy_files(val_videos,   VAL_VIDEO_DIR,   VAL_LABEL_DIR)
copy_files(test_videos,  TEST_VIDEO_DIR,  TEST_LABEL_DIR)

# 결과 출력
print('✅ 데이터 분할 및 복사 완료!')
print(f'  Train: {len(train_videos)}개')
print(f'  Val  : {len(val_videos)}개')
print(f'  Test : {len(test_videos)}개')
