define(
    [
	"THREE"
	,"THREE.TrackballControls"
	,"Stats"
	
	,"core/Locator"
    ],
    
    function (THREE, TrackballControls, Stats, Locator) {
	
	function TestTemplate(){
	    console.log(Locator.globalVar);
	}
	
	return TestTemplate;
    }
);