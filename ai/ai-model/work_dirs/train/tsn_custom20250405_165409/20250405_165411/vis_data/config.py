ann_file_test = '/home/ubuntu/Dorolaw/ai-model/datasets/accident_aihub/processed/test/annotation_index_test_mp4.txt'
ann_file_train = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/train/annotation_index_train_mp4.txt'
ann_file_val = '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/val/annotation_index_val_mp4.txt'
auto_scale_lr = dict(base_batch_size=64, enable=False)
custom_hooks = [
    dict(
        min_delta=0.001,
        monitor='acc/top1',
        patience=10,
        priority=75,
        rule='greater',
        type='EarlyStoppingHook'),
]
data_root = ''
data_root_val = ''
dataset_type = 'VideoDataset'
default_hooks = dict(
    checkpoint=dict(
        interval=3, max_keep_ckpts=5, save_best='auto', type='CheckpointHook'),
    logger=dict(ignore_last=False, interval=100, type='LoggerHook'),
    param_scheduler=dict(type='ParamSchedulerHook'),
    runtime_info=dict(type='RuntimeInfoHook'),
    sampler_seed=dict(type='DistSamplerSeedHook'),
    sync_buffers=dict(type='SyncBuffersHook'),
    timer=dict(type='IterTimerHook'))
default_scope = 'mmaction'
env_cfg = dict(
    cudnn_benchmark=False,
    dist_cfg=dict(backend='nccl'),
    mp_cfg=dict(mp_start_method='fork', opencv_num_threads=0))
file_client_args = dict(io_backend='disk')
launcher = 'none'
load_from = '/home/j-j12a501/Dorolaw/ai-model/checkpoints/tsn_imagenet-pretrained-r50_8xb32-1x1x8-100e_kinetics400-rgb_20220906-2692d16c.pth'
log_level = 'INFO'
log_processor = dict(by_epoch=True, type='LogProcessor', window_size=20)
model = dict(
    backbone=dict(
        depth=50,
        norm_eval=False,
        pretrained='https://download.pytorch.org/models/resnet50-11ad3fa6.pth',
        type='ResNet'),
    cls_head=dict(
        average_clips='prob',
        consensus=dict(dim=1, type='AvgConsensus'),
        dropout_ratio=0.4,
        in_channels=2048,
        init_std=0.01,
        num_classes=434,
        spatial_type='avg',
        type='TSNHead'),
    data_preprocessor=dict(
        format_shape='NCHW',
        mean=[
            123.675,
            116.28,
            103.53,
        ],
        std=[
            58.395,
            57.12,
            57.375,
        ],
        type='ActionDataPreprocessor'),
    test_cfg=None,
    train_cfg=None,
    type='Recognizer2D')
optim_wrapper = dict(
    clip_grad=dict(max_norm=40, norm_type=2),
    optimizer=dict(lr=0.001, type='Adam', weight_decay=0.0001),
    type='AmpOptimWrapper')
param_scheduler = [
    dict(
        begin=0,
        by_epoch=True,
        convert_to_iter_based=True,
        end=2.5,
        start_factor=0.1,
        type='LinearLR'),
    dict(
        T_max=30,
        begin=0,
        by_epoch=True,
        end=30,
        eta_min=0,
        type='CosineAnnealingLR'),
]
randomness = dict(deterministic=False, diff_rank_seed=False, seed=None)
resume = False
test_cfg = dict(type='TestLoop')
test_dataloader = dict(
    batch_size=8,
    dataset=dict(
        ann_file=
        '/home/ubuntu/Dorolaw/ai-model/datasets/accident_aihub/processed/test/annotation_index_test_mp4.txt',
        data_prefix=dict(video='/home/ubuntu/Dorolaw/ai-model'),
        pipeline=[
            dict(io_backend='disk', type='DecordInit'),
            dict(
                clip_len=1,
                frame_interval=1,
                num_clips=8,
                test_mode=True,
                type='SampleFrames'),
            dict(type='DecordDecode'),
            dict(scale=(
                -1,
                256,
            ), type='Resize'),
            dict(crop_size=224, type='ThreeCrop'),
            dict(input_format='NCHW', type='FormatShape'),
            dict(type='PackActionInputs'),
        ],
        test_mode=True,
        type='VideoDataset'),
    num_workers=8,
    persistent_workers=True,
    sampler=dict(shuffle=False, type='DefaultSampler'))
