import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { Points as ThreePoints, Mesh } from 'three'
import * as random from 'maath/random'

const BackgroundScene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <Stars />
      <FloatingGeometry />
    </>
  )
}

const Stars = () => {
  const ref = useRef<ThreePoints>(null!)
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const FloatingGeometry = () => {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.5
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <torusGeometry args={[3, 0.5, 16, 100]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  )
}

export default BackgroundScene 