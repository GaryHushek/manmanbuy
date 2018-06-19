var mmb;
var id;
var base;
var index;
$(function() {
    mmb = new Mmb();
    base = new Base();
    base.saveViewHistory();
    base.backPrePage();
    id = getQueryString("couponId");
    if(id) {
        mmb.queryQuanList(id);
    }else {
        id = 0;
        mmb.queryQuanList(id);
    }
    mmb.sildePic();
    var couponTitle = getQueryString('couponTitle');
    $('#header .title span').html(couponTitle);
    // 底部的导航栏的最后一个值
    $('.nav .last').html(couponTitle);



   
})


var Mmb = function() {

}

Mmb.prototype = {
    queryQuanList: function(id) {
        $('#loading').show();
        $.ajax({
            url: "http://localhost:9090/api/getcouponproduct",
            data: {
                couponid : id
            },
            success: function(backData) {
                base.loadingHide(function() {
                    
                    var html = template('couponproductTmp', backData);
                    $('.quan-box ul').html(html);

                    // 懒加载
                    // $('.proto-pic img').attr('class', 'lazy');
                    // var arr = [];
                    // $('.proto-pic img').each(function(i, e) {
                    //     var src = $(e).attr('src');
                    //     arr.push(src);
                    //     $(e).attr("data-original", arr[i]);
                    // })

                })

               
            }
        })
    },
    sildePic: function() {
        
        $('body').on('tap', '.proto-pic', function() {
            // 给索引赋值
            index = $(this).find('.pic').data('id');
            // 得到当前点击的src属性的值
            var src = $(this).find('.pic img').attr('src');
            // 赋值给遮罩层
            $('.mask .xx').html('<img class="aaa" src="'+ src +'">');
            // 遮罩层显示
            $('.mask').fadeIn();

            // 显示左右按钮
            $('.Right').show();
            $('.Left').show();

        })
        $('.mask').on('tap', function() {
            // 点击遮罩层隐藏
            $(this).fadeOut();
        })



        $('.mask .slide').on('tap', 'button', function(event) {
            event.preventDefault();
            event.stopPropagation();
            // 声明一个数组, 用来保存src数据
            var arr = [];
            // 用循环得到里面的每一个src
            $('.proto-pic img').each(function(i, e) {
                var src = $(e).attr('src');
                // 加进数组
                arr.push(src);
            })

            // 拿到类名  判断点击的具体标签
            var className = $(this).attr('class');
            if(className == 'Left') {
                
                // 数组图片src的索引
                if(index>0 && $('div[data-id="'+index+'"]').parent().parent().prev().length > 0){
                    $('.Right').show();
                    $('.Left').show();

                    index--;
                    $('.mask .xx').html('<img class="aaa" src="'+ arr[index] +'">');
                }else {
                    $('.Left').hide();
                    
                }

            }else if(className == 'Right') {
                if(index < arr.length -1){
                    $('.Right').show();
                    $('.Left').show();

                    index++;
                    $('.mask .xx').html('<img class="aaa" src="'+ arr[index] +'">');
                }else {
                    $('.Right').hide();
                }
            }
        })

        
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


