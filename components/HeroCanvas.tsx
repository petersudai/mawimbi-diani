'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Renders the real Diani Beach hero photograph into WebGL with a gentle
 * liquid ripple confined to the ocean (lower-left of the frame), a cinematic
 * colour grade, soft mouse parallax, and drifting light motes.
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

    // ── Photo plane ───────────────────────────────────────────────────────
    const uniforms = {
      uTime: { value: 0 },
      uTexture: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      uImageResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uOpacity: { value: 0 },
    }

    new THREE.TextureLoader().load('/photos/diani-hero.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      uniforms.uTexture.value = tex
      uniforms.uImageResolution.value.set(tex.image.width, tex.image.height)
    })

    const photoMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform sampler2D uTexture;
        uniform vec2 uResolution;
        uniform vec2 uImageResolution;
        uniform vec2 uMouse;
        uniform float uOpacity;
        varying vec2 vUv;

        void main() {
          // cover-fit the photo to the viewport (no blank edges)
          float planeAspect = uResolution.x / uResolution.y;
          float imageAspect = uImageResolution.x / uImageResolution.y;
          vec2 scale = vec2(1.0);
          if (planeAspect > imageAspect) scale.y = imageAspect / planeAspect;
          else                          scale.x = planeAspect / imageAspect;

          // 1.04 = a hair of headroom so parallax/ripple never expose an edge
          vec2 uv = (vUv - 0.5) * scale / 1.04 + 0.5;

          // soft mouse parallax
          uv += (uMouse - 0.5) * 0.008;

          // mask: ocean only, lower-left of the frame. The land stays still.
          float water = smoothstep(0.46, 0.04, uv.x) * smoothstep(0.58, 0.18, uv.y);

          // liquid ripple, confined to the water
          float ripple = sin(uv.y * 26.0 - uTime * 1.3) * 0.0028
                       + sin(uv.x * 15.0 + uTime * 0.85) * 0.0020;
          uv.x += ripple * water;
          uv.y += ripple * 0.5 * water;

          vec4 col = texture2D(uTexture, uv);

          // cinematic grade: teal shadows, warm light, gentle contrast
          col.rgb = pow(col.rgb, vec3(0.94));
          float lum = dot(col.rgb, vec3(0.299, 0.587, 0.114));
          col.rgb = mix(col.rgb, col.rgb * vec3(0.72, 0.90, 1.07), (1.0 - lum) * 0.24);
          col.rgb = mix(col.rgb, col.rgb * vec3(1.10, 1.03, 0.92), lum * 0.14);

          // vignette
          float vig = smoothstep(1.15, 0.30, length(vUv - 0.5));
          col.rgb *= mix(0.66, 1.0, vig);

          gl_FragColor = vec4(col.rgb, uOpacity);
        }
      `,
    })
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), photoMat)
    photo.renderOrder = 0
    scene.add(photo)

    // ── Drifting light motes ──────────────────────────────────────────────
    const COUNT = 130
    const pPos = new Float32Array(COUNT * 3)
    const pSize = new Float32Array(COUNT)
    const pSpeed = new Float32Array(COUNT)
    const pPhase = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 2.2
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 2.2
      pPos[i * 3 + 2] = 0.1
      pSize[i] = Math.random() * 4 + 1.2
      pSpeed[i] = Math.random() * 0.02 + 0.006
      pPhase[i] = Math.random() * Math.PI * 2
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1))
    pGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhase, 1))

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
    particles.renderOrder = 1
    scene.add(particles)

    // ── Interaction ───────────────────────────────────────────────────────
    const targetMouse = new THREE.Vector2(0.5, 0.5)
    const onMove = (e: MouseEvent) => {
      targetMouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove)

    const onResize = () => {
      if (!mount) return
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      uniforms.uResolution.value.set(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Loop ──────────────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    let frameId: number
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      uniforms.uTime.value = t
      pUniforms.uTime.value = t

      if (uniforms.uTexture.value && uniforms.uOpacity.value < 1) {
        uniforms.uOpacity.value = Math.min(1, uniforms.uOpacity.value + 0.022)
      }

      uniforms.uMouse.value.lerp(targetMouse, 0.04)

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
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      photoMat.dispose()
      particleMat.dispose()
      pGeo.dispose()
      photo.geometry.dispose()
      uniforms.uTexture.value?.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" />
}
