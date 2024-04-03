import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {s} from "vite/dist/node/types.d-aGj9QkWt";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );


// const geometry = THREE.TorusGeometry()

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
const material = new THREE.MeshStandardMaterial( { color: 0xff6347 } );

const torus = new THREE.Mesh( geometry, material ); scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff, 500, 100);
pointLight.position.set(5,10, 10);
const ambientLight =  new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);


const controls = new OrbitControls( camera, renderer.domElement );


const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

scene.add(lightHelper);



scene.add(pointLight);
scene.add(ambientLight);
scene.add(torus);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);

}

Array(100).fill().forEach(addStar);

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    torus.rotation.x += 0.001;
    torus.rotation.y += 0.005;
    renderer.render( scene, camera );
}

animate();

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `





// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
