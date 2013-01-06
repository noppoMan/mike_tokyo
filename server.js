var http = require("http");
var url = require("url");

(function start() {
  function onRequest(request, response) {
    //try{

        //アプリケーション初期化
        var Response = require("./system/server/response")
        Response.setResponseObject(response);
        
        var pathname = url.parse(request.url).pathname;
        var bootstrap = require("./app/config/bootstrap");
        bootstrap.init(request, response);
        var env = require("./app/config/env/" + bootstrap.env);
        var config = require("./app/config/config");
        var share = require("./system/server/share");
        share.config = config;
        share.SYSTEM_ROOT = env.SYSTEM_ROOT;
        share.APP_PATH = env.SYSTEM_ROOT + "app/";
        share.LIBRARY_PATH = env.SYSTEM_ROOT + "system/";
        share.contents_url = env.contents_url;

        var router = require("./system/server/router.js").req = request;
        var Router = require("./app/config/router.js");


        var __CONTROLLER__ = Router.controller;
        var __ACTION__ = Router.action;

        if(pathname == "/favicon.ico"){
          response.end();
          return;
        }

        if(pathname != "" && pathname != "/"){
          var requestUri = pathname.split("/");
          __CONTROLLER__ = requestUri[1];
          __ACTION__ = (typeof requestUri[2] == "string") ? requestUri[2] : "index";
        }

        share.__CONTROLLER__ = __CONTROLLER__;
        share.__ACTION__ = __ACTION__;


        //クラス名を動的に形成する
        var className = __CONTROLLER__.charAt(0) + __CONTROLLER__.substring(1) + "Controller";
        var controllerInstance = null;

        //コントローラーファイルの存在確認
        var controllerPath = "./app/controllers/" + className;
        var fs = require("fs"); 
        try{
          var state = fs.statSync(controllerPath + ".js");
        }catch(e){
            console.dir(e);
            Response.output(404, "html", "404 Not Found");
            return;
        }

        var _controller = require(controllerPath);
        controllerInstance = new _controller();


        var ua = require('user-agent');

        controllerInstance.request = request;
        controllerInstance.response = response;
        controllerInstance.headers = request.headers;
        controllerInstance.headers.userAgent = ua.parse(request.headers['user-agent']).full;

        controllerInstance.init();

        try{
          var assignVars = eval("controllerInstance." + __ACTION__ + "Action()");
          if(typeof assignVars == "undefined"){
            assignVars = {};
          }
        }catch(e){
           console.dir(e);
           Response.output(404, "html", "404 Not Found");
           return;
        }

        //グローバルに利用する変数をtemplateに渡す
        assignVars.contents_url = share.contents_url;
        assignVars.base_url     = "http://" + request.headers.host + "/";

        var view = require("./system/server/view");
        view.render(controllerInstance.layoutPath, controllerInstance.renderPath, assignVars, response);
    //}catch(e){
      //console.dir(e);
      //httpHeaders.status500(response);
      //return;
    //}
  }
  http.createServer(onRequest).listen(3001);
  console.log("Server has started.");
})();