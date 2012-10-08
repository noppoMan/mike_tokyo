var httpHeaders = {
	/*status200 : function(response, fun){
		response.writeHead(200, {"Content-Type": "text/plain"});
		console.log("200 OK");
		response.end(content);
	},*/
	status404 : function(controller){
		controller.prototype.response.writeHead(404, {"Content-Type": "text/plain"});
		controller.prototype.response.write("404 Not Found");
		console.log("404 Not Found / User-Agent : " + controller.prototype.headers.userAgent);
		controller.prototype.response.end();
	},
	status500 : function(controller){
		controller.prototype.response.writeHead(500, {"Content-Type": "text/plain"});
		controller.prototype.response.write("500 Internal Server Error");
		console.log("500 Internal Server Error / User-Agent : " + controller.prototype.headers.userAgent);
		controller.prototype.response.end();
	}
}

module.exports = httpHeaders;