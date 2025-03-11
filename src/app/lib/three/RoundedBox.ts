import * as THREE from "three";

/**
 * @author pailhead / http://dusanbosnjak.com
 * @author benolayinka / github.com/benolayinka
 */

export default class RoundedBoxGeometry extends THREE.BufferGeometry {
  parameters: {
    width: number;
    height: number;
    depth: number;
    radius: number;
    radiusSegments: number;
  };

  constructor(
    width: number,
    height: number,
    depth: number,
    radius: number,
    radiusSegments: number
  ) {
    super();

    Object.defineProperty(this, "type", {
      value: "RoundedBoxGeometry",
      writable: false,
    });

    // パラメータのバリデーション
    radiusSegments = !isNaN(radiusSegments)
      ? Math.max(1, Math.floor(radiusSegments))
      : 1;
    width = !isNaN(width) ? width : 1;
    height = !isNaN(height) ? height : 1;
    depth = !isNaN(depth) ? depth : 1;
    radius = !isNaN(radius) ? radius : 0.15;

    radius = Math.min(
      radius,
      Math.min(width, Math.min(height, Math.min(depth))) / 2
    );

    const edgeHalfWidth = width / 2 - radius;
    const edgeHalfHeight = height / 2 - radius;
    const edgeHalfDepth = depth / 2 - radius;

    this.parameters = {
      width,
      height,
      depth,
      radius,
      radiusSegments,
    };

    // 頂点数の計算
    const rs1 = radiusSegments + 1;
    const totalVertexCount = (rs1 * radiusSegments + 1) << 3;

    // バッファの作成
    const positions = new THREE.BufferAttribute(
      new Float32Array(totalVertexCount * 3),
      3
    );
    const normals = new THREE.BufferAttribute(
      new Float32Array(totalVertexCount * 3),
      3
    );

    // 変数の準備
    const cornerVerts: THREE.Vector3[][] = [];
    const cornerNormals: THREE.Vector3[][] = [];
    const vertex = new THREE.Vector3();
    const vertexPool: THREE.Vector3[] = [];
    const normalPool: THREE.Vector3[] = [];
    const indices: number[] = [];

    const lastVertex = rs1 * radiusSegments;
    const cornerVertNumber = rs1 * radiusSegments + 1;

    // コーナーの頂点を生成
    function doVertices() {
      const cornerLayout = [
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, 1, 1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1),
      ];

      // コーナーホルダーの準備
      for (let j = 0; j < 8; j++) {
        cornerVerts.push([]);
        cornerNormals.push([]);
      }

      // 1/8球体の構築
      const PIhalf = Math.PI / 2;
      const cornerOffset = new THREE.Vector3(
        edgeHalfWidth,
        edgeHalfHeight,
        edgeHalfDepth
      );

      for (let y = 0; y <= radiusSegments; y++) {
        const v = y / radiusSegments;
        const va = v * PIhalf;
        const cosVa = Math.cos(va);
        const sinVa = Math.sin(va);

        if (y === radiusSegments) {
          vertex.set(0, 1, 0);
          const vert = vertex.clone().multiplyScalar(radius).add(cornerOffset);
          cornerVerts[0].push(vert);
          vertexPool.push(vert);

          const norm = vertex.clone();
          cornerNormals[0].push(norm);
          normalPool.push(norm);
          continue;
        }

        for (let x = 0; x <= radiusSegments; x++) {
          const u = x / radiusSegments;
          const ha = u * PIhalf;

          vertex.x = cosVa * Math.cos(ha);
          vertex.y = sinVa;
          vertex.z = cosVa * Math.sin(ha);

          const vert = vertex.clone().multiplyScalar(radius).add(cornerOffset);
          cornerVerts[0].push(vert);
          vertexPool.push(vert);

          const norm = vertex.clone().normalize();
          cornerNormals[0].push(norm);
          normalPool.push(norm);
        }
      }

      // コーナー頂点の分配
      for (let i = 1; i < 8; i++) {
        for (let j = 0; j < cornerVerts[0].length; j++) {
          const vert = cornerVerts[0][j].clone().multiply(cornerLayout[i]);
          cornerVerts[i].push(vert);
          vertexPool.push(vert);

          const norm = cornerNormals[0][j].clone().multiply(cornerLayout[i]);
          cornerNormals[i].push(norm);
          normalPool.push(norm);
        }
      }
    }

    // コーナーの接続
    function doCorners() {
      const flips = [true, false, true, false, false, true, false, true];
      const lastRowOffset = rs1 * (radiusSegments - 1);

      for (let i = 0; i < 8; i++) {
        const cornerOffset = cornerVertNumber * i;

        for (let v = 0; v < radiusSegments - 1; v++) {
          const r1 = v * rs1;
          const r2 = (v + 1) * rs1;

          for (let u = 0; u < radiusSegments; u++) {
            const u1 = u + 1;
            const a = cornerOffset + r1 + u;
            const b = cornerOffset + r1 + u1;
            const c = cornerOffset + r2 + u;
            const d = cornerOffset + r2 + u1;

            if (!flips[i]) {
              indices.push(a, b, c);
              indices.push(b, d, c);
            } else {
              indices.push(a, c, b);
              indices.push(b, c, d);
            }
          }
        }

        for (let u = 0; u < radiusSegments; u++) {
          const a = cornerOffset + lastRowOffset + u;
          const b = cornerOffset + lastRowOffset + u + 1;
          const c = cornerOffset + lastVertex;

          if (!flips[i]) {
            indices.push(a, b, c);
          } else {
            indices.push(a, c, b);
          }
        }
      }
    }

