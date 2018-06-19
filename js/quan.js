var mmb;
var base;
$(function() {
    mmb = new Mmb();
    base = new Base();
    base.saveViewHistory();
    base.backPrePage();
    mmb.getcoupon(); 
})


var Mmb = function() {

}

Mmb.prototype = {
    getcoupon: function() {
        $("#loading").show();
        $.ajax({
            url: "http://localhost:9090/api/getcoupon",
            success: function(backData) {

                base.loadingHide(function() {
                    var html = template('quanTmp', backData);
                    $('.quan-model ul').html(html);
                })
            }
        })
    }
}
