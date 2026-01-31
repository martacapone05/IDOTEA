let img_banner;
let btn_back_zone;
let btn_menu_zone;
let comandi_key_was_pressed = false;

function preload(s) {
    // Caricamento immagine di sfondo
    img_banner = PP.assets.image.load(s, "assets/images/banner.png");
}

function create(s) {
    
    // SFONDO DI SICUREZZA
    PP.shapes.rectangle_add(s, 640, 360, 1280, 720, "0x333333", 1);

    // IMMAGINE A SCHERMO
    let bg = PP.assets.image.add(s, img_banner, 640, 360, 0.5, 0.5);
    PP.layers.set_z_index(bg, 1); 

    // --- 1. BOTTONE "TORNA INDIETRO" (In alto a destra) ---
    // Funziona come "Resume": torna alla scena precedente caricando la posizione salvata
    btn_back_zone = PP.shapes.rectangle_add(s, 1236, 48, 58, 66, "0x00FF00", 0); // Metti alpha 0 per nascondere
    PP.layers.set_z_index(btn_back_zone, 10); 
    
    PP.interactive.mouse.add(btn_back_zone, "pointerdown", function() {
        let previous_scene = PP.game_state.get_variable("last_scene");
        
        if (previous_scene) {
            // Impostiamo la variabile che dice al livello: "Non resettare, usa le coordinate salvate!"
            PP.game_state.set_variable("punto_di_partenza", "resume_pause");
            PP.scenes.start(previous_scene);
        } else {
            PP.scenes.start("main_menu");
        }
    });

    // --- 2. BOTTONE "MENU PRINCIPALE" (In basso a sinistra) ---
    btn_menu_zone = PP.shapes.rectangle_add(s, 306, 650, 435, 69, "0x00FF00", 0); // Metti alpha 0 per nascondere
    PP.layers.set_z_index(btn_menu_zone, 10); 
    
    PP.interactive.mouse.add(btn_menu_zone, "pointerdown", function() {
        PP.scenes.start("main_menu");
    });
    
    comandi_key_was_pressed = true;
}

function update(s) {
    // Controlliamo se ESC è premuto
    let esc_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ESC);
    
    let any_key = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE) || esc_pressed;
    
    if (!any_key) {
        comandi_key_was_pressed = false;
    }

    // --- LOGICA TASTO ESC (Nuova aggiunta) ---
    // Se premo ESC e il tasto non era già giù, eseguo la stessa logica del bottone
    if (esc_pressed && !comandi_key_was_pressed) {
        comandi_key_was_pressed = true;

        let previous_scene = PP.game_state.get_variable("last_scene");
        
        if (previous_scene) {
            PP.game_state.set_variable("punto_di_partenza", "resume_pause");
            PP.scenes.start(previous_scene);
        } else {
            PP.scenes.start("main_menu");
        }
    }
}

function destroy(s) {
}

PP.scenes.add("comandi", preload, create, update, destroy);