'use strict';

const fs = require('fs');
const THREE = require('three');

let geometry;
let material;
let mesh;

const init = (scene) => {
    geometry = new THREE.SphereGeometry(390, 20);
    material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x65287e, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

const rotateX = (angle) => {
    mesh.rotation.x = angle;
}

module.exports = {
    init,
    rotateX
}