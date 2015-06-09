define(
    "graph/GSNode",
    [
	"THREE"
    ],
    function (THREE) {
	
var PI = Math.PI;
var PI2 = Math.PI * 2;

function GSNode(v, color){
    this.particle = null;
    this.init(v, color);
}

GSNode.prototype.compute = function(){
    /*
    //console.log("posPrime", this.posPrime.length());
    //console.log("position", this.particle.position.length());
    this.velocity.x = this.velPrime.x;
    this.velocity.y = this.velPrime.y;
    this.velocity.z = this.velPrime.z;
    //this.velocity.multiplyScalar(.9);
    
    var len = this.posPrime.length();
    this.posPrime.add(this.velocity);
    this.posPrime.normalize();
    this.posPrime.multiplyScalar(len);
    
    this.particle.position.x = this.posPrime.x;
    this.particle.position.y = this.posPrime.y;
    this.particle.position.z = this.posPrime.z;
    */
    
    this.particle.position.x = this.posPrime.x;
    this.particle.position.y = this.posPrime.y;
    this.particle.position.z = this.posPrime.z;
}

GSNode.prototype.init = function(v, color){
    if(color == null) color = 0xffffff;
    
    var pMaterial = new THREE.ParticleCanvasMaterial({ color: color, program: this.programStroke });
    this.particle = new THREE.Particle(pMaterial);
    
    this.particle.scale.x = this.particle.scale.y = 10;
    if(!v){
	var p = this.particle.position;
	p.x = Math.random()-.5;
	p.y = Math.random()-.5;
	p.z = Math.random()-.5;
	p.normalize();
	p.multiplyScalar(400);
    } else {
	this.particle.position.add(v);
    }
    
    this.velocity = new THREE.Vector3(0,0,0);
    this.velPrime = new THREE.Vector3(0,0,0);
    this.posPrime = this.particle.position.clone();
    
    this.compute();
};

GSNode.prototype.programStroke = function(context) {
    //context.lineWidth = 0.05;
    context.beginPath();
    context.arc( 0, 0, 1, 0, PI2, true );
    context.closePath();
    context.fill();
    //context.stroke();
}

return GSNode;

});