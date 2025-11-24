import * as THREE from 'three';
import { EffectComposer } from 'three-stdlib';
import { RenderPass } from 'three-stdlib';
import { ShaderPass } from 'three-stdlib';
import { gsap } from 'gsap';

export default function initThreeBackground() {
    const canvas = document.getElementById('bgCanvas');
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        500
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    /* ---------- BG COLOR ---------- */
    renderer.setClearColor(0x131413, 1);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    /* ---------- particles ---------- */
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xF9F9F9);
    const c2 = new THREE.Color(0x897EFF);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] = (Math.random() - 0.5) * 10;
        pos[i3 + 1] = (Math.random() - 0.5) * 6;
        pos[i3 + 2] = (Math.random() - 0.5) * 6;

        const mix = c1.clone().lerp(c2, Math.random());
        colors[i3] = mix.r;
        colors[i3 + 1] = mix.g;
        colors[i3 + 2] = mix.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // canvas temporaire pour la texture des particules
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const ctx = particleCanvas.getContext('2d');

// cercle blanc rempli
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

// créer la texture à partir de ce canvas
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particles = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            map: particleTexture,
            alphaTest: 0.01,
        })
    );
    scene.add(particles);

    /* ---------- parallax ---------- */
    const mouse = new THREE.Vector2(0, 0);
    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    let isZoomed = false; // track zoom state
    const baseCameraPos = new THREE.Vector3(0, 0, 6); // default zoom-out

    gsap.ticker.add(() => {
        const targetX = baseCameraPos.x + mouse.x * 0.5 * (isZoomed ? 0.2 : 1);
        const targetY = baseCameraPos.y + mouse.y * 0.5 * (isZoomed ? 0.2 : 1);

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    });


    /* ---------- postprocessing ---------- */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // Film Grain
    const FilmGrainShader = {
        uniforms: { tDiffuse: { value: null }, time: { value: 0.0 }, intensity: { value: 0.07 } },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float time;
            uniform float intensity;
            varying vec2 vUv;
            float random(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }
            void main() {
                vec4 color = texture2D(tDiffuse, vUv);
                float grain = random(vUv * time) * 2.0 - 1.0;
                color.rgb += grain * intensity;
                gl_FragColor = color;
            }
        `
    };
    const grainPass = new ShaderPass(FilmGrainShader);
    composer.addPass(grainPass);

    // Scanlines
    const ScanlineShader = {
        uniforms: {
            tDiffuse: { value: null },
            time: { value: 0 },
            resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            intensity: { value: 0.12 },
        },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float time;
            uniform vec2 resolution;
            uniform float intensity;
            varying vec2 vUv;
            void main() {
                vec4 color = texture2D(tDiffuse, vUv);
                float scanline = sin(vUv.y * resolution.y * 1.5 + time * 5.0) * intensity;
                color.rgb -= scanline;
                gl_FragColor = color;
            }
        `
    };
    const scanlinePass = new ShaderPass(ScanlineShader);
    composer.addPass(scanlinePass);

    // Vignette
    const VignetteShader = {
        uniforms: { tDiffuse: { value: null }, offset: { value: 1.0 }, darkness: { value: 1.2 } },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float offset;
            uniform float darkness;
            varying vec2 vUv;
            void main() {
                vec4 color = texture2D(tDiffuse, vUv);
                vec2 uv = vUv - 0.5;
                float len = length(uv);
                color.rgb *= smoothstep(0.8, offset * 0.799, len * darkness);
                gl_FragColor = color;
            }
        `
    };
    const vignettePass = new ShaderPass(VignetteShader);
    composer.addPass(vignettePass);

    /* ---------- animation loop ---------- */
    const clock = new THREE.Clock();

    function animate() {
        const t = clock.getElapsedTime();

        // --- particle animation (keep for subtle motion) ---
        const posAttr = geometry.attributes.position;
        const arr = posAttr.array;
        for (let i = 0; i < particleCount * 3; i += 3) {
            arr[i + 1] += Math.sin(t * 0.5 + arr[i]) * 0.0005;
        }
        posAttr.needsUpdate = true;

        // --- postprocessing uniform updates ---
        grainPass.uniforms.time.value = t * 60.0; // keep for grain motion
        scanlinePass.uniforms.time.value = t;     // keep for scanline wave animation

        // --- dynamic vignette depending on zoom (can reuse pattern for others) ---
        vignettePass.uniforms.darkness.value = THREE.MathUtils.mapLinear(
            camera.position.z,
            2.5,  // close zoom
            6,    // far zoom
            0.4,  // light vignette
            1.2   // strong vignette
        );

        // ✅ only one render call per frame (keeps performance and avoids double draw)
        composer.render();

        // --- next frame ---
        requestAnimationFrame(animate);
    }

    animate();


    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        scanlinePass.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    });

    // Return objects needed for cinematic control
    return { camera, scene, renderer, composer, particles, grainPass, scanlinePass, vignettePass, isZoomed, baseCameraPos };


}
