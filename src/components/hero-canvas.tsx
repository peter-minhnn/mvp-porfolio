"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { type ReactNode, type RefObject, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * three r183+ deprecated THREE.Clock, but @react-three/fiber (as of 9.6.1)
 * still instantiates one internally, which logs a deprecation warning we
 * can't act on. Filter exactly that message via three's official console
 * hook and forward everything else untouched.
 * TODO: remove once R3F migrates to THREE.Timer.
 */
THREE.setConsoleFunction((type, message, ...params) => {
  if (
    type === "warn" &&
    typeof message === "string" &&
    message.includes("THREE.Clock: This module has been deprecated")
  ) {
    return;
  }
  console[type](message, ...params);
});

/**
 * Procedural "build console": a product slab being assembled from floating
 * panels. No textures, no network assets — geometry and light only.
 *
 * `progress` (0→1, driven by the hero ScrollTrigger) gently disassembles the
 * composition as the visitor scrolls past — the product "exploding" back into
 * parts. Pointer adds a subtle parallax. Reduced motion renders one static
 * frame.
 */

type Vec3 = [number, number, number];

type ScatterProps = {
  base: Vec3;
  scatter: Vec3;
  rotation?: Vec3;
  progress: RefObject<number>;
  children: ReactNode;
};

function Scatter({ base, scatter, rotation = [0, 0, 0], progress, children }: ScatterProps) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const p = progress.current ?? 0;
    const eased = p * p * (3 - 2 * p); // smoothstep
    g.position.set(
      base[0] + scatter[0] * eased,
      base[1] + scatter[1] * eased,
      base[2] + scatter[2] * eased,
    );
  });

  return (
    <group ref={group} position={base} rotation={rotation}>
      {children}
    </group>
  );
}

function Slab({
  size,
  color,
  radius = 0.05,
  roughness = 0.85,
  position = [0, 0, 0] as Vec3,
  emissive,
  emissiveIntensity = 0,
}: {
  size: Vec3;
  color: string;
  radius?: number;
  roughness?: number;
  position?: Vec3;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  return (
    <RoundedBox args={size} radius={radius} smoothness={4} position={position}>
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={0.06}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={emissiveIntensity}
      />
    </RoundedBox>
  );
}

/** A soft additive halo (fake bloom) — a camera-facing radial-gradient sprite.
 * Cheaper than a post-processing pass and needs no extra dependency. */
function Glow({
  color,
  size = 2,
  position,
  opacity = 0.6,
}: {
  color: string;
  size?: number;
  position: Vec3;
  opacity?: number;
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    return new THREE.CanvasTexture(canvas);
  }, [color]);

  return (
    <mesh position={position}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/** Drifting dust field for depth. Pure points, slowly rotating. */
function Particles({ count = 90 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 13;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1.5;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#7ee0c2"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Slowly tumbling wireframe icosahedron — the focal accent object. */
function FocalShape({ progress }: { progress: RefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const m = ref.current;
    if (!m) return;
    const p = progress.current ?? 0;
    m.rotation.x += delta * 0.18;
    m.rotation.y += delta * 0.26;
    m.position.x = 2.55 + p * 0.6;
    m.position.y = 1.5 + p * 0.4;
  });

  return (
    <group>
      <Glow color="#ff7759" size={2.6} position={[2.55, 1.5, -0.6]} opacity={0.55} />
      <mesh ref={ref} position={[2.55, 1.5, -0.4]}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color="#ff7759"
          emissive="#ff7759"
          emissiveIntensity={0.9}
          roughness={0.4}
          metalness={0.1}
          wireframe
        />
      </mesh>
    </group>
  );
}

function Rule({
  width,
  position,
  opacity = 0.3,
}: {
  width: number;
  position: Vec3;
  opacity?: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, 0.035, 0.015]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={opacity} />
    </mesh>
  );
}

function Rig({
  progress,
  interactive,
  children,
}: {
  progress: RefObject<number>;
  interactive: boolean;
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current ?? 0;
    const px = interactive ? state.pointer.x : 0;
    const py = interactive ? state.pointer.y : 0;
    // Stronger, springier pointer tracking + slight positional parallax.
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -0.1 + py * 0.16 - p * 0.16, 4, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.3 + px * 0.32 + p * 0.1, 4, delta);
    g.position.x = THREE.MathUtils.damp(g.position.x, px * 0.22, 4, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, py * 0.12 + p * 0.55, 4, delta);
  });

  return (
    <group ref={group} rotation={[-0.1, -0.3, 0]}>
      {children}
    </group>
  );
}

