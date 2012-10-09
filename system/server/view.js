var fs = require("fs");
var ejs = require("ejs");
var share = require("./share");

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
	setLayoutPath : function(path){
		this.layoutPath = share.APP_PATH + "views/layout/" + path + this.viewExt
	},
	setTemplatePath : function(path){
		this.templatePath = this.createRenderPath(path);
	},
	render : function(response, vars){

		var templatePath = this.templatePath;
		var layoutPath = this.layoutPath;

		fs.readFile(templatePath,"utf8", function(err,data){
        	var html = ejs.render(data,vars);
	   		fs.readFile(layoutPath,"utf8", function(err,data2){
	          var _html = ejs.render(data2,{content : html, applicationName : share.config.applicationName});
	          response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	          response.end(_html);
	        });	

	    });
	},
	createRenderPath : function(path){
	  var templatePath = share.APP_PATH + "views/pc/";
	  if(path !== undefined){
	    return templatePath += path;
	  }else{
	    return templatePath += share.__ACTION__ + this.viewExt;
	  }
	}
}

module.exports = view;