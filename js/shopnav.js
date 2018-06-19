var mmb;
var base;
$(function () {
    mmb = new MMB();
    mmb.getData();
    base = new Base();
    // 保存浏览记录
    base.saveViewHistory();
    // 返回上一页
    base.backPrePage();
    
})

function MMB() {

}

MMB.prototype = {
    getData: function () {
        $.ajax({
            url: "http://localhost:9090/api/getsitenav",
            success: function (backData) {
                var rel = template('navTem',backData);
                // console.log(rel);
                $('.webNav').html(rel);
            }
        })
    }
}