function Scene({ progress, reduced }: { progress: RefObject<number>; reduced: boolean }) {
  const content = (
    <Rig progress={progress} interactive={!reduced}>
      {/* Main console slab + screen details */}
      <Scatter base={[0, 0.08, 0]} scatter={[0, 0, -0.7]} progress={progress}>
        <Slab size={[3.6, 2.25, 0.16]} color="#0d352d" radius={0.07} />
        <Slab size={[3.22, 1.86, 0.03]} color="#0a2a23" radius={0.04} position={[0, 0.02, 0.09]} />
        <Rule width={2.4} position={[-0.18, 0.56, 0.12]} />
        <Rule width={1.7} position={[-0.53, 0.18, 0.12]} opacity={0.22} />
        <Rule width={2.0} position={[-0.38, -0.16, 0.12]} opacity={0.16} />
        {/* status dot */}
        <mesh position={[-1.42, 0.56, 0.12]}>
          <boxGeometry args={[0.1, 0.1, 0.02]} />
          <meshBasicMaterial color="#ff7759" />
        </mesh>
        {/* response card */}
        <Slab
          size={[1.3, 0.52, 0.05]}
          color="#ffffff"
          radius={0.04}
          position={[0.78, -0.58, 0.14]}
        />
      </Scatter>

      {/* Supporting panels, converging into the build */}
      <Scatter
        base={[-2.15, 0.9, -0.9]}
        scatter={[-1.3, 0.7, -1.4]}
        rotation={[0.02, 0.18, 0.05]}
        progress={progress}
      >
        <Slab size={[1.5, 1.0, 0.12]} color="#071829" />
      </Scatter>

      <Scatter
        base={[2.3, -0.42, -0.7]}
        scatter={[1.5, -0.55, -1.2]}
        rotation={[0, -0.22, -0.04]}
        progress={progress}
      >
        <Slab size={[1.2, 1.62, 0.12]} color="#17171c" />
      </Scatter>

      <Scatter
        base={[1.78, 1.12, 0.55]}
        scatter={[1.0, 0.85, 0.9]}
        rotation={[0.1, -0.25, 0.06]}
        progress={progress}
      >
        <Slab size={[1.08, 0.72, 0.1]} color="#eeece7" roughness={0.95} />
      </Scatter>

      <Scatter
        base={[-1.9, -1.0, 0.7]}
        scatter={[-0.9, -0.75, 1.1]}
        rotation={[0.05, 0.2, -0.07]}
        progress={progress}
      >
        <Slab
          size={[0.8, 0.27, 0.1]}
          color="#ff7759"
          radius={0.1}
          emissive="#ff7759"
          emissiveIntensity={0.6}
        />
      </Scatter>

      <Scatter
        base={[-1.62, 1.0, 0.5]}
        scatter={[-0.75, 0.65, 0.95]}
        rotation={[0.08, 0.16, 0.04]}
        progress={progress}
      >
        <Slab size={[0.64, 0.44, 0.09]} color="#ffffff" roughness={0.6} />
      </Scatter>
    </Rig>
  );

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 7]} intensity={1.5} />
      <pointLight position={[-5, -2, 4]} intensity={36} color="#ff7759" />
      {/* Soft ambient backdrop glow (static, always on) */}
      <Glow color="#1d6b58" size={9} position={[-1.4, 0.4, -2.6]} opacity={0.5} />
      {!reduced && <Particles />}
      {!reduced && <FocalShape progress={progress} />}
      {reduced ? (
        content
      ) : (
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.5}>
          {content}
        </Float>
      )}
    </>
  );
}

export default function HeroCanvas({
  progress,
  reduced,
}: {
  progress: RefObject<number>;
  reduced: boolean;
}) {
  return (
    <Canvas
      aria-hidden
      frameloop={reduced ? "demand" : "always"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.15, 7.1], fov: 33 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="absolute inset-0"
    >
      <Scene progress={progress} reduced={reduced} />
    </Canvas>
  );
}
