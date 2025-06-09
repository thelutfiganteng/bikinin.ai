"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const timeRef = useRef<number>(0)
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 1
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_color1: { value: new THREE.Color("#00f2ff") }, // Neon blue
        u_color2: { value: new THREE.Color("#6600ff") }, // Neon indigo
        u_color3: { value: new THREE.Color("#bf00ff") }, // Neon purple
        u_color4: { value: new THREE.Color("#ff00ff") }, // Neon pink
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
        uniform vec3 u_color3;
        uniform vec3 u_color4;
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
        
        // Star field function
        float stars(vec2 uv, float scale, float intensity) {
          vec2 st = uv * scale;
          float star = pow(snoise(floor(st)), 20.0) * intensity;
          return clamp(star, 0.0, 1.0);
        }
        
        // Aurora effect
        vec3 aurora(vec2 uv, float time) {
          float speed = 0.1;
          float intensity = 0.8;
          
          // Create multiple layers of noise
          float noise1 = snoise(vec2(uv.x * 2.0, uv.y * 5.0 + time * speed)) * 0.5 + 0.5;
          float noise2 = snoise(vec2(uv.x * 3.0 - time * speed * 0.5, uv.y * 2.0)) * 0.5 + 0.5;
          float noise3 = snoise(vec2(uv.x * 1.0 + time * speed * 0.3, uv.y * 8.0)) * 0.5 + 0.5;
          
          // Combine noise layers
          float finalNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
          
          // Create vertical gradient
          float gradient = pow(1.0 - uv.y, 2.0);
          
          // Combine noise and gradient
          float auroraIntensity = finalNoise * gradient * intensity;
          
          // Create color bands
          vec3 color1 = mix(u_color1, u_color2, noise1);
          vec3 color2 = mix(u_color3, u_color4, noise2);
          vec3 finalColor = mix(color1, color2, noise3);
          
          return finalColor * auroraIntensity;
        }
        
        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st.x *= u_resolution.x / u_resolution.y;
          
          // Mouse influence
          float mouseDistance = length(st - u_mouse / u_resolution.xy);
          float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance);
          
          // Create sky gradient - deep twilight to dark purple
          vec3 skyColor = mix(
            vec3(0.05, 0.03, 0.15), // Deep twilight blue
            vec3(0.15, 0.05, 0.25), // Dark purple
            pow(st.y, 0.5)
          );
          
          // Add stars
          float starField = stars(st, 50.0, 0.6) + stars(st + 0.1, 100.0, 0.3);
          skyColor += vec3(starField);
          
          // Add aurora effect
          vec3 auroraColor = aurora(st, u_time);
          skyColor += auroraColor;
          
          // Add glow around mouse position
          vec3 mouseGlow = mix(u_color1, u_color3, 0.5) * smoothstep(0.3, 0.0, mouseDistance) * 0.5;
          skyColor += mouseGlow;
          
          // Add subtle pulsing
          float pulse = (sin(u_time * 0.5) * 0.5 + 0.5) * 0.1;
          skyColor *= 1.0 + pulse;
          
          gl_FragColor = vec4(skyColor, 0.95);
        }
      `,
      transparent: true,
    })

    // Create a plane that fills the screen
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, shaderMaterial)
    scene.add(mesh)

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: event.clientX,
        y: window.innerHeight - event.clientY, // Invert Y for WebGL coordinates
      }
    }

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(window.innerWidth, window.innerHeight)

      // Update shader uniforms
      shaderMaterial.uniforms.u_resolution.value.x = window.innerWidth
      shaderMaterial.uniforms.u_resolution.value.y = window.innerHeight
    }

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)

      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

      // Update time uniform
      timeRef.current += 0.005
      shaderMaterial.uniforms.u_time.value = timeRef.current

      // Update mouse uniform with smooth interpolation
      shaderMaterial.uniforms.u_mouse.value.x += (mouseRef.current.x - shaderMaterial.uniforms.u_mouse.value.x) * 0.05
      shaderMaterial.uniforms.u_mouse.value.y += (mouseRef.current.y - shaderMaterial.uniforms.u_mouse.value.y) * 0.05

      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current)

      return () => {
        cancelAnimationFrame(animationId)
      }
    }

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      if (geometry) geometry.dispose()
      if (shaderMaterial) shaderMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 -z-10" />
}

export default HeroBackground
