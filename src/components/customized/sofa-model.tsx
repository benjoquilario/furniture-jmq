"use client"

import { useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Group } from "three"
import { useSofaStore } from "@/store/sofa"

interface SofaModelProps {
  hasArms: boolean
  isReclined: boolean
  isBed: boolean
}

export function SofaModel({ hasArms, isReclined, isBed }: SofaModelProps) {
  const groupRef = useRef<Group>(null)
  const { color } = useSofaStore()

  // In a real application, you would load different models based on the configuration
  // For simplicity, we're simulating the model changes
  useEffect(() => {
    if (!groupRef.current) return

    const scale = isBed ? [1, 0.8, 1.6] : [1, 1, 1]
    groupRef.current.scale.set(scale[0], scale[1], scale[2])

    const rotation = isReclined ? [0, 0, -0.15] : [0, 0, 0]
    groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
  }, [isBed, isReclined])

  return (
    <group ref={groupRef}>
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        {/* Base of the sofa */}
        <boxGeometry args={[2.4, 0.4, isBed ? 1.8 : 1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Back of the sofa - hidden when in bed mode */}
      {!isBed && (
        <mesh receiveShadow castShadow position={[0, 0.6, -0.45]}>
          <boxGeometry args={[2.4, 0.8, 0.1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      )}

      {/* Armrests - only shown when hasArms is true */}
      {hasArms && !isBed && (
        <>
          <mesh receiveShadow castShadow position={[-1.25, 0.4, 0]}>
            <boxGeometry args={[0.1, 0.4, 0.9]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh receiveShadow castShadow position={[1.25, 0.4, 0]}>
            <boxGeometry args={[0.1, 0.4, 0.9]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </>
      )}

      {/* Cushions */}
      <mesh receiveShadow castShadow position={[0, 0.25, 0.1]}>
        <boxGeometry args={[2.3, 0.1, isBed ? 1.7 : 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Pillows when not in bed mode */}
      {!isBed && (
        <>
          <mesh receiveShadow castShadow position={[-0.8, 0.5, 0.2]}>
            <boxGeometry args={[0.5, 0.3, 0.1]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh receiveShadow castShadow position={[0, 0.5, 0.2]}>
            <boxGeometry args={[0.5, 0.3, 0.1]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh receiveShadow castShadow position={[0.8, 0.5, 0.2]}>
            <boxGeometry args={[0.5, 0.3, 0.1]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </>
      )}
    </group>
  )
}
