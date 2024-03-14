import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

// Scène opzetten
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.4, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.xr.enabled = true; // WebXR inschakelen

document.body.appendChild(renderer.domElement);

//VR button
document.body.appendChild( VRButton.createButton( renderer ) );

// Create a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
// Position the light behind the camera
light.position.set(0, 0, 1);
// Add the light to the scene
scene.add(light);

const bridge = new THREE.CubeTextureLoader().setPath('https://threejs.org/examples/textures/cube/Bridge2/').load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);
bridge.encoding = THREE.sRGBEncoding;
scene.background = bridge;

// OrbitControls toevoegen
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // Optioneel, voor een soepelere ervaring
controls.dampingFactor = 0.25;
controls.enableZoom = false;

// Kubus
var cubeGeometry = new THREE.BoxGeometry();
var cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
cube.position.set(-2, -5, 0); // Positie aanpassen

// Bal (Sfeer)
var sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, -5, -5); // Positie aanpassen
scene.add(sphere);

// Kegel
var coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
var coneMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
var cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.x = 3; // Positie aanpassen
scene.add(cone);

// Camera
camera.position.set(0, 0, 10);

// Renderlus
var animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;


    controls.update(); // Alleen nodig als controls.enableDamping of controls.autoRotate is ingeschakeld

    renderer.render(scene, camera);

};

animate();