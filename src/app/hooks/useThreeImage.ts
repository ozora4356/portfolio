import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface UseThreeImageProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  src: string;
}

export const useThreeImage = ({ containerRef, src }: UseThreeImageProps) => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.OrthographicCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [planeMesh, setPlaneMesh] = useState<THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.ShaderMaterial
  > | null>(null);
  const mousePosition = useRef({ x: 0.5, y: 0.5 });
  const targetMousePosition = useRef({ x: 0.5, y: 0.5 });
  const prevPosition = useRef({ x: 0.5, y: 0.5 });
  const aberrationIntensity = useRef(0.0);
  const easeFactor = useRef(0.02);

  useEffect(() => {
    if (!containerRef.current) return;

    const initializeScene = (texture: THREE.Texture) => {
      texture.matrixAutoUpdate = true;
      const newScene = new THREE.Scene();
      const aspect = containerRef.current
        ? containerRef.current.offsetWidth / containerRef.current.offsetHeight
        : 16 / 9;

      const newCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
      newCamera.position.z = 1;

      const shaderUniforms = {
        u_mouse: { type: "v2", value: new THREE.Vector2() },
        u_prevMouse: { type: "v2", value: new THREE.Vector2() },
        u_aberrationIntensity: { type: "f", value: 0.0 },
        u_texture: { type: "t", value: texture },
        u_scale: { type: "v2", value: new THREE.Vector2(1, 1) },
      };

      // 画像のアスペクト比を計算
      const imageAspect = texture.image.width / texture.image.height;
      const containerAspect = aspect;

      // スケールを計算（画像がコンテナを完全にカバーするように）
      let scaleX = 1;
      let scaleY = 1;

      if (containerAspect > imageAspect) {
        // コンテナの方が横長の場合、横幅に合わせる
        scaleX = 1;
        scaleY = containerAspect / imageAspect;
      } else {
        // コンテナの方が縦長の場合、縦幅に合わせる
        scaleX = imageAspect / containerAspect;
        scaleY = 1;
      }

      shaderUniforms.u_scale.value.set(scaleX, scaleY);

      const newPlaneMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader: `
            varying vec2 vUv;
            uniform vec2 u_scale;

            void main() {
              vUv = uv;
              // スケールを適用してUVを調整
              vUv = (vUv - 0.5) / u_scale + 0.5;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec2 vUv;
            uniform sampler2D u_texture;    
            uniform vec2 u_mouse;
            uniform vec2 u_prevMouse;
            uniform float u_aberrationIntensity;

            void main() {
              // UV座標が0-1の範囲外の場合は透明にする
              if(vUv.x < 0.0 || vUv.x > 1.0 || vUv.y < 0.0 || vUv.y > 1.0) {
                gl_FragColor = vec4(0.0);
                return;
              }

              // タイルサイズを10x10に変更（より大きなタイル）
              vec2 gridUV = floor(vUv * vec2(10.0, 10.0)) / vec2(10.0, 10.0);
              vec2 centerOfPixel = gridUV + vec2(1.0/10.0, 1.0/10.0);
              
              vec2 mouseDirection = u_mouse - u_prevMouse;
              
              vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
              float pixelDistanceToMouse = length(pixelToMouseDirection);
              float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

              vec2 uvOffset = strength * - mouseDirection * 0.2;
              vec2 uv = vUv - uvOffset;

              vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
              vec4 colorG = texture2D(u_texture, uv);
              vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

              gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
            }
          `,
        })
      );

      newScene.add(newPlaneMesh);

      const newRenderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      if (containerRef.current) {
        newRenderer.setSize(
          containerRef.current.offsetWidth,
          containerRef.current.offsetHeight
        );
        newRenderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(newRenderer.domElement);
      }

      setScene(newScene);
      setCamera(newCamera);
      setRenderer(newRenderer);
      setPlaneMesh(newPlaneMesh);
    };

    new THREE.TextureLoader().load(src, initializeScene);

    return () => {
      if (renderer && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [src, containerRef]);

  useEffect(() => {
    if (!scene || !camera || !renderer || !planeMesh) return;

    const animate = () => {
      requestAnimationFrame(animate);

      mousePosition.current.x +=
        (targetMousePosition.current.x - mousePosition.current.x) *
        easeFactor.current;
      mousePosition.current.y +=
        (targetMousePosition.current.y - mousePosition.current.y) *
        easeFactor.current;

      planeMesh.material.uniforms.u_mouse.value.set(
        mousePosition.current.x,
        1.0 - mousePosition.current.y
      );

      planeMesh.material.uniforms.u_prevMouse.value.set(
        prevPosition.current.x,
        1.0 - prevPosition.current.y
      );

      aberrationIntensity.current = Math.max(
        0.0,
        aberrationIntensity.current - 0.05
      );
      planeMesh.material.uniforms.u_aberrationIntensity.value =
        aberrationIntensity.current;

      renderer.render(scene, camera);
    };

    animate();
  }, [scene, camera, renderer, planeMesh]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    easeFactor.current = 0.02;
    const rect = containerRef.current.getBoundingClientRect();
    prevPosition.current = { ...targetMousePosition.current };

    targetMousePosition.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };

    aberrationIntensity.current = 1;
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    easeFactor.current = 0.02;
    const rect = containerRef.current.getBoundingClientRect();

    mousePosition.current = targetMousePosition.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  };

  const handleMouseLeave = () => {
    easeFactor.current = 0.05;
    targetMousePosition.current = { ...prevPosition.current };
  };

  return {
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
};
