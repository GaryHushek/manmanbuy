var base;
var mmb;
// 分类标题
var title;
// 页面信息
var content = 1;
$(function () {
    $("select").val("1");
    base = new Base();
    mmb = new MMB();
    // 保存浏览记录
    base.saveViewHistory()
    // 获取分类id
    if (base.getQueryString("categoryid")) {
        categoryId = base.getQueryString("categoryid")
    } else {
        categoryId = 0;
    }
    // 获取标题
    if (base.getQueryString("title")) {
        title = base.getQueryString("title")
    } else {
        title = "电视";
    }
    mmb.getcategorybyid();
    mmb.checkPage();
    // 路径设置
    mmb.initPath();
    // 带着标题跳转
    mmb.setTiltle();
})
// 分类id
// 根据传入的url
var categoryId;
var page = 1;
// var categoryId = 1;
var MMB = function () {};
MMB.prototype = {
    // 根据id获取产品列表
    getcategorybyid: function () {
        $("#loading").show();
        $.ajax({
            url: "http://localhost:9090/api/getproductlist",
            data: {
                categoryid: categoryId,
                pageid: page

            },
            success: function (backData) {
                console.log(backData);
                backData.page = page;
                backData.pageNum = [];
                // 写入总页数
                backData.pagination = Math.ceil(backData.totalCount / backData.pagesize);
                // 写入页码
                for (var i = 1; i <= Math.ceil(backData.totalCount / backData.pagesize); i++) {
                    backData.pageNum.push(backData.pagination);
                }
                // console.log(backData);

                var html = template("product-list", backData);
                if (html) {
                    base.loadingHide(function () {
                        $(".product-list ul").html(html);
                        $("select").val(page);
                    });
                }
            }
        })
    },
    // 上一页，下一页，选择某一页
    checkPage: function () {
        $(".content-box").on('tap', '.pre a', function () {
            // console.log(this);
            page = $(this).data('page');
            // console.log(page);
            mmb.getcategorybyid();
        })
        $('.content-box').on('change', 'select', function () {
            page = $(this).val() - 0;
            // 刷新一次页面
            $(window).scrollTop(0);
            mmb.getcategorybyid();

        })
    },
    // 路径设置
    initPath: function () {
        // 获取到本页面的url
        var url = window.location.href;
        $("#path-show .path li").eq(2).html('<a href="' + url + '">' + title + '</a>');
    },
    // 带着标题跳转
    setTiltle: function () {
        $(".content-box").on("tap", "a.row", function () {
            var href = $(this).attr("href") + "&title=" + title;
            $(this).attr("href", href);
        })
    }

}