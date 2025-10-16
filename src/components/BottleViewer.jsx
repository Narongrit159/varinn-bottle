import { Canvas } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Lightformer,
} from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import { Varrinn1 } from './DummyModels.js'

export default function BottleViewer({
  modelUrl,
  main_color,
  sub_color,
  paColor,
  selectedImage,
  isRotating,
}) {
  const controlsRef = useRef()
  const initialCameraPos = new THREE.Vector3(1, -2, -4)
  const initialTarget = new THREE.Vector3(0, -2.5, 0)

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.copy(initialCameraPos)
      controlsRef.current.target.copy(initialTarget)
      controlsRef.current.update()
    }
  }, [modelUrl])

  return (
    <div className="w-full max-w-[700px] h-80 sm:h-full rounded-2xl overflow-hidden mx-auto">
      <Canvas
        shadows
        camera={{ position: initialCameraPos, fov: 38 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
          antialias: true,
        }}
      >
        <color attach="background" args={['#ffffff']} />

        {/* Lights */}
        <ambientLight intensity={1.5} color="#ffffff" />
        <directionalLight
          position={[5, 10, 7.5]}
          intensity={3}
          color="#fff4eb"
          castShadow
        />
        <directionalLight
          position={[-5, 10, 7.5]}
          intensity={2.5}
          color="#ffe4e1"
        />
        <directionalLight
          position={[0, 5, 5]}
          intensity={1.5}
          color="#ffffff"
        />
        <directionalLight
          position={[0, 5, -5]}
          intensity={1.2}
          color="#fff0f5"
        />
        <directionalLight
          position={[5, 5, -10]}
          intensity={1.0}
          color="#ffe4e1"
        />
        <directionalLight
          position={[-5, 5, -10]}
          intensity={1.0}
          color="#fff0f5"
        />

        {/* Model */}

        {/* Soft shadows */}
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.05}
          scale={10}
          blur={4}
          far={6}
        />

        {/* Controls */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableDamping
          dampingFactor={0.1}
          rotateSpeed={0.6}
          target={initialTarget}
        />

        <Varrinn1
          main_color={main_color}
          sub_color={sub_color}
          selectedImage={selectedImage}
          paColor={paColor}
          isRotating={isRotating}
        />
      </Canvas>
    </div>
  )
}
