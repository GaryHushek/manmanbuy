var base;
var mmb;

// 产品id
var productId;
// 分类的名字
var title;
// 分类id
var categoryId;
// 产品id
var productId;

$(function () {
    base = new Base();
    mmb = new MMB();
    // 保存浏览记录
    base.saveViewHistory()
    // 根据传入的url 获取分类id
    if (base.getQueryString("productId")) {
        productId = base.getQueryString("productId");
    } else {
        productId = 1;
    }
    if (base.getQueryString("title")) {
        title = base.getQueryString("title");
    } else {
        title = "";
    }

    // 分类id

    // 根据id获取产品
    mmb.getProductbyid();
    // 获取产品的评论信息
    mmb.getComment();
    // 加载更多内容
    mmb.getMoreComment();
    // 回到首页功能
    base.backTop();
});
var commentData = {};
commentData.result = [];
var start = 0;
var end = 2;
var back;
var MMB = function () {};
MMB.prototype = {
    // 根据id获取产品
    getProductbyid: function () {
        $("#loading").show();
        $.ajax({
            url: "http://localhost:9090/api/getproduct",
            data: {
                productid: productId
            },
            success: function (backData) {
                console.log(backData);
                categoryId = backData.result[0].categoryId;

                var html = template("product-list", backData);
                if (html) {
                    base.loadingHide(function () {
                        $(".detail").html(html);
                        // 路径设置
                        mmb.setPath();
                    });
                }
            }
        });
    },
    // 获取产品的评论信息
    getComment: function () {
        $(".add-more").html("loading...");
        $.ajax({
            url: "http://localhost:9090/api/getproductcom",
            data: {
                productid: 20
            },
            success: function (backData) {
                for (var i = start; i < end; i++) {
                    commentData.result[i] = backData.result[i];
                }
                if (end == backData.result.length) {
                    $(".add-more").hide();
                    return;
                }
                start = end;
                end + 2 >= backData.result.length ?
                    (end = backData.result.length) :
                    (end += 2);

                console.log(commentData);
                //判断这个总共的数量小于2是影藏
                var html = template("commentTemp", commentData);
                if (html) {
                    $(".comment .content-box").html(html);
                    $(".add-more").html("点击加载更多");
                }
            }
        });
    },
    // 点击获取更多
    getMoreComment: function () {
        $(".add-more").on("tap", function () {
            console.log("你点我啦");
            mmb.getComment();
        });
    },
    // 路径设置
    setPath: function () {
        console.log(categoryId);
        var pageTitle =
            $(".title")
            .html()
            .trim()
            .split(" ")[0] +
            " " +
            $(".title")
            .html()
            .trim()
            .split(" ")[1];
        $("#path-show .path li")
            .eq(1)
            .html(
                '<a href="./bijiaProductList.html?categoryId=' +
                categoryId +'&title='+title+'">' +
                title +
                "&nbsp;>&nbsp;</a>"
            );
        $("#path-show .path li")
            .eq(2)
            .html(
                "<a href=" +
                window.location.href +
                ">" +
                pageTitle +
                "&nbsp;>&nbsp;</a>"
            );
    }
};