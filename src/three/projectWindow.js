import * as THREE from 'three';
import { gsap } from 'gsap';

export default function createProjectWindow(
    scene,
    width = 4,
    height = 2.5,
    tilt = { x: -0.2, y: 0.1 }
) {
    const group = new THREE.Group();
    group.position.set(0, 0, 0);
    scene.add(group);

    // === PANEL ===
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

    const loader = new THREE.TextureLoader();
    let previewMesh = null;
    let placeholderMesh = null;

    // === ROUNDED MASK ===
    const maskTexture = createRoundedMaskTexture(width, height, 0.1);

    function createRoundedMaskTexture(w, h, radius) {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");

        // transparent background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // white rounded rectangle
        ctx.fillStyle = "white";
        const scaleX = canvas.width / w;
        const scaleY = canvas.height / h;
        const r = radius * Math.min(scaleX, scaleY);

        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(canvas.width - r, 0);
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, r);
        ctx.lineTo(canvas.width, canvas.height - r);
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - r, canvas.height);
        ctx.lineTo(r, canvas.height);
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
        ctx.fill();

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
        return texture;
    }

    // ---- PLACEHOLDER ----
    function createPlaceholderTexture(text = "Choisissez un projet", bgColor = "7f7f7f", textColor = "#f9f9f9") {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = textColor;
        ctx.font = "bold 60px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
        return texture;
    }

    const placeholderTexture = createPlaceholderTexture();
    placeholderMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
            map: placeholderTexture,
            alphaMap: maskTexture,
            transparent: true,
            opacity: 1,
            depthTest: false,
            depthWrite: false,
        })
    );
    placeholderMesh.position.set(0, 0, 0.02);
    panel.add(placeholderMesh);

    function showPlaceholder() {
        if (placeholderMesh) placeholderMesh.visible = true;
    }

    function hidePlaceholder() {
        if (placeholderMesh) placeholderMesh.visible = false;
    }

    // ---- PREVIEW ----
    function createOrUpdatePreview(texture) {
        if (previewMesh) {
            panel.remove(previewMesh);
            previewMesh.geometry.dispose();
            if (previewMesh.material.map) previewMesh.material.map.dispose();
            previewMesh.material.dispose();
            previewMesh = null;
        }

        previewMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            new THREE.MeshBasicMaterial({
                map: texture,
                alphaMap: maskTexture,
                transparent: true,
                opacity: 1,
                side: THREE.DoubleSide,
                depthTest: false,
                depthWrite: false,
            })
        );
        previewMesh.position.set(0, 0, 0.02);
        panel.add(previewMesh);

        gsap.fromTo(previewMesh.material, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    }

    function updatePreview(url) {
        if (!url) return showPlaceholder();
        hidePlaceholder();
        loader.load(
            url,
            (texture) => createOrUpdatePreview(texture),
            undefined,
            (err) => console.error("Error loading preview", err)
        );
    }

    function clearPreview() {
        if (previewMesh) {
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
                    showPlaceholder();
                },
            });
        } else {
            showPlaceholder();
        }
    }

    // ---- PANEL ANIMATIONS ----
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
            onComplete: () => { group.visible = false; },
        });
    }

    function destroy() {
        if (previewMesh) {
            if (previewMesh.material.map) previewMesh.material.map.dispose();
            previewMesh.geometry.dispose();
            previewMesh.material.dispose();
        }
        if (placeholderMesh) {
            if (placeholderMesh.material.map) placeholderMesh.material.map.dispose();
            placeholderMesh.geometry.dispose();
            placeholderMesh.material.dispose();
        }
        panel.geometry.dispose();
        panel.material.dispose();
        scene.remove(group);
    }

    // ---- HELPERS ----
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

    return {
        group,
        open,
        close,
        updatePreview,
        clearPreview,
        showPlaceholder,
        hidePlaceholder,
        destroy,
    };
}
