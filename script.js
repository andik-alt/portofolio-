document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio Andik berhasil dimuat!");


    const button = document.querySelector(".button");

    if (button) {
        button.addEventListener("click", function () {
            console.log("Menu Project dibuka");
        });
    }

  
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});
