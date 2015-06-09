define(
    "model/Model",
    [
	"core/Locator"
    ],
    
    function (Locator) {
	
	function Model(){
	    
	}
	
	Model.prototype.wid = "BOSSST";
	Model.prototype.data = null;
	Model.prototype.numNodes = 2;
	
	Model.prototype.init = function(){
	    
	};
	
	return Model;
	
    });
