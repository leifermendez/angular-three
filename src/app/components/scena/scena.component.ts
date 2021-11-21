import { animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three'
import { AmbientLight, PerspectiveCamera, Scene, WebGL1Renderer, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CameraUtils } from 'three/examples/jsm/utils/CameraUtils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


@Component({
  selector: 'app-scena',
  templateUrl: './scena.component.html',
  styleUrls: ['./scena.component.css']
})
export class ScenaComponent implements AfterViewInit {
  @ViewChild('refCanvas') refCanvas: ElementRef = new ElementRef('')
  loading = false;

  constructor() { }

  ngAfterViewInit(): void {
    this.loadAll('bmw_m3_coupe_e30_1986')
  }

  getDimension(): { width: number, height: number } {
    const canvas: HTMLCanvasElement = this.refCanvas.nativeElement;
    const { width, height } = canvas.getBoundingClientRect()
    return { width, height }
  }

  loadAll(model: string): void {
    let root: any;
    /**
     * //TODO: Html puro!
     */
    const canvas: HTMLCanvasElement = this.refCanvas.nativeElement;
    const { width, height } = this.getDimension()

    /**
     * //TODO Scena! donde se desenvuelve la situacion
     */
    const scene: Scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd)

    /**
     * //TODO: El camaras!
     */

    const camera: PerspectiveCamera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 2000);
    camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = 100;
    camera.position.y = 50;
    camera.position.z = 1000;
    const helper = new THREE.CameraHelper(camera);
    const bottomLeftCorner = new THREE.Vector3();
    const bottomRightCorner = new THREE.Vector3();
    const topLeftCorner = new THREE.Vector3();

    // scene.add(helper);


    /**
     * //TODO: Luces!
     */
    const hlight = new THREE.AmbientLight(0x404040, 8);
    scene.add(hlight)
    const directionalLight = new THREE.DirectionalLight(0x404040, 10);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const light = new THREE.PointLight(0xc4c4c4, 3);
    light.position.set(0, 300, 500);
    scene.add(light);
    const light2 = new THREE.PointLight(0xc4c4c4, 2);
    light2.position.set(500, 100, 0);
    scene.add(light2);
    const light3 = new THREE.PointLight(0xc4c4c4, 3);
    light3.position.set(0, 100, -500);
    scene.add(light3);
    const light4 = new THREE.PointLight(0xc4c4c4, 3);
    light4.position.set(-500, 300, 500);
    scene.add(light4);

    const helper1 = new THREE.PointLightHelper(light)
    scene.add(helper1)


    /**
     * //TODO: Elementos de la escena!
     */


    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      color: 'red'
    })

    const mesh = new THREE.Mesh(geometry, material)
    // scene.add(mesh)

    /**
     * //TODO: Modelo
     */
    const loader = new GLTFLoader()
    loader.load(`./assets/models/${model}/scene.gltf`, (gltf) => {
      root = gltf.scene;
      root.scale.set(25, 25, 25)
      scene.add(root)
      console.log('Ready', gltf)
      this.loading = false
    }, () => {
      this.loading = true
    }, (err) => {
      this.loading = false
    })
    /**
     * //TODO: (EDICION) Todo ensamblado!
     */
    const renderer: WebGL1Renderer = new THREE.WebGL1Renderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setSize(width, height)

    /**
 * //TODO: Control de Orbita
 */
    const controls = new OrbitControls(camera, renderer.domElement);


    function animate() {
      requestAnimationFrame(animate);
      root.rotation.y += .005
      renderer.render(scene, camera);

    }


    animate()
  }


  reRender() {
    const event = new Event('resize');
    setTimeout(() => {
      dispatchEvent(event);
    });
  }



}
