var reqConfig = {
    baseUrl: "src",
    paths: {
        "lib": "../lib"
    },

    shim: {
	//
        "lib/three/three.min": { exports: 'THREE' }
	//, "lib/three/three.min": {exports: "requestAnimationFrame" }
        , "lib/three/controls/TrackballControls": { exports: 'THREE.TrackballControls' , deps: ['lib/three/three.min'] }
	
	//
        , "lib/stats.min": { exports: 'Stats' }
	
	//
	, "lib/dat.gui.min.js": { exports: 'dat' }
	
    }
    , map: {"*": {}}
    
    /*
    , map: {
        '*': {
	    //
            'THREE': 'lib/three/three.min'
            , 'THREE.TrackballControls': 'lib/three/controls/TrackballControls'
	    //
            , 'Stats': 'lib/stats.min'
	}
    }
     */
};

for(var module in reqConfig.shim){
    var cls = reqConfig.shim[module].exports;
    reqConfig["map"]["*"][cls] = module;
}

require.config(reqConfig);

/*
require(["Main"],
    function(Main) {
	new Main();
    });
//*/

///*
require(["core/Locator"],
    function(Locator) {
	//console.log("config", Locator);
	Locator.init();
    });

/*
require(["Test"],
    function(Test) {
	var test = new Test();
    });
*/

//test
/*
require(
    [
	"THREE"
	,"THREE.TrackballControls"
	,"Stats"
    ],
    
    function (THREE, TrackballControls, Stats) {
	console.log(THREE.TrackballControls === TrackballControls, Stats != undefined);
    }
);
//*/