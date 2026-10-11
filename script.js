const slides = document.querySelectorAll(".slide");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const dotsContainer = document.getElementById("dots");
const counter = document.getElementById("counter");
const slider = document.querySelector(".slider");
const year = document.getElementById("year");

let currentIndex = 0;
let autoSlideInterval;

if (year) {
    year.textContent = new Date().getFullYear();
}

slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show image ${index + 1}`);

    dot.addEventListener("click", () => {
        showSlide(index);
        restartAutoSlide();
    });

    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll(".dot");
function showSlide(index) {
    if (slides.length === 0) {
        return;
    }

    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentIndex;

        slide.classList.toggle("active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentIndex;

        dot.classList.toggle("active", isActive);

        if (isActive) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });

    counter.textContent =
        `${String(currentIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function previousSlide() {
    showSlide(currentIndex - 1);
}

function startAutoSlide() {
    stopAutoSlide();

    autoSlideInterval = setInterval(() => {
        if (!document.hidden) {
            nextSlide();
        }
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function restartAutoSlide() {
    startAutoSlide();
}

nextButton.addEventListener("click", () => {
    nextSlide();
    restartAutoSlide();
});

previousButton.addEventListener("click", () => {
    previousSlide();
    restartAutoSlide();
});

slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

slider.addEventListener("focusin", stopAutoSlide);
slider.addEventListener("focusout", (event) => {
    if (!slider.contains(event.relatedTarget)) {
        startAutoSlide();
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});

showSlide(0);
startAutoSlide();

