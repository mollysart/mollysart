/* PRELOAD UV IMAGES */
document.querySelectorAll('.uv-pair').forEach(card => {
    new Image().src = card.dataset.normal;
    new Image().src = card.dataset.uv;
});

/* UV TOGGLE ON CARD */
document.querySelectorAll('.uv-pair').forEach(card => {
    const img = card.querySelector('.uv-img');
    const btn = card.querySelector('.uv-btn');

    let uvMode = false;
    const normal = card.dataset.normal;
    const uv = card.dataset.uv;

    btn.addEventListener("click", e => {
        e.stopPropagation();
        uvMode = !uvMode;
        btn.classList.toggle("uv-on", uvMode);

        img.style.opacity = 0;
        setTimeout(() => {
            img.src = uvMode ? uv : normal;
            img.style.opacity = 1;
        }, 200);
    });

    img.addEventListener("click", () => {
        openLightbox(img.src, normal, uv, uvMode);
    });
});

/* LIGHTBOX OPEN */
function openLightbox(src, normal, uv, uvState) {
    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImg");
    const uvBtn = document.getElementById("uvToggleFull");

    img.src = src;
    lb.classList.add("open");

    let mode = uvState;
    uvBtn.classList.toggle("uv-on", mode);

    uvBtn.onclick = e => {
        e.stopPropagation();
        mode = !mode;
        uvBtn.classList.toggle("uv-on", mode);

        img.style.opacity = 0;
        setTimeout(() => {
            img.src = mode ? uv : normal;
            img.style.opacity = 1;
        }, 200);
    };
}

/* CLOSE LIGHTBOX */
function closeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
}

/* DARK MODE */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
