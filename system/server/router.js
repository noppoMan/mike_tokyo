var url = require("url");

var router = {
  req:null
 ,controller: "app"
 ,action : "index"
 ,connect : function(pattern, routeUrl){
    var patt = pattern.replace('/', "\/");
    var pathname = url.parse(this.req.url).pathname;
    if(pathname.match(patt)){
      this.controller = routeUrl.split("/")[0];
      this.action = routeUrl.split("/")[1];
    }
  }
}

module.exports = router;