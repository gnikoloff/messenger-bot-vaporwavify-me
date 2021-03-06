'use strict';
const request = require('request').defaults({ encoding: null });
const jsdom = require("jsdom").jsdom;
const Canvas = require('canvas-prebuilt');

global.document = jsdom("<!doctype html><html><head></head><body></body></html>");
global.window = document.defaultView;
global.XMLHttpRequest = require('xhr2');

document.createElement = (el) => {
    if (el === 'canvas') {
        return new Canvas()
    }
}

const eventEmitter = require('../utils/customEmitter');
const THREE = require('three');

let group;

let geometry;
let material;
let mesh;

let triangleGeometry;
let triangleMaterial;
let triangleMesh;

const init = (scene) => {
    geometry = new THREE.PlaneGeometry(25, 30, 2, 2);
    material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.rotation.x = Math.PI / 2;
    
    group = new THREE.Group();
    group.add(mesh);

    triangleGeometry = new THREE.Geometry();

    let triangleOffset = 15;
    let v1 = new THREE.Vector3(-triangleOffset * 2, 0, -triangleOffset / 0.2);
    let v2 = new THREE.Vector3( triangleOffset * 2, 0, -triangleOffset);
    let v3 = new THREE.Vector3( triangleOffset, 0,  triangleOffset * 2);
    let triangle = new THREE.Triangle(v1, v2, v3);
    let normal = triangle.normal();

    triangleGeometry.vertices.push(triangle.a);
    triangleGeometry.vertices.push(triangle.b);
    triangleGeometry.vertices.push(triangle.c);
    triangleGeometry.faces.push(new THREE.Face3(0, 1, 2, normal));
    triangleMesh = new THREE.Mesh(triangleGeometry, new THREE.MeshNormalMaterial());
    triangleMesh.position.set(0, 10, 10);
    triangleMesh.rotation.y += Math.PI / 5;
    group.add(triangleMesh);
    group.position.set(0, 0, 10);
    
    scene.add(group)
}

const addTexture = (imageUrl) => {
    request.get(imageUrl, (err, res, data) => {
        if (!err && res.statusCode == 200) {
            data = "data:" + res.headers["content-type"] + ";base64," + new Buffer(data).toString('base64');
            
            let image = new Canvas.Image();
            
            image.onload = () => {
                mesh.material.map = new THREE.Texture(image);
                mesh.material.map.needsUpdate = true;

                eventEmitter.emitEvent('photo-rendered');
            }
            image.src = data;
        }
    });
    //request({
    //    uri: imageUrl,
    //    method: 'GET'
    //}, (err, res, body) => {
    //    let image = new Canvas.Image();
    //    image.src = body;
    //    mesh.material.map = new THREE.Texture(image);
    //    mesh.material.needsUpdate = true;
    //});
}

const rotateTriangle = (angle) => {
    triangleMesh.rotation.z = angle;
}

module.exports = {
    init,
    addTexture,
    rotateTriangle

    
}