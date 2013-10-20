var container = $('.container');
var stats;

var camera, scene, renderer, cubes = [], material;

var position_wave_multiplier;
var position_step_multiplier;
var rotation_step_multiplier;

init();
animate();

function init() {
    // Options
    position_wave_multiplier = 1;
    position_step_multiplier = 1;
    rotation_step_multiplier = 1;

    // Camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15000);
    camera.position.x = 1500;
    camera.position.y = 500;
    camera.position.z = 5500;

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 500, 15000);
    scene.fog.color.setHSL(0.51, 0.4, 0.01);

    // World
    var s = 250;

    var cube = new THREE.CubeGeometry(s, s, s);
    material = new THREE.MeshPhongMaterial({
        ambient: 0x333333,
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 500
    });

    var cube_number = prompt("Number of cubes", "5000");

    var i = 0;
    for(; i < cube_number; i++) {
        var mesh = new THREE.Mesh(cube, material);

        mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
        mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
        mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);

        mesh.position.animationConstX = Math.random() * 10;
        mesh.position.animationConstY = Math.random() * 10;
        mesh.position.animationConstZ = Math.random() * 10;

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;

        mesh.rotation.animationConstX = Math.random() / 100;
        mesh.rotation.animationConstY = Math.random() / 100;
        mesh.rotation.animationConstZ = Math.random() / 100;

        mesh.matrixAutoUpdate = true;
        mesh.updateMatrix();

        cubes.push(mesh);

        scene.add(mesh);
    }

    // Lights
    var ambient = new THREE.AmbientLight(0xffffff);
    ambient.color.setHSL(0.1, 0.3, 0.2);
    scene.add(ambient);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, -1, 0).normalize();
    scene.add(dirLight);

    dirLight.color.setHSL(0.1, 0.7, 0.5);

    addLight(0.55, 0.9, 0.5, 5000, 0, -1000);
    addLight(0.08, 0.8, 0.5, 0, 0, -1000 );
    addLight(0.995, 0.5, 0.9, 5000, 5000, -1000);

    function addLight(h, s, l, x, y, z) {
        var light = new THREE.PointLight(0xffffff, 1.5, 4500);
        light.color.setHSL(h, s, l);
        light.position.set(x, y, z);
        scene.add(light);
    }

    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 1);

    container.append(renderer.domElement);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;

    renderer.render(scene, camera);

    // Stats
    stats = new Stats();
    $(".stats").append(stats.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

function render() {
    var timestep = Date.now() * 0.0001;

    for(var i = 0; i < cubes.length; i++) {
        cubes[i].position.x += cubes[i].position.animationConstX * Math.cos(timestep * position_wave_multiplier) * position_step_multiplier;
        cubes[i].position.y += cubes[i].position.animationConstY * Math.sin(timestep * position_wave_multiplier) * position_step_multiplier;
        cubes[i].position.z += cubes[i].position.animationConstZ * Math.sin(timestep * position_wave_multiplier) * position_step_multiplier;

        cubes[i].rotation.x += cubes[i].rotation.animationConstX * rotation_step_multiplier;
        cubes[i].rotation.y += cubes[i].rotation.animationConstY * rotation_step_multiplier;
        cubes[i].rotation.z += cubes[i].rotation.animationConstZ * rotation_step_multiplier;
    }

    renderer.render(scene, camera);
}