# _base_ = [
#     '/home/j-j12a501/Dorolaw/ai-model/mmaction2/configs/_base_/models/slowfast_r50.py',
#     '/home/j-j12a501/Dorolaw/ai-model/mmaction2/configs/_base_/default_runtime.py'
# ]

# # ✅ pretrained 모델 경로
# load_from = '/home/j-j12a501/Dorolaw/ai-model/checkpoints/slowfast_r50_8xb8-4x16x1-256e_kinetics400-rgb_20220901-701b0f6f.pth'

# model = dict(
#     cls_head=dict(
#         type='SlowFastHead',
#         num_classes=434,
#         in_channels=2304,
#         spatial_type='avg',
#         dropout_ratio=0.5,
#         init_std=0.01,
#         average_clips='prob',
#         init_cfg=dict(type='Xavier', layer='Linear', distribution='uniform')
#     )
# )


# dataset_type = 'VideoDataset'

# data_root = ''
# data_root_val = ''

# ann_file_train = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/train/annotation_index_train_mp4.txt'
# ann_file_val   = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/val/annotation_index_val_mp4.txt'
# ann_file_test  = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/test/annotation_index_test_mp4.txt'



# file_client_args = dict(io_backend='disk')

# train_pipeline = [
#     dict(type='DecordInit', **file_client_args),
#     dict(type='SampleFrames', clip_len=16, frame_interval=1, num_clips=4),
#     dict(type='DecordDecode'),
#     dict(type='Resize', scale=(-1, 256)),
#     dict(type='RandomResizedCrop'),
#     dict(type='Resize', scale=(224, 224), keep_ratio=False),
#     dict(type='Flip', flip_ratio=0.5),
#     dict(type='FormatShape', input_format='NCTHW'),
#     dict(type='PackActionInputs')
# ]

# val_pipeline = [
#     dict(type='DecordInit', **file_client_args),
#     dict(type='SampleFrames', clip_len=16, frame_interval=1, num_clips=4),
#     dict(type='DecordDecode'),
#     dict(type='Resize', scale=(-1, 256)),
#     dict(type='CenterCrop', crop_size=224),
#     dict(type='FormatShape', input_format='NCTHW'),
#     dict(type='PackActionInputs')
# ]
 
# test_pipeline = [
#     dict(type='DecordInit'),
#     dict(type='SampleFrames', clip_len=16, frame_interval=4, num_clips=1, test_mode=True),
#     dict(type='DecordDecode'),
#     dict(type='Resize', scale=(-1, 256)),
#     dict(type='CenterCrop', crop_size=224),
#     dict(type='FormatShape', input_format='NCTHW'),
#     dict(type='PackActionInputs')
# ]

# train_dataloader = dict(
#     batch_size=16,
#     num_workers=12,
#     persistent_workers=True,
#     sampler=dict(type='DefaultSampler', shuffle=True),
#     dataset=dict(
#         type=dataset_type,
#         ann_file=ann_file_train,
#         data_prefix=dict(video=''),
#         pipeline=train_pipeline,
#         num_classes=434,        # 🔥 추가!
#         multi_class=False       # 🔥 추가!
#     )
# )

# val_dataloader = dict(
#     batch_size=8,
#     num_workers=8,
#     persistent_workers=True,
#     sampler=dict(type='DefaultSampler', shuffle=False),
#     dataset=dict(
#         type=dataset_type,
#         ann_file=ann_file_val,
#         data_prefix=dict(video=''),
#         pipeline=val_pipeline,
#         test_mode=True,
#         num_classes=434,        # 🔥 추가!
#         multi_class=False       # 🔥 추가!
#     )
# )

# test_dataloader = dict(
#     batch_size=1,
#     num_workers=8,
#     persistent_workers=True,
#     sampler=dict(shuffle=False, type='DefaultSampler'),
#     dataset=dict(
#         type=dataset_type,
#         ann_file=ann_file_test,
#         data_prefix=dict(video='/home/j-j12a501/Dorolaw/ai-model'),
#         pipeline=test_pipeline,
#         test_mode=True,
#         num_classes=434,        # 🔥 추가!
#         multi_class=False       # 🔥 추가!
#     )
# )

# val_evaluator = dict(type='AccMetric')
# test_evaluator = dict(type='AccMetric')

# train_cfg = dict(
#     type='EpochBasedTrainLoop',
#     max_epochs=256,
#     val_begin=1,
#     val_interval=5
# )
# val_cfg = dict(type='ValLoop')
# test_cfg = dict(type='TestLoop')

# optim_wrapper = dict(
#     optimizer=dict(
#         type='AdamW',
#         lr=0.001,
#         betas=(0.9, 0.999),
#         weight_decay=0.02
#     ),
#     clip_grad=dict(max_norm=40, norm_type=2)
# )


# # ✅ CosineAnnealingLR 스케줄러 직접 명시
# param_scheduler = [
#     dict(
#         type='LinearLR',
#         start_factor=0.1,
#         by_epoch=True,
#         begin=0,
#         end=5,
#         convert_to_iter_based=True),
#     dict(
#         type='CosineAnnealingLR',
#         T_max=256,
#         eta_min=0,
#         by_epoch=True,
#         begin=0,
#         end=256)
# ]

