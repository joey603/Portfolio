import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { RoundedBox } from '@react-three/drei'

const FloatingCube = () => {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <RoundedBox
        ref={meshRef}
        args={[2, 2, 2]}
        radius={0.2}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.8}
          roughness={0.2}
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}
    </group>
  )
}

const FloatingParticle = ({ index }: { index: number }) => {
  const meshRef = useRef<Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.position.x = Math.sin(time * 0.5 + index) * 3
      meshRef.current.position.y = Math.cos(time * 0.3 + index) * 2
      meshRef.current.position.z = Math.sin(time * 0.4 + index) * 1
      meshRef.current.rotation.x = time * 0.5
      meshRef.current.rotation.y = time * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial
        color={`hsl(${(index * 30) % 360}, 70%, 60%)`}
        emissive={`hsl(${(index * 30) % 360}, 70%, 30%)`}
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

export default FloatingCube 