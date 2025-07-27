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

const colors = {
  red: 0xd11515,
  orange: 0xde7309,
  yellow: 0xffcf0d,
  green: 0x06cc21,
  blue: 0x425af5,
  purple: 0x8706cc,
  black: 0x000000,
  white: 0xffffff
};

const allMaterials = {
  firstRow: {
    corners: [
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['red'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['white'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['blue'] })
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['red'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['white'] }),
        new THREE.MeshBasicMaterial({ color: colors['green'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] })
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['red'] }),
        new THREE.MeshBasicMaterial({ color: colors['yellow'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['blue'] })
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['red'] }),
        new THREE.MeshBasicMaterial({ color: colors['yellow'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['green'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] })
      ]
    ],
    sides: [
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['red'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['white'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['red'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['blue'] }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['red'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['green'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['red'] }),
        new THREE.MeshBasicMaterial({ color: colors['yellow'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }), 
      ]
    ],
    center: [
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['red'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] })
    ]
  },
  secondRow: {
    corners: [
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['white'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['blue'] })
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['white'] }),
        new THREE.MeshBasicMaterial({ color: colors['green'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] })
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['yellow'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['blue'] })
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['yellow'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['green'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] })
      ]
    ],
    sides: [
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['white'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['blue'] }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['green'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['yellow'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }), 
      ]
    ],
    center: [
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] })
    ]
  },
  thirdRow: {
    corners: [
      [
        new THREE.MeshBasicMaterial({ color: colors['orange'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['white'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['blue'] })
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['orange'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['white'] }),
        new THREE.MeshBasicMaterial({ color: colors['green'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] })
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['orange'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['yellow'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['blue'] })
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['orange'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['yellow'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['green'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] })
      ]
    ],
    sides: [
      [
        new THREE.MeshBasicMaterial({ color: colors['orange'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['white'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['orange'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['blue'] }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['orange'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['green'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: colors['orange'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['yellow'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }),
        new THREE.MeshBasicMaterial({ color: colors['black'] }), 
      ]
    ],
    center: [
      new THREE.MeshBasicMaterial({ color: colors['orange'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] }),
      new THREE.MeshBasicMaterial({ color: colors['black'] })
    ]
  }
};


for (let x of [-1, 0, 1]) {
  for (let y of [-1, 0, 1]) {
    for (let z of [-1, 0, 1]) {
      const geometry = new THREE.BoxGeometry(cubeletSize, cubeletSize, cubeletSize);
      let cubeletName = "";
      let material = null;
      if (x == -1) {
        if (y == -1) {
          if (z == -1) {
            material = allMaterials['firstRow']['corners'][0];
            cubeletName = "r1c0"; 
          }
          else if (z == 0) {
            material = allMaterials['firstRow']['sides'][0];
            cubeletName = "r1s0";
          } 
          else {
            material = allMaterials['firstRow']['corners'][1];
            cubeletName = "r1c1";
          }
        }
        else if (y == 0) {
          if (z == -1) {
            material = allMaterials['firstRow']['sides'][1];
            cubeletName = "r1s1";
          }
          else if (z == 0) {
            material = allMaterials['firstRow']['center'];
            cubeletName = "r1c";
          } 
          else {
            material = allMaterials['firstRow']['sides'][2];
            cubeletName = "r1s2";
          }
        }
        else {
          if (z == -1) {
            material = allMaterials['firstRow']['corners'][2];
            cubeletName = "r1c2";

          }
          else if (z == 0) {
            material = allMaterials['firstRow']['sides'][3];
            cubeletName = "r1s3";
          } 
          else {
            material = allMaterials['firstRow']['corners'][3];
            cubeletName = "r1c3";
          }
        }
      }
      else if (x == 0) {
        if (y == -1) {
          if (z == -1) {
            material = allMaterials['secondRow']['corners'][0];
            cubeletName = "r2c0";
          }
          else if (z == 0) {
            material = allMaterials['secondRow']['sides'][0];
            cubeletName = "r2s0"; 
          } 
          else {
            material = allMaterials['secondRow']['corners'][1];
            cubeletName = "r2c1";
          }
        }
        else if (y == 0) {
          if (z == -1) {
            material = allMaterials['secondRow']['sides'][1]; 
            cubeletName = "r2s1";
          }
          else if (z == 0) {
            material = allMaterials['secondRow']['center']; 
            cubeletName = "r2c";
          } 
          else {
            material = allMaterials['secondRow']['sides'][2];
            cubeletName = "r2s2";
          }
        }
        else {
          if (z == -1) {
            material = allMaterials['secondRow']['corners'][2]; 
            cubeletName = "r2c2";
          }
          else if (z == 0) {
            material = allMaterials['secondRow']['sides'][3]; 
            cubeletName = "r2s3";
          } 
          else {
            material = allMaterials['secondRow']['corners'][3];
            cubeletName = "r2c3";
          }
        }
      }
      else {
        if (y == -1) {
          if (z == -1) {
            material = allMaterials['thirdRow']['corners'][0];
            cubeletName = "r3c0";
          }
          else if (z == 0) {
            material = allMaterials['thirdRow']['sides'][0];
            cubeletName = "r3s0";
          } 
          else {
            material = allMaterials['thirdRow']['corners'][1];
            cubeletName = "r3c1";
          }
        }
        else if (y == 0) {
          if (z == -1) {
            material = allMaterials['thirdRow']['sides'][1];
            cubeletName = "r3s1";
          }
          else if (z == 0) {
            material = allMaterials['thirdRow']['center'];
            cubeletName = "r3c";
          } 
          else {
            material = allMaterials['thirdRow']['sides'][2];
            cubeletName = "r3s2";
          }
        }
        else {
          if (z == -1) {
            material = allMaterials['thirdRow']['corners'][2];
            cubeletName = "r3c2";
          }
          else if (z == 0) {
            material = allMaterials['thirdRow']['sides'][3];
            cubeletName = "r3s3";
          } 
          else {
            material = allMaterials['thirdRow']['corners'][3];
            cubeletName = "r3c3";
          }
        }
      }
      const cubelet = new THREE.Mesh(geometry, material);
      cubelet.name = cubeletName;
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
        cubeGroup.attach(cubelet); // back to main group
      });

      scene.remove(group);
      cubelets.forEach((cubelet, idx) => {
        console.log("cubelet", cubelet.name, "new position:", cubelet.position);
      });
    }
  });
}

cubelets.forEach((cubelet, idx) => {
  console.log("cubelet", cubelet.name, "position:", cubelet.position);
});
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
