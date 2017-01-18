'use strict';

const THREE = require('three');

const spheresCount = 16;

let group;
let geometry;
let material;

const init = (scene) => {
    group = new THREE.Group();
    geometry = new THREE.SphereGeometry(0.5, 18);
    material = new THREE.MeshBasicMaterial({ color: 0x5c45a0 });
    let offset = 150;
    for (let i = -offset / 2; i < offset / 2; i += offset / spheresCount) {
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            Math.sin(i * 0.05) * 50,
            Math.cos(i * 0.05) * 50 + (i * 0.8),
            offset / 5 + i * 0.2
        );
        group.add(mesh);
    }
    scene.add(group);
}

module.exports = {
    init
}