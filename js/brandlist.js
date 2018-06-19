var base;
var mmb;
// 获取URl地址的id
var pagesize = 5;
var totalCount;
var title;
var productId;

// 获取URl地址的id
var brandTitleId;
//获取URL地址的标题
var brandTitle;

var title;
$(function() {
  base = new Base();

  mmb = new MMB();
  // 获取URl地址的id
  brandTitleId = base.getQueryString("id");
  //获取URL地址的标题
  brandTitle = base.getQueryString("brandTitle");
  //截取URL传过来的值
  titel = brandTitle.split("十")[0];
  base = new Base();
  // 获取标题
  if (titel) {
    titel = titel;
  } else {
    titel = "平板电视哪个牌子好";
  }

  mmb.initPath();
  mmb.getbrandData(brandTitleId,titel);
  mmb.getsaleRankData(brandTitleId,titel);
  mmb.getdiscussProData();
  mmb.getDiscussData();
  mmb.loadMore();

});
function MMB() {}
MMB.prototype = {
  // 路径设置
  initPath: function() {
    // 获取到本页面的url
    var url = window.location.href;
    $("#path-show .path li").eq(2).html('<a href="' + url + '">' + titel + "哪个牌子好" + "</a>");
  },
  getDiscussData: function() {
    $.ajax({
      url: "http://localhost:9090/api/getproductcom",
      data: {
        productid: productId
      },
      success: function(backData) {
        // console.log(backData);
        var rel = template("discussTem", backData);
        // console.log(rel);
        $(".discuss ul li").append(rel);
      }
    });
  },
  getbrandData: function(id, titel) {
    $.ajax({
      url: "http://localhost:9090/api/getbrand",
      data: {
        brandtitleid: id
      },
      success: function(backData) {
        var rel = template("brandTem", backData);
        console.log(brandTitle);
        $(".brandList .title a").html(titel + "哪个牌子好");
        $(".brandList ul").html(rel);
      }
    });
  },

  getsaleRankData: function(id, brandTitle) {
    $.ajax({
      url: "http://localhost:9090/api/getbrandproductlist",
      data: {
        brandtitleid: id,
        pagesize: 4
      },
      success: function(backData) {
        var rel = template("salerankTem", backData);
        $(".saleRank .title a").html(brandTitle + "产品销量排行");
        $(".saleRank ul").html(rel);
        totalCount = backData["totalCount"];
      }
    });
  },

  loadMore: function() {
    $(".loadMore").click(function() {
      $(this).html("正在加载...");
      pagesize = pagesize + 5;
      $.ajax({
        url: "http://localhost:9090/api/getbrandproductlist",
        data: {
          brandtitleid: brandTitleId,
          pagesize: pagesize
        },
        success: function(backData) {
          var rel = template("salerankTem", backData);
          // console.log(rel);
          $(".saleRank ul").html(rel);
          if (totalCount < pagesize) {
            $(".loadMore").html("丢！已经下载不了更多...");
          } else {
            $(".loadMore").html("点击加载更多");
          }
        }
      });
    });
  },

  getdiscussProData: function() {
    $.ajax({
      url: "http://localhost:9090/api/getbrandproductlist",
      data: {
        brandtitleid: brandTitleId
      },
      success: function(backData) {
        var rel = template("discussProTem", backData);
        // console.log(rel);
        $(".discuss ul").html(rel);

        productId = backData["result"][0]["productId"];

        mmb.getDiscussData();
      }
    });
  },
};