    // 面の生成
    function doFaces() {
      // 上面
      let a = lastVertex;
      let b = lastVertex + cornerVertNumber;
      let c = lastVertex + cornerVertNumber * 2;
      let d = lastVertex + cornerVertNumber * 3;

      indices.push(a, b, c);
      indices.push(a, c, d);

      // 底面
      a = lastVertex + cornerVertNumber * 4;
      b = lastVertex + cornerVertNumber * 5;
      c = lastVertex + cornerVertNumber * 6;
      d = lastVertex + cornerVertNumber * 7;

      indices.push(a, c, b);
      indices.push(a, d, c);

      // 左面
      a = 0;
      b = cornerVertNumber;
      c = cornerVertNumber * 4;
      d = cornerVertNumber * 5;

      indices.push(a, c, b);
      indices.push(b, c, d);

      // 右面
      a = cornerVertNumber * 2;
      b = cornerVertNumber * 3;
      c = cornerVertNumber * 6;
      d = cornerVertNumber * 7;

      indices.push(a, c, b);
      indices.push(b, c, d);

      // 前面
      a = radiusSegments;
      b = radiusSegments + cornerVertNumber * 3;
      c = radiusSegments + cornerVertNumber * 4;
      d = radiusSegments + cornerVertNumber * 7;

      indices.push(a, b, c);
      indices.push(b, d, c);

      // 背面
      a = radiusSegments + cornerVertNumber;
      b = radiusSegments + cornerVertNumber * 2;
      c = radiusSegments + cornerVertNumber * 5;
      d = radiusSegments + cornerVertNumber * 6;

      indices.push(a, c, b);
      indices.push(b, c, d);
    }

    // エッジの生成
    function doHeightEdges() {
      for (let i = 0; i < 4; i++) {
        const cOffset = i * cornerVertNumber;
        const cRowOffset = 4 * cornerVertNumber + cOffset;
        const needsFlip = (i & 1) > 0;

        for (let u = 0; u < radiusSegments; u++) {
          const u1 = u + 1;
          const a = cOffset + u;
          const b = cOffset + u1;
          const c = cRowOffset + u;
          const d = cRowOffset + u1;

          if (!needsFlip) {
            indices.push(a, b, c);
            indices.push(b, d, c);
          } else {
            indices.push(a, c, b);
            indices.push(b, c, d);
          }
        }
      }
    }

    function doDepthEdges() {
      const cStarts = [0, 2, 4, 6];
      const cEnds = [1, 3, 5, 7];

      for (let i = 0; i < 4; i++) {
        const cStart = cornerVertNumber * cStarts[i];
        const cEnd = cornerVertNumber * cEnds[i];
        const needsFlip = 1 >= i;

        for (let u = 0; u < radiusSegments; u++) {
          const urs1 = u * rs1;
          const u1rs1 = (u + 1) * rs1;

          const a = cStart + urs1;
          const b = cStart + u1rs1;
          const c = cEnd + urs1;
          const d = cEnd + u1rs1;

          if (needsFlip) {
            indices.push(a, c, b);
            indices.push(b, c, d);
          } else {
            indices.push(a, b, c);
            indices.push(b, d, c);
          }
        }
      }
    }

    function doWidthEdges() {
      const end = radiusSegments - 1;
      const cStarts = [0, 1, 4, 5];
      const cEnds = [3, 2, 7, 6];
      const needsFlip = [0, 1, 1, 0];

      for (let i = 0; i < 4; i++) {
        const cStart = cStarts[i] * cornerVertNumber;
        const cEnd = cEnds[i] * cornerVertNumber;

        for (let u = 0; u <= end; u++) {
          const a = cStart + radiusSegments + u * rs1;
          const b =
            cStart +
            (u !== end ? radiusSegments + (u + 1) * rs1 : cornerVertNumber - 1);
          const c = cEnd + radiusSegments + u * rs1;
          const d =
            cEnd +
            (u !== end ? radiusSegments + (u + 1) * rs1 : cornerVertNumber - 1);

          if (!needsFlip[i]) {
            indices.push(a, b, c);
            indices.push(b, d, c);
          } else {
            indices.push(a, c, b);
            indices.push(b, c, d);
          }
        }
      }
    }

    doVertices();
    doCorners();
    doFaces();
    doHeightEdges();
    doWidthEdges();
    doDepthEdges();

    // バッファの設定
    let index = 0;
    for (const vert of vertexPool) {
      positions.setXYZ(index, vert.x, vert.y, vert.z);
      const norm = normalPool[index];
      normals.setXYZ(index, norm.x, norm.y, norm.z);
      index++;
    }

    this.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
    this.setAttribute("position", positions);
    this.setAttribute("normal", normals);
  }
}