test_evaluator = dict(type='AccMetric')
test_pipeline = [
    dict(io_backend='disk', type='DecordInit'),
    dict(
        clip_len=1,
        frame_interval=1,
        num_clips=8,
        test_mode=True,
        type='SampleFrames'),
    dict(type='DecordDecode'),
    dict(scale=(
        -1,
        256,
    ), type='Resize'),
    dict(crop_size=224, type='ThreeCrop'),
    dict(input_format='NCHW', type='FormatShape'),
    dict(type='PackActionInputs'),
]
train_cfg = dict(
    max_epochs=250, type='EpochBasedTrainLoop', val_begin=1, val_interval=3)
train_dataloader = dict(
    batch_size=48,
    dataset=dict(
        ann_file=
        '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/train/annotation_index_train_mp4.txt',
        data_prefix=dict(
            video=
            '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/train'
        ),
        pipeline=[
            dict(io_backend='disk', type='DecordInit'),
            dict(
                clip_len=1, frame_interval=1, num_clips=8,
                type='SampleFrames'),
            dict(type='DecordDecode'),
            dict(scale=(
                -1,
                256,
            ), type='Resize'),
            dict(type='RandomResizedCrop'),
            dict(keep_ratio=False, scale=(
                224,
                224,
            ), type='Resize'),
            dict(flip_ratio=0.5, type='Flip'),
            dict(input_format='NCHW', type='FormatShape'),
            dict(type='PackActionInputs'),
        ],
        type='VideoDataset'),
    num_workers=8,
    persistent_workers=True,
    prefetch_factor=2,
    sampler=dict(shuffle=True, type='DefaultSampler'))
train_pipeline = [
    dict(io_backend='disk', type='DecordInit'),
    dict(clip_len=1, frame_interval=1, num_clips=8, type='SampleFrames'),
    dict(type='DecordDecode'),
    dict(scale=(
        -1,
        256,
    ), type='Resize'),
    dict(type='RandomResizedCrop'),
    dict(keep_ratio=False, scale=(
        224,
        224,
    ), type='Resize'),
    dict(flip_ratio=0.5, type='Flip'),
    dict(input_format='NCHW', type='FormatShape'),
    dict(type='PackActionInputs'),
]
val_cfg = dict(type='ValLoop')
val_dataloader = dict(
    batch_size=16,
    dataset=dict(
        ann_file=
        '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/val/annotation_index_val_mp4.txt',
        data_prefix=dict(
            video=
            '/home/j-j12a501/Dorolaw/ai-model/datasets/accident_aihub/processed/val'
        ),
        pipeline=[
            dict(io_backend='disk', type='DecordInit'),
            dict(
                clip_len=1,
                frame_interval=1,
                num_clips=8,
                test_mode=True,
                type='SampleFrames'),
            dict(type='DecordDecode'),
            dict(scale=(
                -1,
                256,
            ), type='Resize'),
            dict(crop_size=224, type='CenterCrop'),
            dict(input_format='NCHW', type='FormatShape'),
            dict(type='PackActionInputs'),
        ],
        test_mode=True,
        type='VideoDataset'),
    num_workers=8,
    persistent_workers=True,
    sampler=dict(shuffle=False, type='DefaultSampler'))
val_evaluator = dict(type='AccMetric')
val_pipeline = [
    dict(io_backend='disk', type='DecordInit'),
    dict(
        clip_len=1,
        frame_interval=1,
        num_clips=8,
        test_mode=True,
        type='SampleFrames'),
    dict(type='DecordDecode'),
    dict(scale=(
        -1,
        256,
    ), type='Resize'),
    dict(crop_size=224, type='CenterCrop'),
    dict(input_format='NCHW', type='FormatShape'),
    dict(type='PackActionInputs'),
]
vis_backends = [
    dict(type='LocalVisBackend'),
]
visualizer = dict(
    type='ActionVisualizer', vis_backends=[
        dict(type='LocalVisBackend'),
    ])
work_dir = '/home/j-j12a501/Dorolaw/ai-model/work_dirs/train/tsn_custom20250405_165409'
