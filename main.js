import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';

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

// Cube group
const cubeGroup = new THREE.Group();
scene.add(cubeGroup);

// Create 27 cubelets
const cubeletSize = 0.95;
const spacing = 1.05;

const cubelets = [];


for (let x of [-1, 0, 1]) {
  for (let y of [-1, 0, 1]) {
    for (let z of [-1, 0, 1]) {
      const geometry = new THREE.BoxGeometry(cubeletSize, cubeletSize, cubeletSize);
      const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
      const cubelet = new THREE.Mesh(geometry, material);
      cubelet.position.set(x * spacing, y * spacing, z * spacing);
      cubeGroup.add(cubelet);
      cubelets.push(cubelet);
    }
  }
}

// Face Rotation (e.g. Right face)
function rotateFace(axis, value) {
  const group = new THREE.Group();
  cubeGroup.add(group);

  const threshold = 0.1;

  cubelets.forEach(cubelet => {
    if (Math.abs(cubelet.position[axis] - value) < threshold) {
      group.attach(cubelet); // Important: re-parent preserves world position
    }
  });

  const angleRad = THREE.MathUtils.degToRad(90);

  gsap.to(group.rotation, {
    [axis]: angleRad,
    duration: 0.5,
    onComplete: () => {
      // Apply final transforms to cubelets
      group.updateMatrixWorld();
      [...group.children].forEach(cubelet => {
        cubelet.applyMatrix4(group.matrixWorld);
        cubeGroup.attach(cubelet); // back to main group
      });

      scene.remove(group);
    }
  });
}

// Test button to rotate R face
const btn = document.createElement('button');
btn.innerText = "Rotate R (Right Face)";
btn.style.position = "absolute";
btn.style.top = "10px";
btn.style.left = "10px";
btn.onclick = () => rotateFace('x', spacing);
document.body.appendChild(btn);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
