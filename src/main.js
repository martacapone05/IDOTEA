var config = {
    canvas_width: 1280,
    canvas_height: 720,
    canvas_id: "game_area",
    background_color: 0x000000,
    debug_mode: true,
    gravity_value: 2500
};


var game_div = document.getElementById("game_area");

game_div.style.position = "absolute";
game_div.style.top = "50%";
game_div.style.left = "50%";
game_div.style.transform = "translate(-50%, -50%)";

document.body.style.backgroundColor = "#000000";
document.body.style.margin = "0";
document.body.style.overflow = "hidden"; // Toglie le barre di scorrimento

// AGGIUNTA SFONDO PAGINA CORRETTA
// Forza l'altezza e larghezza a coprire tutto lo schermo
document.body.style.height = "100vh"; 
document.body.style.width = "100vw";

// Imposta l'immagine
document.body.style.backgroundImage = "url('assets/images/sfondi/sfondone.png')";
document.body.style.backgroundSize = "cover";   // Copre tutto lo schermo senza deformare
document.body.style.backgroundPosition = "center center"; // Centra perfettamente
document.body.style.backgroundRepeat = "no-repeat"; 

PP.game.create(config);