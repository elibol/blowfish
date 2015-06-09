var floor = Math.floor, ceil = Math.ceil, abs = Math.abs;
var sqrt = Math.sqrt, pow = Math.pow;
var sin = Math.sin, cos = Math.cos;
var asin = Math.asin, acos = Math.acos, atan = Math.atan, atan2 = Math.atan2;

var PI = Math.PI;
var PI2 = Math.PI * 2;

function Spherical(r, theta, phi){
    this.r = r || 0;
    this.theta = theta || 0;
    this.phi = phi || 0;
}

///*
// 0 <= r < infinity
// 0 <= theta <= 2PI
// 0 <= phi <= PI

//from north-pole view, theta runs counter-clockwise
//from "side" view, phi runs from north-pole to south-pole.

Spherical.prototype.toVector = function(v){
    if(!v) v = new THREE.Vector3(0,0,0);
    v.x = sin(this.phi)*cos(this.theta)*this.r;
    v.y = sin(this.phi)*sin(this.theta)*this.r;
    v.z = cos(this.phi)*this.r;
    return v;
}

Spherical.prototype.fromVector = function(v){
    this.r = v.length();
    this.phi = acos(v.z/this.r);
    this.theta = atan2(v.y, v.x);
}

Spherical.fromVector = function(v){
    var s = new Spherical(0,0,0);
    s.r = v.length();
    s.phi = acos(v.z/s.r);
    s.theta = atan2(v.y, v.x);
    return s;
}

Spherical.prototype.vectorForce = function(v){
    //this.r = v.length();
    //this.theta += acos(v.z/this.r);
    this.phi += atan2(v.y, v.x);
}

Spherical.prototype.toString = function(){
    return [this.r, this.theta, this.phi].join(",");
}
//*/

/*
// 0 <= r < infinity
// 0 <= theta <= 2PI
// -PI/2 <= phi <= PI/2

//from north-pole view, theta runs counter-clockwise
//from "side" view, phi runs from north-pole (PI/2) to equator (0) to south-pole (-PI/2).

Spherical.prototype.toVector = function(v){
    if(!v) v = new THREE.Vector3(0,0,0);
    v.x = cos(this.phi)*cos(this.theta)*this.r;
    v.y = cos(this.phi)*sin(this.theta)*this.r;
    v.z = sin(this.phi)*this.r;
    return v;
}

Spherical.prototype.fromVector = function(v){
    this.r = v.length();
    this.theta = asin(v.z/this.r);
    this.phi = atan2(v.y, v.x);
}

Spherical.prototype.vectorForce = function(v){
    //this.r = v.length();
    this.phi += asin(v.z/this.r);
    this.theta += atan2(v.y, v.x);
}
//*/

Spherical.prototype.gcDist = function(b){
    var sTheta = this.theta, sPhi = this.phi;
    var fTheta = b.theta, fPhi = b.phi;
    console.log(sTheta, sPhi);
    console.log(fTheta, fPhi);
    var dPhi = abs(sPhi-fPhi);
    console.log(dPhi);
    var angle = Math.acos( sin(sTheta)*sin(fTheta) + cos(sTheta)*cos(fTheta)*dPhi );
    return angle;
}

Spherical.prototype.vincDist = function(b){
    return Spherical.vincDist(this, b);
}

Spherical.vincDist = function(a, b){
    var sTheta = a.theta, sPhi = a.phi;
    var fTheta = b.theta, fPhi = b.phi;
    var dPhi = abs(sPhi-fPhi);
    var i = pow(cos(fTheta)*sin(dPhi), 2);
    var j = pow(cos(sTheta)*sin(fTheta)-sin(sTheta)*cos(fTheta)*cos(dPhi), 2);
    var k = sin(sTheta)*sin(fTheta)+cos(sTheta)*cos(fTheta)*cos(dPhi);
    return atan(sqrt(i+j)/k);
}