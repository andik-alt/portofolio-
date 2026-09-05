document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio Andik berhasil dimuat!");

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    
    window.toggleMenu = function () {
        const nav = document.getElementById("navMenu");
        if (nav) {
            nav.classList.toggle("active");
        }
    };

    const navLinks = document.querySelectorAll("#navMenu a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const nav = document.getElementById("navMenu");
            if (nav) nav.classList.remove("active");
        });
    });

    const revealTargets = document.querySelectorAll(
        ".section-title, .about-container, .skill-card, .project-card, .timeline-item, .contact-card"
    );

    revealTargets.forEach(function (el) {
        el.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealTargets.forEach(function (el) {
        revealObserver.observe(el);
    });

    const progressBars = document.querySelectorAll(".progress > div");

    progressBars.forEach(function (bar) {
    
        const targetWidth = bar.style.width;
        bar.dataset.target = targetWidth;
        bar.style.width = "0%";
    });

    const progressObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.width = bar.dataset.target;
                    progressObserver.unobserve(bar);
                }
            });
        },
        { threshold: 0.4 }
    );

    progressBars.forEach(function (bar) {
        progressObserver.observe(bar);
    });


    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
        const canvas = document.createElement("canvas");
        canvas.id = "bg-particles";
        document.body.prepend(canvas);

        const ctx = canvas.getContext("2d");
        let particles = [];
        let width, height;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        
        const count = width < 600 ? 26 : 45;

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.8 + 1,
            });
        }

        function tick() {
            ctx.clearRect(0, 0, width, height);

            // titik
            particles.forEach(function (p) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 107, 53, 0.45)";
                ctx.fill();
            });

            // garis penghubung antar titik yang berdekatan
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle =
                            "rgba(23, 32, 42, " + (1 - dist / 140) * 0.12 + ")";
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(tick);
        }

        tick();
    }
});
