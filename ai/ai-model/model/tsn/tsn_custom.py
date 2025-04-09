# _base_ = [
#     '/home/ubuntu/Dorolaw/ai-model/external/mmaction2/configs/_base_/models/tsn_r50.py',
#     '/home/ubuntu/Dorolaw/ai-model/external/mmaction2/configs/_base_/schedules/sgd_100e.py',
#     '/home/ubuntu/Dorolaw/ai-model/external/mmaction2/configs/_base_/default_runtime.py'
# ]

_base_ = [
    '/home/j-j12a501/Dorolaw/ai-model/mmaction2/configs/_base_/models/tsn_r50.py',
    # '/home/j-j12a501/Dorolaw/ai-model/mmaction2/configs/_base_/schedules/sgd_100e.py',
    '/home/j-j12a501/Dorolaw/ai-model/mmaction2/configs/_base_/schedules/adam_250e.py',
    '/home/j-j12a501/Dorolaw/ai-model/mmaction2/configs/_base_/default_runtime.py'
]



model = dict(
    # backbone=dict(
    #     pretrained='https://download.openmmlab.com/mmaction/v1.0/recognition/swin/swin_tiny_patch4_window7_224.pth'
    # ),
    cls_head=dict(
        num_classes=434,
        average_clips='prob'
    )
)

load_from = '/home/j-j12a501/Dorolaw/ai-model/checkpoints/tsn_imagenet-pretrained-r50_8xb32-1x1x8-100e_kinetics400-rgb_20220906-2692d16c.pth'


# dataset settings
dataset_type = 'VideoDataset'
data_root = ''
data_root_val = ''

# ann_file_train = 'datasets/accident_aihub/processed/train/annotation_index_train_mp4.txt'
# ann_file_val   = 'datasets/accident_aihub/processed/val/annotation_index_val_mp4.txt'
ann_file_train = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/train/annotation_index_train_mp4.txt'
ann_file_val   = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/val/annotation_index_val_mp4.txt'

# ann_file_test  = 'datasets/accident_aihub/processed/test/annotation_index_test_mp4.txt'
ann_file_test = '/home/ubuntu/Dorolaw/ai-model/datasets/accident_aihub/processed/test/annotation_index_test_mp4.txt'




file_client_args = dict(io_backend='disk')
# train_pipeline = [
#     dict(type='DecordInit', **file_client_args),
#     dict(type='SampleFrames', clip_len=32, frame_interval=2, num_clips=1),
#     dict(type='DecordDecode'),
#     dict(type='Resize', scale=(-1, 256)),
#     dict(type='RandomResizedCrop'),
#     dict(type='Resize', scale=(224, 224), keep_ratio=False),
#     dict(type='Flip', flip_ratio=0.5),
#     dict(type='FormatShape', input_format='NCTHW'),
#     dict(type='PackActionInputs')
# ]

train_pipeline = [
    dict(type='DecordInit', io_backend='disk'),
    dict(type='SampleFrames', clip_len=1, frame_interval=1, num_clips=8),
    dict(type='DecordDecode'),
    dict(type='Resize', scale=(-1, 256)),
    dict(type='RandomResizedCrop'),
    dict(type='Resize', scale=(224, 224), keep_ratio=False),
    dict(type='Flip', flip_ratio=0.5),
    dict(type='FormatShape', input_format='NCHW'),
    dict(type='PackActionInputs'),
]

# val_pipeline = [
#     dict(type='DecordInit', **file_client_args),
#     dict(type='SampleFrames', clip_len=32, frame_interval=2, num_clips=1, test_mode=True),
#     dict(type='DecordDecode'),
#     dict(type='Resize', scale=(-1, 256)),
#     dict(type='CenterCrop', crop_size=224),
#     dict(type='FormatShape', input_format='NCTHW'),
#     dict(type='PackActionInputs')
# ]

val_pipeline = [
    dict(type='DecordInit', io_backend='disk'),
    dict(type='SampleFrames', clip_len=1, frame_interval=1, num_clips=8, test_mode=True),
    dict(type='DecordDecode'),
    dict(type='Resize', scale=(-1, 256)),
    dict(type='CenterCrop', crop_size=224),
    dict(type='FormatShape', input_format='NCHW'),
    dict(type='PackActionInputs'),
]

# test_pipeline = [
#     dict(type='DecordInit', **file_client_args),
#     dict(type='SampleFrames', clip_len=32, frame_interval=2, num_clips=4, test_mode=True),
#     dict(type='DecordDecode'),
#     dict(type='Resize', scale=(-1, 224)),
#     dict(type='ThreeCrop', crop_size=224),
#     dict(type='FormatShape', input_format='NCTHW'),
#     dict(type='PackActionInputs')
# ]

