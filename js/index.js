var mmb;
var base;
$(function () {
    // 保存浏览记录
    base = new Base();
    base.saveViewHistory();
    mmb = new MMB();
    // 获取首页分类数据
    mmb.getindexmenu();
    // 获取产品数据
    mmb.recommend();
    // 点击开关灯隐藏显示效果
    mmb.toggle();
    // 抽奖
    mmb.Lottery();
    // 点击隐藏抽奖
    mmb.GbHide();
    base.backTop();
})

var MMB = function () {
    this.categoryUrl = [
        "./listclass.html", "./shengqian.html", "./guoneizhekou.html", "./baicaijia.html", "./haitaozhekou.html", "./quan.html", "./history.html", "javascript:void(0)", "coudan.html",
        "./koubei.html", "./shopnav.html", "./brandIndex.html?title=品牌大全",
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

    },

    // 获取产品数据
    recommend: function () {
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            success: function (backData) {
                console.log(backData);
                let html = template("recommendTemp", backData)
                $('.jxhdc ul').html(html);
            }
        })
    },

    // 点击开关灯隐藏显示效果
    toggle: function () {
        $('.categoryIndex').on('tap', '.onclick', function () {
            // alert(111);
            $('.active').toggle()
        });
    },
    // 抽奖效果
    Lottery: function () {
        $('.dazhuanpan').on('tap', function () {
            $('.LotteryImg').hide();
            $('.wrapper').show().css({
                display: 'flex'
            });
        })
    },

    // 点击隐藏抽奖
    GbHide: function () {
        $('.close').on('touchend', function (e) {
            $('.wrapper').hide();
            $('.LotteryImg').show();
            e.preventDefault();
        })
    }

}