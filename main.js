import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Cube from './Cube.js';
import { FACES } from './constants.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(scene.position); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const cube = new Cube(scene);
scene.add(cube.cubeGroup);

FACES.map((face, _) => {
  let btn = document.getElementById(face);
  let primeBtn = document.getElementById(face + "prime");

  btn.onclick = () => cube.rotateFace(face);
  primeBtn.onclick = () => cube.rotateFace(face, true);
});


let scrambleBtn = document.getElementById("scrambleBtn");
scrambleBtn.onclick = () => cube.scramble(10);


// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
