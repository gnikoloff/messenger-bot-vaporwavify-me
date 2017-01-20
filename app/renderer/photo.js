'use strict';
const events = require('events');
var jsdom = require("jsdom").jsdom;
global.document = jsdom("<!doctype html><html><head></head><body></body></html>");
global.window = document.defaultView;
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const request = require('request');
const THREE = require('three');

let group;

let geometry;
let material;
let mesh;

let triangleGeometry;
let triangleMaterial;
let triangleMesh;

let eventEmitter = new events.EventEmitter();

const init = (scene) => {
    group = new THREE.Group();
    geometry = new THREE.PlaneGeometry(25, 30, 2, 2);
    material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.rotation.x += Math.PI / 2.5;
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
    request({
        uri: imageUrl,
        method: 'GET'
    }, (error, response, body) => {
        body = new THREE.Texture(body);
        mesh.material.map = body;
        mesh.material.needsUpdate = true;
    });
}

module.exports = {
    init,
    addTexture
}