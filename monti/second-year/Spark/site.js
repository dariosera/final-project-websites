// Gestione del menu su mobile
function toggleMenu() {
    let menu = document.getElementById("sidebar");
    menu.classList.toggle("aperto");
}

function chiudiMenu() {
    if (window.innerWidth <= 768) {
        let menu = document.getElementById("sidebar");
        menu.classList.remove("aperto");
    }
}

// Logica per le animazioni di Fade-in allo scroll
document.addEventListener("DOMContentLoaded", function() {
    // Selezioniamo tutti gli elementi che hanno la classe 'fade-in'
    const elementiDaAnimare = document.querySelectorAll('.fade-in');

    // Creiamo un observer che intercetta quando gli elementi entrano nello schermo
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se l'elemento è visibile nella finestra del browser...
            if (entry.isIntersecting) {
                // Aggiungiamo la classe che fa partire l'animazione CSS
                entry.target.classList.add('visibile');
                
                // Opzionale: smettiamo di osservarlo se vogliamo che l'animazione avvenga una sola volta
                observer.unobserve(entry.target);
            }
        });
    }, {
        // threshold: 0.1 significa che l'animazione parte quando almeno il 10% dell'elemento è visibile
        threshold: 0.1 
    });

    // Diciamo all'observer di tenere d'occhio ogni singolo elemento trovato
    elementiDaAnimare.forEach(elemento => {
        observer.observe(elemento);
    });
});