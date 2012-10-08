var controller = function(){
	this.request;
	this.response;
	this.renderPath;
	this.layoutPath;
	this.headers;
};

controller.setRequestAndResponse = function(request, response){

	var ua = require('user-agent');

	this.request = request;
	this.response = response;
	this.headers = request.headers;
	this.headers.userAgent = ua.parse(request.headers['user-agent']).full;
}

controller.redirect = function(url){
	this.response.writeHead(302, {
  		'Location': url
  		//add other headers here...
	});
	this.response.end();
}

controller.render = function(path){
	this.renderPath = path + ".ejs";
}

controller.layout = function(path){
	this.layoutPath = path + ".ejs";
}

module.exports = controller;