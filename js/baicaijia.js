var str;
var stt;
var percentData;
var arr1 = [];
var base = new Base();
$(function () {
    getTab();
    getProductList();
    titleId = getQueryString('id');
    //   区域滚动部分
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //  回到顶部

    // loading显示
    // $("#loading").show();


})
//  构造函数
var MMB = function () {

}

// 获取id地址进行页面渲染
$("body").on("tap", ".clicks", function () {
    titleId = $(this).data("id");

    $(this).addClass('color').siblings().removeClass('color');

    getProductList();
})
//  $("body").on("tap",".top",function () { 
//    $("body").
//  })

var titleId;
// 获取tab数据
function getTab() {
    $.ajax({
        url: "http://localhost:9090/api/getbaicaijiatitle",
        success: function (data) {
            console.log(data);
            var html = template('tabTmp', data);
            $('.navContent .headerLists').html(html);

        }
    })
}

// 获取productlist数据
function getProductList() {
    $.ajax({
        url: "http://localhost:9090/api/getbaicaijiaproduct",
        data: {
            titleid: titleId || 1
        },
        success: function (data) {
            console.log(data);
            console.log(data);
            for (var i = 0; i < data.result.length; i++) {

                arr1[i] = data.result[i].productCouponRemain.split('<span>')[1].split('</span>')[0].split('%')[0];
                data.result[i].changdu = arr1[i];

            }



            console.log(arr1);


            var html = template('productlistTmp', data);

            $('.navContent  .center').html(html);
            percentData = $(".mui-progressbar span").html().split('%')[0];
            // alert(percentData);
            $("#demo1 span").css({
                left: +percentData
            });

        }
    })
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

// 返回顶部
$(".top").on('tap', function () {
    console.log($("#huiqu"));
    console.log(134);
    $("#huiqu").css({
        transform: "translate3d(0px, 0px, 0px) translateZ(0px)"
    })
})