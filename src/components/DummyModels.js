import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function Varrinn1({
  main_color,
  sub_color,
  selectedImage,
  paColor,
  isRotating,
}) {
  const gltf = useLoader(GLTFLoader, '/varinn/models/varinn-1.glb')
  const { scene } = useThree()

  const controlsRef = useRef()
  const modelRef = useRef()

  useEffect(() => {
    const model = gltf.scene
    modelRef.current = model
    // ... (โค้ดตั้งค่า model เดิมของกุ๊กไก่ทั้งหมด)
    scene.add(model)
    return () => scene.remove(model)
  }, [scene, gltf.scene])

  // เพิ่มส่วนนี้
  useFrame(() => {
    if (isRotating && modelRef.current) {
      modelRef.current.rotation.y += 0.01
    }
  })

  useEffect(() => {
    const model = gltf.scene
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)

    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const desiredSize = 2
    const scale = desiredSize / maxDim
    model.scale.setScalar(scale)

    model.traverse((child) => {
      if (child.isMesh) {
        child.material.roughness = 0.1
        child.material.metalness = 0.3
        child.material.needsUpdate = true
      }
    })

    if (controlsRef.current) {
      controlsRef.current.target.copy(center)
    }

    scene.add(model)
    return () => scene.remove(model)
  }, [scene, gltf.scene])

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material.name === 'Material.005') {
          child.material.color.set(sub_color)
          child.material.roughness = 0.4
          child.material.metalness = 0.5
          child.material.envMapIntensity = 0.2
        }
        if (child.material.name === 'Material') {
          child.material.color.set(main_color)
          child.material.roughness = 0.8
          child.material.metalness = 0
          child.material.envMapIntensity = 0.2
        }
        if (child.material.name === 'Cylinder001_TextureMaterial') {
          child.material.color.set(paColor)
          child.material.roughness = 0.8
          child.material.metalness = 0
          child.material.envMapIntensity = 0.2
        }
      }
    })
  }, [main_color, sub_color, paColor])

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.name === 'Cylinder001_TextureLayer') {
        if (child.parent) child.parent.remove(child)
      }
    })

    const texture = new THREE.TextureLoader().load(selectedImage)
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.generateMipmaps = false
    texture.repeat.set(-1, 1) // บวกทุกค่า ไม่กลับกระจก
    texture.offset.set(0, -0.2) // เลื่อนแนวตั้งตามต้องการ
    texture.center.set(0.5, 0.5)
    texture.rotation = 0 // ไม่หมุน

    gltf.scene.traverse((child) => {
      if (child.isMesh && child.name === 'Cylinder001') {
        const textureMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          opacity: 1,
          roughness: 0.8,
          metalness: 0,
        })

        textureMaterial.name = 'Cylinder001_TextureMaterial'

        const clone = new THREE.Mesh(child.geometry, textureMaterial)
        clone.name = 'Cylinder001_TextureLayer'

        clone.position.copy(child.position)
        clone.rotation.copy(child.rotation)
        clone.scale.copy(child.scale).multiplyScalar(1)

        child.parent.add(clone)
      }
    })
  }, [selectedImage, gltf.scene])

  // useEffect(() => {
  //   gltf.scene.traverse((child) => {
  //     if (child.isMesh) {
  //       console.log('Mesh found:', child.name, child.material)
  //     }
  //   })
  //   scene.add(gltf.scene)
  //   return () => scene.remove(gltf.scene)
  // }, [gltf, scene])

  return null
}
