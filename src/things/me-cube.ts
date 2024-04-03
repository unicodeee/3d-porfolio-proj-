import * as THREE from 'three';


const textTure = new THREE.TextureLoader().load("src/asset/thang.jpg");

// MESH = geometry + material
const geometry = new THREE.BoxGeometry(5, 3, 5, 100);
const material = new THREE.MeshBasicMaterial({ map: textTure });

const me = new THREE.Mesh(geometry, material);

export { me };
