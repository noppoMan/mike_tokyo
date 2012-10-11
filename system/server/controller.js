function controller(){}
controller.prototype = {
	request : null,
	response : null,
	headers : null,
	renderPath : null,
	layoutPath : "base",

	redirect : function(){
		this.response.writeHead(302, {
	  		'Location': url
	  		//add other headers here...
		});
		this.response.end();	
	},
	render : function(path){
		this.renderPath = path + ".ejs";
	},
	layout : function(path){
		this.layoutPath = path;
	}
}

module.exports = controller;