# default_hooks = dict(
#     checkpoint=dict(interval=4, max_keep_ckpts=3),
#     logger=dict(interval=100)
# )




# # ✅ 작업 디렉토리
# work_dir = '/home/j-j12a501/Dorolaw/ai-model/work_dirs/train/slowfast_custom1'# slowfast_custom1.py


_base_ = [
    '/home/j-j12a501/Dorolaw/ai-model/mmaction2/configs/_base_/models/slowfast_r50.py',
    '/home/j-j12a501/Dorolaw/ai-model/mmaction2/configs/_base_/default_runtime.py'
]

# ✅ pretrained 모델 경로
load_from = '/home/j-j12a501/Dorolaw/ai-model/checkpoints/slowfast_r50_8xb8-4x16x1-256e_kinetics400-rgb_20220901-701b0f6f.pth'

model = dict(
    cls_head=dict(
        type='SlowFastHead',
        num_classes=434,
        in_channels=2304,
        spatial_type='avg',
        dropout_ratio=0.5,
        init_std=0.01,
        average_clips='prob',
        init_cfg=dict(type='Xavier', layer='Linear', distribution='uniform')
    )
)

dataset_type = 'VideoDataset'
data_root = ''
data_root_val = ''

ann_file_train = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/train/annotation_index_train_mp4.txt'
ann_file_val   = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/val/annotation_index_val_mp4.txt'
ann_file_test  = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/test/annotation_index_test_mp4.txt'

file_client_args = dict(io_backend='disk')

train_pipeline = [
    dict(type='DecordInit', **file_client_args),
    dict(type='SampleFrames', clip_len=16, frame_interval=1, num_clips=4),
    dict(type='DecordDecode'),
    dict(type='Resize', scale=(-1, 256)),
    dict(type='RandomResizedCrop'),
    dict(type='Resize', scale=(224, 224), keep_ratio=False),
    dict(type='Flip', flip_ratio=0.5),
    dict(type='FormatShape', input_format='NCTHW'),
    dict(type='PackActionInputs')
]

val_pipeline = [
    dict(type='DecordInit', **file_client_args),
    dict(type='SampleFrames', clip_len=16, frame_interval=1, num_clips=4),
    dict(type='DecordDecode'),
    dict(type='Resize', scale=(-1, 256)),
    dict(type='CenterCrop', crop_size=224),
    dict(type='FormatShape', input_format='NCTHW'),
    dict(type='PackActionInputs')
]

test_pipeline = [
    dict(type='DecordInit', **file_client_args),
    dict(type='SampleFrames', clip_len=16, frame_interval=4, num_clips=1, test_mode=True),
    dict(type='DecordDecode'),
    dict(type='Resize', scale=(-1, 256)),
    dict(type='CenterCrop', crop_size=224),
    dict(type='FormatShape', input_format='NCTHW'),
    dict(type='PackActionInputs')
]

train_dataloader = dict(
    batch_size=16,
    num_workers=12,
    persistent_workers=True,
    sampler=dict(type='DefaultSampler', shuffle=True),
    dataset=dict(
        type=dataset_type,
        ann_file=ann_file_train,
        data_prefix=dict(video='/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/train'),
        pipeline=train_pipeline
    )
)

val_dataloader = dict(
    batch_size=8,
    num_workers=8,
    persistent_workers=True,
    sampler=dict(type='DefaultSampler', shuffle=False),
    dataset=dict(
        type=dataset_type,
        ann_file=ann_file_val,
        data_prefix=dict(video='/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/val'),
        pipeline=val_pipeline,
        test_mode=True
    )
)

test_dataloader = dict(
    batch_size=1,
    num_workers=8,
    persistent_workers=True,
    sampler=dict(shuffle=False, type='DefaultSampler'),
    dataset=dict(
        type=dataset_type,
        ann_file=ann_file_test,
        data_prefix=dict(video='/home/j-j12a501/Dorolaw/ai-model'),
        pipeline=test_pipeline,
        test_mode=True
    )
)

val_evaluator = dict(type='AccMetric')
test_evaluator = dict(type='AccMetric')

train_cfg = dict(
    type='EpochBasedTrainLoop',
    max_epochs=256,
    val_begin=1,
    val_interval=5
)
val_cfg = dict(type='ValLoop')
test_cfg = dict(type='TestLoop')

optim_wrapper = dict(
    optimizer=dict(
        type='AdamW',
        lr=0.001,
        betas=(0.9, 0.999),
        weight_decay=0.02
    ),
    clip_grad=dict(max_norm=40, norm_type=2)
)

param_scheduler = [
    dict(
        type='LinearLR',
        start_factor=0.1,
        by_epoch=True,
        begin=0,
        end=5,
        convert_to_iter_based=True
    ),
    dict(
        type='CosineAnnealingLR',
        T_max=256,
        eta_min=0,
        by_epoch=True,
        begin=0,
        end=256
    )
]

default_hooks = dict(
    checkpoint=dict(interval=4, max_keep_ckpts=3, save_best='auto'),
    logger=dict(interval=100)
)

custom_hooks = [
    dict(
        type='EarlyStoppingHook',
        monitor='acc/top1',
        rule='greater',
        patience=8,
        min_delta=0.001,
        priority=75
    )
]


