# 社区服务小程序


### css样式

UI统一规范是0.5px的边框，所有需要使用到有赞提供的class

```
1：边框需要自定义颜色和圆角，van-hairline--surround

如: .van-hairline--surround {
    &::after {
        border-color: #DEDEDE;
        border-radius: 16rpx;
    }
}

2：底部边框，van-hairline--top， van-hairline--bottom

```