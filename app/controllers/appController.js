//ライブラリインポート
var share = require("../../system/server/share");


function extend(child, superClass){
	child.prototype = new superClass();
	return child;
}

function appController(){}
appController = extend(appController, require("../../system/server/controller"));

appController.prototype.init = function(){
	this.layout("base");
}

appController.prototype.indexAction = function(){
	return {applicationName:"MikeTokyo" };
}

module.exports = appController;

