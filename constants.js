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
const makeIdxs = (idxsObject) =>
  Object.fromEntries(
    Object.entries(idxsObject).map(
      ([key, colorArray]) => [key, colorArray.map(mat)]
    )
  );

const CENTER_COORDS = {
  "-1,0,0": "red",
  "0,1,0": "yellow",
  "0,0,1": "green",
  "1,0,0": "orange",
  "0,0,-1": "blue",
  "0,-1,0": "white",
  "0,0,0": "black"
};

const SIDE_COORDS = {
  "-1,1,0": "red_yellow",
  "-1,0,-1": "red_blue",
  "-1,0,1": "red_green",
  "-1,-1,0": "red_white",
  "0,1,1": "yellow_green",
  "0,1,-1": "yellow_blue",
  "1,1,0": "orange_yellow",
  "1,0,-1": "orange_blue",
  "1,0,1": "orange_green",
  "1,-1,0": "orange_white",
  "0,-1,1": "white_green",
  "0,-1,-1": "white_blue"
};

const CORNER_COORDS = {
  "-1,1,1": "red_yellow_green",
  "-1,-1,1": "red_white_green",
  "-1,1,-1": "red_yellow_blue",
  "-1,-1,-1": "red_white_blue",
  "1,1,1": "orange_yellow_green",
  "1,1,-1": "orange_yellow_blue",
  "1,-1,1": "orange_white_green",
  "1,-1,-1": "orange_white_blue"
};

const CENTER_COLORS = {
  red: ['black','red','black','black','black','black'], 
  yellow: ['black','black','yellow','black','black','black'], 
  green: ['black','black','black','black','green','black'], 
  orange: ['orange','black','black','black','black','black'], 
  blue: ['black','black','black','black','black','blue'], 
  white: ['black','black','black','white','black','black'],
  black: ['black','black','black','black','black','black']
};

const SIDE_COLORS = {
  red_yellow: ['black','red','yellow','black','black','black'],
  red_blue: ['black','red','black','black','black','blue'],
  red_green: ['black','red','black','black','green','black'],
  red_white: ['black','red','black','white','black','black'],
  yellow_green: ['black','black','yellow','black','green','black'],
  yellow_blue: ['black','black','yellow','black','black','blue'],
  orange_yellow: ['orange','black','yellow','black','black','black'],
  orange_blue: ['orange','black','black','black','black','blue'],
  orange_green: ['orange','black','black','black','green','black'],
  orange_white: ['orange','black','black','white','black','black'],
  white_green: ['black','black','black','white','green','black'],
  white_blue: ['black','black','black','white','black','blue'],
};

const CORNER_COLORS = {
  red_yellow_green: ['black','red','yellow','black','green','black'],
  red_white_green: ['black','red','black','white','green','black'],
  red_yellow_blue: ['black','red','yellow','black','black','blue'],
  red_white_blue: ['black','red','black','white','black','blue'],
  orange_yellow_green: ['orange','black','yellow','black','green','black'],
  orange_yellow_blue: ['orange','black','yellow','black','black','blue'],
  orange_white_green: ['orange','black','black','white','green','black'],
  orange_white_blue: ['orange','black','black','white','black','blue'],
};

const CENTER_MATERIALS = makeIdxs(CENTER_COLORS);
const SIDE_MATERIALS = makeIdxs(SIDE_COLORS);
const CORNER_MATERIALS = makeIdxs(CORNER_COLORS);

const LOWER_THRESHOLD = 0.1;
const UPPER_THRESHOLD = 2.09;
const FACES = ['R','L','U','D','F','B'];
const CUBELET_TYPES = {
  center: "CENTER",
  side: "SIDE",
  corner: "CORNER"
};

export {
  CUBELET_SIZE,

  CENTER_MATERIALS,
  SIDE_MATERIALS,
  CORNER_MATERIALS,

  CENTER_COORDS,
  SIDE_COORDS,
  CORNER_COORDS,
  
  CUBE_SPACING,
  LOWER_THRESHOLD,
  UPPER_THRESHOLD,

  FACES,
  CUBELET_TYPES
};
