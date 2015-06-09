define(
    "core/NodeForce",
    [
	"core/Locator"
    ],
    function (Locator) {
	
var floor = Math.floor, ceil = Math.ceil, abs = Math.abs;
var sqrt = Math.sqrt, pow = Math.pow;
var sin = Math.sin, cos = Math.cos;
var asin = Math.asin, acos = Math.acos, atan = Math.atan, atan2 = Math.atan2;

var PI = Math.PI;
var PI2 = Math.PI * 2;

function NodeForce(nodes){
    this.nodes = nodes;
    //console.log(Locator);
    //this.graphScene = Locator.main.graphScene;
}

NodeForce.prototype.compute = function(){
    for(var i=-1;++i<this.nodes.length;){
	for(var j=i;++j<this.nodes.length;){
	    var a = this.nodes[i];
	    var b = this.nodes[j];
	    this.repel(a, b);
	    //console.log(i,j);
	}
    }
};

NodeForce.prototype.repel = function(nodeA, nodeB){
    var a = nodeA.posPrime;
    var b = nodeB.posPrime;
    
    var angle = this.vectorAngle(a, b);
    if(nodeA == this.nodes[0]){
	//console.log(angle/PI*180);
    }
    
    var force = 1/pow(1+angle, 3)/this.nodes.length;//1/pow(angle, 2)/graphScene.nodes.length*.5;
    
    var axis = a.clone().cross(b.clone());
    axis.normalize();
    
    var q = new THREE.Quaternion();
    q.setFromAxisAngle(axis, -force);
    a.applyQuaternion(q);
    q.setFromAxisAngle(axis, force);
    b.applyQuaternion(q);
};

//get the angle between two vectors
NodeForce.prototype.vectorAngle = function(a, b){
    var dp = a.clone().normalize().dot(b.clone().normalize());
    return acos(dp);
}

//rotate a vector by rotating space through a rotation in the plane of a,b
NodeForce.prototype.rotateVectorPlane = function(a, b, vectors){
    var angle = this.vectorAngle(a,b);
    var axis = a.clone().cross(b.clone());
    axis.normalize();
    this.rotateVectorAxis(axis, angle, vectors);
}

// rotate a vector about the given axis by the provided angle
// q = cos(.5*theta) + (v.x*i + v.y*j + v.z*k)*sin(.5*theta)
// for normalized v, where i,j,k, and 1 (identity) are matrices
NodeForce.prototype.rotateVectorAxis = function(axis, angle, vectors){
    var q = new THREE.Quaternion();
    q.setFromAxisAngle(axis, angle);
    for(var i=-1;++i<vectors.length;){
        vectors[i].applyQuaternion(q);
    }
}

/*
function repel(a, b){
    var ap = a.particle.position;
    var bp = b.particle.position;
    var a2bdiff = bp.clone().sub(ap);
    var r = a2bdiff.length();
    var force = 10000/pow(r, 2);
    var a2b = a2bdiff.normalize();
    var b2a = a2b.clone().negate();
    var a2bForce = a2b.multiplyScalar(force);
    var b2aForce = b2a.multiplyScalar(force);
    var aMag = ap.length();
    var bMag = bp.length();
    
    a.velPrime.add(a2bForce);
    a.velPrime.normalize();
    a.velPrime.multiplyScalar(aMag);
    //console.log(a.posPrime.length());
    
    b.velPrime.add(b2aForce);
    b.velPrime.normalize();
    b.velPrime.multiplyScalar(bMag);
}
*/

return NodeForce;

});