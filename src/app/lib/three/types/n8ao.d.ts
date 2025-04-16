declare module 'n8ao' {
  import type * as THREE from 'three';

  export class N8AOPostPass {
    constructor(
      scene: THREE.Scene,
      camera: THREE.Camera,
      width: number,
      height: number
    );
    configuration: {
      aoRadius: number;
      distanceFalloff: number;
      intensity: number;
      color: THREE.Color;
      aoSamples: number;
      denoiseSamples: number;
      denoiseRadius: number;
      halfRes: boolean;
    };
    setQualityMode(mode: string): void;
    screenSpaceRadius: boolean;
  }
}
