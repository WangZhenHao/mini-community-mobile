const app = getApp();

Page({
    data: {
        appType: null
    },
    onLoad() {
        const appType = app.global.setInfo.appType;
        console.log(appType)
        this.setData({
            appType
        })
    },
    logoOutHanlde() {
        
    }
})