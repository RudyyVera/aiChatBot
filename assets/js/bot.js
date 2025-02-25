import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Crear escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cargar modelo GLB
const loader = new GLTFLoader();
let botModel;

loader.load('rudivera\models\textures', (gltf) => {
    botModel = gltf.scene;
    scene.add(botModel);
    botModel.position.set(0, 0, 0); // Ajusta la posición si es necesario
}, undefined, (error) => {
    console.error('Error cargando el modelo:', error);
});

// Agregar luz
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Posicionar la cámara
camera.position.z = 5;

// Animación
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Función para enviar mensajes a Watson Assistant
async function sendMessageToWatson(message) {
    const response = await fetch('https://api.us-south.assistant.watson.cloud.ibm.com/instances/TU_INSTANCE_ID/v1/workspaces/TU_WORKSPACE_ID/message?version=2021-06-14', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('apikey:TU_API_KEY')
        },
        body: JSON.stringify({
            input: { text: message }
        })
    });

    const data = await response.json();
    return data.output.generic[0].text; // Extraer la respuesta de Watson
}

// Evento para recibir mensajes y animar el bot
sendMessageToWatson("Hola").then(response => {
    console.log("Watson dice: ", response);
    if (response.includes("hola") && botModel) {
        botModel.rotation.y += 0.5; // Ejemplo de animación simple
    }
});
