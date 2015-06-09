define(
    "view/GraphView",
    [
	"THREE"
	,"THREE.TrackballControls"
	,"Stats"
	
	,"core/Locator"
	,"graph/GraphScene"
	,"core/NodeForce"
	
    ],
    
    function (THREE, TrackballControls, Stats, Locator, GraphScene, NodeForce) {
	
function GraphView(){
    //console.log(Locator);
}

GraphView.prototype.init = function(){
    
    this.container, this.stats;
    this.graphScene, this.nodeForce;
    this.camera, this.controls, this.renderer;
    this.start = Date.now();
    this.initView();
    this.animate();
    
};

GraphView.prototype.initView = function() {
    
    var width = (window.innerWidth || 2)*1;
    var height = window.innerHeight || 2;
    
    this.container = document.createElement( 'div' );
    //this.container.style["background-color"] = "#000000";
    //this.container.style.width = '75%';
    document.body.appendChild( this.container );
    
    /*
    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.style.color = "#ffffff";
    info.innerHTML = 'Node Force';
    this.container.appendChild( info );
    */
    
    this.camera = new THREE.PerspectiveCamera( 70, width / height, 1, 2000 );
    this.camera.position.y = 0;
    this.camera.position.z = 1000;
    
    //this.controls = new THREE.TrackballControls( this.camera );
    
    this.renderer = new THREE.CanvasRenderer();
    this.renderer.setSize( width, height );
    this.container.appendChild( this.renderer.domElement );
    
    this.initGraph();
    
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.container.appendChild( this.stats.domElement );
    
    //
    
    window.addEventListener( 'resize', this.onWindowResize, false );
    
};

GraphView.prototype.initGraph = function(){
    this.graphScene = new GraphScene();
    this.graphScene.addNode(new THREE.Vector3(0,0,0), 0xff0000);
    this.graphScene.rootNode = this.graphScene.nodes.pop();
    this.nodeForce = new NodeForce(this.graphScene.nodes);
}

GraphView.prototype.initVoronoiCells = function(){
    var timer = Date.now() - this.start;
    for(var i=-1;++i<lim;){
	
    }
}

GraphView.prototype.onWindowResize = function() {
    var self = Locator.main.graphView;
    var w = window.innerWidth*1, h = window.innerHeight;
    //console.log(self.container.width, self.container.height);
    //console.log(window.innerWidth, window.innerHeight);
    self.camera.aspect = w / h;
    self.camera.updateProjectionMatrix();
    self.renderer.setSize( w, h );
};

//

GraphView.prototype.animate = function() {
    var self = Locator.main.graphView;
    requestAnimationFrame(self.animate);
    self.doAnimate();
};

GraphView.prototype.doAnimate = function(){
    this.nodeForce.compute();
    
    /*
    for(var i=-1;++i<this.graphScene.nodes.length;){
	var node = this.graphScene.nodes[i];
	node.spherical[i%2?"theta":"phi"] += .05*(i/this.graphScene.nodes.length);
    }
    //*/
    
    this.graphScene.compute();
    this.render();
    this.stats.update();
    
};

GraphView.prototype.render = function() {
    
    var timer = Date.now() - this.start;
    
    //sphere.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 150;
    //sphere.rotation.x = timer * 0.0003;
    //sphere.rotation.z = timer * 0.0002;
    
    //this.controls.update();
    this.renderer.render(this.graphScene.scene, this.camera);
    
};

GraphView.prototype.reset = function(data){
    this.graphScene.reset();
    if(data){
    //if(false){
	this.graphScene.fromJson(data);
    } else {
	var lim = Locator.model.numNodes;
	for(var i=-1;++i<lim;){
	    this.graphScene.addNode();
	}
	//for(var i=0;++i<lim;) this.graphScene.addEdge(this.graphScene.nodes[i-1], this.graphScene.nodes[i]);
    }
};

return GraphView;

});