var base;
var brand;
var title;
$(function(){
    base = new Base();
     // 获取标题
     if (base.getQueryString("title")) {
        title = base.getQueryString("title");
    } else {
        title = "品牌大全";
    }

    brand=new Brand();
     // 查询列表
    brand.brandList();
    brand.initScroll();
    brand.initPath();
})

var Brand=function(){

}
Brand.prototype={
    // 路径设置
    initPath: function () {
        // 获取到本页面的url
        var url = window.location.href;
        console.log(title);
        $("#path-show .path li").eq(1).html('<a href="' + url + '">' + title + '</a>');
    },
    initScroll:function(){
        var options = {
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏  值越大滚动越慢
            bounce: true //是否启用回弹
        };
        // 初始化区域滚动
        mui('.mui-scroll-wrapper').scroll(options);
    },
    // 查询列表
    brandList:function(){
        $.ajax({
            url:'http://localhost:9090/api/getbrandtitle',
            data:'',
            success:function(data){
                var html=template("brandList",data);
                $(".content .mui-scroll").html(html);
            }
        })
    }
}


