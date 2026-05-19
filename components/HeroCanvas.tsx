'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Transparent WebGL overlay — drifting light motes only.
 * The hero photo is rendered by the CSS background-image on the section,
 * guaranteeing zero colour processing and pixel-perfect fidelity to the source file.
 */
export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10)
    camera.position.z = 1

    // ── Drifting light motes ──────────────────────────────────────────────
    const COUNT = 130
    const pPos = new Float32Array(COUNT * 3)
    const pSize = new Float32Array(COUNT)
    const pSpeed = new Float32Array(COUNT)
    const pPhase = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 2.2
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 2.2
      pPos[i * 3 + 2] = 0.1
      pSize[i]  = Math.random() * 4 + 1.2
      pSpeed[i] = Math.random() * 0.02 + 0.006
      pPhase[i] = Math.random() * Math.PI * 2
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('aSize',    new THREE.BufferAttribute(pSize, 1))
    pGeo.setAttribute('aPhase',   new THREE.BufferAttribute(pPhase, 1))

    const pUniforms = { uTime: { value: 0 }, uPixelRatio: { value: renderer.getPixelRatio() } }
    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: pUniforms,
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.x += sin(uTime * 0.4 + aPhase) * 0.05;
          vAlpha = 0.30 + 0.40 * sin(uTime * 0.8 + aPhase);
          gl_Position = vec4(p.xy, 0.0, 1.0);
          gl_PointSize = aSize * uPixelRatio;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d) * clamp(vAlpha, 0.0, 1.0);
          gl_FragColor = vec4(0.85, 0.95, 1.0, a * 0.45);
        }
      `,
    })
    const particles = new THREE.Points(pGeo, particleMat)
    scene.add(particles)

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Loop ──────────────────────────────────────────────────────────────
    let frameId: number
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      pUniforms.uTime.value += 0.016

      const pos = pGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < COUNT; i++) {
        let y = pos.getY(i) + pSpeed[i] * 0.016
        if (y > 1.15) y = -1.15
        pos.setY(i, y)
      }
      pos.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      particleMat.dispose()
      pGeo.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 h-full w-full pointer-events-none" />
}
