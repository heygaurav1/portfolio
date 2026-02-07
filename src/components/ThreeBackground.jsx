import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const ThreeBackground = () => {
    const mountRef = useRef(null);
    const { effectiveTheme } = useTheme();

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Performance-based particle count
        const isMobile = window.innerWidth < 768;
        const isLowEnd = navigator.hardwareConcurrency <= 4;
        const particleCount = isMobile ? 300 : isLowEnd ? 600 : 1000; // Reduced from 2000

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(effectiveTheme === 'light' ? 0xffffff : 0x000000);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({
            antialias: !isMobile, // Disable antialiasing on mobile
            alpha: true,
            powerPreference: 'high-performance' // Prefer performance
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio
        mount.appendChild(renderer.domElement);

        // Particles
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);
        const originalPositions = new Float32Array(particleCount * 3);

        // Dynamic Palette based on Theme
        const isLight = effectiveTheme === 'light';
        const colorPalette = isLight ? [
            new THREE.Color('#2563eb'), // Blue 600
            new THREE.Color('#000000'), // Black
            new THREE.Color('#dc2626'), // Red 600
            new THREE.Color('#059669'), // Emerald 600
            new THREE.Color('#7c3aed'), // Violet 600
        ] : [
            new THREE.Color('#60a5fa'), // Blue 400
            new THREE.Color('#ffffff'), // White
            new THREE.Color('#f472b6'), // Pink 400
            new THREE.Color('#22d3ee'), // Cyan 400
            new THREE.Color('#fbbf24'), // Amber 400
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 60;
            positions[i3 + 2] = (Math.random() - 0.5) * 50;

            originalPositions[i3] = positions[i3];
            originalPositions[i3 + 1] = positions[i3 + 1];
            originalPositions[i3 + 2] = positions[i3 + 2];

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            scales[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
            },
            vertexShader: `
        attribute float scale;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.y += sin(time * 0.5 + position.x * 0.5) * 0.2;
          pos.x += cos(time * 0.3 + position.y * 0.5) * 0.1;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = scale * 8.0 * pixelRatio * (30.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0);
        }
      `,
            transparent: true,
            vertexColors: true
        });

        const particlesSystem = new THREE.Points(geometry, material);
        scene.add(particlesSystem);

        // Mouse interaction (throttled for performance)
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(9999, 9999);
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        let mouseUpdateNeeded = false;

        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            mouseUpdateNeeded = true;
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        const clock = new THREE.Clock();
        let animationId;
        let frameCount = 0;

        const animate = () => {
            frameCount++;
            material.uniforms.time.value = clock.getElapsedTime();

            // Only update mouse interaction every 2 frames for performance
            if (mouseUpdateNeeded && frameCount % 2 === 0) {
                raycaster.setFromCamera(mouse, camera);
                const target = new THREE.Vector3();
                raycaster.ray.intersectPlane(plane, target);

                if (target) {
                    const positions = particlesSystem.geometry.attributes.position.array;
                    const repulsionRadius = isMobile ? 6 : 10; // Smaller radius on mobile

                    for (let i = 0; i < particleCount; i++) {
                        const i3 = i * 3;
                        const px = originalPositions[i3];
                        const py = originalPositions[i3 + 1];
                        const pz = originalPositions[i3 + 2];

                        const dx = px - target.x;
                        const dy = py - target.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        const force = Math.max(0, repulsionRadius - dist) / repulsionRadius;

                        if (dist < repulsionRadius) {
                            positions[i3] = px + (dx / dist) * force * 6;
                            positions[i3 + 1] = py + (dy / dist) * force * 6;
                            positions[i3 + 2] = pz + force * 6;
                        } else {
                            positions[i3] += (px - positions[i3]) * 0.08;
                            positions[i3 + 1] += (py - positions[i3 + 1]) * 0.08;
                            positions[i3 + 2] += (pz - positions[i3 + 2]) * 0.08;
                        }
                    }
                    particlesSystem.geometry.attributes.position.needsUpdate = true;
                }
                mouseUpdateNeeded = false;
            }

            particlesSystem.rotation.y += 0.0002; // Slower rotation
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            material.uniforms.pixelRatio.value = Math.min(window.devicePixelRatio, 2);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationId);

            // Proper cleanup
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [effectiveTheme]);

    return <div ref={mountRef} className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-500" style={{ background: effectiveTheme === 'light' ? '#ffffff' : '#000000' }} />;
};

export default ThreeBackground;
