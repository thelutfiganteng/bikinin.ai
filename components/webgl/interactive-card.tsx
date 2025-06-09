"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InteractiveCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color1?: string
  color2?: string
  className?: string
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  icon,
  color1 = "#00f2ff", // Neon blue
  color2 = "#bf00ff", // Neon purple
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const planeRef = useRef<THREE.Mesh | null>(null)
  const frameRef = useRef<number>(0)
  const [isHovered, setIsHovered] = useState(false)
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    if (!canvasRef.current || !cardRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      cardRef.current.clientWidth / cardRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 1
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(cardRef.current.clientWidth, cardRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    // Create shader material with enhanced neon effects
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(cardRef.current.clientWidth, cardRef.current.clientHeight) },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_color1: { value: new THREE.Color(color1) },
        u_color2: { value: new THREE.Color(color2) },
        u_hover: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        uniform float u_hover;
        varying vec2 vUv;
        
        // Simplex noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                                dot(x12.zw, x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        // Electric field effect
        vec3 electricField(vec2 uv, float time, vec3 color) {
          float intensity = 1.0 + u_hover * 2.0;
          
          // Create electric field pattern
          float noise1 = snoise(uv * 3.0 + time * 0.2) * 0.5 + 0.5;
          float noise2 = snoise(uv * 5.0 - time * 0.3) * 0.5 + 0.5;
          
          // Create electric arcs
          float arc1 = pow(noise1, 5.0) * intensity;
          float arc2 = pow(noise2, 7.0) * intensity;
          
          // Combine arcs
          float finalArc = arc1 + arc2;
          
          // Add glow
          float glow = smoothstep(0.0, 0.5, finalArc) * 0.5;
          
          return color * (finalArc + glow);
        }
        
        void main() {
          vec2 st = vUv;
          
          // Mouse influence
          float mouseDistance = length(st - u_mouse / u_resolution.xy);
          float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance) * u_hover;
          
          // Noise layers with hover effect
          float speed = 0.2 + u_hover * 0.3;
          float scale = 3.0 + u_hover * 2.0;
          
          float noise1 = snoise(st * scale + u_time * speed) * 0.5 + 0.5;
          float noise2 = snoise(st * (scale * 1.5) - u_time * speed * 1.2) * 0.5 + 0.5;
          
          // Combine noise layers
          float finalNoise = mix(noise1, noise2, 0.5);
          
          // Add hover effect to noise
          finalNoise = mix(finalNoise, finalNoise * 1.5, mouseInfluence);
          
          // Color mixing with hover effect
          vec3 baseColor = mix(u_color1, u_color2, finalNoise);
          
          // Add electric field effect
          vec3 electricEffect = electricField(st, u_time, mix(u_color1, u_color2, 0.5));
          baseColor += electricEffect * u_hover;
          
          // Add glow effect on hover
          float glow = smoothstep(0.4, 0.6, sin(finalNoise * 10.0 + u_time)) * u_hover;
          baseColor += glow * 0.3;
          
          // Add vignette
          float vignette = smoothstep(0.0, 0.7, length(st - 0.5));
          baseColor = mix(baseColor, baseColor * 0.8, vignette * (1.0 - u_hover * 0.5));
          
          // Add pulsing brightness
          float pulse = sin(u_time * 0.5) * 0.1 + 0.9;
          baseColor *= pulse;
          
          gl_FragColor = vec4(baseColor, 0.15 + u_hover * 0.2);
        }
      `,
      transparent: true,
    })

    // Create a plane that fills the card
    const geometry = new THREE.PlaneGeometry(2, 2)
    const plane = new THREE.Mesh(geometry, shaderMaterial)
    scene.add(plane)
    planeRef.current = plane

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: rect.height - (event.clientY - rect.top), // Invert Y for WebGL coordinates
      }
    }

    // Handle window resize
    const handleResize = () => {
      if (!cardRef.current || !cameraRef.current || !rendererRef.current) return

      const width = cardRef.current.clientWidth
      const height = cardRef.current.clientHeight

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)

      // Update shader uniforms
      shaderMaterial.uniforms.u_resolution.value.x = width
      shaderMaterial.uniforms.u_resolution.value.y = height
    }

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

      // Update time uniform
      shaderMaterial.uniforms.u_time.value += 0.01

      // Update mouse uniform with smooth interpolation
      shaderMaterial.uniforms.u_mouse.value.x += (mouseRef.current.x - shaderMaterial.uniforms.u_mouse.value.x) * 0.1
      shaderMaterial.uniforms.u_mouse.value.y += (mouseRef.current.y - shaderMaterial.uniforms.u_mouse.value.y) * 0.1

      // Update hover uniform with smooth interpolation
      shaderMaterial.uniforms.u_hover.value += ((isHovered ? 1 : 0) - shaderMaterial.uniforms.u_hover.value) * 0.1

      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    // Add event listeners
    cardRef.current.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current)

      if (cardRef.current) {
        cardRef.current.removeEventListener("mousemove", handleMouseMove)
      }

      window.removeEventListener("resize", handleResize)

      if (geometry) geometry.dispose()
      if (shaderMaterial) shaderMaterial.dispose()
    }
  }, [color1, color2])

  return (
    <Card
      ref={cardRef}
      className={`relative overflow-hidden border-none shadow-lg hover:shadow-neon transition-all duration-500 ease-standard h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-5" />
      <CardHeader className="pb-2 relative z-10">
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 ease-standard">
          <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-md p-4 rounded-2xl w-fit group-hover:shadow-neon-purple transition-shadow duration-300">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-white group-hover:text-blue-neon transition-colors duration-300 ease-standard animate-neon-pulse">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
          {description}
        </p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-standard">
          <div className="h-1 w-12 bg-gradient-to-r from-blue-neon to-purple-neon rounded-full shadow-neon"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InteractiveCard
