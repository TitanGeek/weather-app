"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Cloud, Sky } from "@react-three/drei"

function RainEffect() {
  const rainCount = 1000
  const positions = useRef(new Float32Array(rainCount * 3))
  const velocities = useRef(new Float32Array(rainCount))
  const rainRef = useRef()

  useEffect(() => {
    for (let i = 0; i < rainCount; i++) {
      positions.current[i * 3] = Math.random() * 40 - 20
      positions.current[i * 3 + 1] = Math.random() * 20
      positions.current[i * 3 + 2] = Math.random() * 40 - 20
      velocities.current[i] = 0.1 + Math.random() * 0.1
    }
  }, [])

  useFrame(() => {
    const positionArray = rainRef.current.geometry.attributes.position.array

    for (let i = 0; i < rainCount; i++) {
      positionArray[i * 3 + 1] -= velocities.current[i]

      if (positionArray[i * 3 + 1] < -10) {
        positionArray[i * 3 + 1] = 20
      }
    }

    rainRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={rainCount} array={positions.current} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#aaddff" transparent opacity={0.6} />
    </points>
  )
}

function CloudsEffect() {
  return (
    <>
      <Cloud position={[-4, 2, 0]} speed={0.2} opacity={0.7} />
      <Cloud position={[4, 3, -6]} speed={0.1} opacity={0.7} />
      <Cloud position={[0, 5, -10]} speed={0.3} opacity={0.5} />
    </>
  )
}

function SunEffect() {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.FogExp2(0xffffff, 0.01)
  }, [scene])

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 5, 5]} intensity={1.5} castShadow />
      <mesh position={[0, 10, -15]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#FFFF99" />
      </mesh>
    </>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#88aa88" />
    </mesh>
  )
}

function WeatherEffects({ condition }) {
  switch (condition?.toLowerCase()) {
    case "rain":
    case "drizzle":
      return (
        <>
          <RainEffect />
          <CloudsEffect />
          <ambientLight intensity={0.3} />
          <fog attach="fog" args={["#aabbcc", 0.01]} />
        </>
      )
    case "clouds":
      return (
        <>
          <CloudsEffect />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={0.8} castShadow />
        </>
      )
    case "clear":
    default:
      return (
        <>
          <SunEffect />
          <Sky sunPosition={[0, 1, 0]} />
        </>
      )
  }
}

export default function WeatherScene({ weatherCondition }) {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
      <WeatherEffects condition={weatherCondition} />
      <Ground />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 - 0.1} />
    </Canvas>
  )
}
