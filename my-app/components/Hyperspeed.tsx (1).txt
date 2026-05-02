'use client';

import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  SMAAPreset,
} from 'postprocessing';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ColorOptions {
  roadColor: number;
  islandColor: number;
  background: number;
  shoulderLines: number;
  brokenLines: number;
  leftCars: number[];
  rightCars: number[];
  sticks: number;
}

interface EffectOptions {
  onSpeedUp?: () => void;
  onSlowDown?: () => void;
  distortion?: string;
  length?: number;
  roadWidth?: number;
  islandWidth?: number;
  lanesPerRoad?: number;
  fov?: number;
  fovSpeedUp?: number;
  speedUp?: number;
  carLightsFade?: number;
  totalSideLightSticks?: number;
  lightPairsPerRoadWay?: number;
  shoulderLinesWidthPercentage?: number;
  brokenLinesWidthPercentage?: number;
  brokenLinesLengthPercentage?: number;
  lightStickWidth?: [number, number];
  lightStickHeight?: [number, number];
  movingAwaySpeed?: [number, number];
  movingCloserSpeed?: [number, number];
  carLightsLength?: [number, number];
  carLightsRadius?: [number, number];
  carWidthPercentage?: [number, number];
  carShiftX?: [number, number];
  carFloorSeparation?: [number, number];
  colors?: ColorOptions;
}

interface HyperspeedProps {
  effectOptions?: EffectOptions;
}

const DEFAULT_EFFECT_OPTIONS: Required<EffectOptions> = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3,
  },
};

