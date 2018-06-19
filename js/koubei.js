var mmb;
var base;
$(function () {
    mmb = new MMB();
    base = new Base();
    // 保存浏览记录
    base.saveViewHistory();
    // 返回上一页
    base.backPrePage();
    $("#loading").show()
    base.pathShow();
})
var MMB = function(){};
MMB.prototype = {

}
