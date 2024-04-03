import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import {me} from './things/me-cube';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    'canvas': document.querySelector('#bg')!, // Typescript also has a non-null assertion that you can use when you are sure that the value is never null by adding the ! operator to the end of your statement
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);



const pointLight = new THREE.PointLight(0xffffff, 500, 100);
pointLight.position.set(5,10, 10);
const ambientLight =  new THREE.AmbientLight(0xffffff);


// Helper

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
scene.add(me);


// Background

const spaceTexture = new THREE.TextureLoader().load('src/asset/space.jpg');
scene.background = spaceTexture;
// scene.background = new THREE.Color(0x7192f); // Hexadecimal value
// or


// Moon

const moonTexture = new THREE.TextureLoader().load('src/asset/mars-texture.jpg');
const normalTexture = new THREE.TextureLoader().load('src/asset/normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
    })
);

scene.add(moon);


moon.position.z = 30;
moon.position.setX(-10);

me.position.z = -5;
me.position.x = 2;

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill(undefined)
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);

}

Array(100).fill(undefined).forEach(addStar);




// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    me.rotation.y += 0.01;
    me.rotation.z += 0.01;

    camera.position.z = t * -0.05;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
    requestAnimationFrame( animate );
    controls.update();
    torus.rotation.x += 0.001;
    torus.rotation.y += 0.005;
    renderer.render( scene, camera );
}

animate();






// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
