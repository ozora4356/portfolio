import { gsap } from "gsap";
import * as THREE from "three";
import { Rendering } from "../../../app/lib/three/rendering";
import RoundedBox from "./RoundedBox";

interface InstancedMouseEffectOptions {
  speed?: number;
  frequency?: number;
  mouseSize?: number;
  rotationSpeed?: number;
  rotationAmmount?: number;
  mouseScaling?: number;
  mouseIndent?: number;
  color?: string;
  colorDegrade?: number;
  shape?: string | THREE.BufferGeometry;
}

export class InstancedMouseEffect {
  rendering!: Rendering;
  animation!: gsap.core.Timeline;

  constructor(
    opts: InstancedMouseEffectOptions = {},
    follower: THREE.Mesh | null = null
  ) {
    if (opts.speed == null) opts.speed = 1;
    if (opts.frequency == null) opts.frequency = 1;
    if (opts.mouseSize == null) opts.mouseSize = 1;
    if (opts.rotationSpeed == null) opts.rotationSpeed = 1;
    if (opts.rotationAmmount == null) opts.rotationAmmount = 0;
    if (opts.mouseScaling == null) opts.mouseScaling = 0;
    if (opts.mouseIndent == null) opts.mouseIndent = 1;
    if (opts.color == null) opts.color = "#1084ff";
    if (opts.colorDegrade == null) opts.colorDegrade = 1.0;
    if (opts.shape == null) opts.shape = "square";

    // Renderer setup
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const rendering = new Rendering(canvas);
    rendering.renderer.shadowMap.enabled = true;
    rendering.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendering.camera.position.set(40, 40, 40);
    rendering.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.rendering = rendering;

    const uTime = { value: 0 };
    const uPos0 = { value: new THREE.Vector2() };
    const uPos1 = { value: new THREE.Vector2() };
    const uAnimate = { value: 0 };
    const uConfig = {
      value: new THREE.Vector4(
        opts.speed,
        opts.frequency,
        opts.mouseSize,
        opts.rotationSpeed
      ),
    };
    const uConfig2 = {
      value: new THREE.Vector4(
        opts.rotationAmmount,
        opts.mouseScaling,
        opts.mouseIndent
      ),
    };

    // Light Setup
    rendering.scene.add(new THREE.HemisphereLight(0x9f9f9f, 0xffffff, 3));
    rendering.scene.add(new THREE.AmbientLight(0xffffff, 3));

    const d2 = new THREE.DirectionalLight(0x909090, 3);
    rendering.scene.add(d2);
    d2.position.set(-1, 0.5, 1).multiplyScalar(10);

    const d1 = new THREE.DirectionalLight(0xffffff, 4);
    rendering.scene.add(d1);
    d1.position.set(1, 0.5, 1).multiplyScalar(10);

    d1.castShadow = true;
    d1.shadow.camera.left = -10;
    d1.shadow.camera.right = 10;
    d1.shadow.camera.top = 10;
    d1.shadow.camera.bottom = -10;
    d1.shadow.camera.far = 40;
    d1.shadow.mapSize.width = 2048;
    d1.shadow.mapSize.height = 2048;

    // Grid setup
    const grid = 55;
    const size = 0.5;
    const gridSize = grid * size;

    let geometry: THREE.BufferGeometry;

    if (typeof opts.shape === "string") {
      switch (opts.shape) {
        case "cylinder":
          geometry = new THREE.CylinderGeometry(size, size, size);
          break;
        case "torus":
          geometry = new THREE.TorusGeometry(size * 0.5, size * 0.3);
          break;
        case "icosahedron":
          geometry = new THREE.IcosahedronGeometry(size, 0);
          break;
        default:
          geometry = new RoundedBox(size, size, size, 0.1, 4);
      }
    } else {
      geometry = opts.shape;
    }

    const material = new THREE.MeshPhysicalMaterial({
      color: opts.color,
      metalness: 0,
      roughness: 0.0,
    });

    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "void main() {",
        `
          uniform float uTime;
          uniform float uAnimate;
          uniform vec2 uPos0;
          uniform vec2 uPos1;
          uniform vec4 uConfig;
          uniform vec4 uConfig2;

          float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
          }

          mat4 rotationMatrix(vec3 axis, float angle) {
            axis = normalize(axis);
            float s = sin(angle);
            float c = cos(angle);
            float oc = 1.0 - c;
            
            return mat4(
              oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                  0.0,                                1.0
            );
          }

          vec3 rotate(vec3 v, vec3 axis, float angle) {
            mat4 m = rotationMatrix(axis, angle);
            return (m * vec4(v, 1.0)).xyz;
          }

          float sdSegment(in vec2 p, in vec2 a, in vec2 b) {
            vec2 pa = p-a, ba = b-a;
            float h = clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
            return length(pa - ba*h);
          }

          void main() {
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        `
          vec4 position = instanceMatrix[3];
          float toCenter = length(position.xz);

          float mouseTrail = sdSegment(position.xz, uPos0, uPos1);
          mouseTrail = smoothstep(2.0, 5.0 * uConfig.z, mouseTrail);

          // Mouse Scale
          transformed *= 1.0 + (1.0-mouseTrail) * uConfig2.y;

          // Instance Animation
          float start = 0.0 + toCenter * 0.02;
          float end = start + (toCenter + 1.5) * 0.06;
          float anim = map(clamp(uAnimate, start, end), start, end, 0.0, 1.0);

          transformed = rotate(
            transformed,
            vec3(0.0, 1.0, 1.0),
            uConfig2.x * (anim * 3.14 + uTime * uConfig.x + toCenter * 0.4 * uConfig.w)
          );

          // Mouse Offset
          transformed.y += (-1.0 * (1.0-mouseTrail)) * uConfig2.z;

          transformed.xyz *= anim;
          transformed.y += (1.0-anim) * 1.0;

          transformed.y += sin(uTime * 2.0 * uConfig.x + toCenter * uConfig.y) * 0.1;

          vec4 mvPosition = vec4(transformed, 1.0);

          #ifdef USE_INSTANCING
            mvPosition = instanceMatrix * mvPosition;
          #endif

          mvPosition = modelViewMatrix * mvPosition;
          gl_Position = projectionMatrix * mvPosition;
        `
      );
      shader.uniforms = {
        ...shader.uniforms,
        uTime,
        uAnimate,
        uPos0,
        uPos1,
        uConfig,
        uConfig2,
      };
    };

    const mesh = new THREE.InstancedMesh(geometry, material, grid * grid);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const totalColor = material.color.r + material.color.g + material.color.b;
    const color = new THREE.Vector3();
    const weights = new THREE.Vector3(
      material.color.r,
      material.color.g,
      material.color.b
    )
      .divideScalar(totalColor)
      .multiplyScalar(-0.5)
      .addScalar(1.0);

    const dummy = new THREE.Object3D();
    let i = 0;

    for (let x = 0; x < grid; x++)
      for (let y = 0; y < grid; y++) {
        dummy.position.set(
          x * size - gridSize / 2 + size / 2,
          0,
          y * size - gridSize / 2 + size / 2
        );

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        const center = 1.0 - dummy.position.length() * 0.12 * opts.colorDegrade;
        color.set(
          center * weights.x + (1.0 - weights.x),
          center * weights.y + (1.0 - weights.y),
          center * weights.z + (1.0 - weights.z)
        );
        mesh.setColorAt(i, new THREE.Color(color.x, color.y, color.z));

        i++;
      }

    rendering.scene.add(mesh);

    // Animation
    const t1 = gsap.timeline({ paused: true });
    t1.to(
      uAnimate,
      {
        value: 1,
        duration: 3.0,
        ease: "none",
      },
      0.0
    );

    if (follower) {
      follower.scale.setScalar(0);
      rendering.scene.add(follower);
      t1.from(
        follower.scale,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: "back.out",
        },
        1
      );
    }

    this.animation = t1;

    // Intersection Observer setup
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            t1.play(); // 要素が表示領域に入ったらアニメーション開始
            observer.disconnect(); // 一度だけ実行
          }
        });
      },
      {
        threshold: 0.1, // 10%以上表示されたら発火
      }
    );

    if (canvas) {
      observer.observe(canvas);
    }

    // Mouse interaction
    const hitplane = new THREE.Mesh(
      new THREE.PlaneGeometry(),
      new THREE.MeshBasicMaterial()
    );
    hitplane.scale.setScalar(20);
    hitplane.rotation.x = -Math.PI / 2;
    hitplane.updateMatrix();
    hitplane.updateMatrixWorld();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const v2 = new THREE.Vector2();
    const prevMouse = new THREE.Vector2();

    window.addEventListener("mousemove", (ev) => {
      const x = ev.clientX / window.innerWidth - 0.5;
      const y = ev.clientY / window.innerHeight - 0.5;

      v2.x = x * 2;
      v2.y = -y * 2;
      raycaster.setFromCamera(v2, rendering.camera);

      const intersects = raycaster.intersectObject(hitplane);

      if (intersects.length > 0) {
        const first = intersects[0];
        prevMouse.copy(mouse);
        mouse.x = first.point.x;
        mouse.y = first.point.z;
        uPos0.value.copy(prevMouse);
        uPos1.value.copy(mouse);
      }
    });

    const tick = (t: number) => {
      if (rendering.disposed) {
        gsap.ticker.remove(tick);
        return;
      }

      uTime.value = t;

      // マウスの位置のみを更新し、メッシュは動かさない
      uPos0.value.copy(prevMouse);
      uPos1.value.copy(mouse);

      if (follower) {
        follower.position.x = uPos0.value.x;
        follower.position.z = uPos0.value.y;
        follower.rotation.x = t;
        follower.rotation.y = t;
      }

      rendering.render();
    };

    gsap.ticker.add(tick);
  }
}
