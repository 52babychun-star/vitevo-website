import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DNAHelix: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // --- DNA Particles ---
    const particleCount = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00ffff); // Cyan
    const color2 = new THREE.Color(0xaa00ff); // Purple

    for (let i = 0; i < particleCount; i++) {
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const t = (i / particleCount) * 25;
      const angle = (t / 25) * Math.PI * 6 + strand;

      const x = Math.cos(angle) * 5;
      const y = t - 12.5;
      const z = Math.sin(angle) * 5;

      positions[i * 3] = x + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.5;

      const mixedColor = i % 2 === 0 ? color1 : color2;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const dnaParticles = new THREE.Points(geometry, material);
    scene.add(dnaParticles);

    // --- Base Pairs (Lines) ---
    const lineCount = 60;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineCount * 2 * 3);
    const lineColors = new Float32Array(lineCount * 2 * 3);

    for (let i = 0; i < lineCount; i++) {
      const t = (i / lineCount) * 25;
      const angle = (t / 25) * Math.PI * 6;

      const x1 = Math.cos(angle) * 5;
      const y1 = t - 12.5;
      const z1 = Math.sin(angle) * 5;

      const x2 = Math.cos(angle + Math.PI) * 5;
      const y2 = t - 12.5;
      const z2 = Math.sin(angle + Math.PI) * 5;

      linePositions[i * 6] = x1;
      linePositions[i * 6 + 1] = y1;
      linePositions[i * 6 + 2] = z1;
      linePositions[i * 6 + 3] = x2;
      linePositions[i * 6 + 4] = y2;
      linePositions[i * 6 + 5] = z2;

      const c1 = new THREE.Color(0x00ffff);
      const c2 = new THREE.Color(0xaa00ff);
      
      lineColors[i * 6] = c1.r;
      lineColors[i * 6 + 1] = c1.g;
      lineColors[i * 6 + 2] = c1.b;
      lineColors[i * 6 + 3] = c2.r;
      lineColors[i * 6 + 4] = c2.g;
      lineColors[i * 6 + 5] = c2.b;
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });

    const dnaLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(dnaLines);

    // --- Data Nodes (Larger glowing points) ---
    const nodeCount = 20;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const t = Math.random() * 25;
      const angle = (t / 25) * Math.PI * 6 + (Math.random() > 0.5 ? 0 : Math.PI);
      
      nodePositions[i * 3] = Math.cos(angle) * 5;
      nodePositions[i * 3 + 1] = t - 12.5;
      nodePositions[i * 3 + 2] = Math.sin(angle) * 5;

      const color = new THREE.Color(0x00ffff);
      nodeColors[i * 3] = color.r;
      nodeColors[i * 3 + 1] = color.g;
      nodeColors[i * 3 + 2] = color.b;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const dnaNodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(dnaNodes);

    camera.position.z = 25;

    // --- Mouse Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation ---
    const animate = () => {
      requestAnimationFrame(animate);
      
      const targetRotationY = dnaParticles.rotation.y + 0.003 + mouseX * 0.005;
      const targetRotationX = mouseY * 0.1;

      dnaParticles.rotation.y = targetRotationY;
      dnaLines.rotation.y = targetRotationY;
      dnaNodes.rotation.y = targetRotationY;

      dnaParticles.rotation.x += (targetRotationX - dnaParticles.rotation.x) * 0.05;
      dnaLines.rotation.x += (targetRotationX - dnaLines.rotation.x) * 0.05;
      dnaNodes.rotation.x += (targetRotationX - dnaNodes.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none opacity-40"
      style={{ filter: 'blur(1px)' }}
    />
  );
};

export default DNAHelix;
