var http = require("http");
var url = require("url");

(function start() {
  function onRequest(request, response) {
    //try{

        //アプリケーション初期化
        var router = require("./app/config/router.js");
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
        require("./system/server/response").setResponseObject(response);

        var __CONTROLLER__ = router.default.controller;
        var __ACTION__ = router.default.action;

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

        try{
          var _controller = require("./app/controllers/" + className);
          controllerInstance = new _controller();
        }catch(e){
            console.dir(e);
            //httpHeaders.status404(controllerInstance);
            return;
        }


        var ua = require('user-agent');

        controllerInstance.request = request;
        controllerInstance.response = response;
        controllerInstance.headers = request.headers;
        controllerInstance.headers.userAgent = ua.parse(request.headers['user-agent']).full;

        controllerInstance.init();

        try{
          var assignVars = eval("controllerInstance." + __ACTION__ + "Action()");
        }catch(e){
           console.dir(e);
           httpHeaders.status404(response);
           return;
        }

        var view = require("./system/server/view");
        console.log("200 OK " + controllerInstance.headers.userAgent);
        view.render(controllerInstance.layoutPath, controllerInstance.renderPath, assignVars, response);
    //}catch(e){
      //console.dir(e);
      //httpHeaders.status500(response);
      //return;
    //}
  }
  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
})();