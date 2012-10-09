//ライブラリインポート
var share = require("../../system/server/share");

appController = {

	//extends
	prototype : require("../../system/server/controller"),

	init : function(){

	},

	indexAction : function(){
		this.prototype.layout("base");
		return {applicationName:"MikeTokyo" };
	},

	archiveAction : function(){

	}
};

module.exports = appController;

