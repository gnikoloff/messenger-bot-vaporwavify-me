'use strict';

const THREE = require('three');
const SoftwareRenderer = require('three-software-renderer');
const PNG = require('pngjs').PNG;
const fs = require("fs");

let width  = 1024;
let height = 768;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
const renderer = new SoftwareRenderer({
    alpha: false
});
renderer.setSize(width, height);
renderer.setClearColor(0xFF0000)

camera.position.z = 80;
camera.lookAt(scene.position);

const box = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xFFFF00, wireframe: true })
);
box.position.set(0,0,0);
scene.add(box);

const renderFrame = (pos) => {
    console.log(scene.children[0])
    camera.position.set(pos.x, pos.y, pos.z);
    camera.lookAt(scene.position);

    let imageData = renderer.render(scene, camera);
    
    let png = new PNG({
        width: width,
        height: height,
        filterType: -1
    });

    for (let i = 0; i < imageData.data.length; i += 1) {
        png.data[i] = imageData.data[i];
    }

    return png;

}


module.exports = {
    renderFrame
}