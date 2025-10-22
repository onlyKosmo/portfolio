import * as THREE from 'three';
import { gsap } from 'gsap';

/**
 * createProjectWindow(scene, width, height, tilt, projects)
 * - all UI lives inside the 3D panel (no HTML)
 * - titles created once as CanvasTexture planes on the right
 * - raycasting used for precise hover (single hit)
 * - panel / preview / title renderOrder & depth settings tuned to avoid z-fighting
 */
export default function createProjectWindow(
    scene,
    width = 4,
    height = 2.5,
    tilt = { x: -0.2, y: 0.1 },
    projects = []
) {
    const group = new THREE.Group();
    group.position.set(0, 0, 0);

    let currentIndex = 0;
    let previewMesh = null;

    // ---------- helpers ----------
    function createRoundedRectGeometry(w, h, radius, segments = 8) {
        const shape = new THREE.Shape();
        const halfW = w / 2;
        const halfH = h / 2;

        shape.moveTo(-halfW + radius, -halfH);
        shape.lineTo(halfW - radius, -halfH);
        shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + radius);
        shape.lineTo(halfW, halfH - radius);
        shape.quadraticCurveTo(halfW, halfH, halfW - radius, halfH);
        shape.lineTo(-halfW + radius, halfH);
        shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - radius);
        shape.lineTo(-halfW, -halfH + radius);
        shape.quadraticCurveTo(-halfW, -halfH, -halfW + radius, -halfH);

        return new THREE.ShapeGeometry(shape, segments);
    }

    // Create title as a canvas texture so text looks crisp and is easy to style
    function createTitleMesh(title, w = 1.5, h = 0.2) {
        const canvas = document.createElement('canvas');
        canvas.width = 1024; // higher res for crisper text
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw neon text
        ctx.fillStyle = '#00ffee';
        ctx.font = 'bold 72px monospace'; // font size tuned to canvas height
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(title, 20, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.needsUpdate = true;

        const mat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthTest: false,  // draw on top visually relative to panel
            depthWrite: false
        });

        const geom = new THREE.PlaneGeometry(w, h);
        const mesh = new THREE.Mesh(geom, mat);

        // save canvas texture so we can update later if needed
        mesh.userData.canvasTexture = texture;
        mesh.userData.canvas = canvas;
        mesh.userData.context = ctx;

        return mesh;
    }

    function setHoverState(mesh, hover = true) {
        // subtle scale + tint
        gsap.to(mesh.scale, { x: hover ? 1.08 : 1, y: hover ? 1.08 : 1, duration: 0.18, ease: 'power2.out' });
        // tint by drawing a small overlay on the canvas texture (optional)
        const tex = mesh.userData.canvasTexture;
        const ctx = mesh.userData.context;
        if (tex && ctx) {
            // redraw text with different color for hover (simple approach)
            const canvas = mesh.userData.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = hover ? '#ffffff' : '#00ffee';
            ctx.font = 'bold 72px monospace';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(mesh.userData.title || '', 20, canvas.height / 2);
            tex.needsUpdate = true;
        }
    }

    // ---------- panel ----------
    const panelGeom = createRoundedRectGeometry(width, height, 0.1);
    const panelMat = new THREE.MeshBasicMaterial({
        color: 0x0a1a2e,
        transparent: true,
        opacity: 0,
        depthTest: false,   // disable depth test to avoid occluding preview incorrectly
        depthWrite: false
    });
    const panel = new THREE.Mesh(panelGeom, panelMat);
    panel.rotation.x = tilt.x;
    panel.rotation.y = tilt.y;
    panel.renderOrder = 0;
    group.add(panel);

    // ---------- title meshes (create ONCE) ----------
    const titleMeshes = [];
    const titleHeight = 0.22;
    const titleSpacing = 0.32; // spacing between titles (tune as needed)

    projects.forEach((project, i) => {
        const m = createTitleMesh(project.title, width * 0.45 * 0.9, titleHeight); // fit inside right half
        m.userData.title = project.title;

        // Position on the right half of the panel (relative to panel center)
        m.position.x = width * 0.25; // right half
        m.position.y = height / 2 - (i * titleSpacing) - titleSpacing / 2;
        // small z offset per title so raycaster picks top-most first and to avoid z-fighting
        m.position.z = 0.02 + i * 0.0005;

        m.renderOrder = 2; // draw above preview and panel
        panel.add(m);
        titleMeshes.push(m);
        project.mesh = m;
    });

    // ---------- preview loader & function ----------
    const loader = new THREE.TextureLoader();

    function createOrUpdatePreview(texture) {
        // if previewMesh exists, dispose it and replace
        if (previewMesh) {
            panel.remove(previewMesh);
            previewMesh.geometry.dispose();
            if (previewMesh.material.map) previewMesh.material.map.dispose();
            previewMesh.material.dispose();
            previewMesh = null;
        }

        const previewGeom = new THREE.PlaneGeometry(width * 0.5, height);
        const previewMat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide,
            depthTest: false,
            depthWrite: false
        });

        previewMesh = new THREE.Mesh(previewGeom, previewMat);
        previewMesh.position.x = -width * 0.25;
        previewMesh.position.y = 0;
        previewMesh.position.z = 0.01;
        previewMesh.renderOrder = 1; // above panel, below titles
        panel.add(previewMesh);

        gsap.fromTo(previewMesh.material, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    }

    function updatePreview(index) {
        currentIndex = index;
        if (!projects[index]) return;

        loader.load(
            projects[index].preview,
            (texture) => {
                createOrUpdatePreview(texture);
            },
            undefined,
            (err) => console.error('Error loading preview', err)
        );
    }

    // show first
    if (projects.length > 0) updatePreview(currentIndex);

    // add group to scene
    scene.add(group);

    // ---------- raycasting hover logic ----------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hovered = null;

    function onMouseMove(event) {
        // require a camera reference - user must set window.camera in threeBackground or pass camera in later
        const cam = window.camera;
        if (!cam) return;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, cam);

        // intersect title meshes only
        const intersects = raycaster.intersectObjects(titleMeshes, false);

        if (intersects.length > 0) {
            const mesh = intersects[0].object;
            if (mesh !== hovered) {
                if (hovered) {
                    setHoverState(hovered, false);
                }
                hovered = mesh;
                setHoverState(hovered, true);

                const newIndex = titleMeshes.indexOf(mesh);
                if (newIndex !== -1 && newIndex !== currentIndex) {
                    updatePreview(newIndex);
                }
            }
        } else {
            if (hovered) {
                setHoverState(hovered, false);
                hovered = null;
            }
        }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ---------- public API ----------
    return {
        group,
        open: (duration = 1) => {
            group.visible = true;
            panelMat.opacity = 0;
            gsap.to(panelMat, { opacity: 1, duration, ease: 'power2.out' });
        },
        close: (duration = 0.8) => {
            gsap.to(panelMat, {
                opacity: 0,
                duration,
                ease: 'power2.inOut',
                onComplete: () => { group.visible = false; }
            });
        },
        next: () => {
            if (!projects.length) return;
            const nextIndex = (currentIndex + 1) % projects.length;
            updatePreview(nextIndex);
        },
        prev: () => {
            if (!projects.length) return;
            const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
            updatePreview(prevIndex);
        },
        updatePreview,
        getCurrentProject: () => projects[currentIndex],
        destroy: () => {
            // remove listener + dispose textures/meshes
            window.removeEventListener('mousemove', onMouseMove);

            titleMeshes.forEach((m) => {
                if (m.userData && m.userData.canvasTexture) m.userData.canvasTexture.dispose();
                if (m.geometry) m.geometry.dispose();
                if (m.material) m.material.dispose();
            });

            if (previewMesh) {
                if (previewMesh.material.map) previewMesh.material.map.dispose();
                previewMesh.geometry.dispose();
                previewMesh.material.dispose();
            }

            panel.geometry.dispose();
            panel.material.dispose();
            scene.remove(group);
        }
    };
}
