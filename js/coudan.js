var base;
var coudan;
window.onload = function () {
    $("body").on("tap", '.subNew', function () {
        var tt = $(this).children("a").html().split('<')[0].trim();
        if ($(this).parent().parent().attr('class') == 'sub-area') {
            tt = tt.slice(0, 2);
        }
        tt = tt + '<i class="mui-icon mui-icon-arrowdown">';
        if ($(this).parent().parent().attr('class') == 'sub-area') {
            $(".nav-bar").children().eq(1).html(tt);
        } else if ($(this).parent().parent().attr('class') == 'sub-price') {
            $(".nav-bar").children().eq(2).html(tt);
        } else if ($(this).parent().parent().attr('class') == 'sub-content') {
            $(".nav-bar").children().eq(0).html(tt);
        }
    })
    // 创建一个Base的实例化对象
    base = new Base();
    // 保存浏览记录
    base.saveViewHistory();
    // 初始化返回上一页功能
    base.backPrePage();
    // 初始化底部路径显示
    base.pathShow();
    // 获取店铺
    coudan = new Coudan();

    coudan.getShop();
    coudan.getShopList();

    // 初始化懒加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
    });

    // 小乌龟的js动画
    // 获取可视窗口高度
    var height = $(window).height();
    $('.paapa').on('click', function () {
        $(this).animate({
            top: height
        }, 600)
    })
    // 刷新页面,让滚动条置顶
    setTimeout(function () {
        $(document).scrollTop(0)
    });
    // 设置判断条件只执行一次
    var flag = true;
    $(window).scroll(function () {
        // 获取滚动条滚动高度
        var scrollTop = $(window).scrollTop();
        if (flag && scrollTop > 50) {
            flag = false;
            $('.paapa').animate({
                top: -100
            }, 9000, function () {
                $('.paapa').css({
                    // 定位到窗口外
                    top: height
                });
            })
            // 滚动条回到顶点后让图片回到原点
        } else if (!flag && scrollTop == 0) {
            $('.paapa').animate({
                top: 520
            }, 520, function () {
                flag = true;
            })
        }
    })
    // 小乌龟结束
}
var Coudan = function () {};
Coudan.prototype = {
    // 获取店铺  
    getShop: function () {
        // 电商选择
        $('.nav-bar .wang-toggle').eq(0).on('tap', function () {
            // 点击判断如果i箭头向上那么设置向下,同时让下拉菜单出现, 反之向上,菜单隐藏!!;
            $(this).siblings().children().children().attr('class', 'mui-icon mui-icon-arrowup');
            if ($(this).children().children().hasClass('mui-icon mui-icon-arrowup')) {
                $(this).children().children().attr('class', 'mui-icon mui-icon-arrowdown');
                $('.sub-content').show().siblings().hide();
            } else if ($(this).children().children().hasClass('mui-icon mui-icon-arrowdown')) {
                $(this).children().children().attr('class', 'mui-icon mui-icon-arrowup');
                $('.sub-content').hide();
            }

            $.ajax({
                url: 'http://localhost:9090/api/getgsshop',
                success: function (data) {
                    $('.nav-bar .wang-toggle').eq(3).children().children().attr("class", "mui-icon mui-icon-list");
                    var html = template('nav-subContent-shop', data);
                    $('.sub-content').html(html);
                }

            })
        })
        // 地区选择
        $('.nav-bar .wang-toggle').eq(1).on('tap', function () {
            // 点击判断如果i箭头向上那么设置向下 反之向上;
            $(this).siblings().children().children().attr('class', 'mui-icon mui-icon-arrowup');
            if ($(this).children().children().hasClass('mui-icon mui-icon-arrowup')) {
                $(this).children().children().attr('class', 'mui-icon mui-icon-arrowdown');
                $('.sub-area').show().siblings().hide();
            } else if ($(this).children().children().hasClass('mui-icon mui-icon-arrowdown')) {
                $(this).children().children().attr('class', 'mui-icon mui-icon-arrowup');
                $('.sub-area').hide();
            }

            $.ajax({
                url: 'http://localhost:9090/api/getgsshoparea',
                success: function (data) {
                    $('.nav-bar .wang-toggle').eq(3).children().children().attr("class", "mui-icon mui-icon-list");
                    var html = template('nav-subContent-area', data);
                    $('.sub-area').html(html);
                }

            })
        })
        // 价格选择
        $('.nav-bar .wang-toggle').eq(2).on('tap', function () {

            // 点击判断如果i箭头向上那么设置向下 反之向上;
            $(this).siblings().children().children().attr('class', 'mui-icon mui-icon-arrowup');
            if ($(this).children().children().hasClass('mui-icon mui-icon-arrowup')) {
                $(this).children().children().attr('class', 'mui-icon mui-icon-arrowdown');
                $('.sub-price').show().siblings().hide();
            } else if ($(this).children().children().hasClass('mui-icon mui-icon-arrowdown')) {
                $(this).children().children().attr('class', 'mui-icon mui-icon-arrowup');
                $('.sub-price').hide();
            }
            // 修改第四个要放在后面
            $('.nav-bar .wang-toggle').eq(3).children().children().attr("class", "mui-icon mui-icon-list");
            $('.sub-price').html(
                '<ul>' +
                '<li class="subNew">' +
                '<a href="#">全部价格<i class="mui-icon mui-icon-checkmarkempty nike"></i></a>' +
                '</li>' +
                '<li class="subNew">' +
                '<a href="#">1-3元<i class="mui-icon mui-icon-checkmarkempty nike"></i><span id="naike" class="mui-icon mui-icon-checkmarkempty nike"></span></a>' +
                '</li>' +
                '<li class="subNew">' +
                '<a href="#">3-5 <i class="mui-icon mui-icon-checkmarkempty nike"></i></a>' +
                '</li>' +
                '<li class="subNew">' +
                '<a href="#">5-20元 <i class="mui-icon mui-icon-checkmarkempty nike"></i></a>' +
                '</li>' +
                '<li class="subNew">' +
                '<a href="#">陶元元<i class="mui-icon mui-icon-checkmarkempty nike"></i></a>' +
                '</li>' +
                '</ul>'
            )
        })
        // 更多功能菜单
        $('.nav-bar .wang-toggle').eq(3).on('tap', function () {
            // 点击判断如果i箭头向上那么设置向下,同时让下拉菜单出现, 反之向上,菜单隐藏!!;
            $(this).siblings().children().children().attr('class', 'mui-icon mui-icon-arrowup');
            if ($(this).children().children().hasClass('mui-icon mui-icon-list')) {
                $(this).children().children().attr('class', 'mui-icon mui-icon-close');
                $('.sub-content-menu').show().siblings().hide();
            } else if ($(this).children().children().hasClass('mui-icon mui-icon-close')) {
                $(this).children().children().attr('class', 'mui-icon mui-icon-list');
                $('.sub-content-menu').hide();
            }

        })
        // 黄色的nike   移除另外的那个勾
        $('.coudan-nav').on('tap', '.subNew a', function () {
            $(this).parent().parent().slideUp(800);
            $(this).children('#naike').removeClass("mui-icon mui-icon-checkmarkempty nike");
            $(this).children().show();
            $(this).parent().siblings().children().children().hide();
        })
    },
    // 获取页面主体内容
    getShopList: function () {
        var shopId = 1;
        var areaId = 1;
        // 页面已加载就渲染页面;
        function queryProducts() {
            $.ajax({
                url: 'http://localhost:9090/api/getgsproduct',
                data: {
                    shopid: shopId,
                    areaid: areaId
                },
                success: function (data) {
                    var html = template('productsTmp', data);
                    $('.content-list').html(html);
                }
            })
        }
        queryProducts();
        $('.sub-content').on('tap', 'a', function () {
            var num = $(this).data('id');
            areaId = num;
            queryProducts();
        })
        $('.sub-area').on('tap', 'a', function () {
            var num = $(this).data('id');
            areaId = num;
            queryProducts();
        })
        $('.sub-price').on('tap', 'a', function () {
            mui.toast('缺失数据,暂无此功能', {
                duration: 'long',
                type: 'div'
            })
        })
        $('.sub-content-menu').on('tap', 'a', function () {
            $(this).addClass().siblings().removeClass();

            mui.toast('缺失数据,暂无此功能', {
                duration: 'long',
                type: 'div'
            })
        })
    }

}