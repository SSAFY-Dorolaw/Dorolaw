# adam_50e.py
optim_wrapper = dict(
    optimizer=dict(type='Adam', lr=1e-3, weight_decay=1e-4),
    clip_grad=dict(max_norm=40, norm_type=2)
)

param_scheduler = [
    dict(
        type='MultiStepLR',
        begin=0,
        end=50,  # ✅ 수정!
        by_epoch=True,
        milestones=[20, 40],
        gamma=0.1)
]

train_cfg = dict(type='EpochBasedTrainLoop', max_epochs=50, val_begin=1, val_interval=1)
val_cfg = dict(type='ValLoop')
test_cfg = dict(type='TestLoop')
