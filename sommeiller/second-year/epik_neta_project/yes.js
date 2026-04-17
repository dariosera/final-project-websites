// BURGER MENU
var hamburger = document.getElementById("hamburger-btn");
var menu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// TIMOR
const display = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
    let time = 25 * 60;

    const countdown = setInterval(() => {
        let m = Math.floor(time / 60);
        let s = time % 60;
        if (s < 10) s = "0" + s;

        display.textContent = `${m}:${s}`;
        time--;

        if (time < 0) {
            clearInterval(countdown);
            display.textContent = "Prenditi una PAUSA!!!";
        }
    }, 1000);
});

// COUNTDOWN DAL 22 APRILE A L 17:30
const countdownDisplay = document.getElementById("countdown-display");

function updateCountdown() {
    const target = new Date("2026-04-22T17:30:00");
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
        countdownDisplay.textContent = "E' GIUNTA L'ORAAAA";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdownDisplay.textContent = `${d}d ${h}h ${m}m ${s}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// SLIDER
const slider = document.getElementById("slider");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let index = 0;

nextBtn.addEventListener("click", () => {
    index = (index + 1) % slider.children.length;
    slider.style.transform = `translateX(-${index * 100}%)`;
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + slider.children.length) % slider.children.length;
    slider.style.transform = `translateX(-${index * 100}%)`;
});