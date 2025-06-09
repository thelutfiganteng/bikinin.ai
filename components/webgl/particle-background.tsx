"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import * as THREE from "three"

interface ParticleBackgroundProps {
  color1?: string
  color2?: string
  color3?: string
  color4?: string
  particleCount?: number
  speed?: number
  className?: string
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  color1 = "#00f2ff", // Neon blue
  color2 = "#bf00ff", // Neon purple
  color3 = "#ff00ff", // Neon pink
  color4 = "#00ff8c", // Neon green
  particleCount = 100,
  speed = 0.2,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 20
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount3 = particleCount * 3
    const positions = new Float32Array(particleCount3)
    const colors = new Float32Array(particleCount3)
    const sizes = new Float32Array(particleCount)
    const color1Obj = new THREE.Color(color1)
    const color2Obj = new THREE.Color(color2)
    const color3Obj = new THREE.Color(color3)
    const color4Obj = new THREE.Color(color4)

    for (let i = 0; i < particleCount3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 50 // x
      positions[i + 1] = (Math.random() - 0.5) * 50 // y
      positions[i + 2] = (Math.random() - 0.5) * 50 // z

      // Color - interpolate between multiple colors
      const mixFactor = Math.random()
      let color

      if (mixFactor < 0.25) {
        color = new THREE.Color().lerpColors(color1Obj, color2Obj, mixFactor * 4)
      } else if (mixFactor < 0.5) {
        color = new THREE.Color().lerpColors(color2Obj, color3Obj, (mixFactor - 0.25) * 4)
      } else if (mixFactor < 0.75) {
        color = new THREE.Color().lerpColors(color3Obj, color4Obj, (mixFactor - 0.5) * 4)
      } else {
        color = new THREE.Color().lerpColors(color4Obj, color1Obj, (mixFactor - 0.75) * 4)
      }

      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b

      // Size - vary more for neon effect
      sizes[i / 3] = Math.random() * 3 + 0.5
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    // Particle material with enhanced glow
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 30 * renderer.getPixelRatio() },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        attribute float size;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          
          // Animate position with more complex motion
          vec3 pos = position;
          pos.x += sin(uTime * 0.3 + position.z * 0.5) * 0.5;
          pos.y += cos(uTime * 0.2 + position.x * 0.5) * 0.5;
          pos.z += sin(uTime * 0.1 + position.y * 0.5) * 0.5;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size attenuation with pulsing effect
          float pulse = sin(uTime * 0.2 + position.x + position.y + position.z) * 0.2 + 1.0;
          gl_PointSize = uSize * size * pulse * (1.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Enhanced glow effect
          float dist = distance(gl_PointCoord, vec2(0.5));
          float strength = 1.0 - dist;
          
          // Sharper center, softer edges
          strength = pow(strength, 2.0);
          
          // Add inner glow
          float innerGlow = smoothstep(0.4, 0.0, dist);
          strength += innerGlow * 0.5;
          
          // Final color with enhanced brightness
          vec3 color = vColor * strength * 1.5;
          
          // Add white core for extra brightness
          color = mix(vec3(1.0), color, smoothstep(0.0, 0.2, dist));
          
          gl_FragColor = vec4(color, strength);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })

    // Create points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)
    particlesRef.current = particles

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return

      // Update time uniform
      particlesMaterial.uniforms.uTime.value += speed * 0.01

      // Rotate particles
      particlesRef.current.rotation.x += speed * 0.001
      particlesRef.current.rotation.y += speed * 0.002

      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    // Add event listeners
    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", handleResize)

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      if (particlesGeometry) particlesGeometry.dispose()
      if (particlesMaterial) particlesMaterial.dispose()
    }
  }, [color1, color2, color3, color4, particleCount, speed])

  return <div ref={containerRef} className={`absolute inset-0 -z-10 ${className}`} />
}

export default ParticleBackground
