'use strict';
const path = require('path');

global.THREE = require('three');
require(path.join(`${require.resolve('three')}/../../examples/js/renderers/Projector`));
require(path.join(`${require.resolve('three')}/../../examples/js/renderers/CanvasRenderer`));
const Canvas = require('canvas-prebuilt');
const fs = require("fs");

const terrain = require('./plane-terrain');
const particles = require('./particles');
const photo = require('./photo');
const dolphin = require('./dolphin');
const background = require('./background');

let width  = 780;
let height = 410;

const canvas = new Canvas(width, height);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);

canvas.style = {};
const renderer = new THREE.CanvasRenderer({
    canvas: canvas
});

renderer.setSize(width, height);
renderer.setClearColor(0x3a104b)
camera.lookAt(scene.position);

terrain.init(scene);
particles.init(scene);
photo.init(scene);
dolphin.init(scene);
background.init(scene);

const renderFrame = (props) => {
    let { 
        posZ: cameraZ
        imageUrl,
        angle 
    } = props;
    cameraX = 50 * Math.cos(angle) * Math.cos(angle); 
    cameraY = 50 * Math.cos(angle) * Math.sin(angle);

    camera.position.set(cameraX, cameraY, cameraZ);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    return canvas;
}

const changeTexture = (imageUrl) => {
    photo.addTexture(imageUrl);
}

module.exports = {
    renderFrame,
    changeTexture
}