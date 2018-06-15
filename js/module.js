var base;
$(function () {
    // 创建一个Base的实例化对象
    base = new Base();
    // 保存浏览记录
    base.saveViewHistory();
    // 初始化返回上一页功能
    base.backPrePage();
    // 初始化底部路径显示
    base.pathShow();
})