import { useGLTF, useScroll, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";

const MacContainer = () => {
  // Load model and texture once, cache them
  const { scene } = useGLTF("./mac.glb");
  const tex = useTexture("./img.webp");
  const groupRef = useRef();

  // Memoize mesh extraction for performance
  const meshes = useMemo(() => {
    const found = {};
    scene.traverse((e) => {
      found[e.name] = e;
    });
    return found;
  }, [scene]);

  // Apply material and texture settings once
  useEffect(() => {
    if (meshes.matte && meshes.matte.material) {
      meshes.matte.material.map = tex;
      meshes.matte.material.emissiveIntensity = 0;
      meshes.matte.material.metalness = 0.1; // Slight metalness for realism
      meshes.matte.material.roughness = 0.9; // Slightly less rough for quality
      meshes.matte.material.needsUpdate = true;
    }
    if (meshes.screen) {
      meshes.screen.rotation.x = THREE.MathUtils.degToRad(180);
    }
  }, [meshes, tex]);

  const data = useScroll();

  // Animate only if mesh exists
  useFrame(() => {
    if (meshes.screen) {
      // Use lerp for smooth animation
      meshes.screen.rotation.x = THREE.MathUtils.lerp(
        meshes.screen.rotation.x,
        THREE.MathUtils.degToRad(180 - data.offset * 90),
        0.15 // Adjust for speed/smoothness
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -14, 20]}>
      <primitive object={scene} />
    </group>
  );
};

export default MacContainer;
