import React, { useRef, useEffect, useState } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { CubeMaterial, CubeMaterialType } from "../shaders/cubeMaterial";
import { gsap } from "gsap";
import * as THREE from "three";

// マテリアルをコンポーネントとして登録
extend({ CubeMaterial });

// 設定の型定義
type MaterialSettings = {
  [key: string]: {
    start: number;
    end: number;
  };
};

// セクション定義の型
type Section = {
  id: string;
  position: [number, number, number]; // x, y, z座標
  scale?: number; // スケール（オプション）
  opacity?: number; // 透明度（オプション）
  deepPurple?: number; // 色の強さ（オプション）
};

// 球体コンポーネント
const FixedSphere = () => {
  const materialRef = useRef<CubeMaterialType>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  //64
  const subdivisionLevel = 32;
  // 現在のセクションID
  const [currentSection, setCurrentSection] = useState<string>("");
  // 初期アニメーションが完了したかどうかのフラグ
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState<boolean>(false);

  const [scroll, setScroll] = useState({
    height: 0,
    limit: 0,
    hard: 0,
    soft: 0,
    ease: 0.05,
    normalized: 0,
    running: false,
  });

  // セクション定義
  const sections: Section[] = [
    {
      id: "hero",
      position: [0, 0, 0],
      scale: 1,
      opacity: 1,
    },
    {
      id: "works",
      position: [-2.2, -0.8, 0],
      scale: 1.5,
      opacity: 0.4,
    },
    {
      id: "about",
      position: [1.6, -1, 0],
      scale: 1.5,
      opacity: 0.3,
    },
    {
      id: "footer",
      position: [1.6, -1, 0],
      scale: 1.5,
      opacity: 0.3,
    },
  ];

  const settings: MaterialSettings = {
    // vertex
    // 波の周波数
    uFrequency: {
      start: 0,
      end: 2,
    },
    // 波の振幅
    uAmplitude: {
      start: 4,
      end: 4,
    },
    // 波の密度
    uDensity: {
      start: 1,
      end: 1,
    },
    // 波の強さ
    uStrength: {
      start: 0,
      end: 1.1,
    },
    // fragment
    // 波の色
    uDeepPurple: {
      start: 0.4,
      end: 0,
    },
    // 波の透明度
    uOpacity: {
      start: 0.1,
      end: 0.1,
    },
  };

  // セクションを検出する関数
  const detectSection = () => {
    // セクション要素を取得
    const sectionElements = document.querySelectorAll(
      "section, [data-section]"
    );
    if (sectionElements.length === 0) return;

    // 現在のスクロール位置
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const viewportCenter = scrollTop + windowHeight / 2;

    // 最も中央に近いセクションを見つける
    let closestSection = sectionElements[0];
    let closestDistance = Infinity;

    sectionElements.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = scrollTop + rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - sectionCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
      }
    });

    // セクションIDを取得（data-section属性またはid属性）
    const sectionId =
      closestSection.getAttribute("data-section") ||
      closestSection.id ||
      `section${Array.from(sectionElements).indexOf(closestSection) + 1}`;

    // 現在のセクションが変わった場合のみ更新
    if (sectionId !== currentSection) {
      setCurrentSection(sectionId);

      // 該当するセクション設定を見つける
      const sectionConfig =
        sections.find((s) => s.id === sectionId) || sections[0];

      // 球体の位置とスケールをアニメーションで変更
      if (meshRef.current) {
        gsap.to(meshRef.current.position, {
          x: sectionConfig.position[0],
          y: sectionConfig.position[1],
          z: sectionConfig.position[2],
          duration: 1.5,
          ease: "ease",
        });

        if (sectionConfig.scale !== undefined) {
          gsap.to(meshRef.current.scale, {
            x: sectionConfig.scale,
            y: sectionConfig.scale,
            z: sectionConfig.scale,
            duration: 1.5,
            ease: "ease",
          });
        }
      }

      // マテリアルの透明度と色を変更
      if (materialRef.current) {
        if (sectionConfig.opacity !== undefined) {
          gsap.to(materialRef.current, {
            uOpacity: sectionConfig.opacity,
            duration: 1.5,
            ease: "ease",
          });
        }

        if (sectionConfig.deepPurple !== undefined) {
          gsap.to(materialRef.current, {
            uDeepPurple: sectionConfig.deepPurple,
            duration: 1.5,
            ease: "ease",
          });
        }
      }
    }
  };

  // スクロールアニメーションの更新
  const updateScrollAnimations = () => {
    if (!materialRef.current || !meshRef.current) return;

    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const normalized = Math.min(scrollTop / scrollHeight, 1).toFixed(2);

    // シェーダーユニフォームの更新用のイージング関数を適用
    // パワーイージングを適用（2乗）- シェーダーユニフォームの更新のみに使用
    const easedNormalized = Math.pow(parseFloat(normalized), 1.5);

    setScroll((prev) => ({
      ...prev,
      hard: scrollTop,
      limit: scrollHeight,
      normalized: parseFloat(normalized),
      running: false,
    }));

    // セクション検出
    detectSection();

    // メッシュの回転アニメーション - 通常のnormalizedを使用
    gsap.to(meshRef.current.rotation, {
      x: parseFloat(normalized) * Math.PI,
      duration: 4, // アニメーション時間を長くして慣性を持たせる
      ease: "ease", // より緩やかなイージング
    });

    // シェーダーユニフォームの更新 - easedNormalizedを使用（セクション固有の設定がない場合のみ）
    for (const key in settings) {
      // セクション固有の設定（opacity, deepPurple）以外のパラメータのみ更新
      if (
        key !== "uOpacity" &&
        key !== "uDeepPurple" &&
        settings[key].start !== settings[key].end &&
        materialRef.current
      ) {
        // 慣性を持たせるためにGSAPを使用
        gsap.to(materialRef.current, {
          [key]:
            settings[key].start +
            easedNormalized * (settings[key].end - settings[key].start),
          duration: 2.4, // アニメーション時間を長くして慣性を持たせる
          ease: "ease", // より強いイージング
        });
      }
    }
  };

  // スクロールイベントハンドラ
  const handleScroll = () => {
    if (!scroll.running) {
      window.requestAnimationFrame(updateScrollAnimations);
      setScroll((prev) => ({ ...prev, running: true }));
    }
  };

  // リサイズイベントハンドラ
  const handleResize = () => {
    if (meshRef.current && initialAnimationComplete) {
      if (window.innerWidth < window.innerHeight) {
        meshRef.current.scale.set(0.75, 0.75, 0.75);
      } else {
        meshRef.current.scale.set(1, 1, 1);
      }
    }
  };

  // 初期化とイベントリスナーの設定
  useEffect(() => {
    // マテリアルの設定
    if (materialRef.current) {
      materialRef.current.wireframe = true;
      materialRef.current.transparent = true; // 透明度を使用するためtrueに変更
      materialRef.current.blending = THREE.NormalBlending;

      // 初期値の設定
      materialRef.current.uFrequency = settings.uFrequency.start;
      materialRef.current.uAmplitude = settings.uAmplitude.start;
      materialRef.current.uDensity = settings.uDensity.start;
      materialRef.current.uStrength = settings.uStrength.start;
      materialRef.current.uDeepPurple = settings.uDeepPurple.start;
      materialRef.current.uOpacity = settings.uOpacity.start;

      // 初期アニメーション（最初から鮮やかな色にする、ただし変形はしない）
      gsap.to(materialRef.current, {
        uDeepPurple: settings.uDeepPurple.start,
        uOpacity: settings.uOpacity.start,
        duration: 1.5,
        ease: "power2.out",
      });
    }

    // 初期セクション設定を適用
    if (meshRef.current) {
      const initialSection =
        sections.find((s) => s.id === currentSection) || sections[0];
      meshRef.current.position.set(
        initialSection.position[0],
        initialSection.position[1],
        initialSection.position[2]
      );

      // 初期スケールを0に設定（アニメーション開始前）
      meshRef.current.scale.set(0, 0, 0);

      // 初期の透明度と色を設定
      if (materialRef.current) {
        if (initialSection.opacity !== undefined) {
          materialRef.current.uOpacity = initialSection.opacity;
        }
        if (initialSection.deepPurple !== undefined) {
          materialRef.current.uDeepPurple = initialSection.deepPurple;
        }
      }

      // 出現アニメーション - 0から適切なサイズへ
      const targetScale =
        initialSection.scale !== undefined
          ? initialSection.scale
          : window.innerWidth < window.innerHeight
          ? 0.75
          : 1;

      // 少し遅延させてアニメーションを開始（初期レンダリングの問題を回避）
      setTimeout(() => {
        if (meshRef.current) {
          gsap.to(meshRef.current.scale, {
            x: targetScale,
            y: targetScale,
            z: targetScale,
            duration: 1.2, // アニメーション時間
            ease: "elastic.out(1, 0.5)", // 弾力のあるアニメーション
            onComplete: () => {
              setInitialAnimationComplete(true);
            },
          });
        }
      }, 100);
    }

    // イベントリスナーの追加
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // 初期状態でもアニメーションを一度実行
    updateScrollAnimations();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // アニメーション
  useFrame(() => {
    if (meshRef.current) {
      // Y軸回転のみ継続的に適用
      meshRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <>
      {/* 初期スケールを0に設定して、アニメーション前のチラつきを防止 */}
      <mesh
        ref={meshRef}
        scale={[0, 0, 0]}
      >
        <icosahedronGeometry args={[1, subdivisionLevel]} />
        {/* @ts-expect-error - cubeMaterial is defined in cubeMaterial.ts */}
        <cubeMaterial ref={materialRef} />
      </mesh>
    </>
  );
};

export default FixedSphere;
