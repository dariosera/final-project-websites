const boxes = document.querySelectorAll('.box-text');

boxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = "scale(1.03)";
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = "scale(1)";
    });
});