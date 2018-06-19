var maimaibuy;
var base = new Base();
$(function(){
    manmanbuy = new Manmanbuy();
    manmanbuy.initDatas();
    manmanbuy.initmui();
    // backPrePage();
    base.saveViewHistory();
    base.backPrePage();
})

var Manmanbuy = function(){

}
var id;
Manmanbuy.prototype = {
    initDatas:function(){
        id = getQueryString("id");
        console.log(id);
        $.ajax({
            url:"http://localhost:9090/api/getmoneyctrlproduct",
            data:{
                "productid":id
            },
            success:function(backData){                
                console.log(backData);                
               var html = template("contents",backData);
               console.log(html);
               $(".navContent").html(html);
            }
        })
    },
    initmui:function(){
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", // 传入区域滚动父容器的选择器
                down: {                   
                    callback: function() {//下拉刷新的回调函数
                        setTimeout(function() {
                            // 延迟1.5秒结束下拉刷新
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        }, 1500)
                    }
                },
                up: {
                	contentnomore:'再下实在给不了更多...',
                    callback: function() {//上拉加载的回调函数
           				// 延迟1.5秒结束上拉加载更多  
           				setTimeout(function() {
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        }, 1500)
                    }
                }
            }
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
function backPrePage(){
    $("body").on('tap','.backPrePage',function(){
        window.history.go(-1);
    })
}

$(".top").on('tap',function(){
    $(".mui-scroll").animate({
        transform: "translate3d(0px, 0px, 0px) translateZ(0px)"
    },100)
})
