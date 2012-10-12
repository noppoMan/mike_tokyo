//ライブラリインポート
var share = require("../../system/server/share");

function appController(){}
var appController = require("../../system/server/utility").extend(appController, require("../../system/server/controller"));

appController.prototype.init = function(){
	this.layout("base");
}

appController.prototype.indexAction = function(){
	return {applicationName:"MikeTokyo" };
}

appController.prototype.testAction = function(){
	
}

module.exports = appController;

