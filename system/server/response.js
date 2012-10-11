var response = {

	res : null,

	_httpStatus : {

	},

	_contentType : {
		html : "text/html; charset=utf-8"
	},

	setResponseObject : function(response){
		this.res = response;
	},
	output : function(httpStatusCode, ContentType, Content, func){
		//var status = //_httpStatus[httpStatusCode];
		this.res.writeHead(httpStatusCode, { 'Content-Type': this._contentType[ContentType] });
        this.res.end(Content);
        return;
	}
}
module.exports = response;