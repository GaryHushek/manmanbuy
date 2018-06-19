var base = new Base();
var maimaibuy;
$(function () {
    manmanbuy = new Manmanbuy();
    manmanbuy.initDatas();
    manmanbuy.initmui();
    manmanbuy.pageAction();
    base.saveViewHistory();
    base.backPrePage();
    liClick();
    $("#loading").show();


})

var Manmanbuy = function () {

}
var page = 1;
var totalYeshu;
Manmanbuy.prototype = {
    initDatas: function () {

        $.ajax({
            url: "http://localhost:9090/api/getmoneyctrl",
            data: {
                "pageid": page
            },
            success: function (backData) {
                // console.log(backData);
                var result = template("introTmp", backData.result);
                // console.log(result);
                $("#main .mui-table-view").html(result);
                $("#main ul img").addClass("mui-media-object mui-pull-left");
                // 总页数
                totalYeshu = Math.ceil(backData.totalCount / backData.pagesize);
                // console.log(totalYeshu);
                var arr = [];
                for (var i = 1; i <= totalYeshu; i++) {
                    arr[i - 1] = i;
                }
                backData.arr = arr;
                // console.log(backData);

                base.loadingHide(function () {
                    $(".content").show();
                    var html2 = template("selectTmp", backData);
                    $("#selectPage").html(html2);
                    var html = template("introTmp", backData.result);
                    $("select").val(page);
                })

            }
        })
    },
    initmui: function () {
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", // 传入区域滚动父容器的选择器
                down: {
                    callback: function () { //下拉刷新的回调函数

                        // 延迟1.5秒结束下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

                    }
                },
                // up: {
                //     contentnomore: '再下实在给不了更多...',
                //     callback: function () { //上拉加载的回调函数
                //         // 延迟1.5秒结束上拉加载更多  
                //         setTimeout(function () {
                //             mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh(true);
                //         }, 1500)
                //     }
                // }
            }
        });
    },
    // 页码操作
    // 分页事件
    pageAction: function () {
        // 返回前一页
        $("body").on("click", '.before', function () {
            console.log($(window).scrollTop());
            // console.log(1);
            if (page == 1) {

            } else {
                page--;
                manmanbuy.initDatas();
                $("select").val(page / totalYeshu);
                $(".mui-scroll").animate({
                    transform: "translate3d(0px, 0px, 0px) translateZ(0px)"
                }, 100)
            }
        });
        // 去后一页
        $("body").on("click", '.after', function () {

            // console.log(1);
            if (page < totalYeshu) {
                page++;
                manmanbuy.initDatas();
                $("select").val(page / totalYeshu);
                $(".mui-scroll").animate({
                    transform: "translate3d(0px, 0px, 0px) translateZ(0px)"
                }, 100)
            } else {}
            console.log(page);
        });

        $("body").on('change', 'select', function () {

            page = $(this).val();
            console.log(page);
            manmanbuy.initDatas();
            $("select").val(page / totalYeshu);
            $(".mui-scroll").animate({
                transform: "translate3d(0px, 0px, 0px) translateZ(0px)"
            }, 100)
        });
    }
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

function liClick() {
    console.log(1);
    $("body").on("tap", '.introduce li', function () {
        var href = $(this).children('a').attr('href');
        console.log(href);
        window.location = href;
    })
}

$(".top").on('tap', function () {
    $(".mui-scroll").animate({
        transform: "translate3d(0px, 0px, 0px) translateZ(0px)"
    }, 100)
})