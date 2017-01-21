'use strict';

const THREE = require('three');

let wireMaterial;
let wireMesh;
let material;
let mesh;

let offsets = {
    dist: 0.15 + Math.random() * 0.4,
    zOffset: 8
};

const displaceVert = (v, i) => {
    let dx = -v.x * offsets.dist;
    let dy = -v.y * offsets.dist * 0.5;
    let dist = Math.sqrt(dx * dx + dy * dy);
    v.z = Math.sin(dist) * 3;    
}

const addSphere = (material) => {
    let mesh;
    let geometry = new THREE.PlaneGeometry(200, 200, 30, 30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -10);
    mesh.geometry.vertices.forEach(displaceVert);
    return mesh;
}

const init = (scene) => {
    wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xf005ac,
        wireframe: true
    });
    material = new THREE.MeshBasicMaterial({
        color: 0x270e57
    })
    wireMesh = addSphere(wireMaterial)
    mesh = addSphere(material)
    scene.add(wireMesh);
    scene.add(mesh);
}

const reshuffle = () => {
    offsets.dist = 0.15 + Math.random() * 0.4,
    mesh.geometry.vertices.forEach(displaceVert);
}

module.exports = {
    init,
    reshuffle
}