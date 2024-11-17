const listArr = [
    {
        pagePath: "/page/takeout/index",
        text: "存餐",
        iconPath: "/images/icon/home.png",
        selectedIconPath: "/images/icon/selectHome.png",
        key: 'home'
    },
    {
        pagePath: "/page/order/index",
        text: "存餐订单",
        iconPath: "/images/icon/order.png",
        selectedIconPath: "/images/icon/selectOrder.png",
        key: 'order'
    },
    {
        pagePath: "/page/my/index",
        text: "我的",
        iconPath: "/images/icon/my.png",
        selectedIconPath: "/images/icon/selectMy.png",
        key: 'my'
    },
];

const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        active: -1,
        list: [],
    },
    lifetimes: {
        ready() {
            const appType = app.global.setInfo.appType;
            let list = listArr;

            if(appType === 1) {
                listArr[0].text = '取餐'
                list = [listArr[0], listArr[2]]
            } else {
                listArr[0].text = '存餐'
            }

            this.setData({
                list
            }, () => {
                // console.log(this.data.list)
                this.checkActive();
            })



            
        }
    },
    methods: {
        onChange(e) {
            console.log(e)
            const index = e.detail;

            const item = this.data.list[index];

            if (item.pagePath) {
                wx.switchTab({
                    url: item.pagePath
                });
            }
        },
        checkActive() {
            const nowPageData = getCurrentPages()[0];

            if (nowPageData) {
                const {route} = nowPageData;
                const index = this.data.list.findIndex(item => item.pagePath.includes(route));

                if (typeof index === 'number') {
                    this.setData({
                        active: index
                    });
                }
            }
        }
    }
});
