'use strict';

const THREE = require('three');

let geometry;
let material;
let mesh;

const init = (scene) => {
    geometry = new THREE.PlaneGeometry(25, 30, 2, 2);
    material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -100, 20);
    mesh.rotation.x += Math.PI / 2.5;
    scene.add(mesh);
}

module.exports = {
    init
}