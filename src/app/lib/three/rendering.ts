import { EffectComposer, RenderPass, Pass } from "postprocessing";
import * as THREE from "three";
import { N8AOPostPass } from "n8ao";

export class Rendering {
  canvas: HTMLCanvasElement;
  vp: {
    canvas: {
      width: number;
      height: number;
      dpr: number;
    };
    scene: {
      width: number;
      height: number;
    };
    screen: {
      width: number;
      height: number;
    };
  };
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  clock: THREE.Clock;
  disposed: boolean;
  usePostProcess: boolean;
  composer?: EffectComposer;

  constructor(canvas: HTMLCanvasElement, usePostProcess = false) {
    this.canvas = canvas;
    this.usePostProcess = usePostProcess;
    this.disposed = false;

    this.vp = {
      canvas: {
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        dpr: Math.min(window.devicePixelRatio, 1.5),
      },
      scene: {
        width: 1,
        height: 1,
      },
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.camera = new THREE.PerspectiveCamera(
      6,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(40, 40, 40);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (usePostProcess) {
      const composer = new EffectComposer(this.renderer);
      composer.addPass(new RenderPass(this.scene, this.camera));

      const n8aopass = new N8AOPostPass(
        this.scene,
        this.camera,
        this.vp.canvas.width,
        this.vp.canvas.height
      );
      n8aopass.configuration.aoRadius = 0.2;
      n8aopass.configuration.distanceFalloff = 0.5;
      n8aopass.configuration.intensity = 20.0;
      n8aopass.configuration.color = new THREE.Color(0, 0, 0);
      n8aopass.configuration.aoSamples = 8;
      n8aopass.configuration.denoiseSamples = 4;
      n8aopass.configuration.denoiseRadius = 12;
      n8aopass.configuration.halfRes = true;
      n8aopass.setQualityMode("Medium");
      n8aopass.screenSpaceRadius = true;

      composer.addPass(n8aopass as unknown as Pass);
      this.composer = composer;
    }

    this.addEvents();
    this.onResize();
  }

  addEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  dispose() {
    this.disposed = true;
    this.renderer.dispose();
    this.scene.clear();
    window.removeEventListener("resize", this.onResize.bind(this));
  }

  getViewSizeAtDepth(depth = 0) {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      (this.camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
    );
    return { width: height * this.camera.aspect, height };
  }

  render() {
    if (this.disposed) return;
    if (this.usePostProcess && this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
