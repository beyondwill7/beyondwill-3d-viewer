
import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './js/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from './js/examples/jsm/utils/BufferGeometryUtils.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0022);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 4);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const loader = new GLTFLoader();
loader.load('./assets/iphone14-black.glb', function(gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.rotation.y = Math.PI;
    scene.add(model);
}, undefined, function(error) {
    console.error('An error happened while loading the model:', error);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
