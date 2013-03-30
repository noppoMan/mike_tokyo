	
/*var dispatch = function(){
	if(pathname != ""){
		var requestUri = pathname.split("/");
		__CONTROLLER__ = requestUri[1];
		__ACTION__ = (typeof requestUri[2] == "string") ? requestUri[2] : "index";
	}
}*/

var url = require("url");


var dispatcher = function(){}

dispatcher.prototype = {

	run : function(req, res){
		var pathname = url.parse(req.url).pathname;

		console.log(pathname);
		
	}

}


module.exports = dispatcher;


