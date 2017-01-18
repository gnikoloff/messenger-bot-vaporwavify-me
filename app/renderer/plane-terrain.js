const Terrain = (function () {
    
    
    const vertexShader = ``;
    const fragmentShader = ``;

    let geometry;
    let material;
    let mesh;

    const init = (scene) => {
        geometry = new THREE.PlaneBufferGeometry(50, 50, 50, 50);
        material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: 
        });
        // scene.add(mesh);
    }

    return {
        init
    }


}());

// module.exports = Terrain;