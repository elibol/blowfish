define(
    "graph/GraphScene",
    [
	"THREE"
	,"graph/GSNode"
	,"graph/GSEdge"
    ],
    function (THREE, GSNode, GSEdge) {
	
function GraphScene(){
    this.rootNode = null;
    this.nodes = [];
    this.edges = [];
    this.scene = new THREE.Scene();
}

GraphScene.prototype.compute = function(){
    for(var i=-1;++i<this.nodes.length;){
	this.nodes[i].compute();
    }
};

GraphScene.prototype.fromJson = function(data){
    this.reset();
    // need to parse data first...
    // make vectors, distance 100px per depth out
    
    //var root = data[0];
    // console.log(data);
};

GraphScene.prototype.addNode = function(v, color){
    var node = new GSNode(v, color);
    this.nodes.push(node);
    this.scene.add(node.particle);
    return node;
};

//assumes removed node is poped.
GraphScene.prototype.removeNode = function(node){
    var index = _.indexOf(this.nodes, node);
    if(index != -1){
	this.nodes.splice(index, 1);
    }
    this.scene.remove(node.particle);
};

GraphScene.prototype.addEdge = function(nodeA, nodeB){
    var edge = new GSEdge(nodeA, nodeB);
    this.edges.push(edge);
    this.scene.add(edge.line);
    return edge;
};

GraphScene.prototype.reset = function(){
    while(this.nodes.length != 0){
	var node = this.nodes.pop();
	this.scene.remove(node.particle);
    }
    while(this.edges.length != 0){
	var edge = this.edges.pop();
	this.scene.remove(edge.line);
    }
};

return GraphScene;

});