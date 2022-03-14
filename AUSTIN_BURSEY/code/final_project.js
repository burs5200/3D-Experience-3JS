import {FirstPersonControls} from './FirstPersonControls.js'
import { GLTFLoader } from '../lib/GLTFLoader.js';
// import { InteractionManager } from '../lib/three.interaction';
//necessary 3.js stuff

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.77, 30 );
const renderer = new THREE.WebGLRenderer({alpha: true, antialias:true});

renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.shadowMap.type = THREE.BasicShadowMap; 
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background = new THREE.Color(0x14A8F1); 


var raycaster = new THREE.Raycaster(); // create once
var mouse = new THREE.Vector2(); // create once

var toadModel; 
var tesseractModel; 
var cameraModel;  


//for turning lights on and off 
document.addEventListener('mousedown', onDocumentMouseDown, false); 
//load Tables


const loader = new GLTFLoader();

loader.load( '../3DModels/Table/scene.gltf', function ( gltf ) {
    gltf.scene.traverse( function( node ) {

        if ( node.isMesh ) {
             node.castShadow = true;
             node.receiveShadow = true;
             if(node.material.map){
                node.material.map.anisotropy = 16; 
                }   
            }
            
    } );
    var tableModel1 = gltf.scene; 
    tableModel1.position.x = 6;
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( '../3DModels/Table/scene.gltf', function ( gltf ) {
    gltf.scene.traverse( function( node ) {

        if ( node.isMesh ) {
            node.castShadow = true;
            node.receiveShadow = true;
            if(node.material.map){
                node.material.map.anisotropy = 16; 
                } 
        }

    } );
    var tableModel1 = gltf.scene; 
    tableModel1.position.x = 6;
    tableModel1.position.z = -4 ;
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( '../3DModels/Table/scene.gltf', function ( gltf ) {
    gltf.scene.traverse( function( node ) {

        if ( node.isMesh ) {
             node.castShadow = true;
             node.receiveShadow = true;
             if(node.material.map){
                node.material.map.anisotropy = 16; 
                } 
              }

    } );
    var tableModel1 = gltf.scene; 
    tableModel1.position.x = 6;
    tableModel1.position.z = 4 ;
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );



//load objects



loader.load( '../3DModels/Toad/scene.gltf', function ( gltf ) {
    gltf.scene.traverse( function( node ) {

        if ( node.isMesh ) {
             node.castShadow = true;
             node.receiveShadow = true;
             if(node.material.map){
                node.material.map.anisotropy = 16; 
                }   }

    } );
    toadModel = gltf.scene; 
    toadModel.position.set(6,1,-4);
    toadModel.scale.multiplyScalar(1 /250);
 
    
	scene.add( toadModel);

}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( '../3DModels/Tesseract/scene.gltf', function ( gltf ) {
    gltf.scene.traverse( function( node ) {

        if ( node.isMesh ) {
             node.castShadow = true;
             node.receiveShadow = true;
             if(node.material.map){
                node.material.map.anisotropy = 16; 
                } 
              }

    } );
    tesseractModel = gltf.scene; 
    tesseractModel.position.x = 6; 
    tesseractModel.position.y = 1.25; 
    tesseractModel.scale.multiplyScalar(1 /10); 
    
	scene.add( tesseractModel);

}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( '../3DModels/Camera/scene.gltf', function ( gltf ) {
    gltf.scene.traverse( function( node ) {

        if ( node.isMesh ) {
             node.castShadow = true;
             node.receiveShadow = true;
             if(node.material.map){
                node.material.map.anisotropy = 16; 
                } 
              }

    } );
    cameraModel = gltf.scene; 
    cameraModel.position.set(6,1,4);

    
    
	scene.add( cameraModel);

}, undefined, function ( error ) {

	console.error( error );

} );


//add directional light 
var tesseLight = true; 
const tesseDirectLight = new THREE.PointLight(0xffffff, 1.5 ,6,2 ); // soft white light 
tesseDirectLight.position.set(5,1.5,0);
tesseDirectLight.castShadow = true;



scene.add( tesseDirectLight );

//add directional light 
var toadLight = true; 
const toadDirectLight = new THREE.PointLight(0xffffff, 1.5 ,6,2 ); // soft white light 
toadDirectLight.position.set(5,1.5,-4);
toadDirectLight.castShadow = true;
scene.add( toadDirectLight );

//add directional light 
var cameraLight = true; 
const cameraDirectLight = new THREE.PointLight(0xffffff, 1.5 ,6,2 ); // soft white light 
cameraDirectLight.position.set(5,1.5,4);
cameraDirectLight.castShadow = true;
scene.add( cameraDirectLight );

//add Sun

const Sun = new THREE.PointLight(0xffffff, 0.25 ); // soft white light
Sun.position.y = 30;
Sun.position.z = -20;
Sun.castShadow = true;


scene.add( Sun );
//ambient light 
const ambientLight = new THREE.AmbientLight(0x404040, 1.5 ); // soft white light
ambientLight.position.y = 10; 

scene.add( ambientLight );

const pillarGeometry = new THREE.BoxBufferGeometry(0.25,1.15,0.25);
const pillarMaterial = new THREE.MeshStandardMaterial( { color: 0X1F2835 } );
const pillar1 = new THREE.Mesh( pillarGeometry, pillarMaterial );
pillar1.position.x = 6 ;
pillar1.position.z = 1;  
pillar1.castShadow = true; //default is false
pillar1.receiveShadow = true; //default
scene.add( pillar1 );

const pillar2 = new THREE.Mesh( pillarGeometry, pillarMaterial );
pillar2.position.x = 6 ;
pillar2.position.z = -3 ; 
pillar2.castShadow = true; //default is false
pillar2.receiveShadow = true; //default
scene.add( pillar2 );


const pillar3 = new THREE.Mesh( pillarGeometry, pillarMaterial );
pillar3.position.x = 6 ;
pillar3.position.z = 5 ; 
pillar3.castShadow = true; //default is false
pillar3.receiveShadow = true; //default
scene.add( pillar3 );


const buttonGeometry = new THREE.BoxBufferGeometry(0.15,.05,0.15);
const buttonMaterial1 = new THREE.MeshStandardMaterial( { color: 0x00FF00 } );
const button1 = new THREE.Mesh( buttonGeometry, buttonMaterial1 );
button1.position.x = 6 ;
button1.position.y = .60;
button1.position.z = 1;  
button1.castShadow = true; //default is false
button1.receiveShadow = true; //default
scene.add( button1 );

const buttonMaterial2 = new THREE.MeshStandardMaterial( { color: 0x00FF00 } );
const button2 = new THREE.Mesh( buttonGeometry, buttonMaterial2 );
button2.position.x = 6 ;
button2.position.y = .60;
button2.position.z = -3;  
button2.castShadow = true; //default is false
button2.receiveShadow = true; //default
scene.add( button2);
const buttonMaterial3 = new THREE.MeshStandardMaterial( { color: 0x00FF00 } );
const button3 = new THREE.Mesh( buttonGeometry, buttonMaterial3 );
button3.position.x = 6 ;
button3.position.y = .60;
button3.position.z = 5;  
button3.castShadow = true; //default is false
button3.receiveShadow = true; //default
scene.add( button3);


const textureLoader = new THREE.TextureLoader();

const brickTexture = textureLoader.load( "../Textures/Brick.jpg" );
brickTexture.repeat.set( 20, 10 );
brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.encoding = THREE.sRGBEncoding;
const stoneTexture = textureLoader.load( "../Textures/Stone.jpg" );
stoneTexture.repeat.set( 20, 10 );
stoneTexture.wrapS = stoneTexture.wrapT = THREE.RepeatWrapping;
stoneTexture.encoding = THREE.sRGBEncoding;

//add box 
const boxGeometry1 = new THREE.BoxBufferGeometry(1,5,20);
const boxMaterial1 = new THREE.MeshStandardMaterial( { color: 0xFFFFFF, map: brickTexture } );
const cube1 = new THREE.Mesh( boxGeometry1, boxMaterial1 );
cube1.position.x = -8;
cube1.position.z= 0; 
cube1.castShadow = true; //default is false
cube1.receiveShadow = true; //default
scene.add( cube1 );

const cube2 = new THREE.Mesh( boxGeometry1, boxMaterial1);
cube2.position.x = 8;
cube2.position.z= 0; 
cube2.castShadow = true; //default is false
cube2.receiveShadow = true; //default
scene.add( cube2 );

const boxGeometry3 = new THREE.BoxBufferGeometry(17,5,1);
const cube3 = new THREE.Mesh( boxGeometry3, boxMaterial1);
cube3.position.x = 0;
cube3.position.z= -10; 
cube3.castShadow = true; //default is false
cube3.receiveShadow = true; //default
scene.add( cube3 );

//add a plane 
let planeGeometry  = new THREE.PlaneBufferGeometry(100,100, 1,1); 
let planeMaterial = new THREE.MeshStandardMaterial({map:stoneTexture})
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5*Math.PI;
plane.receiveShadow = true;
scene.add(plane);
//create first person controls 
var firstPersonCameraControls = new FirstPersonControls(camera,document);


camera.position.z = 15;
camera.position.x = 1;  
camera.position.y = 1 ;
camera.lookAt(scene.position);
var clock = new THREE.Clock();
const animate = function () {
    //get clock for fps 
    let delta = clock.getDelta();
    //turn off and on direction lights
    tesseDirectLight.visible = tesseLight;
    toadDirectLight.visible = toadLight; 
    cameraDirectLight.visible = cameraLight;
    if (tesseractModel){
        tesseractModel.rotation.x += 0.01; 
        tesseractModel.rotation.z += 0.01;
    }

    if (cameraModel){
        cameraModel.rotation.y += 0.01; 
    }
    if (toadModel){
        toadModel.rotation.y += 0.01; 
        
        
    }
 
    //update first person view  
    firstPersonCameraControls.update(delta);
    renderer.clear();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};
function onDocumentMouseDown(event){
    event.preventDefault(); 
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    let objArray = [button1]; 
    var intersects = raycaster.intersectObjects( objArray );
    if (intersects.length > 0  && intersects[0].distance < 25 ){
        
        tesseLight = !(tesseLight);
        renderer.shadowMap.needsUpdate = true; 
        if (tesseLight){
            button1.material.color.setHex( 0x00FF00);
        }else {
            button1.material.color.setHex( 0xBB000B);
        }
    }
    objArray = [button2]; 
    var intersects = raycaster.intersectObjects( objArray );
    if (intersects.length > 0  && intersects[0].distance < 25 ){
        renderer.shadowMap.needsUpdate = true; 
        toadLight = !(toadLight);
        if (toadLight){
            button2.material.color.setHex( 0x00FF00);
        }else {
            button2.material.color.setHex( 0xBB000B);
        }
    }
    objArray = [button3]; 
    var intersects = raycaster.intersectObjects( objArray );
    if (intersects.length > 0  && intersects[0].distance < 25 ){
        
        renderer.shadowMap.needsUpdate = true; 
        cameraLight = !(cameraLight);
        if (cameraLight){
            button3.material.color.setHex( 0x00FF00);
        }else {
            button3.material.color.setHex( 0xBB000B);
        }
    }
}

animate();