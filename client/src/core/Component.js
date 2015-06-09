define([
	"Component"
    ],
    
    function (Component) {
	function Component(){};
	
	Component.init = function(){
	    if(Locator.inited) return;
	    Locator.inited = true;
	    //Locator.model = new Model();
	    Locator.main = new Main();
	};
	
	return Locator;
    }
);