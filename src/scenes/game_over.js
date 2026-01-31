let img_gameover;
let btn_retry_zone;
let btn_menu_zone;

function preload(s) {
    img_gameover = PP.assets.image.load(s, "assets/images/game_over.png");
}

function create(s) {
    
    let bg = PP.assets.image.add(s, img_gameover, 640, 360, 0.5, 0.5);
    
    PP.layers.set_z_index(bg, 0);


    btn_retry_zone = PP.shapes.rectangle_add(s, 628, 663, 280, 62, "0x00FF00", 0);
    PP.layers.set_z_index(btn_retry_zone, 10); // Sopra lo sfondo
    
    // Interazione click
    PP.interactive.mouse.add(btn_retry_zone, "pointerdown", function() {
        riprova_livello();
    });


    btn_menu_zone = PP.shapes.rectangle_add(s, 64, 57, 60, 68, "0x00FF00", 0);
    PP.layers.set_z_index(btn_menu_zone, 10); // Sopra lo sfondo
    
    // Interazione click
    PP.interactive.mouse.add(btn_menu_zone, "pointerdown", function() {
        PP.scenes.start("main_menu");
    });
}

function update(s) {
    // LOGICA TASTIERA (SPAZIO O INVIO)
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE) || 
        PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER)) {
        
        riprova_livello();
    }
}

// Funzione unica per gestire il riavvio (Click o Tastiera)
function riprova_livello() {
    let last_scene = PP.game_state.get_variable("last_scene");
    
    // 1. RESETTA LE VITE A 4
    PP.game_state.set_variable("player_hp", 4);
    
    // 2. MANTIENI I FRAMMENTI (Non facciamo nulla, rimangono quelli salvati)
    // 3. MANTIENI I MURI ROTTI (Non facciamo nulla)

    // Se c'è una scena salvata, ricaricala
    if (last_scene) {
        PP.scenes.start(last_scene);
    } else {
        // Fallback se non trova la variabile
        PP.scenes.start("lvl1_pt1");
    }
}

function destroy(s) {
}

PP.scenes.add("game_over", preload, create, update, destroy);