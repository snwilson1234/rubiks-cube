import * as THREE from 'three';
import gsap from 'gsap';
import {
  CUBELET_SIZE, 
  CUBE_SPACING,
  CENTER_COORDS,
  SIDE_COORDS,
  CORNER_COORDS,
  CENTER_MATERIALS,
  SIDE_MATERIALS,
  CORNER_MATERIALS,
  LOWER_THRESHOLD,
  UPPER_THRESHOLD,
  FACES,
  CUBELET_TYPES
} from './constants.js';


/**
 * Represents a 3D Rubik's Cube and provides methods for manipulating it.
 */
class Cube {
  /**
   * Creates a new Cube instance.
   * 
   * @param {THREE.Scene} scene - The Three.js scene to which the cube will be added.
   */
  constructor(scene) {
    this.scene = scene;
    this.cubeletSize = CUBELET_SIZE;
    this.spacing = CUBE_SPACING;
    this.cubeGroup = new THREE.Group();
    this.solveState = [];
    this.cubelets = this.makeCube();
  }

  /**
   * Create the cubelets that make up the Cube object.
   * 
   * @returns {boolean} Array of Cubelet objects.
   */
  makeCube() {
    const cubelets = [];
    for (let x of [-1, 0, 1]) {
      for (let y of [-1, 0, 1]) {
        for (let z of [-1, 0, 1]) {
          const cubelet = this.makeCubelet(x, y, z);
          this.cubeGroup.add(cubelet);
          cubelets.push(cubelet);
          this.solveState.push( new THREE.Vector3(x,y,z) );
        }
      }
    }
    return cubelets;
  }

 /**
   * Creates a cubelet, based on input coordinates and pre-determined constants.
   * 
   * @param {number} x: The x coordinate of the cubelet to be created.
   * @param {number} y: The y coordinate of the cubelet to be created.
   * @param {number} z: The z coordinate of the cubelet to be created.
   * @returns {boolean} Cubelet object.
   */
  makeCubelet(x, y, z) {
    let cubeletType, colorId, material;
    let indexString = `${x},${y},${z}`;

    if (indexString in CENTER_COORDS) {
      colorId = CENTER_COORDS[indexString];
      material = CENTER_MATERIALS[colorId];
      cubeletType = "center"
    }
    else if (indexString in SIDE_COORDS) {
      colorId = SIDE_COORDS[indexString];
      material = SIDE_MATERIALS[colorId];
      cubeletType = "side";
    }
    else {
      colorId = CORNER_COORDS[indexString];
      material = CORNER_MATERIALS[colorId];
      cubeletType = "corner";
    }

    let sideMaterials = [];
    for (let i = 0; i < material.length; i++) { 
      sideMaterials.push(material[i]['material']);
    }

    let shortColorId = "";
    let colors = colorId.split("_");
    for (let color of colors) {
      shortColorId += color[0].toUpperCase();
    }

    return new Cubelet(x, y, z, sideMaterials, colorId, cubeletType, shortColorId, this.cubeletSize, this.spacing);
  }

  /**
   * Rotates a specified face of the cube.
   *
   * @param {"R"|"L"|"U"|"D"|"F"|"B"} face - The face to rotate:
   *   - "R" = Right
   *   - "L" = Left
   *   - "U" = Up
   *   - "D" = Down
   *   - "F" = Front
   *   - "B" = Back
   * @param {boolean} [counter=false] - If true, rotate counter-clockwise; otherwise, clockwise.
   * @returns {void}
   */
  rotateFace(face, counter=false) {
    console.log("rotating face:", face, counter ? "counter-clockwise" : "clockwise");
    const group = new THREE.Group();
    this.cubeGroup.add(group);
    let rotateRow;
    let rotateAxis;

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
      if (rotateRow == 3) {
        if (answer < LOWER_THRESHOLD) {
          group.attach(cubelet);
        }
      }
      else if (rotateRow == 2) {
        if (answer > LOWER_THRESHOLD && answer < UPPER_THRESHOLD) {
          group.attach(cubelet);
        }
      }
      else {
        if (answer >= UPPER_THRESHOLD) {
          group.attach(cubelet);
        }
      }
    });

    let angle = counter ? 90 : -90;

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
        console.log(this.checkSolve() ? "cube is solved." : "cube is not solved.");
      }
    });
  }

  /**
   * Check the cubelet positions to determine if in solved state.
   *
   * @returns {boolean} True if solved, false if not.
   */
  checkSolve() {
    const threshold = LOWER_THRESHOLD;
    for (let i = 0; i < this.cubelets.length; i++) {
      const cubelet = this.cubelets[i];
      const expected = this.solveState[i];
      const actual = cubelet.position;

      const dx = Math.abs(expected.x - actual.x);
      const dy = Math.abs(expected.y - actual.y);
      const dz = Math.abs(expected.z - actual.z);

      if (dx > threshold || dy > threshold || dz > threshold) {
        return false;
      }
    }
    return true;
  }

  /**
   * Scramble the cube.
   *
   * @param {number} numTurns - Number of turns in the scramble to perform.
   * @returns {boolean} True if solved, false if not.
   */
  performScramble(numTurns) {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    };

    let randomFace, randomDirection, randInt;
    for (let i = 0; i < numTurns; i++) {
      setTimeout(() => {
        randInt = getRandomInt(FACES.length);
        randomFace = FACES[randInt];
        console.log(randInt);
        randomDirection = randInt > Math.floor(FACES.length / 2) ? true : false;
        this.rotateFace(randomFace, randomDirection);
      }, 600 * i);
    }
  }
}
export default Cube;

/**
 * Represents a 3D cubelet instance within the Cube object above.
 */
class Cubelet extends THREE.Mesh {
  /**
   * Creates a new Cubelet instance.
   * 
   * @param {THREE.Scene} scene - The Three.js scene to which the cube will be added.
   */
  constructor(x, y, z, material, name, type, colors, cubeletSize, spacing) {
    const geometry = new THREE.BoxGeometry(cubeletSize, cubeletSize, cubeletSize);
    super(geometry, material);
    this.name = name;
    this.colors = colors;
    this.type = type;
    this.position.set(x * spacing, y * spacing, z * spacing);
    console.log(`making cubelet: ${this.name} \nwith colors: ${this.colors} \ntype: ${this.type}`);
  }
}