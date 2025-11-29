/* =========================================
   MOLLY'S ART – INTERACTIVE GALLERY JS
   - Dark mode toggle
   - UV card toggle
   - Lightbox (normal + UV)
   - Hidden easter egg colour theme
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    /* -----------------------------
       DARK MODE TOGGLE + REMEMBER
    ----------------------------- */
    const darkToggle = document.querySelector(".dark-toggle");
    const DARK_KEY = "molly_dark_mode";

    // Load saved preference
    const savedDark = localStorage.getItem(DARK_KEY);
    if (savedDark === "on") {
        body.classList.add("dark");
    }

    window.toggleDarkMode = function () {
        body.classList.toggle("dark");
        localStorage.setItem(DARK_KEY, body.classList.contains("dark") ? "on" : "off");
    };

    if (darkToggle) {
        darkToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleDarkMode();
        });
    }

    /* -----------------------------
       LIGHTBOX (NORMAL + UV)
    ----------------------------- */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const uvBtnFull = document.getElementById("uvToggleFull");

    let currentNormal = null;
    let currentUv = null;
    let uvModeFull = false;

    window.openLightboxStd = function (src) {
        currentNormal = src;
        currentUv = null;
        uvModeFull = false;

        lightboxImg.src = src;
        if (uvBtnFull) {
            uvBtnFull.style.display = "none";
            uvBtnFull.classList.remove("uv-on");
        }

        lightbox.classList.add("open");
    };

    function openLightboxUv(normal, uv) {
        currentNormal = normal;
        currentUv = uv;
        uvModeFull = false;

        lightboxImg.src = normal;

        if (uvBtnFull) {
            uvBtnFull.style.display = "inline-block";
            uvBtnFull.classList.remove("uv-on");
        }

        lightbox.classList.add("open");
    }

    window.closeLightbox = function () {
        lightbox.classList.remove("open");
    };

    if (lightbox) {
        // Clicking background closes, but NOT the button
        lightbox.addEventListener("click", () => {
            closeLightbox();
        });

        // Escape key closes lightbox
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.classList.contains("open")) {
                closeLightbox();
            }
        });
    }

    if (uvBtnFull) {
        uvBtnFull.addEventListener("click", (e) => {
            e.stopPropagation(); // Don’t close the lightbox
            if (!currentUv) return; // No UV version for normal-only images

            uvModeFull = !uvModeFull;
            uvBtnFull.classList.toggle("uv-on", uvModeFull);
            lightboxImg.style.opacity = 0;

            setTimeout(() => {
                lightboxImg.src = uvModeFull ? currentUv : currentNormal;
                lightboxImg.style.opacity = 1;
            }, 150);
        });
    }

    /* -----------------------------
       UV CARD TOGGLES (GRID VIEW)
    ----------------------------- */

    // Preload UV assets for smoother swaps
    document.querySelectorAll(".uv-pair").forEach(card => {
        const normal = card.dataset.normal;
        const uv = card.dataset.uv;
        if (normal) {
            const img1 = new Image();
            img1.src = normal;
        }
        if (uv) {
            const img2 = new Image();
            img2.src = uv;
        }
    });

    // Handle card UV toggle + lightbox for UV images
    document.querySelectorAll(".uv-pair").forEach(card => {
        const img = card.querySelector(".uv-img");
        const btn = card.querySelector(".uv-btn");

        const normal = card.dataset.normal;
        const uv = card.dataset.uv;

        let uvMode = false;

        if (btn) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                uvMode = !uvMode;
                btn.classList.toggle("uv-on", uvMode);

                img.style.opacity = 0;
                setTimeout(() => {
                    img.src = uvMode ? uv : normal;
                    img.style.opacity = 1;
                }, 150);
            });
        }

        if (img) {
            img.addEventListener("click", (e) => {
                e.stopPropagation();
                openLightboxUv(normal, uv);
            });
        }
    });

    /* -----------------------------
       HIDDEN EASTER EGG:
       5x FAST CLICKS ON TITLE = ALT THEME
    ----------------------------- */

    const title = document.querySelector(".title-header h1");
    let clickCount = 0;
    let clickTimer = null;

    if (title) {
        title.addEventListener("click", () => {
            clickCount++;

            // Reset if too slow
            if (clickTimer) clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 2000); // 2 seconds window

            if (clickCount >= 5) {
                clickCount = 0;
                body.classList.toggle("alt-theme");

                // Optional: small console hint for you
                console.log("✨ Molly's secret palette toggled:", body.classList.contains("alt-theme"));
            }
        });
    }
});
