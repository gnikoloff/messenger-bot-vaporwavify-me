'use strict';

const THREE = require('three');

let geometry;
let material;
let mesh;
let texture;

let offsets = {
    dist: 0.05 + Math.random() * 0.15,
    zOffset: 3
};

const displaceVert = (v, i) => {
    let dx = -v.x * offsets.dist;
    let dy = -v.y * offsets.dist;
    let dist = Math.sqrt(dx * dx + dy * dy);
    v.z = Math.sin(dist) * 3;    
}

const init = (scene) => {
    geometry = new THREE.PlaneGeometry(200, 200, 30, 30);
    material = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: true
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -40, 0);
    mesh.geometry.vertices.forEach(displaceVert);

    scene.add(mesh);
    return mesh;
}

module.exports = {
    init
}