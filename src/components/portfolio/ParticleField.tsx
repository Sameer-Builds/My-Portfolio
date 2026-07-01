'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, basePositions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8 - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      sz[i] = Math.random() * 2 + 0.5;
    }

    return [pos, base, sz];
  }, [count]);

  const handlePointerMove = useCallback((e: { point: THREE.Vector3 }) => {
    mousePos.current.x = (e.point.x / viewport.width) * 2;
    mousePos.current.y = (e.point.y / viewport.height) * 2;
  }, [viewport]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const posAttr = mesh.current.geometry.getAttribute('position');
    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      // Gentle floating motion
      posAttr.array[i3] = bx + Math.sin(time * 0.3 + i * 0.01) * 0.15;
      posAttr.array[i3 + 1] = by + Math.cos(time * 0.2 + i * 0.008) * 0.1;
      posAttr.array[i3 + 2] = bz + Math.sin(time * 0.15 + i * 0.012) * 0.08;

      // Mouse repulsion
      const dx = posAttr.array[i3] - mousePos.current.x;
      const dy = posAttr.array[i3 + 1] - mousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) * 0.15;
        posAttr.array[i3] += (dx / dist) * force;
        posAttr.array[i3 + 1] += (dy / dist) * force;
      }
    }

    posAttr.needsUpdate = true;
    mesh.current.rotation.y = Math.sin(time * 0.05) * 0.05;
  });

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#c8956c') },
          uColor2: { value: new THREE.Color('#4a6741') },
          uSize: { value: 40.0 * (typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1) },
        },
        vertexShader: `
          attribute float aSize;
          varying float vDist;
          varying float vRand;
          uniform float uTime;
          uniform float uSize;

          void main() {
            vec3 pos = position;
            vDist = length(pos.xy) / 10.0;
            vRand = sin(pos.x * 12.9898 + pos.y * 78.233) * 0.5 + 0.5;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = aSize * uSize * (1.0 / -mvPosition.z);
            gl_PointSize = max(gl_PointSize, 1.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform vec3 uColor2;
          uniform float uTime;
          varying float vDist;
          varying float vRand;

          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;

            float alpha = smoothstep(0.5, 0.1, d) * 0.6;
            vec3 color = mix(uColor, uColor2, vRand * 0.5 + vDist * 0.3);
            color += 0.05 * sin(uTime * 0.5 + vRand * 6.28);

            gl_FragColor = vec4(color, alpha);
          }
        `,
      }),
    []
  );

  return (
    <points ref={mesh} onPointerMove={handlePointerMove as never}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}

function FloatingGeometry() {
  const torusRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const octRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.15;
      torusRef.current.rotation.y = t * 0.1;
      torusRef.current.position.y = Math.sin(t * 0.3) * 0.3 + 0.5;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.12;
      icoRef.current.rotation.z = t * 0.08;
      icoRef.current.position.y = Math.cos(t * 0.25) * 0.2 - 0.8;
    }
    if (octRef.current) {
      octRef.current.rotation.y = t * 0.18;
      octRef.current.rotation.z = t * 0.1;
      octRef.current.position.x = Math.sin(t * 0.2) * 0.3 + 3;
    }
  });

  const wireMat = new THREE.MeshBasicMaterial({
    color: '#c8956c',
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });

  const wireMat2 = new THREE.MeshBasicMaterial({
    color: '#4a6741',
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });

  return (
    <>
      <mesh ref={torusRef} position={[-3.5, 0.5, -3]} material={wireMat}>
        <torusGeometry args={[0.8, 0.25, 16, 32]} />
      </mesh>
      <mesh ref={icoRef} position={[3, -0.8, -4]} material={wireMat2}>
        <icosahedronGeometry args={[0.6, 0]} />
      </mesh>
      <mesh ref={octRef} position={[3, 0, -5]} material={wireMat}>
        <octahedronGeometry args={[0.45, 0]} />
      </mesh>
    </>
  );
}

export default function ParticleField() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Particles count={1500} />
        <FloatingGeometry />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}