function random(base: number | [number, number], spread?: number): number {
  if (Array.isArray(base)) return base[0] + Math.random() * (base[1] - base[0]);
  return base - spread! / 2 + Math.random() * spread!;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function buildDistortions() {
  const mountainUniforms = {
    uFreq: { value: new THREE.Vector3(3, 6, 10) },
    uAmp:  { value: new THREE.Vector3(30, 30, 20) },
  };
  const xyUniforms = {
    uFreq: { value: new THREE.Vector2(5, 2) },
    uAmp:  { value: new THREE.Vector2(25, 15) },
  };
  const longRaceUniforms = {
    uFreq: { value: new THREE.Vector2(2, 3) },
    uAmp:  { value: new THREE.Vector2(35, 10) },
  };
  const turbulentUniforms = {
    uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
    uAmp:  { value: new THREE.Vector4(25, 5, 10, 10) },
  };
  const deepUniforms = {
    uFreq: { value: new THREE.Vector2(4, 8) },
    uAmp:  { value: new THREE.Vector2(10, 20) },
    uPowY: { value: new THREE.Vector2(20, 2) },
  };

  const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;

  return {
    mountainDistortion: {
      uniforms: mountainUniforms,
      getDistortion: `
        uniform vec3 uAmp; uniform vec3 uFreq;
        #define PI 3.14159265358979
        float nsin(float v){ return sin(v)*0.5+0.5; }
        vec3 getDistortion(float progress){
          float fix=0.02;
          return vec3(
            cos(progress*PI*uFreq.x+uTime)*uAmp.x - cos(fix*PI*uFreq.x+uTime)*uAmp.x,
            nsin(progress*PI*uFreq.y+uTime)*uAmp.y - nsin(fix*PI*uFreq.y+uTime)*uAmp.y,
            nsin(progress*PI*uFreq.z+uTime)*uAmp.z - nsin(fix*PI*uFreq.z+uTime)*uAmp.z
          );
        }`,
      getJS: (progress: number, time: number) => {
        const fix = 0.02;
        const { x: fx, y: fy, z: fz } = mountainUniforms.uFreq.value;
        const { x: ax, y: ay, z: az } = mountainUniforms.uAmp.value;
        return new THREE.Vector3(
          Math.cos(progress * Math.PI * fx + time) * ax - Math.cos(fix * Math.PI * fx + time) * ax,
          nsin(progress * Math.PI * fy + time) * ay - nsin(fix * Math.PI * fy + time) * ay,
          nsin(progress * Math.PI * fz + time) * az - nsin(fix * Math.PI * fz + time) * az,
        ).multiply(new THREE.Vector3(2, 2, 2)).add(new THREE.Vector3(0, 0, -5));
      },
    },
    xyDistortion: {
      uniforms: xyUniforms,
      getDistortion: `
        uniform vec2 uFreq; uniform vec2 uAmp;
        #define PI 3.14159265358979
        vec3 getDistortion(float progress){
          float fix=0.02;
          return vec3(
            cos(progress*PI*uFreq.x+uTime)*uAmp.x - cos(fix*PI*uFreq.x+uTime)*uAmp.x,
            sin(progress*PI*uFreq.y+PI/2.+uTime)*uAmp.y - sin(fix*PI*uFreq.y+PI/2.+uTime)*uAmp.y,
            0.
          );
        }`,
      getJS: (progress: number, time: number) => {
        const fix = 0.02;
        const { x: fx, y: fy } = xyUniforms.uFreq.value;
        const { x: ax, y: ay } = xyUniforms.uAmp.value;
        return new THREE.Vector3(
          Math.cos(progress * Math.PI * fx + time) * ax - Math.cos(fix * Math.PI * fx + time) * ax,
          Math.sin(progress * Math.PI * fy + Math.PI / 2 + time) * ay - Math.sin(fix * Math.PI * fy + Math.PI / 2 + time) * ay,
          0,
        ).multiply(new THREE.Vector3(2, 0.4, 1)).add(new THREE.Vector3(0, 0, -3));
      },
    },
    LongRaceDistortion: {
      uniforms: longRaceUniforms,
      getDistortion: `
        uniform vec2 uFreq; uniform vec2 uAmp;
        #define PI 3.14159265358979
        vec3 getDistortion(float progress){
          float fix=0.0125;
          return vec3(
            sin(progress*PI*uFreq.x+uTime)*uAmp.x - sin(fix*PI*uFreq.x+uTime)*uAmp.x,
            sin(progress*PI*uFreq.y+uTime)*uAmp.y - sin(fix*PI*uFreq.y+uTime)*uAmp.y,
            0.
          );
        }`,
      getJS: (progress: number, time: number) => {
        const fix = 0.0125;
        const { x: fx, y: fy } = longRaceUniforms.uFreq.value;
        const { x: ax, y: ay } = longRaceUniforms.uAmp.value;
        return new THREE.Vector3(
          Math.sin(progress * Math.PI * fx + time) * ax - Math.sin(fix * Math.PI * fx + time) * ax,
          Math.sin(progress * Math.PI * fy + time) * ay - Math.sin(fix * Math.PI * fy + time) * ay,
          0,
        ).multiply(new THREE.Vector3(1, 1, 0)).add(new THREE.Vector3(0, 0, -5));
      },
    },
    turbulentDistortion: {
      uniforms: turbulentUniforms,
      getDistortion: `
        uniform vec4 uFreq; uniform vec4 uAmp;
        float nsin(float v){ return sin(v)*0.5+0.5; }
        #define PI 3.14159265358979
        float getX(float p){ return cos(PI*p*uFreq.r+uTime)*uAmp.r + pow(cos(PI*p*uFreq.g+uTime*(uFreq.g/uFreq.r)),2.)*uAmp.g; }
        float getY(float p){ return -nsin(PI*p*uFreq.b+uTime)*uAmp.b - pow(nsin(PI*p*uFreq.a+uTime/(uFreq.b/uFreq.a)),5.)*uAmp.a; }
        vec3 getDistortion(float progress){
          return vec3(getX(progress)-getX(0.0125), getY(progress)-getY(0.0125), 0.);
        }`,
      getJS: (progress: number, time: number) => {
        const { x: frx, y: fry, z: frz, w: frw } = turbulentUniforms.uFreq.value;
        const { x: ax, y: ay, z: az, w: aw } = turbulentUniforms.uAmp.value;
        const getX = (p: number) =>
          Math.cos(Math.PI * p * frx + time) * ax +
          Math.pow(Math.cos(Math.PI * p * fry + time * (fry / frx)), 2) * ay;
        const getY = (p: number) =>
          -nsin(Math.PI * p * frz + time) * az -
          Math.pow(nsin(Math.PI * p * frw + time / (frz / frw)), 5) * aw;
        return new THREE.Vector3(
          getX(progress) - getX(progress + 0.007),
          getY(progress) - getY(progress + 0.007),
          0,
        );
      },
    },
    deepDistortion: {
      uniforms: deepUniforms,
      getDistortion: `
        uniform vec2 uFreq; uniform vec2 uAmp; uniform vec2 uPowY;
        float nsin(float v){ return sin(v)*0.5+0.5; }
        #define PI 3.14159265358979
        vec3 getDistortion(float progress){
          float fix=0.02;
          return vec3(
            cos(progress*PI*uFreq.x+uTime)*uAmp.x - cos(fix*PI*uFreq.x+uTime)*uAmp.x,
            pow(nsin(progress*PI*uFreq.y+uTime),uPowY.x)*uAmp.y - pow(nsin(fix*PI*uFreq.y+uTime),uPowY.y)*uAmp.y,
            0.
          );
        }`,
      getJS: (progress: number, time: number) => {
        const fix = 0.02;
        const { x: fx, y: fy } = deepUniforms.uFreq.value;
        const { x: ax, y: ay } = deepUniforms.uAmp.value;
        const { x: py1, y: py2 } = deepUniforms.uPowY.value;
        return new THREE.Vector3(
          Math.cos(progress * Math.PI * fx + time) * ax - Math.cos(fix * Math.PI * fx + time) * ax,
          Math.pow(nsin(progress * Math.PI * fy + time), py1) * ay - Math.pow(nsin(fix * Math.PI * fy + time), py2) * ay,
          0,
        ).add(new THREE.Vector3(0, 0, -5));
      },
    },
  };
}

/* ── Road ── */
class Road {
  app: App;
  options: Required<EffectOptions>;
  uTime: { value: number };
  mesh!: THREE.Mesh;

  constructor(app: App, options: Required<EffectOptions>) {
    this.app = app;
    this.options = options;
    this.uTime = { value: 0 };
    this.init();
  }

  init() {
    const { length, roadWidth, islandWidth, lanesPerRoad, shoulderLinesWidthPercentage, brokenLinesWidthPercentage, brokenLinesLengthPercentage, colors } = this.options;
    const distortion = (this.app.distortions as any)[this.options.distortion] || this.app.distortions.turbulentDistortion;

    const geo = new THREE.PlaneGeometry(roadWidth * 2 + islandWidth, length, 1, 100);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: this.uTime,
        ...distortion.uniforms,
        uTravelLength: { value: length },
        uColor: { value: new THREE.Color(colors.roadColor) },
        uIslandColor: { value: new THREE.Color(colors.islandColor) },
        uBrokenLinesColor: { value: new THREE.Color(colors.brokenLines) },
        uShoulderLinesColor: { value: new THREE.Color(colors.shoulderLines) },
        uIslandWidth: { value: islandWidth / (roadWidth * 2 + islandWidth) },
        uLanesPerRoad: { value: lanesPerRoad },
        uShoulderLinesWidthPercentage: { value: shoulderLinesWidthPercentage },
        uBrokenLinesWidthPercentage: { value: brokenLinesWidthPercentage },
        uBrokenLinesLengthPercentage: { value: brokenLinesLengthPercentage },
        ...this.app.fogUniforms,
      },
      vertexShader: `
        uniform float uTime;
        uniform float uTravelLength;
        ${distortion.getDistortion}
        varying vec2 vUv;
        void main(){
          vUv = uv;
          vec3 pos = position;
          float progress = 1.0 - (pos.y + uTravelLength/2.0)/uTravelLength;
          vec3 d = getDistortion(progress);
          pos.x += d.x;
          pos.y += d.z;
          pos.z += d.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uIslandColor;
        uniform vec3 uBrokenLinesColor;
        uniform vec3 uShoulderLinesColor;
        uniform float uIslandWidth;
        uniform float uLanesPerRoad;
        uniform float uShoulderLinesWidthPercentage;
        uniform float uBrokenLinesWidthPercentage;
        uniform float uBrokenLinesLengthPercentage;
        uniform float uTravelLength;
        uniform float uTime;
        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;
        varying vec2 vUv;
        void main(){
          vec3 col = uColor;
          float lane = 1.0/(uLanesPerRoad*2.0+uIslandWidth*(uLanesPerRoad*2.0));
          if(vUv.x < uIslandWidth) col = uIslandColor;
          else if(vUv.x < uIslandWidth + uShoulderLinesWidthPercentage*lane*2.0) col = uShoulderLinesColor;
          else if(vUv.x > 1.0-uShoulderLinesWidthPercentage*lane*2.0) col = uShoulderLinesColor;
          else {
            float laneX = (vUv.x - uIslandWidth)/(1.0-uIslandWidth);
            float laneNum = floor(laneX*uLanesPerRoad*2.0);
            float lanePos = fract(laneX*uLanesPerRoad*2.0);
            if(laneNum != 0.0 && laneNum != uLanesPerRoad*2.0-1.0){
              float broken = fract(vUv.y*uTravelLength/10.0 - uTime*0.5);
              if(lanePos < uBrokenLinesWidthPercentage && broken < uBrokenLinesLengthPercentage)
                col = uBrokenLinesColor;
            }
          }
          float depth = gl_FragCoord.z/gl_FragCoord.w;
          float fog = smoothstep(fogNear, fogFar, depth);
          col = mix(col, fogColor, fog);
          gl_FragColor = vec4(col, 1.0);
        }`,
      side: THREE.FrontSide,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.z = -this.options.length / 2;
    this.app.scene.add(this.mesh);
  }

  update(time: number) {
    this.uTime.value = time;
  }
}

