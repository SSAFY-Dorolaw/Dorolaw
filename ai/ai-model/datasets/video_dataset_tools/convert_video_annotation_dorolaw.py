import os
import glob
import json

# split 설정
splits = ['train', 'val', 'test']

# 현재 스크립트 기준 상대경로 설정
base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'accident_aihub', 'processed'))

print(f"📁 base_dir = {base_dir}")

# split별로 annotation txt 생성
for split in splits:
    json_dir = os.path.join(base_dir, split, 'labels')
    mp4_dir = os.path.join(base_dir, split, 'videos')
    output_file = os.path.join(base_dir, split, f'annotation_index_{split}_mp4.txt')

    # 출력 경로 생성
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    with open(output_file, 'w', encoding='utf-8') as f_out:
        for json_path in glob.glob(os.path.join(json_dir, '*.json')):
            basename = os.path.splitext(os.path.basename(json_path))[0]
            mp4_path = os.path.join(mp4_dir, f'{basename}.mp4')

            if os.path.exists(mp4_path):
                try:
                    with open(json_path, 'r', encoding='utf-8') as jf:
                        data = json.load(jf)
                        video_data = data.get("video", {})
                        # class index 추출
                        if "traffic_accident_type" in video_data:
                            class_index = video_data["traffic_accident_type"]
                        elif "accident_type" in video_data:
                            class_index = video_data["accident_type"]
                        else:
                            raise KeyError("No class index found in JSON")
                        f_out.write(f'{mp4_path} {class_index}\n')
                except (KeyError, json.JSONDecodeError) as e:
                    print(f"[⚠️ WARN] 잘못된 JSON 또는 클래스 인덱스 누락: {json_path} → {e}")
            else:
                print(f"[⚠️ WARN] mp4 파일 없음: {mp4_path}")

print("🎉 모든 annotation txt 파일 생성 완료!")
