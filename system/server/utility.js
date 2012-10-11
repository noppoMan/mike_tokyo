exports.extend = function(child, superClass){
	child.prototype = new superClass();
	return child;
}