test_pipeline = [
    dict(type='DecordInit', io_backend='disk'),
    dict(type='SampleFrames', clip_len=1, frame_interval=1, num_clips=8, test_mode=True),
    dict(type='DecordDecode'),
    dict(type='Resize', scale=(-1, 256)),
    dict(type='ThreeCrop', crop_size=224),  # test는 일반적으로 ThreeCrop 사용
    dict(type='FormatShape', input_format='NCHW'),
    dict(type='PackActionInputs'),
]

train_dataloader = dict(
    batch_size=48,
    num_workers=8,
    persistent_workers=True,
    prefetch_factor=2,    
    sampler=dict(type='DefaultSampler', shuffle=True),
    dataset=dict(
        type=dataset_type,
        ann_file=ann_file_train,
        # data_prefix=dict(video=''),
        data_prefix=dict(video='/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/train'),
        pipeline=train_pipeline))

val_dataloader = dict(
    batch_size=16,
    num_workers=8,
    persistent_workers=True,
    sampler=dict(type='DefaultSampler', shuffle=False),
    dataset=dict(
        type=dataset_type,
        ann_file=ann_file_val,
        # data_prefix=dict(video=''),
        data_prefix=dict(video='/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/val'),
        pipeline=val_pipeline,
        test_mode=True))

test_dataloader = dict(
    batch_size=8,
    num_workers=8,
    persistent_workers=True,
    sampler=dict(type='DefaultSampler', shuffle=False),
    dataset=dict(
        type=dataset_type,
        ann_file=ann_file_test,
        data_prefix=dict(video='/home/ubuntu/Dorolaw/ai-model'),
        pipeline=test_pipeline,
        test_mode=True))

val_evaluator = dict(type='AccMetric')
test_evaluator = dict(type='AccMetric')

train_cfg = dict(
    type='EpochBasedTrainLoop', max_epochs=250, val_begin=1, val_interval=3)
val_cfg = dict(type='ValLoop')
test_cfg = dict(type='TestLoop')

# optim_wrapper = dict(
#     type='AmpOptimWrapper',
#     optimizer=dict(type='AdamW', lr=1e-3, betas=(0.9, 0.999), weight_decay=0.02),
#     constructor='SwinOptimWrapperConstructor',
#     paramwise_cfg=dict(
#         absolute_pos_embed=dict(decay_mult=0.),
#         relative_position_bias_table=dict(decay_mult=0.),
#         norm=dict(decay_mult=0.),
#         backbone=dict(lr_mult=0.1)))

optim_wrapper = dict(
    type='AmpOptimWrapper',
    optimizer=dict(type='Adam', lr=1e-3)
)


param_scheduler = [
    dict(type='LinearLR', start_factor=0.1, by_epoch=True, begin=0, end=2.5, convert_to_iter_based=True),
    dict(type='CosineAnnealingLR', T_max=30, eta_min=0, by_epoch=True, begin=0, end=30)
]

# # 기존 Swin용 optim_wrapper 삭제하고 아래로 대체
# optim_wrapper = dict(
#     optimizer=dict(
#         type='SGD',
#         lr=0.01,
#         momentum=0.9,
#         weight_decay=0.0001
#     ),
#     paramwise_cfg=dict(
#         norm_decay_mult=0.0, bias_decay_mult=0.0
#     )
# )

# # 기존 CosineAnnealingLR 삭제하고 아래로 대체
# param_scheduler = [
#     dict(type='MultiStepLR', milestones=[20], gamma=0.1, by_epoch=True)
# ]


default_hooks = dict(
    checkpoint=dict(interval=3, max_keep_ckpts=5),
    logger=dict(interval=100)
)

custom_hooks = [
    dict(
        type='EarlyStoppingHook',
        monitor='acc/top1',        # 기준 metric
        rule='greater',            # 클수록 좋은 metric
        patience=10,                # patience 에폭 수
        min_delta=0.001,           # 향상된 것으로 인정되는 최소 변화량
        priority=75                # Hook 실행 우선순위
    )
]


auto_scale_lr = dict(enable=False, base_batch_size=64)

# work_dir = './work_dirs/tsn_custom1'
# ✅ 작업 디렉토리
# work_dir = '/home/j-j12a501/Dorolaw/ai-model/work_dirs/train/tsn_custom1'

# import os
# from datetime import datetime

# now = datetime.now().strftime('%Y%m%d_%H%M%S')
# work_dir = os.path.join(
#     '/home/j-j12a501/Dorolaw/ai-model/work_dirs/train',
#     f'slowfast_custom1_{now}'
# )