/* ── CarLights ── */
class CarLights {
  app: App;
  options: Required<EffectOptions>;
  colors: number[];
  speed: [number, number];
  fade: THREE.Vector2;
  mesh!: THREE.Mesh;
  uTime: { value: number };

  constructor(app: App, options: Required<EffectOptions>, colors: number[], speed: [number, number], fade: THREE.Vector2) {
    this.app = app;
    this.options = options;
    this.colors = colors;
    this.speed = speed;
    this.fade = fade;
    this.uTime = { value: 0 };
    this.init();
  }

  init() {
    const { lightPairsPerRoadWay, carLightsLength, carLightsRadius, carWidthPercentage, carShiftX, carFloorSeparation, roadWidth, islandWidth, length, colors } = this.options;
    const distortion = (this.app.distortions as any)[this.options.distortion] || this.app.distortions.turbulentDistortion;
    const count = lightPairsPerRoadWay * 2;
    const carWidth = carWidthPercentage;
    const mergedCol = this.colors;

    const aOffset    = new Float32Array(count * 3);
    const aMetrics   = new Float32Array(count * 4);
    const aColor     = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = random(carLightsRadius);
      const len = random(carLightsLength);
      const side = i < count / 2 ? -1 : 1;
      const numLanes = this.options.lanesPerRoad;
      const laneIdx = Math.floor(Math.random() * numLanes);
      const laneW = (roadWidth - islandWidth / 2) / numLanes;
      const x = side * (islandWidth / 2 + laneW * (laneIdx + 0.5) + random(carWidth) * laneW * 0.5 * (Math.random() > 0.5 ? 1 : -1));
      const y = random(carFloorSeparation) + r;
      const z = random([0, length]);

      aOffset[i * 3]     = x + random(carShiftX);
      aOffset[i * 3 + 1] = y;
      aOffset[i * 3 + 2] = -z;

      aMetrics[i * 4]     = r;
      aMetrics[i * 4 + 1] = len;
      aMetrics[i * 4 + 2] = random(this.speed);
      aMetrics[i * 4 + 3] = random([0, length]);

      const col = new THREE.Color(pickRandom(mergedCol));
      aColor[i * 3]     = col.r;
      aColor[i * 3 + 1] = col.g;
      aColor[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('aOffset',  new THREE.BufferAttribute(aOffset, 3));
    geo.setAttribute('aMetrics', new THREE.BufferAttribute(aMetrics, 4));
    geo.setAttribute('aColor',   new THREE.BufferAttribute(aColor, 3));
    geo.setDrawRange(0, count);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:         { value: 0 },
        uTravelLength: { value: length },
        uFade:         { value: this.fade },
        ...distortion.uniforms,
        ...this.app.fogUniforms,
      },
      vertexShader: `
        attribute vec3 aOffset;
        attribute vec4 aMetrics;
        attribute vec3 aColor;
        uniform float uTime;
        uniform float uTravelLength;
        ${distortion.getDistortion}
        varying vec3 vColor;
        varying float vAlpha;
        void main(){
          vec3 pos = aOffset;
          float radius = aMetrics.r;
          float len = aMetrics.g;
          float speed = aMetrics.b;
          float startZ = aMetrics.a;
          float travel = mod(uTime*speed + startZ, uTravelLength);
          pos.z = -travel;
          float progress = 1.0 - (-pos.z)/uTravelLength;
          vec3 d = getDistortion(progress);
          pos.x += d.x;
          pos.z += d.z;
          pos.y += d.y + radius;
          vColor = aColor;
          vAlpha = 1.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = radius * 80.0 / gl_Position.w;
        }`,
      fragmentShader: `
        uniform vec2 uFade;
        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;
        varying vec3 vColor;
        varying float vAlpha;
        void main(){
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if(d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
          float depth = gl_FragCoord.z/gl_FragCoord.w;
          float fog = smoothstep(fogNear, fogFar, depth);
          vec3 col = mix(vColor, fogColor, fog);
          gl_FragColor = vec4(col, alpha);
        }`,
      transparent: true,
      depthWrite: false,
    });

    this.mesh = new THREE.Points(geo as any, mat) as any;
    this.app.scene.add(this.mesh);
  }

  update(time: number) {
    (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
  }
}

