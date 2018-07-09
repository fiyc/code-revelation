let tf = require('./common.js');

let getCube = function(){

	let result = [];
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { vertexColors: true } );
    var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3( -100, 0, 100 );
    var p2 = new THREE.Vector3(  100, 0, -100 );
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push( color1, color2 );

    var line = new THREE.Line( geometry, material, THREE.LinePieces );
	result.push(line);
	return result;
}

let setOptions = function(r, c){
	c.position.y = 1000;
}

module.exports = function(){
	tf({getCube, setOptions});
}
