#!/bin/bash

# external/mmaction2 절대경로
external/mmaction2_DIR=/home/ubuntu/Dorolaw/ai-model/external/mmaction2

# 결과 저장 디렉토리
RESULT_DIR=/home/ubuntu/Dorolaw/ai-model/work_dirs/benchmark_result
mkdir -p ${RESULT_DIR}

# config와 checkpoint 쌍으로 선언
declare -a CONFIGS=(
    "/home/ubuntu/Dorolaw/ai-model/model/tsn/tsn_custom1.py"
    "/home/ubuntu/Dorolaw/ai-model/model/slowfast/slowfast_custom1.py"
    "/home/ubuntu/Dorolaw/ai-model/model/swin/swin_custom1.py"
)

declare -a CHECKPOINTS=(
    "/home/ubuntu/Dorolaw/ai-model/checkpoints/tsn_imagenet-pretrained-r50_8xb32-1x1x8-100e_kinetics400-rgb_20220906-2692d16c.pth"
    "/home/ubuntu/Dorolaw/ai-model/checkpoints/slowfast_r50_8xb8-4x16x1-256e_kinetics400-rgb_20220901-701b0f6f.pth"
    "/home/ubuntu/Dorolaw/ai-model/checkpoints/swin-tiny-p244-w877_in1k-pre_8xb8-amp-32x2x1-30e_kinetics400-rgb_20220930-241016b2.pth"
)

declare -a MODEL_NAMES=("TSN" "SlowFast" "Swin")

# 실행 루프
for i in "${!CONFIGS[@]}"; do
    CONFIG_PATH="${CONFIGS[$i]}"
    CHECKPOINT_PATH="${CHECKPOINTS[$i]}"
    MODEL_NAME="${MODEL_NAMES[$i]}"

    echo "▶ Running test for ${MODEL_NAME}..."

    WORK_DIR=$(python3 -c "from mmengine.config import Config; cfg=Config.fromfile('${CONFIG_PATH}'); print(cfg.work_dir)")

    OUT_PKL="${RESULT_DIR}/${MODEL_NAME}_result.pkl"
    LOG_PATH="${RESULT_DIR}/${MODEL_NAME}_log.txt"

    python3 ${external/mmaction2_DIR}/tools/test.py ${CONFIG_PATH} ${CHECKPOINT_PATH} \
        --dump ${OUT_PKL} \
        --work-dir ${WORK_DIR} \
        2>&1 | tee ${LOG_PATH}

    echo "✅ Finished ${MODEL_NAME}. Output: ${OUT_PKL}"
    echo ""
done

echo "🎉 All experiments done! Check logs and results in ${RESULT_DIR}"