define(
    "core/Locator",
    [
    ],
    
    function () {
	
	function Locator(){};
	
	Locator.init = function(){
	    if(Locator.inited) return;
	    Locator.inited = true;
	    
	    require( [ "Main", "model/Model", "core/Service" ]
		    , Locator.doInit );
	};
	
	Locator.doInit = function(Main, Model, Service){
	    
	    Locator.main = new Main();
	    Locator.model = new Model();
	    Locator.service = new Service();
	    
	    Locator.main.init();
	    
	};
	
	return Locator;
    }
);