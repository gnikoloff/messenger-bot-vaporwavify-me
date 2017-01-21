'use strict';
const fs = require('fs');
const THREE = require('three');

let loader;
let material;
let mesh;

const init = (scene) => {
    let loader = new THREE.JSONLoader();
    fs.readFile(`${__dirname}/../models/GAMEBOY.json`, `utf8`, (err, data) => {
        if (err) {
            console.log(`Error: ${err}`);
            return;
        }
        data = JSON.parse(data);
        let model = loader.parse(data);
        mesh = new THREE.Mesh(model.geometry, new THREE.MeshNormalMaterial());
        mesh.scale.set(9, 9, 9);
        mesh.position.set(30, -40, 0);
        mesh.rotation.x += Math.PI / 2;
        mesh.rotation.y += Math.PI / 6;
        scene.add(mesh);
    });
}

const rotateY = (angle) => {
    mesh.rotation.y = angle;
}

module.exports = {
    init,
    rotateY
}