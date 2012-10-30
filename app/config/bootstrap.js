var bootstrap = {
	env : "localhost"
	,init : function(req, res){
		//console.log(req.headers.host);
		switch(req.headers.host){
			case "localhost:3000":
			case "localhost":
			case "localhost:8888":
				this.env = "localhost"
				break;
			default:
				this.env = "development";
				break;
		}

	}
}

module.exports = bootstrap;