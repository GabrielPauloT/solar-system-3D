/**
 * SolarSystem.tsx — Componente principal da cena 3D
 * Design: "Observatório Espacial" — Sci-Fi Cinematográfico
 * 
 * - Three.js para renderização 3D
 * - GSAP para animações de fly-to cinematográficas
 * - OrbitControls para navegação livre
 * - Texturas NASA via Solar System Scope
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { PLANETS, SUN_DATA, type PlanetData } from '@/lib/planetData';
import type { NavCommand } from '@/pages/Home';

interface SolarSystemProps {
  navCommand: NavCommand;
  onPlanetSelect: (planet: PlanetData | null) => void;
  onSunSelect: () => void;
  onLoadingProgress: (progress: number) => void;
  onLoadingComplete: () => void;
}

interface PlanetMesh {
  mesh: THREE.Mesh;
  data: PlanetData;
  group: THREE.Group;
  orbitGroup: THREE.Group;
  clouds?: THREE.Mesh;
  label?: THREE.Sprite;
}

export default function SolarSystem({
  navCommand,
  onPlanetSelect,
  onSunSelect,
  onLoadingProgress,
  onLoadingComplete,
}: SolarSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const planetMeshesRef = useRef<PlanetMesh[]>([]);
  const sunMeshRef = useRef<THREE.Mesh | null>(null);
  const sunGlowRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number>(0);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const isAnimatingRef = useRef(false);
  const clockRef = useRef(new THREE.Clock());
  const starsRef = useRef<THREE.Points | null>(null);
  const lastNavIdRef = useRef<number>(0);
  const cameraLightRef = useRef<THREE.PointLight | null>(null);
  const focusedPlanetRef = useRef<string | null>(null);
  const navCommandRef = useRef<NavCommand>(null);
  const onPlanetSelectRef = useRef(onPlanetSelect);
  const onSunSelectRef = useRef(onSunSelect);

  // Keep refs up to date
  useEffect(() => { navCommandRef.current = navCommand; }, [navCommand]);
  useEffect(() => { onPlanetSelectRef.current = onPlanetSelect; }, [onPlanetSelect]);
  useEffect(() => { onSunSelectRef.current = onSunSelect; }, [onSunSelect]);

  // Initialize scene
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000005);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 80, 140);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 500;
    controls.enablePan = true;
    controls.panSpeed = 0.5;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.2;
    controlsRef.current = controls;

    const textureLoader = new THREE.TextureLoader();
    const totalTextures = PLANETS.reduce((acc, planet) => {
      let count = 1; // Main texture
      if (planet.cloudsUrl) count++;
      if (planet.ringTexture && planet.ringInner && planet.ringOuter) count++;
      return acc + count;
    }, 0) + 1; // +1 for Sun
    let loadedTextures = 0;

    const loadTexture = (url: string): Promise<THREE.Texture> => {
      return new Promise((resolve) => {
        textureLoader.load(
          url,
          (texture) => {
            loadedTextures++;
            onLoadingProgress(Math.floor((loadedTextures / totalTextures) * 100));
            resolve(texture);
          },
          undefined,
          () => {
            loadedTextures++;
            onLoadingProgress(Math.floor((loadedTextures / totalTextures) * 100));
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d')!;
            ctx.fillStyle = '#444';
            ctx.fillRect(0, 0, 64, 64);
            resolve(new THREE.CanvasTexture(canvas));
          }
        );
      });
    };

    const initScene = async () => {
      // ============ STARFIELD ============
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 15000;
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);
      const starSizes = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const radius = 400 + Math.random() * 600;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i3 + 2] = radius * Math.cos(phi);

        const colorChoice = Math.random();
        if (colorChoice < 0.6) {
          starColors[i3] = 0.9 + Math.random() * 0.1;
          starColors[i3 + 1] = 0.9 + Math.random() * 0.1;
          starColors[i3 + 2] = 1.0;
        } else if (colorChoice < 0.85) {
          starColors[i3] = 1.0;
          starColors[i3 + 1] = 0.95;
          starColors[i3 + 2] = 0.8;
        } else {
          starColors[i3] = 0.8;
          starColors[i3 + 1] = 0.85;
          starColors[i3 + 2] = 1.0;
        }
        starSizes[i] = 0.5 + Math.random() * 2.0;
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

      const starMaterial = new THREE.PointsMaterial({
        size: 1.0,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      starsRef.current = stars;

      // ============ LIGHTING ============
      const ambientLight = new THREE.AmbientLight(0x334466, 0.6);
      scene.add(ambientLight);

      const sunLight = new THREE.PointLight(0xfff5e0, 3.0, 800, 0.3);
      sunLight.position.set(0, 0, 0);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 2048;
      sunLight.shadow.mapSize.height = 2048;
      scene.add(sunLight);

      const fillLight = new THREE.PointLight(0x4488ff, 0.3, 500);
      fillLight.position.set(0, 80, 0);
      scene.add(fillLight);

      // Additional rim/fill lights for better visibility from all angles
      const fillLight2 = new THREE.PointLight(0x6666aa, 0.2, 400);
      fillLight2.position.set(-100, -30, -100);
      scene.add(fillLight2);

      const fillLight3 = new THREE.PointLight(0x6666aa, 0.2, 400);
      fillLight3.position.set(100, -30, 100);
      scene.add(fillLight3);

      // Camera-following light for close-up planet viewing
      const cameraLight = new THREE.PointLight(0xffffff, 1.5, 200);
      camera.add(cameraLight);
      cameraLight.position.set(0, 2, 5);
      scene.add(camera);
      cameraLightRef.current = cameraLight;

      // ============ SUN ============
      const sunTexture = await loadTexture(SUN_DATA.textureUrl);
      sunTexture.colorSpace = THREE.SRGBColorSpace;
      const sunGeometry = new THREE.SphereGeometry(SUN_DATA.radius, 64, 64);
      const sunMaterial = new THREE.MeshBasicMaterial({
        map: sunTexture,
        color: 0xffffff,
      });
      const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
      scene.add(sunMesh);
      sunMeshRef.current = sunMesh;

      // Sun glow
      const glowGeometry = new THREE.SphereGeometry(SUN_DATA.radius * 1.3, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          viewVector: { value: camera.position },
          glowColor: { value: new THREE.Color(0xff8c00) },
        },
        vertexShader: `
          uniform vec3 viewVector;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normalMatrix * normal);
            vec3 vNormel = normalize(normalMatrix * viewVector);
            intensity = pow(0.7 - dot(vNormal, vNormel), 2.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4(glow, intensity * 0.6);
          }
        `,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });
      const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(sunGlow);
      sunGlowRef.current = sunGlow;

      // Sun corona particles
      const coronaCount = 2000;
      const coronaGeo = new THREE.BufferGeometry();
      const coronaPos = new Float32Array(coronaCount * 3);
      for (let i = 0; i < coronaCount; i++) {
        const i3 = i * 3;
        const r = SUN_DATA.radius + Math.random() * 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        coronaPos[i3] = r * Math.sin(phi) * Math.cos(theta);
        coronaPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        coronaPos[i3 + 2] = r * Math.cos(phi);
      }
      coronaGeo.setAttribute('position', new THREE.BufferAttribute(coronaPos, 3));
      const coronaMat = new THREE.PointsMaterial({
        color: 0xffaa44,
        size: 0.15,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const corona = new THREE.Points(coronaGeo, coronaMat);
      scene.add(corona);

      // ============ PLANETS ============
      for (const planetData of PLANETS) {
        const orbitGroup = new THREE.Group();
        orbitGroup.rotation.y = Math.random() * Math.PI * 2;
        scene.add(orbitGroup);

        const planetGroup = new THREE.Group();
        planetGroup.position.x = planetData.distance;
        orbitGroup.add(planetGroup);

        const texture = await loadTexture(planetData.textureUrl);
        texture.colorSpace = THREE.SRGBColorSpace;
        const geometry = new THREE.SphereGeometry(planetData.radius, 64, 64);
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.8,
          metalness: 0.1,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const tiltRad = (planetData.tilt * Math.PI) / 180;
        mesh.rotation.z = tiltRad;
        planetGroup.add(mesh);

        // Clouds
        let cloudsMesh: THREE.Mesh | undefined;
        if (planetData.cloudsUrl) {
          const cloudsTexture = await loadTexture(planetData.cloudsUrl);
          const cloudsGeo = new THREE.SphereGeometry(planetData.radius * 1.02, 48, 48);
          const cloudsMat = new THREE.MeshStandardMaterial({
            map: cloudsTexture,
            transparent: true,
            opacity: 0.4,
            depthWrite: false,
          });
          cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
          cloudsMesh.rotation.z = tiltRad;
          planetGroup.add(cloudsMesh);
        }

        // Saturn/Uranus rings
        if (planetData.ringTexture && planetData.ringInner && planetData.ringOuter) {
          const ringGeo = new THREE.RingGeometry(
            planetData.ringInner,
            planetData.ringOuter,
            128
          );
          const pos = ringGeo.attributes.position;
          const uv = ringGeo.attributes.uv;
          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const z = pos.getZ(i);
            const dist = Math.sqrt(x * x + z * z);
            uv.setXY(
              i,
              (dist - planetData.ringInner!) / (planetData.ringOuter! - planetData.ringInner!),
              0.5
            );
          }
          const ringTexture = await loadTexture(planetData.ringTexture);
          const ringMat = new THREE.MeshStandardMaterial({
            map: ringTexture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
            roughness: 0.9,
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = -Math.PI / 2 + tiltRad;
          planetGroup.add(ringMesh);
        }

        // Planet label
        const labelCanvas = document.createElement('canvas');
        labelCanvas.width = 256;
        labelCanvas.height = 64;
        const ctx = labelCanvas.getContext('2d')!;
        ctx.clearRect(0, 0, 256, 64);
        ctx.font = '600 28px Orbitron, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = planetData.color;
        ctx.fillText(planetData.name, 128, 40);
        const labelTexture = new THREE.CanvasTexture(labelCanvas);
        const labelMaterial = new THREE.SpriteMaterial({
          map: labelTexture,
          transparent: true,
          opacity: 0.85,
          depthTest: false,
        });
        const label = new THREE.Sprite(labelMaterial);
        label.position.y = planetData.radius + 1.5;
        label.scale.set(6, 1.5, 1);
        planetGroup.add(label);

        // Orbit line
        const orbitPoints: THREE.Vector3[] = [];
        for (let i = 0; i <= 128; i++) {
          const angle = (i / 128) * Math.PI * 2;
          orbitPoints.push(
            new THREE.Vector3(
              Math.cos(angle) * planetData.distance,
              0,
              Math.sin(angle) * planetData.distance
            )
          );
        }
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(planetData.color),
          transparent: true,
          opacity: 0.15,
        });
        const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
        scene.add(orbitLine);

        planetMeshesRef.current.push({
          mesh,
          data: planetData,
          group: planetGroup,
          orbitGroup,
          clouds: cloudsMesh,
          label,
        });
      }

      onLoadingComplete();

      // ============ FLY-TO FUNCTION ============
      const flyToTarget = (
        targetPosition: THREE.Vector3,
        targetLookAt: THREE.Vector3,
        duration: number = 2.0
      ) => {
        isAnimatingRef.current = true;
        controls.enabled = false;

        gsap.to(camera.position, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          duration,
          ease: 'power3.inOut',
          onUpdate: () => {
            camera.lookAt(targetLookAt);
          },
          onComplete: () => {
            controls.target.copy(targetLookAt);
            controls.enabled = true;
            controls.update();
            isAnimatingRef.current = false;
          },
        });

        gsap.to(controls.target, {
          x: targetLookAt.x,
          y: targetLookAt.y,
          z: targetLookAt.z,
          duration,
          ease: 'power3.inOut',
        });
      };

      // ============ ANIMATION LOOP ============
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        const elapsed = clockRef.current.getElapsedTime();

        // ---- Check for navigation commands ----
        const cmd = navCommandRef.current;
        if (cmd && cmd.id !== lastNavIdRef.current) {
          lastNavIdRef.current = cmd.id;

          if (cmd.type === 'planet') {
            const planetMesh = planetMeshesRef.current.find(p => p.data.id === cmd.planet.id);
            if (planetMesh) {
              focusedPlanetRef.current = cmd.planet.id;
              const viewDistance = Math.max(cmd.planet.radius * 3, 4);
              controls.minDistance = cmd.planet.radius * 1.2;
              controls.maxDistance = cmd.planet.radius * 20;

              const worldPos = new THREE.Vector3();
              planetMesh.mesh.getWorldPosition(worldPos);
              const dirToSun = new THREE.Vector3().subVectors(new THREE.Vector3(0,0,0), worldPos).normalize();
              const cameraPos = new THREE.Vector3().addVectors(worldPos, dirToSun.multiplyScalar(viewDistance));
              cameraPos.y += viewDistance * 0.25;

              flyToTarget(cameraPos, worldPos, 2.5);
            }
          } else if (cmd.type === 'sun') {
            focusedPlanetRef.current = null;
            flyToTarget(new THREE.Vector3(0, 10, 25), new THREE.Vector3(0, 0, 0), 2.0);
          } else if (cmd.type === 'overview') {
            focusedPlanetRef.current = null;
            controls.minDistance = 2;
            controls.maxDistance = 500;
            flyToTarget(new THREE.Vector3(0, 80, 140), new THREE.Vector3(0, 0, 0), 2.0);
          }
        }

        // Rotate sun
        if (sunMeshRef.current) {
          sunMeshRef.current.rotation.y += 0.001;
        }

        // Update sun glow
        if (sunGlowRef.current && cameraRef.current) {
          (sunGlowRef.current.material as THREE.ShaderMaterial).uniforms.viewVector.value =
            new THREE.Vector3().subVectors(
              cameraRef.current.position,
              sunGlowRef.current.position
            );
        }

        // Corona rotation
        corona.rotation.y += 0.0005;
        corona.rotation.x += 0.0002;

        // Animate planets
        planetMeshesRef.current.forEach((planet) => {
          // Slow down orbital movement when focused on a planet
          const isFocused = focusedPlanetRef.current === planet.data.id;
          const orbitalMultiplier = focusedPlanetRef.current ? (isFocused ? 0.02 : 0.3) : 0.3;
          planet.orbitGroup.rotation.y += planet.data.orbitalSpeed * orbitalMultiplier;
          planet.mesh.rotation.y += planet.data.rotationSpeed;
          if (planet.clouds) {
            planet.clouds.rotation.y += planet.data.rotationSpeed * 1.1;
          }

          // Hide/Show labels based on focus state
          if (planet.label) {
            // If any planet is focused, hide ALL 3D labels (to show only the HTML overlay title)
            if (focusedPlanetRef.current) {
              planet.label.visible = false;
            } else {
              // Overview mode: show all labels
              planet.label.visible = true;
            }
          }

          // If focused, keep orbit controls target on the planet
          if (isFocused && !isAnimatingRef.current && controlsRef.current) {
            const worldPos = new THREE.Vector3();
            planet.mesh.getWorldPosition(worldPos);
            controlsRef.current.target.copy(worldPos);
          }
        });

        // Twinkle stars
        if (starsRef.current) {
          const sizes = starsRef.current.geometry.attributes.size;
          for (let i = 0; i < 100; i++) {
            const idx = Math.floor(Math.random() * sizes.count);
            sizes.setX(idx, 0.5 + Math.sin(elapsed * 2 + idx) * 1.0);
          }
          sizes.needsUpdate = true;
          starsRef.current.rotation.y += 0.00003;
        }

        controls.update();
        renderer.render(scene, camera);
      };

      animate();
    };

    initScene();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Handle mouse click for planet selection via 3D raycasting
    const handleClick = (event: MouseEvent) => {
      if (isAnimatingRef.current) return;
      if (!cameraRef.current || !sceneRef.current) return;

      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

      const planetObjects = planetMeshesRef.current.map(p => p.mesh);
      const intersects = raycasterRef.current.intersectObjects(planetObjects);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const planet = planetMeshesRef.current.find(p => p.mesh === clickedMesh);
        if (planet) {
          onPlanetSelectRef.current(planet.data);
          return;
        }
      }

      // Check sun
      if (sunMeshRef.current) {
        const sunIntersects = raycasterRef.current.intersectObject(sunMeshRef.current);
        if (sunIntersects.length > 0) {
          onSunSelectRef.current();
          return;
        }
      }
    };

    // Handle mouse move for hover cursor
    const handleMouseMove = (event: MouseEvent) => {
      if (isAnimatingRef.current) return;
      if (!cameraRef.current) return;

      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

      const planetObjects = planetMeshesRef.current.map(p => p.mesh);
      const allObjects = sunMeshRef.current ? [...planetObjects, sunMeshRef.current] : planetObjects;
      const intersects = raycasterRef.current.intersectObjects(allObjects);

      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    };

    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationIdRef.current);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
}
