//ライブラリインポート
var share = require("../../system/server/share");

function officialController(){}
var appController = require("../../system/server/utility").extend(officialController, require("../../system/server/controller"));

officialController.prototype.init = function(){
	this.layout("base");
}

/**
* void news
*/
officialController.prototype.newsAction = function(){
	
}

/**
* void cast
*/
officialController.prototype.castAction = function(){
	
}

/**
* void podcast
*/
officialController.prototype.podcastAction = function(){
	
}

module.exports = officialController;