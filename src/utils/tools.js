const Tools = {
    getLocalStorage(key) {
        return wx.getStorageSync(key);
    },
    clearLocalStorage(key) {
    	wx.removeStorageSync(key)
    },
    setLocalStorage(key, value, expires) {
        wx.setStorageSync(key, value);
    },
    /**
     * 显示加载框
     * @param  {[type]} title [description]
     * @return {[type]}       [description]
     */
    showLoading(title = "加载中...") {
        wx.showLoading({
            title: title,
            mask: true,
        });
    },
    /**
     * 隐藏加载框
     * @return {[type]} [description]
     */
    hideLoading() {
        wx.hideLoading();
    },
};

export default Tools;
