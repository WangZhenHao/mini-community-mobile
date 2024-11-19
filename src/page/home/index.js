
const app = getApp();
Page({
    data: {
      checked: true,
    },
    onLoad() {
        console.log('1312')
    },
    handleGetNumber(value) {
      console.log(value)
    },
    handleAgreePrivacyAuthorization(value) {
      console.log(value, 1)
      wx.openPrivacyContract({
        success: () => {}, // 打开成功
        fail: () => {}, // 打开失败
        complete: () => {}
      })
    }
  });