/* ── LightsSticks ── */
class LightsSticks {
  app: App;
  options: Required<EffectOptions>;
  mesh!: THREE.Mesh;

  constructor(app: App, options: Required<EffectOptions>) {
    this.app = app;
    this.options = options;
    this.init();
  }

  init() {
    const { totalSideLightSticks, lightStickWidth, lightStickHeight, movingAwaySpeed, length, roadWidth, islandWidth, colors } = this.options;
    const distortion = (this.app.distortions as any)[this.options.distortion] || this.app.distortions.turbulentDistortion;
    const count = totalSideLightSticks;

    const aOffset  = new Float32Array(count * 3 * 2);
    const aColor   = new Float32Array(count * 3 * 2);
    const aMetrics = new Float32Array(count * 4 * 2);

    for (let i = 0; i < count; i++) {
      for (let side = 0; side < 2; side++) {
        const idx = (i * 2 + side);
        const sideSign = side === 0 ? -1 : 1;
        const x = sideSign * (roadWidth + islandWidth / 2 + 0.5);
        const y = random(lightStickHeight);
        const z = random([0, length]);
        aOffset[idx * 3]     = x;
        aOffset[idx * 3 + 1] = y;
        aOffset[idx * 3 + 2] = -z;
        aMetrics[idx * 4]     = random(lightStickWidth);
        aMetrics[idx * 4 + 1] = y;
        aMetrics[idx * 4 + 2] = random(movingAwaySpeed);
        aMetrics[idx * 4 + 3] = random([0, length]);
        const col = new THREE.Color(colors.sticks);
        aColor[idx * 3]     = col.r;
        aColor[idx * 3 + 1] = col.g;
        aColor[idx * 3 + 2] = col.b;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('aOffset',  new THREE.BufferAttribute(aOffset, 3));
    geo.setAttribute('aColor',   new THREE.BufferAttribute(aColor, 3));
    geo.setAttribute('aMetrics', new THREE.BufferAttribute(aMetrics, 4));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:         { value: 0 },
        uTravelLength: { value: length },
        ...distortion.uniforms,
        ...this.app.fogUniforms,
      },
      vertexShader: `
        attribute vec3 aOffset;
        attribute vec3 aColor;
        attribute vec4 aMetrics;
        uniform float uTime;
        uniform float uTravelLength;
        ${distortion.getDistortion}
        varying vec3 vColor;
        void main(){
          vec3 pos = aOffset;
          float speed = aMetrics.b;
          float startZ = aMetrics.a;
          float travel = mod(uTime*speed*0.5 + startZ, uTravelLength);
          pos.z = -travel;
          float progress = 1.0 - (-pos.z)/uTravelLength;
          vec3 d = getDistortion(progress);
          pos.x += d.x;
          pos.z += d.z;
          pos.y += d.y;
          vColor = aColor;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aMetrics.r * 60.0 / gl_Position.w;
        }`,
      fragmentShader: `
        varying vec3 vColor;
        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;
        void main(){
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if(d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d);
          float depth = gl_FragCoord.z/gl_FragCoord.w;
          float fog = smoothstep(fogNear, fogFar, depth);
          vec3 col = mix(vColor, fogColor, fog);
          gl_FragColor = vec4(col, alpha);
        }`,
      transparent: true,
      depthWrite: false,
    });

