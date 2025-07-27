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

let xPos = 10;
let yPos = 40;

FACES.map((face, _) => {
  let btn = document.createElement('button');
  btn.innerText = face;
  btn.style.position = "absolute";
  btn.style.top = String(yPos) + "px";
  btn.style.left = String(xPos) + "px";
  btn.onclick = () => cube.rotateFace(face);
  document.body.appendChild(btn);
  xPos += 40;
  let primeBtn = document.createElement('button');
  primeBtn.innerText = face + "'";
  primeBtn.style.position = "absolute";
  primeBtn.style.top = String(yPos) + "px";
  primeBtn.style.left = String(xPos) + "px";
  primeBtn.onclick = () => cube.rotateFace(face, true);
  document.body.appendChild(primeBtn);
  yPos += 40;
  xPos -= 40;
});

let scrambleBtn = document.createElement("button");
scrambleBtn.innerText = "Scramble";
scrambleBtn.style.position = "absolute";
scrambleBtn.style.top = "300px"
scrambleBtn.style.left = "10px";
scrambleBtn.onclick = () => cube.scramble(10);
document.body.appendChild(scrambleBtn);


// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
