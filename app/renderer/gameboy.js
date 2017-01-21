'use strict';
const fs = require('fs');
const THREE = require('three');

let loader;
let material;

const init = (scene) => {
    let loader = new THREE.JSONLoader();
    fs.readFile(`${__dirname}/../models/GAMEBOY.json`, `utf8`, (err, data) => {
        if (err) {
            console.log(`Error: ${err}`);
            return;
        }
        data = JSON.parse(data);
        let model = loader.parse(data);
        let mesh = new THREE.Mesh(model.geometry, new THREE.MeshNormalMaterial());
        mesh.scale.set(20, 20, 20);
        scene.add(mesh);
    });
}

module.exports = {
    init
}