"use client"

import { useEffect, useState, useRef } from "react"
import * as THREE from "three"

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 1
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    // Create animated background shader
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_progress: { value: 0 },
        u_color1: { value: new THREE.Color("#3b82f6") }, // blue-500
        u_color2: { value: new THREE.Color("#4f46e5") }, // indigo-600
        u_color3: { value: new THREE.Color("#7e22ce") }, // purple-700
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
        uniform float u_progress;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        uniform vec3 u_color3;
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
        
        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st.x *= u_resolution.x / u_resolution.y;
          
          // Create flowing patterns
          float noise1 = snoise(st * 2.0 + u_time * 0.3) * 0.5 + 0.5;
          float noise2 = snoise(st * 3.0 - u_time * 0.2) * 0.5 + 0.5;
          float noise3 = snoise(st * 4.0 + u_time * 0.1) * 0.5 + 0.5;
          
          // Combine noise layers
          float finalNoise = noise1 * 0.4 + noise2 * 0.3 + noise3 * 0.3;
          
          // Create radial gradient from center
          float dist = length(st - 0.5);
          float radial = 1.0 - smoothstep(0.0, 0.8, dist);
          
          // Progress-based reveal
          float reveal = smoothstep(0.0, 1.0, u_progress);
          
          // Color mixing with progress
          vec3 color = mix(
            mix(u_color1, u_color2, finalNoise),
            u_color3,
            noise3 * reveal
          );
          
          // Add glow effect
          color += radial * 0.3 * reveal;
          
          // Final alpha with progress
          float alpha = radial * reveal * 0.8;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, shaderMaterial)
    scene.add(mesh)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

      // Update shader uniforms
      shaderMaterial.uniforms.u_time.value += 0.01
      shaderMaterial.uniforms.u_progress.value = progress / 100

      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current)
      if (geometry) geometry.dispose()
      if (shaderMaterial) shaderMaterial.dispose()
    }
  }, [progress])

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Start fade out animation
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 800) // Wait for fade out animation
          }, 500)
          return 100
        }
        return prev + Math.random() * 15 + 5 // Random increment between 5-20
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!isVisible) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center animate-fadeOut">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Main Content */}
      <div className="relative z-10 text-center text-white">
        {/* Logo Container */}
        <div className="flex items-center justify-center gap-4">
          <img src="/images/logo.png" alt="Bikinin.ai Logo" className="w-30 h-30" />
        </div>

        {/* Loading Text */}
        <div className="mb-6 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          {/* <p className="text-xl font-medium text-blue-100 mb-2">Memuat Pengalaman Digital Terbaik</p> */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
          <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-white/30">
            <div
              className="h-full bg-gradient-to-r from-white to-purple-200 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-blue-200 text-sm mt-2 font-medium">{Math.round(progress)}%</p>
        </div>

        {/* Tagline */}
        {/* <div className="mt-8 animate-fadeInUp" style={{ animationDelay: "1.2s" }}>
          <p className="text-blue-200 text-lg max-w-md mx-auto leading-relaxed">
            Transformasi digital dimulai dari sini. Bersiaplah untuk pengalaman yang luar biasa.
          </p>
        </div> */}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default SplashScreen
