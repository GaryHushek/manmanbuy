var mmb;
var base;
$(function () {
    // 保存浏览记录
    base = new Base();
    base.saveViewHistory();
    mmb = new MMB();
    // 获取首页分类数据
    mmb.getindexmenu();
})

var MMB = function () {
    this.categoryUrl = [
        "./listclass.html", "./shengqian.html", "./guoneizhekou.html", "./baicaijia.html", "./haitaozhekou.html", "./quan.html", "./history.html", "./coudan.html",
        "./koubei.html", "./shopnav.html", "./brandlist.html",
    ];
};
MMB.prototype = {
    // getindexmenu数据
    getindexmenu: function () {
        $("#loading").show();
        $.ajax({
            url: "http://localhost:9090/api/getindexmenu",
            success: function (backData) {
                // 把分类的url循环写入到backData中
                for (var i = 0; i < backData.result.length; i++) {
                    backData.result[i].href = mmb.categoryUrl[i];
                }
                // 模板引擎生成数据渲染在页面上(同时启用loading功能)
                base.loadingHide(function () {
                    var html = template("categoryTemp", backData);
                    $(".category .categoryIndex").html(html);
                })
            }
        })
    }
}