let tavole_bg;
let tavole_title;
let tavole_current = 0; // 0 = Prima, 1 = Seconda, 2 = Terza
let tavole_sprite = null;
let tavole_counter;
let tavole_hint_left;
let tavole_hint_right;
let tavole_key_was_pressed = false;
let is_animating = false; // Variabile per bloccare input durante le transizioni

// Variabile per caricare l'immagine
let img_tavole_spritesheet;

function preload(s) {
    // Carica lo spritesheet unico (2360x1640 per frame, 15 frame totali)
    img_tavole_spritesheet = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_tavole.png", 2360, 1640);
}

function create(s) {
    tavole_current = 0;
    is_animating = false;
    
    // Sfondo bianco
    tavole_bg = PP.shapes.rectangle_add(s, 640, 400, 1280, 800, "0xFFFFFF", 1);
    
    
    // --- CREAZIONE SPRITE TAVOLE ---
    tavole_sprite = PP.assets.sprite.add(s, img_tavole_spritesheet, 640, 355, 0.5, 0.5);
    
    // Adattamento scala (l'immagine è molto grande)
    // 1640 * 0.42 = ~688px altezza (sta bene in 800px)
    tavole_sprite.geometry.scale_x = 0.48;
    tavole_sprite.geometry.scale_y = 0.48;

    // --- DEFINIZIONE ANIMAZIONI ---
    // Frame 0-14 totali
    
    // Statici
    PP.assets.sprite.animation_add(tavole_sprite, "static_0", 0, 0, 1, 0);   // Frame 0
    PP.assets.sprite.animation_add(tavole_sprite, "static_1", 7, 7, 1, 0);   // Frame 7
    PP.assets.sprite.animation_add(tavole_sprite, "static_2", 14, 14, 1, 0); // Frame 14
    
    // Transizioni AVANTI (FPS 12 per fluidità)
    PP.assets.sprite.animation_add(tavole_sprite, "anim_0_to_1", 1, 6, 12, 0);  // Frame 1-6
    PP.assets.sprite.animation_add(tavole_sprite, "anim_1_to_2", 8, 13, 12, 0); // Frame 8-13
    
    // Transizioni INDIETRO (Invertiamo start ed end)
    PP.assets.sprite.animation_add(tavole_sprite, "anim_2_to_1", 13, 8, 12, 0); // Frame 13-8
    PP.assets.sprite.animation_add(tavole_sprite, "anim_1_to_0", 6, 1, 12, 0);  // Frame 6-1

    // Partiamo dallo stato statico 0
    PP.assets.sprite.animation_play(tavole_sprite, "static_0");

    // Contatore "1 / 3"
    tavole_counter = PP.shapes.text_styled_add(s,
        640, 750,
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
        80, 400,
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
        1200, 400,
        ">",
        60,
        "Georgia",
        "bold",
        "0x000000",
        null,
        0.5, 0.5
    );
    
    // ESC con freccia in alto a destra
    PP.shapes.text_styled_add(s,
        1200, 50,
        "← ESC",
        28,
        "Georgia",
        "bold",
        "0x6B2D8C",
        null,
        0.5, 0.5
    );
    
    tavole_key_was_pressed = true;
    update_ui_visibility();
}

function update(s) {
    let left_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT);
    let right_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT);
    let esc_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ESC);
    
    let any_key = left_pressed || right_pressed || esc_pressed;
    
    if (!any_key) {
        tavole_key_was_pressed = false;
    }
    
    // Se stiamo animando, ignoriamo gli input per non rompere la sequenza
    if (is_animating) return;

    if (!tavole_key_was_pressed) {
        
        // --- NAVIGAZIONE INDIETRO (SINISTRA) ---
        if (left_pressed && tavole_current > 0) {
            tavole_key_was_pressed = true;
            
            if (tavole_current === 1) {
                // Da 1 a 0
                play_transition(s, "anim_1_to_0", "static_0", 0);
            } 
            else if (tavole_current === 2) {
                // Da 2 a 1
                play_transition(s, "anim_2_to_1", "static_1", 1);
            }
        }
        
        // --- NAVIGAZIONE AVANTI (DESTRA) ---
        if (right_pressed && tavole_current < 2) {
            tavole_key_was_pressed = true;
            
            if (tavole_current === 0) {
                // Da 0 a 1
                play_transition(s, "anim_0_to_1", "static_1", 1);
            } 
            else if (tavole_current === 1) {
                // Da 1 a 2
                play_transition(s, "anim_1_to_2", "static_2", 2);
            }
        }
        
        // --- ESCI ---
        if (esc_pressed) {
            tavole_key_was_pressed = true;
            PP.scenes.start("main_menu");
        }
    }
}

// Funzione helper per gestire animazione -> stop
function play_transition(s, anim_key, static_key_after, new_index) {
    is_animating = true; // Blocca input
    
    // Nascondi frecce durante l'animazione per pulizia visiva
    tavole_hint_left.visibility.alpha = 0;
    tavole_hint_right.visibility.alpha = 0;
    
    PP.assets.sprite.animation_play(tavole_sprite, anim_key);
    
    // Calcoliamo la durata: 6 frame a 12 fps = 500ms
    PP.timers.add_timer(s, 500, function() {
        // Animazione finita
        is_animating = false;
        tavole_current = new_index;
        
        // Imposta il frame statico finale per sicurezza
        PP.assets.sprite.animation_play(tavole_sprite, static_key_after);
        
        // Aggiorna testi e frecce
        PP.shapes.text_change(tavole_counter, (tavole_current + 1) + " / 3");
        update_ui_visibility();
        
    }, false);
}

function update_ui_visibility() {
    if (tavole_current === 0) {
        tavole_hint_left.visibility.alpha = 0.3; // Disabilitata
        tavole_hint_right.visibility.alpha = 1;
    } else if (tavole_current === 1) {
        tavole_hint_left.visibility.alpha = 1;
        tavole_hint_right.visibility.alpha = 1;
    } else { // 2
        tavole_hint_left.visibility.alpha = 1;
        tavole_hint_right.visibility.alpha = 0.3; // Disabilitata
    }
}

function destroy(s) {
    tavole_sprite = null;
}

PP.scenes.add("tavole", preload, create, update, destroy);