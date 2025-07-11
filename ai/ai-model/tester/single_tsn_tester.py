from mmaction.apis import inference_recognizer, init_recognizer
from mmengine import Config
import numpy as np
import sys
sys.path.append('/Dorolaw/ai-model/')
from module.accidentSearch import AccidentSearch

def cosine_similarity(A, B):
    A = np.array(A)
    B = np.array(B)
    dot_product = np.dot(A, B)
    norm_A = np.linalg.norm(A)
    norm_B = np.linalg.norm(B)
    cosine_sim = dot_product / (norm_A * norm_B)
    return cosine_sim

# 설정 파일을 선택하고 인식기를 초기화합니다.
config = '/Dorolaw/ai-model/model/TSN/best_model_0529/tsn_imagenet-pretrained-r50_8xb32-1x1x3-100e_kinetics400-rgb.py'
config = Config.fromfile(config)

# 로드할 체크포인트 파일을 설정합니다.
checkpoint = '/Dorolaw/ai-model/model/TSN/best_model_0529/best_model_0529.pth'

# 인식기를 초기화합니다.
model = init_recognizer(config, checkpoint, device='cuda:0')

# 인식기를 사용하여 추론을 수행합니다.
from operator import itemgetter
count = 0
test_count = 0
test5_count = 0
rate_count = 0
over10_count = 0
total_count = 0
cosine_similarities = []
with open("/Dorolaw/ai-model/datasets/data/video_datasets/download_datas/custom_test_mp4.txt", 'r', encoding='utf-8') as file:
    lines = file.readlines()
    total_count = len(lines)

    for line in lines:
        count += 1
        video_name, video_label = line.split()

        # 예측할 비디오 파일 경로
        video = '/Dorolaw/ai-model/datasets/data/video_datasets/download_datas/test/'+video_name
        # 라벨 파일 경로
        label = '/Dorolaw/ai-model/model/index_map.txt'

        # 비디오에 대한 인식 결과를 얻습니다.
        results = inference_recognizer(model, video)

        # 예측 점수를 리스트로 변환합니다.
        pred_scores = results.pred_score.tolist()
        # 예측 점수와 인덱스를 튜플로 묶습니다.
        score_tuples = tuple(zip(range(len(pred_scores)), pred_scores))
        # 점수를 기준으로 내림차순 정렬합니다.
        score_sorted = sorted(score_tuples, key=itemgetter(1), reverse=True)
        # 상위 5개의 라벨을 선택합니다.
        top5_label = score_sorted[:5]

        # 라벨 파일을 읽어옵니다.
        labels = open(label).readlines()
        # 라벨에서 공백 문자를 제거합니다.
        labels = [x.strip() for x in labels]

        # 상위 5개 라벨과 점수를 매핑합니다.
        results = [(labels[k[0]], k[1]) for k in top5_label]
        
        acs = AccidentSearch()
        
        result_type_dict = acs.select_type_num(int(video_label))[0]
        top_1_type_dict = acs.select_type_num(int(results[0][0]))[0]

        # # Debugging prints to check the structure
        # print(f"result_type_dict: {result_type_dict}")
        # print(f"top_1_type_dict: {top_1_type_dict}")

        # # 상위 1개 가져오기
        # print("정답 :"+video_label,end="")
        # print(" | 비율 {}:{}".format(result_type_dict["FaultRatioA"],result_type_dict["FaultRatioB"]))
        # print("{}:{}".format(top_1_type_dict["FaultRatioA"],top_1_type_dict["FaultRatioB"]))

        for result in results:
            # print(f'{result[0]}: ', result[1])
            if int(video_label) == int(result[0]):
                test5_count += 1
        
        
        if int(results[0][0]) == int(video_label):
            test_count += 1

        if int(result_type_dict["FaultRatioA"]) == int(top_1_type_dict["FaultRatioA"]):
            rate_count += 1
        
        if int(top_1_type_dict["FaultRatioA"])-10 <= int(result_type_dict["FaultRatioA"]) <= int(top_1_type_dict["FaultRatioA"])+10:
            over10_count += 1
            
        # 코사인 유사도 계산
        ground_truth_ratio = [int(result_type_dict["FaultRatioA"]), int(result_type_dict["FaultRatioB"])]
        predicted_ratio = [int(top_1_type_dict["FaultRatioA"]), int(top_1_type_dict["FaultRatioB"])]
        cosine_sim = cosine_similarity(ground_truth_ratio, predicted_ratio)
        cosine_similarities.append(cosine_sim)

        # #debug
        # print("{}<={}<={}".format(int(top_1_type_dict["FaultRatioA"])-10,int(result_type_dict["FaultRatioA"]),int(top_1_type_dict["FaultRatioA"])+10))
        # print(int(top_1_type_dict["FaultRatioA"]))
        # print(over10_count)
        # print(cosine_sim)
        # print(cosine_similarities)

        #debug
        # print(test_count)
        # print(test5_count)
        # print(rate_count)
        # print(total_count)
        
        #진행
        print("{}/{}".format(count,total_count))
            
print("top_1 정확도 {}|{} - {}%".format(test_count,total_count,test_count/total_count*100))
print("top_5 정확도 {}|{} - {}%".format(test5_count,total_count,test5_count/total_count*100))
print("rate 정확도 {}|{} - {}%".format(rate_count,total_count,rate_count/total_count*100))
print("over10 정확도 {}|{} - {}%".format(over10_count,total_count,over10_count/total_count*100))
average_cosine_similarity = sum(cosine_similarities) / total_count
print("평균 코사인 유사도: {:.4f}".format(average_cosine_similarity))

with open("/Dorolaw/ai-model/tester/single_tsn_tester_log.txt","a") as f:
    f.write("top_1 정확도 {}|{} - {}%\n".format(test_count,total_count,test_count/total_count*100))
    f.write("top_5 정확도 {}|{} - {}%\n".format(test5_count,total_count,test5_count/total_count*100))
    f.write("rate 정확도 {}|{} - {}%\n".format(rate_count,total_count,rate_count/total_count*100))
    f.write("over10 정확도 {}|{} - {}%\n\n".format(over10_count,total_count,over10_count/total_count*100))
    f.write("평균 코사인 유사도: {:.4f}\n".format(average_cosine_similarity))
    