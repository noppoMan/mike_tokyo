var httpHeaders = {
	/*status200 : function(response, fun){
		response.writeHead(200, {"Content-Type": "text/plain"});
		console.log("200 OK");
		response.end(content);
	},*/
	status404 : function(response){
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not Found");
		//console.log("404 Not Found / User-Agent : " + controller.prototype.headers.userAgent);
		response.end();
	},
	status500 : function(controller){
		response.writeHead(500, {"Content-Type": "text/plain"});
		response.write("500 Internal Server Error");
		//console.log("500 Internal Server Error / User-Agent : " + controller.prototype.headers.userAgent);
		response.end();
	}
}

module.exports = httpHeaders;