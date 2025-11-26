/* =========================================
   UV & LIGHTBOX ENGINE — Molly’s Art 2025
   Fully works on iPhone/Android + Desktop
========================================= */

/* ---------- PRELOAD UV IMAGES ---------- */
document.querySelectorAll('.uv-pair').forEach(card => {
    new Image().src = card.dataset.normal;
    new Image().src = card.dataset.uv;
});

/* ---------- UV BUTTON + CARD IMAGE ---------- */
document.querySelectorAll('.uv-pair').forEach(card => {

    const img = card.querySelector('.uv-img');
    const btn = card.querySelector('.uv-btn');

    let uvMode = false;
    const normal = card.dataset.normal;
    const uv = card.dataset.uv;

    // Toggle on-card UV
    btn.addEventListener("click", e => {
        e.stopPropagation();
        uvMode = !uvMode;
        btn.classList.toggle("uv-on", uvMode);

        img.style.opacity = 0;
        setTimeout(() => {
            img.src = uvMode ? uv : normal;
            img.style.opacity = 1;
        }, 180);
    });

    // Open lightbox and sync state
    img.addEventListener("click", () => {
        openLightbox(img.src, normal, uv, uvMode);
    });

});

/* ---------- NORMAL IMAGE LIGHTBOX ---------- */
function openLightboxStd(src) {
    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImg");
    const uvBtn = document.getElementById("uvToggleFull");

    uvBtn.style.display = "none"; // No UV toggle for normal images

    img.src = src;
    lb.classList.add("open");
}

/* ---------- UV LIGHTBOX ---------- */
function openLightbox(src, normal, uv, uvState) {

    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImg");
    const uvBtn = document.getElementById("uvToggleFull");

    let mode = uvState;

    uvBtn.style.display = "block";
    uvBtn.classList.toggle("uv-on", mode);

    img.src = src;
    lb.classList.add("open");

    uvBtn.onclick = e => {
        e.stopPropagation();
        mode = !mode;
        uvBtn.classList.toggle("uv-on", mode);

        img.style.opacity = 0;
        setTimeout(() => {
            img.src = mode ? uv : normal;
            img.style.opacity = 1;
        }, 180);
    };
}

/* ---------- CLOSE LIGHTBOX ---------- */
function closeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
}

/* ---------- DARK MODE ---------- */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
