var mmb;
var base;
$(function () {
    // 保存浏览记录
    base = new Base();
    base.saveViewHistory();
    mmb = new MMB();
    // 获取首页分类标题数据
    mmb.getCategoryTitle();
    mmb.getCategoryContent();
    base.backTop();
})

var MMB = function () {

};
MMB.prototype = {
    // 获取标题的数据
    getCategoryTitle: function () {
        $("#loading").show();
        $.ajax({
            url: "http://localhost:9090/api/getcategorytitle",
            success: function (backData) {
                var title = template('product-title', backData);
                if (title) {
                    base.loadingHide(function () {
                        $('.category').html(title);
                    });
                }
            }
        })
    },
    //获取标题里面列表的数据
    getCategoryContent: function () {
        $('.category').on('tap', '.pro-title', function () {
            var that = this;
            //点击之后就移出掉a后面的元素
            $('.category .product-category a').siblings().remove();
            //获取id
            var id = $(this).data('id');
            console.log(id);
            $.ajax({
                url: "http://localhost:9090/api/getcategory",
                data: {
                    titleid: id
                },
                success: function (backData) {
                    // console.log(backData);
                    var datalength = backData.result.length;
                    // console.log(datalength);
                    //当总数量不是3的倍数的时候就给里面push
                    if (datalength % 3 != 0) {
                        var pushnum = Math.ceil(datalength / 3) * 3 - backData.result.length;
                        // console.log(pushnum);
                    }
                    for (var i = 1; i <= pushnum; i++) {
                        backData.result.push({
                            categoryId: '',
                            category: "",
                            titleId: '',
                            _id: "",
                        });
                    }
                    // console.log(backData);
                    var content = template('product-content', backData);
                    //在某个元素之后追加内容
                    $('.category .product-category .pro-title').after(content);


                    //   console.log( $(that).siblings().children("li:last-child"));
                    //   $(that).siblings().children("li:last-child").css({
                    //     //   'borderLeft':"1px soild red"
                    //   });
                }
            })
        })
    }
}