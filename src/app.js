import env from '@src/env'
import axios from './utils/request';
import tools from './utils/tools'

(function(){
  var PageTmp = Page;
  Page = function (pageConfig) {
    // 设置全局默认分享
    pageConfig = Object.assign({
      onShareAppMessage:function () {
        return {
          title: '思哒外卖柜',
          path: 'page/takeout/index',
          imageUrl: env.cdnHost + '/images/share.jpg'
        };
      }
    }, pageConfig);
    PageTmp(pageConfig);
  };
})();

App({
    global: {
      env: env,
      setInfo: {
        // 1: 取餐， 2：存餐
        appType: null
      }
    },
    onLaunch() {
      wx.$axios = axios;
      wx.$tools = tools;

      const appType = wx.$tools.getLocalStorage('appType')
      if(appType) {
        this.global.setInfo.appType = appType;

        // wx.switchTab({
        //   url: '/page/takeout/index'
        // })
      }
      // console.log(process.env.BUILD_ENV)
    },
  });
  