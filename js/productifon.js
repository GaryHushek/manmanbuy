var mmb;
var base;
var id;
$(function () {
    mmb = new Mmb();
    base = new Base();
    id = getQueryString('id');
    console.log(id);
    mmb.getdiscountproduct(id);
    mmb.getPinlun();
    base.saveViewHistory();
    base.backPrePage();

})

var Mmb = function () {

}

Mmb.prototype = {
    getdiscountproduct: function (id) {
        $('#loading').show();
        $.ajax({
            url: 'http://localhost:9090/api/getdiscountproduct',
            data: {
                productid: id
            },
            success: function (data) {
                console.log(data);
                base.loadingHide(function () {
                    var html = template('getInfoTap', data.result[0]);
                    $('.container .zc-content').html(html);

                    //  $('.tjdp').attr('type', 'hidden');
                     console.log($('.picA img'));
                })
            }
        })
    },
    getPinlun: function () {
        $('.zc-content').on('tap', '.tjdp', function (e) {
            // e.preventDefault();
             e.stopPropagation();

            var obj = {
                html1: $('#ctl00_ContentBody_txt_nr').val(),
            };

            var pinl = template("pinlun", obj);
            $(".mui-table-view").append(pinl);
            $('#ctl00_ContentBody_txt_nr').val('');

            return false;
        })
    },

}
//获取url地址栏的参数的函数 网上找的  name就是url参数名
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}