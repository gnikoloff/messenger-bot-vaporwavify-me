'use strict';
const fs = require('fs');
const THREE = require('three');

let loader;
let material;

const init = (scene) => {
    loader = new THREE.JSONLoader();
    fs.readFile(`${__dirname}/../models/DOLPHIN.json`, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error: ${err}`);
            return;
        }
        data = JSON.parse(data);
        let model = loader.parse(data);
        let mesh1 = new THREE.Mesh(model.geometry, new THREE.MeshNormalMaterial());
        mesh1.position.set(80, 0, 50);
        mesh1.scale.set(10, 10, 10);
        mesh1.rotation.x += Math.PI / 1.8;
        mesh1.rotation.y += Math.PI * -0.32;
        mesh1.rotation.z += Math.PI / 4;
        scene.add(mesh1);

        let mesh2 = new THREE.Mesh(model.geometry, new THREE.MeshNormalMaterial());
        mesh2.position.set(-53, -8, 60);
        mesh2.scale.set(12, 12, 12);
        mesh2.rotation.x += Math.PI / 1.3;
        mesh2.rotation.y += Math.PI * 0.25;
        mesh2.rotation.z += Math.PI / -3.1;
        scene.add(mesh2);
    })
}

module.exports = {
    init
}