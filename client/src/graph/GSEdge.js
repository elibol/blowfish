define(
    "graph/GSEdge",
    [
	"THREE"
    ],
    function (THREE) {
	
function GSEdge(nodeA, nodeB){
    this.geometry = new THREE.Geometry();
    this.a = nodeA.particle.position;
    //this.a = new THREE.Vector3( nodeA.particle.position.x, nodeA.particle.position.y, nodeA.particle.position.z );
    this.geometry.vertices.push(this.a);
    this.b = nodeB.particle.position;
    //this.b = new THREE.Vector3( nodeB.particle.position.x, nodeB.particle.position.y, nodeB.particle.position.z );
    this.geometry.vertices.push(this.b);
    this.line = new THREE.Line(this.geometry, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: .3 }));
}

return GSEdge;

});