import * as THREE from 'three';


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
const mat = (colorName) => ({
  color: colorName,
  material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS[colorName] })
});
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
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['red'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })}
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
      ['black','black','black','black','black','blue'], // blue center
      ['black','black','black','black','green','black'], // green center
      ['black','black','yellow','black','black','black']
    ]),
    center: [
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })}
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
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['orange'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })},
      { color: 'black', material: new THREE.MeshBasicMaterial({ color: CUBE_COLORS['black'] })}
    ]
  }
};
const LOWER_THRESHOLD = 0.1;
const UPPER_THRESHOLD = 2.09;
const FACES = ['R','L','U','D','F','B'];

export {
  CUBELET_SIZE,
  CUBE_MATERIALS,
  CUBE_SPACING,
  LOWER_THRESHOLD,
  UPPER_THRESHOLD,
  FACES
};
