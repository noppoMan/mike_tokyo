//ライブラリインポート
var share = require("../../system/server/share");

appController = {

	//extends
	prototype : require("../../system/server/controller"),

	init : function(){
		this.prototype.layout("base");
	},

	indexAction : function(){
		return {applicationName:"MikeTokyo" };
	},

	archiveAction : function(){

	}
};

module.exports = appController;

