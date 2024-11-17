
const app = getApp();
Page({
    data: {
      checked: true,
    },
    // onLoad() {
    //     console.log('1312', "@CNDHOST")
    // },
    switchTab(target) {
      const type = Number(target.currentTarget.dataset.index);

      app.global.setInfo.appType = type
      wx.$tools.setLocalStorage('appType', type);

      wx.switchTab({
        url: '/page/takeout/index'
      })
    },
    onChange({ detail }) {
      // 需要手动对 checked 状态进行更新
      this.setData({ checked: detail });
    },
    getHttp() {
      wx.$axios.get('https://www.baidu.com').then(res => {
        console.log(res)
      })
    }
  });