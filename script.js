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
});