    this.mesh = new THREE.Points(geo as any, mat) as any;
    this.app.scene.add(this.mesh);
  }

  update(time: number) {
    (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
  }
}

/* ── App ── */
class App {
  options: Required<EffectOptions>;
  container: HTMLElement;
  renderer!: THREE.WebGLRenderer;
  composer!: EffectComposer;
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  clock!: THREE.Clock;
  disposed: boolean;
  hasValidSize: boolean;
  road!: Road;
  leftCarLights!: CarLights;
  rightCarLights!: CarLights;
  leftSticks!: LightsSticks;
  fovTarget: number;
  speedUpTarget: number;
  speedUp: number;
  timeOffset: number;
  distortions!: ReturnType<typeof buildDistortions>;
  fogUniforms!: Record<string, { value: any }>;
  onWindowResize: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onContextMenu: (e: Event) => void;
  tick: () => void;
  animFrameId: number | null;

  constructor(container: HTMLElement, options: Required<EffectOptions>) {
    this.options = options;
    this.container = container;
    this.disposed = false;
    this.hasValidSize = false;
    this.animFrameId = null;
    this.fovTarget = options.fov;
    this.speedUpTarget = 0;
    this.speedUp = 0;
    this.timeOffset = 0;

    this.onWindowResize = this._onWindowResize.bind(this);
    this.onMouseDown    = this._onMouseDown.bind(this);
    this.onMouseUp      = this._onMouseUp.bind(this);
    this.onTouchStart   = this._onTouchStart.bind(this);
    this.onTouchEnd     = this._onTouchEnd.bind(this);
    this.onContextMenu  = (e: Event) => e.preventDefault();
    this.tick           = this._tick.bind(this);

    const w = Math.max(1, container.offsetWidth);
    const h = Math.max(1, container.offsetHeight);

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.composer = new EffectComposer(this.renderer);
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(options.fov, w / h, 0.1, 10000);
    this.camera.position.set(0, 8, -5);

    this.scene = new THREE.Scene();
    this.scene.background = null;

    const fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);
    this.scene.fog = fog;
    this.fogUniforms = {
      fogColor: { value: fog.color },
      fogNear:  { value: fog.near },
      fogFar:   { value: fog.far },
    };

