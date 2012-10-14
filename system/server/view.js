var fs = require("fs");
var ejs = require("ejs");
var share = require("./share");
var Response = require("./response");

var view = {

	templateVars : {}
	,
	viewExt : ".ejs"
	,
	layoutPath : null
	,
	templatePath : null
	,
	set : function(obj){
		this.templateVars = obj;
	},
	render : function(layoutPath, templatePath, vars, response){

		var templatePath = this.createRenderPath(templatePath);
		var layoutPath = share.APP_PATH + "views/layout/" + layoutPath + this.viewExt;
		fs.readFile(templatePath,"utf8", function(err,data){
        	var actionHtml = ejs.render(data,vars);
	   		fs.readFile(layoutPath,"utf8", function(err,data2){
	          var finalOutput = ejs.render(data2,{content : actionHtml, applicationName : share.config.applicationName});
        	  Response.output(200, "html", finalOutput);
	        });	

	    });
	},
	createRenderPath : function(path){
	  var templatePath = share.APP_PATH + "views/pc/";
	  if(path !== undefined && path !== null){
	    return templatePath += path;
	  }else{
	    return templatePath += share.__CONTROLLER__ + "/" +  share.__ACTION__ + this.viewExt;
	  }
	}
}

module.exports = view;