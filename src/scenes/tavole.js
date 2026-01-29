let tavole_bg;
let tavole_title;
let tavole_current = 0; // Indice tavola corrente (0, 1, 2)
let tavole_images = [];
let tavole_img_loaded = [];
let tavole_display = null;
let tavole_counter;
let tavole_hint_left;
let tavole_hint_right;
let tavole_back;
let tavole_key_was_pressed = false;

function preload(s) {
    // Carica le 3 tavole
    // NOTA: Sostituisci questi path con le immagini reali delle tavole
    tavole_img_loaded[0] = PP.assets.image.load(s, "assets/images/tavole/tavola1.png");
    tavole_img_loaded[1] = PP.assets.image.load(s, "assets/images/tavole/tavola2.png");
    tavole_img_loaded[2] = PP.assets.image.load(s, "assets/images/tavole/tavola3.png");
}

function create(s) {
    tavole_current = 0;
    tavole_images = [];
    
    // Sfondo
    tavole_bg = PP.shapes.rectangle_add(s, 640, 400, 1280, 800, "0xFFFFFF", 1);
    
    // Titolo
    tavole_title = PP.shapes.text_styled_add(s,
        640, 80,
        "STORIA",
        50,
        "Georgia",
        "bold",
        "0xFFFFFF",
        null,
        0.5, 0.5
    );
    
    // Mostra la prima tavola
    tavole_display = PP.assets.image.add(s, tavole_img_loaded[0], 640, 360, 0.5, 0.5);
    // Scala l'immagine per adattarla allo schermo se necessario
    tavole_display.geometry.scale_x = 0.3;
    tavole_display.geometry.scale_y = 0.3;
    
    // Contatore "1 / 3"
    tavole_counter = PP.shapes.text_styled_add(s,
        640, 640,
        "1 / 3",
        30,
        "Georgia",
        "normal",
        "0x000000",
        null,
        0.5, 0.5
    );
    
    // Hint freccia sinistra
    tavole_hint_left = PP.shapes.text_styled_add(s,
        100, 360,
        "<",
        60,
        "Georgia",
        "bold",
        "0x000000",
        null,
        0.5, 0.5
    );
    
    // Hint freccia destra
    tavole_hint_right = PP.shapes.text_styled_add(s,
        1180, 360,
        ">",
        60,
        "Georgia",
        "bold",
        "0x000000",
        null,
        0.5, 0.5
    );
    
    tavole_key_was_pressed = true;
    
    // Salva riferimenti per cambio tavola
    tavole_images = tavole_img_loaded;
}

function update(s) {
    let left_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT);
    let right_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT);
    let esc_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ESC);
    
    let any_key = left_pressed || right_pressed || esc_pressed;
    
    if (!any_key) {
        tavole_key_was_pressed = false;
    }
    
    if (!tavole_key_was_pressed) {
        // Naviga a sinistra
        if (left_pressed && tavole_current > 0) {
            tavole_current--;
            change_tavola(s);
            tavole_key_was_pressed = true;
        }
        
        // Naviga a destra
        if (right_pressed && tavole_current < 2) {
            tavole_current++;
            change_tavola(s);
            tavole_key_was_pressed = true;
        }
        
        // Torna al menu
        if (esc_pressed) {
            tavole_key_was_pressed = true;
            PP.scenes.start("main_menu");
        }
    }
    
    // Aggiorna visibilità frecce
    if (tavole_current === 0) {
        tavole_hint_left.visibility.alpha = 0.3;
    } else {
        tavole_hint_left.visibility.alpha = 1;
    }
    
    if (tavole_current === 2) {
        tavole_hint_right.visibility.alpha = 0.3;
    } else {
        tavole_hint_right.visibility.alpha = 1;
    }
}

function change_tavola(s) {
    // Rimuovi tavola attuale
    if (tavole_display) {
        PP.assets.destroy(tavole_display);
    }
    
    // Mostra nuova tavola
    tavole_display = PP.assets.image.add(s, tavole_images[tavole_current], 640, 360, 0.5, 0.5);
    tavole_display.geometry.scale_x = 0.3;
    tavole_display.geometry.scale_y = 0.3;
    
    // Aggiorna contatore
    PP.shapes.text_change(tavole_counter, (tavole_current + 1) + " / 3");
}

function destroy(s) {
    tavole_display = null;
    tavole_images = [];
}

PP.scenes.add("tavole", preload, create, update, destroy);