    this.clock = new THREE.Clock();
    this.distortions = buildDistortions();

    this.road = new Road(this, options);
    this.leftCarLights = new CarLights(this, options, options.colors.leftCars, options.movingAwaySpeed,  new THREE.Vector2(0, 1 - options.carLightsFade));
    this.rightCarLights = new CarLights(this, options, options.colors.rightCars, options.movingCloserSpeed, new THREE.Vector2(1, 0 + options.carLightsFade));
    this.leftSticks = new LightsSticks(this, options);

    window.addEventListener('resize', this.onWindowResize);
    container.addEventListener('mousedown',   this.onMouseDown);
    container.addEventListener('mouseup',     this.onMouseUp);
    container.addEventListener('touchstart',  this.onTouchStart, { passive: true });
    container.addEventListener('touchend',    this.onTouchEnd);
    container.addEventListener('contextmenu', this.onContextMenu);

    if (w > 0 && h > 0) this.hasValidSize = true;
  }

  private _onWindowResize() {
    const w = this.container.offsetWidth;
    const h = this.container.offsetHeight;
    if (w <= 0 || h <= 0) { this.hasValidSize = false; return; }
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.composer.setSize(w, h);
    this.hasValidSize = true;
  }

  private _onMouseDown() { this.fovTarget = this.options.fovSpeedUp; this.speedUpTarget = this.options.speedUp; this.options.onSpeedUp?.(); }
  private _onMouseUp()   { this.fovTarget = this.options.fov; this.speedUpTarget = 0; this.options.onSlowDown?.(); }
  private _onTouchStart() { this._onMouseDown(); }
  private _onTouchEnd()   { this._onMouseUp(); }

  initPasses() {
    const renderPass = new RenderPass(this.scene, this.camera);
    const bloomPass  = new EffectPass(this.camera, new BloomEffect({ luminanceThreshold: 0.2, luminanceSmoothing: 0, intensity: 1 }));
    const smaaPass   = new EffectPass(this.camera, new SMAAEffect({ preset: SMAAPreset.MEDIUM }));
    renderPass.renderToScreen = false;
    bloomPass.renderToScreen  = false;
    smaaPass.renderToScreen   = true;
    this.composer.addPass(renderPass);
    this.composer.addPass(bloomPass);
    this.composer.addPass(smaaPass);
  }

  init() {
    this.initPasses();
    this.tick();
  }

  private _tick() {
    if (this.disposed) return;
    if (!this.hasValidSize) { this.animFrameId = requestAnimationFrame(this.tick); return; }

    const delta = this.clock.getDelta();
    this.speedUp = lerp(this.speedUp, this.speedUpTarget, delta * 3);
    this.timeOffset += this.speedUp * delta;

    const time = this.clock.elapsedTime + this.timeOffset;
    this.camera.fov = lerp(this.camera.fov, this.fovTarget, delta * 2);
    this.camera.updateProjectionMatrix();

    const dist = (this.distortions as any)[this.options.distortion] || this.distortions.turbulentDistortion;
    if (dist.getJS) {
      const camPos = dist.getJS(0.02, time);
      this.camera.lookAt(new THREE.Vector3(camPos.x, camPos.y, camPos.z));
    }

    this.road.update(time);
    this.leftCarLights.update(time);
    this.rightCarLights.update(time);
    this.leftSticks.update(time);

    this.composer.render(delta);
    this.animFrameId = requestAnimationFrame(this.tick);
  }

  dispose() {
    this.disposed = true;
    if (this.animFrameId !== null) cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onWindowResize);
    this.container.removeEventListener('mousedown',   this.onMouseDown);
    this.container.removeEventListener('mouseup',     this.onMouseUp);
    this.container.removeEventListener('touchstart',  this.onTouchStart);
    this.container.removeEventListener('touchend',    this.onTouchEnd);
    this.container.removeEventListener('contextmenu', this.onContextMenu);
    this.composer.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}

/* ── Component ── */
const Hyperspeed = ({ effectOptions = {} }: HyperspeedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (appRef.current) {
      appRef.current.dispose();
      appRef.current = null;
    }

    try {
      const merged: Required<EffectOptions> = { ...DEFAULT_EFFECT_OPTIONS, ...effectOptions };
      if (effectOptions.colors) {
        merged.colors = { ...DEFAULT_EFFECT_OPTIONS.colors, ...effectOptions.colors };
      }
      const app = new App(container, merged);
      appRef.current = app;
      app.init();
    } catch (err) {
      console.warn('Hyperspeed init failed:', err);
    }

    return () => {
      if (appRef.current) {
        appRef.current.dispose();
        appRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        background: 'transparent',
      }}
    />
  );
};

export default Hyperspeed;
