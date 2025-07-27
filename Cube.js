import * as THREE from 'three';
import gsap from 'gsap';

/* Constants and Helpers */
const CUBELET_SIZE = 0.95;
const CUBE_SPACING = 1.05;
const CUBE_COLORS = {
  red: 0xd11515,
  orange: 0xde7309,
  yellow: 0xffcf0d,
  green: 0x06cc21,
  blue: 0x425af5,
  purple: 0x8706cc,
  black: 0x000000,
  white: 0xffffff
};
const mat = (colorName) => new THREE.MeshBasicMaterial({ color: CUBE_COLORS[colorName] });
const makeRow = (faces) => faces.map(row => row.map(mat));
const CUBE_MATERIALS = {
  firstRow: {
    corners: makeRow([
      ['black','red','black','white','black','blue'],
      ['black','red','black','white','green','black'],
      ['black','red','yellow','black','black','blue'],
      ['black','red','yellow','black','green','black']
    ]),
    sides: makeRow([
      ['black','red','black','white','black','black'],
      ['black','red','black','black','black','blue'],
      ['black','red','black','black','green','black'],
      ['black','red','yellow','black','black','black']
    ]),
    center: [
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['red'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })
    ]
  },
  secondRow: {
    corners: makeRow([
      ['black','black','black','white','black','blue'],
      ['black','black','black','white','green','black'],
      ['black','black','yellow','black','black','blue'],
      ['black','black','yellow','black','green','black']
    ]),
    sides: makeRow([
      ['black','black','black','white','black','black'],
      ['black','black','black','black','black','blue'],
      ['black','black','black','black','green','black'],
      ['black','black','yellow','black','black','black']
    ]),
    center: [
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })
    ]
  },
  thirdRow: {
    corners: makeRow([
      ['orange','black','black','white','black','blue'],
      ['orange','black','black','white','green','black'],
      ['orange','black','yellow','black','black','blue'],
      ['orange','black','yellow','black','green','black']
    ]),
    sides: makeRow([
      ['orange','black','black','white','black','black'],
      ['orange','black','black','black','black','blue'],
      ['orange','black','black','black','green','black'],
      ['orange','black','yellow','black','black','black']
    ]),
    center: [
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['orange'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] }),
      new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })
    ]
  }
};

/* Cube Class */
class Cube {
  constructor(scene) {
    this.scene = scene;
    this.cubeletSize = CUBELET_SIZE;
    this.spacing = CUBE_SPACING;
    this.cubeGroup = new THREE.Group();
    this.cubelets = this.makeCube();
  }

  makeCube() {
    const cubelets = [];

    for (let x of [-1, 0, 1]) {
      for (let y of [-1, 0, 1]) {
        for (let z of [-1, 0, 1]) {
          const cubelet = this.makeCubelet(x, y, z);
          this.cubeGroup.add(cubelet);
          cubelets.push(cubelet);
        }
      }
    }

    return cubelets;
  }

  makeCubelet(x, y, z) {
    const rowMap = {
        [-1]: { key: 'firstRow', label: 'r1' },
        [0]:  { key: 'secondRow', label: 'r2' },
        [1]:  { key: 'thirdRow', label: 'r3' },
    };

    const { key: rowKey, label: rowLabel } = rowMap[x];

    let material, cubeletName;

    const isCorner = (coord) => coord !== 0;
    const getCornerIndex = () => {
        if (y === -1 && z === -1) return 0;
        if (y === -1 && z === 1) return 1;
        if (y === 1 && z === -1) return 2;
        if (y === 1 && z === 1) return 3;
        return -1; // not a corner
    };

    const getSideIndex = () => {
        if (y === -1 && z === 0) return 0;
        if (y === 0 && z === -1) return 1;
        if (y === 0 && z === 1)  return 2;
        if (y === 1 && z === 0)  return 3;
        return -1; // not a side
    };

    if (x === x && y === 0 && z === 0) {
        material = CUBE_MATERIALS[rowKey]['center'];
        cubeletName = `${rowLabel}c`;
    } else if (isCorner(y) && isCorner(z)) {
        const idx = getCornerIndex();
        material = CUBE_MATERIALS[rowKey]['corners'][idx];
        cubeletName = `${rowLabel}c${idx}`;
    } else {
        const idx = getSideIndex();
        material = CUBE_MATERIALS[rowKey]['sides'][idx];
        cubeletName = `${rowLabel}s${idx}`;
    }

    return new Cubelet(x, y, z, material, cubeletName, this.cubeletSize, this.spacing);
  }

  rotateFace(face, counter=false) {
    console.log("rotating face:", face);
    const group = new THREE.Group();
    this.cubeGroup.add(group);
    let rotateRow;
    let rotateAxis;

    const lowerThreshold = 0.1;
    const upperThreshold = 2.09;

    switch (face) {
      case "R":
        rotateRow = 3;
        rotateAxis = "x";
        break;
      case "L":
        rotateRow = 1
        rotateAxis = "x"
        break;
      case "U":
        rotateRow = 3;
        rotateAxis = "y"
        break;
      case "D":
        rotateRow = 1;
        rotateAxis = "y"
        break;
      case "B":
        rotateRow = 1;
        rotateAxis = "z"
        break;
      case "F":
        rotateRow = 3;
        rotateAxis = "z"
        break;
      default:
        rotateRow = 2;
        rotateAxis = "x";
        break;
    }

    this.cubelets.forEach(cubelet => {
      const answer = Math.abs(cubelet.position[rotateAxis] - CUBE_SPACING);
      console.log("answer:", answer);
      if (rotateRow == 3) {
        if (answer < lowerThreshold) {
          group.attach(cubelet);
        }
      }
      else if (rotateRow == 2) {
        if (answer > lowerThreshold && answer < upperThreshold) {
          group.attach(cubelet);
        }
      }
      else {
        if (answer >= upperThreshold) {
          group.attach(cubelet);
        }
      }
    });

    let angle = counter ? -90 : 90;

    const angleRad = THREE.MathUtils.degToRad(angle);

    gsap.to(group.rotation, {
      [rotateAxis]: angleRad,
      duration: 0.5,
      onComplete: () => {
        group.updateMatrixWorld();
        [...group.children].forEach(cubelet => {
          this.cubeGroup.attach(cubelet);
        });

        this.scene.remove(group);
        this.checkSolve();
      }
    });
  }

  checkSolve() {
    this.cubelets.forEach((cubelet, idx) => {
      console.log("cubelet", cubelet.name, "new position:", cubelet.position);
    });
  }
}
export default Cube;

/* Cublet Class */
class Cubelet extends THREE.Mesh {
  constructor(x, y, z, material, name, cubeletSize, spacing) {
    const geometry = new THREE.BoxGeometry(cubeletSize, cubeletSize, cubeletSize);
    super(geometry, material);
    this.name = name;
    this.position.set(x * spacing, y * spacing, z * spacing);
  }
}