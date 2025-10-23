import * as THREE from 'three';
import { gsap } from 'gsap';

/**
 * createProjectWindow(scene, width, height, tilt)
 * ------------------------------------------------------------------
 * A simple 3D panel that displays a preview texture.
 * Controlled externally by calling `updatePreview(url)` from Vue.
 * No text, no interactivity — only visual display.
 */
export default function createProjectWindow(
    scene,
    width = 4,
    height = 2.5,
    tilt = { x: -0.2, y: 0.1 }
) {
    // === GROUP SETUP ==================================================
    const group = new THREE.Group();
    group.position.set(0, 0, 0);
    scene.add(group);

    // === PANEL GEOMETRY ===============================================
    const panelGeom = createRoundedRectGeometry(width, height, 0.1);
    const panelMat = new THREE.MeshBasicMaterial({
        color: 0x0a1a2e,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
    });

    const panel = new THREE.Mesh(panelGeom, panelMat);
    panel.rotation.x = tilt.x;
    panel.rotation.y = tilt.y;
    group.add(panel);

    // === PREVIEW HOLDER ===============================================
    const loader = new THREE.TextureLoader();
    let previewMesh = null;

    /**
     * Creates or replaces the current preview plane
     * with a new texture (image URL)
     */
    function createOrUpdatePreview(texture) {
        // clean old preview if it exists
        if (previewMesh) {
            panel.remove(previewMesh);
            previewMesh.geometry.dispose();
            if (previewMesh.material.map) previewMesh.material.map.dispose();
            previewMesh.material.dispose();
            previewMesh = null;
        }

        const geom = new THREE.PlaneGeometry(width, height);
        const mat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide,
            depthTest: false,
            depthWrite: false,
        });

        previewMesh = new THREE.Mesh(geom, mat);
        previewMesh.position.set(0, 0, 0.02);
        panel.add(previewMesh);

        gsap.fromTo(previewMesh.material, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    }

    /**
     * Loads a texture and updates the panel preview
     */
    function updatePreview(url) {
        if (!url) return;
        loader.load(
            url,
            (texture) => createOrUpdatePreview(texture),
            undefined,
            (err) => console.error('Error loading preview', err)
        );
    }

    /**
     * Clears preview (fade to empty panel)
     */
    function clearPreview() {
        if (!previewMesh) return;
        gsap.to(previewMesh.material, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
                panel.remove(previewMesh);
                if (previewMesh.material.map) previewMesh.material.map.dispose();
                previewMesh.geometry.dispose();
                previewMesh.material.dispose();
                previewMesh = null;
            },
        });
    }

    // === PUBLIC ANIMATIONS ============================================
    function open(duration = 1) {
        group.visible = true;
        panelMat.opacity = 0;
        gsap.to(panelMat, { opacity: 1, duration, ease: 'power2.out' });
    }

    function close(duration = 0.8) {
        gsap.to(panelMat, {
            opacity: 0,
            duration,
            ease: 'power2.inOut',
            onComplete: () => {
                group.visible = false;
            },
        });
    }

    function destroy() {
        if (previewMesh) {
            if (previewMesh.material.map) previewMesh.material.map.dispose();
            previewMesh.geometry.dispose();
            previewMesh.material.dispose();
        }
        panel.geometry.dispose();
        panel.material.dispose();
        scene.remove(group);
    }

    // === HELPER FUNCTION ==============================================
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

    // === RETURN API ===================================================
    return {
        group,
        open,
        close,
        updatePreview,
        clearPreview,
        destroy,
    };
}
