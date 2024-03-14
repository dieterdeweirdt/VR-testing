import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ARButton } from 'three/addons/webxr/ARButton.js';

// Scène opzetten
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.xr.enabled = true; // WebXR inschakelen

document.body.appendChild(renderer.domElement);

//VR button
document.body.appendChild( ARButton.createButton( renderer ) );


const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 3 );
light.position.set( 0.5, 1, 0.25 );
scene.add( light );


// OrbitControls toevoegen
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // Optioneel, voor een soepelere ervaring
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Kubus
var cubeGeometry = new THREE.BoxGeometry();
var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
cube.position.x = -2; // Positie aanpassen

// Bal (Sfeer)
var sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.z = -3; // Positie aanpassen
scene.add(sphere);

// Kegel
var coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
var coneMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
var cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.x = 3; // Positie aanpassen
scene.add(cone);

// Camera
camera.position.set(0, 0, 1);

// Renderlus
var animate = function () {
    requestAnimationFrame(animate);

    controls.update(); // Alleen nodig als controls.enableDamping of controls.autoRotate is ingeschakeld

    renderer.render(scene, camera);

};

animate();