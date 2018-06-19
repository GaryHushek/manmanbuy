var mmb;
var base;
$(function () {
    mmb = new Mmb();
    base = new Base()
    mmb.getinlanddiscount();
    base.saveViewHistory();
    // base.backPrePage();
})
var Mmb = function () {

}
Mmb.prototype = {
    getinlanddiscount: function () {
        $("#loading").show();
        $.ajax({
            url: "http://localhost:9090/api/getinlanddiscount",
            success: function (data) {
                console.log(data);
                //渲染
                base.loadingHide(function () {
                    var html = template('getlindTap', data);
                    $(".content .product").html(html);
                });
            }
        })
    }
}