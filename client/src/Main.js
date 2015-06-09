define(
    "Main",
    [
	"core/Locator"
	,"view/GraphView"
	
	,"dat"
	
    ],
    
    function (Locator, GraphView, dat) {
	
	function Main(){
	    //console.log(Locator);
	}
	
	Main.prototype.init = function(){
	    this.graphView = new GraphView();
	    this.graphView.init();
	    
	    //
	    var gui = new dat.GUI();
	    var params = this.graphView.params;
	    gui.add(Locator.model, "numNodes", 2, 300);
	    gui.add(Locator.model, "wid");
	    gui.add(this, 'update');
	    
	    //this.update();
	};
	
	Main.prototype.update = function(){
	    Locator.service.getWidRoute(Locator.model.wid, _.bind(getWidRouteComplete, this));
	    function getWidRouteComplete(result){
		Locator.model.data = result;
		this.graphView.reset(result);
	    };
	};
	
	return Main;
	
    });
