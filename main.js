import * as THREE from './js/three.module.js';
import { GLTFLoader } from './js/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './js/examples/jsm/controls/OrbitControls.js';
import * as BufferGeometryUtils from './js/examples/jsm/utils/BufferGeometryUtils.js';

console.log("✅ JS Loaded");

const canvas = document.getElementById('iphoneCanvas');
console.log("Canvas Size:", canvas.clientWidth, canvas.clientHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
scene.add(light);

const loader = new GLTFLoader();
loader.load('assets/iphone14-black.glb',
  (gltf) => {
    console.log("✅ GLB model loaded");
    scene.add(gltf.scene);
  },
  undefined,
  (error) => {
    console.error("❌ Error loading GLB model:", error);
  }
);

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
