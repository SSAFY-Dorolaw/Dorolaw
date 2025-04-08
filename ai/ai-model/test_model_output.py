# test_model_output.py
from mmaction.apis import init_recognizer
import torch
import torch.nn.functional as F

# 기존 interpolate 함수 저장 및 monkey-patch 적용
orig_interpolate = F.interpolate

def my_interpolate(input, scale_factor, mode='trilinear', align_corners=False, **kwargs):
    if input.dim() == 4:
        input = input.unsqueeze(2)  # (N, C, 1, H, W)
        if isinstance(scale_factor, (tuple, list)):
            scale_factor = (1.0,) + tuple(scale_factor[1:])
    allowed_modes = ['linear', 'bilinear', 'bicubic', 'trilinear']
    if mode not in allowed_modes:
        return orig_interpolate(input, scale_factor=scale_factor, mode=mode, **kwargs)
    else:
        return orig_interpolate(input, scale_factor=scale_factor, mode=mode, align_corners=align_corners, **kwargs)

F.interpolate = my_interpolate

# config와 checkpoint 파일 경로 지정
config_file = 'model/slowfast/slowfast_custom1.py'
checkpoint_file = 'checkpoints/slowfast_r50_8xb8-4x16x1-256e_kinetics400-rgb_20220901-701b0f6f.pth'
device = 'cuda:0'  # 터미널에서 CUDA_VISIBLE_DEVICES=1로 실행 시, 여기서는 'cuda:0'

# 모델 초기화 (config와 checkpoint 로드)
model = init_recognizer(config_file, checkpoint_file, device=device)

# 더미 입력 생성: (1, 3, 64, 224, 224) – config에 맞는 총 64 프레임 입력
dummy_input = torch.randn(1, 3, 64, 224, 224).to(device)

model.eval()
with torch.no_grad():
    output = model(dummy_input)

print("Output shape:", output.shape)
