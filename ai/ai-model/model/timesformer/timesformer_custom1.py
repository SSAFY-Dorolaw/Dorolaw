_base_ = 'timesformer_spaceOnly_8xb8-8x32x1-15e_kinetics400-rgb.py'

# model = dict(backbone=dict(attention_type='divided_space_time'))
model = dict(
    backbone=dict(attention_type='divided_space_time'),
    cls_head=dict(num_classes=434)  # 여기서 수정
)
load_from = 'path/to/your/pretrained_checkpoint.pth'

work_dir = '/home/j-j12a501/Dorolaw/ai-model/work_dirs/train/timesformer_custom1'