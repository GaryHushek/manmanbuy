// 公共部分的功能
(function($, Global) {
  var Base = function() {};
  // 所有功能挂载在Base构造函数的原型上
  Base.fn = Base.prototype = {
    // 找回三角关系
    constructor: Base,
    // 登陆检测
    checkLogin: function() {},
    // 页面历史浏览记录的保存（为了实现返回上一页）
    saveViewHistory: function() {
      // 获取本次会话的浏览记录
      var historyUrl = window.sessionStorage.getItem("historyUrl");
      // 获取到本次访问的url
      var url = window.location.href;
      if (!historyUrl) {
        // 如果没有浏览记录
        // 创建sessionStorage
        var urlData = [];
        var data = {
          url: url,
          time: new Date()
        };
        urlData.push(data);
        // 把浏览记录存入sessionStorage
        window.sessionStorage.setItem("historyUrl", JSON.stringify(urlData));
      } else {
        // 说明有浏览记录
        historyUrl = JSON.parse(historyUrl);
        if (historyUrl[historyUrl.length - 1]["url"] == url) {
          // 如果上一条浏览记录是当前页面，不保存（防止刷新，多次点击等）
          return;
        } else {
          // 保存本次浏览记录
          var data = {
            url: url,
            time: new Date()
          };
          historyUrl.push(data);
          // 把浏览记录存入sessionStorage
          window.sessionStorage.setItem(
            "historyUrl",
            JSON.stringify(historyUrl)
          );
        }
      }
    },
    // 回到上一页的功能实现
    backPrePage: function() {
      $("#header").on("tap", ".backPrePage", function() {
        // 取到浏览记录
        var url = JSON.parse(window.sessionStorage.getItem("historyUrl"));
        // 如果浏览记录大于2
        if (url.length >= 2) {
          // 回到上一页
          window.location.href = url[url.length - 2]["url"];
        } else {
          // 浏览记录小于2说明，此页面是用户直接使用绝对url访问，跳转到首页
          window.location.href = "./index.html";
        }
      });
    },
    // 底部路径显示
    pathShow: function() {
      // 获取到当前页面的标题
      var title = $("#header .title")
        .html()
        .split("-")[0];
      // 获取浏览记录的当前浏览页面的记录（为什么不直接获取当前页面的呢？因为刷新一次获取一次的话就会多次生成，而浏览记录已经做了多次重复不存储的处理）
      var url = JSON.parse(window.sessionStorage.getItem("historyUrl"));
      url = url[url.length - 1]["url"];
      var li = $("<li><a href=" + url + ">" + title + "</a></li>");
      console.log($("#path-show .path"));
      $("#path-show .path").append(li);
    },
    // 回到顶部功能的实现
    backTop: function() {

    },
    // 遮罩层隐藏()
    loadingHide:function(fn){
      // 传入回调函数（模拟网络加载）
      setTimeout(function(){
        $("#loading").hide();
        fn();
      },300)
    }
  };
  // 向外暴露构造函数(只要引用了base.js文件的页面都能通过new Base()出的实例访问构造函数中的所有方法跟属性，注意：base.js一定要在页面的js文件之前引用)
  window.Base = Base;
})($, window || this);
