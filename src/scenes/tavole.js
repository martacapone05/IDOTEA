let tavole_bg;
let tavole_current = 0; // 0 = Prima, 1 = Seconda, 2 = Terza
let tavole_sprite = null;
let tavole_hint_left;
let tavole_hint_right;
let tavole_key_was_pressed = false;
let is_animating = false; // Variabile per bloccare input durante le transizioni

// Variabile per caricare l'immagine
let img_tavole_spritesheet;

// --- VARIABILI PER FRECCE ---
let img_freccia_sx;
let img_freccia_dx;

// --- NUOVE VARIABILI MENU ---
let img_menu_princ;
let btn_home_zone;

// --- VARIABILI PER CLICK FRECCE ---
let zone_sx;
let zone_dx;

function preload(s) {
    // Carica lo spritesheet unico (2360x1640 per frame, 15 frame totali)
    img_tavole_spritesheet = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_tavole.png", 2360, 1640);

    // --- CARICAMENTO IMMAGINI FRECCE ---
    img_freccia_sx = PP.assets.image.load(s, "assets/images/freccia_sx.png");
    img_freccia_dx = PP.assets.image.load(s, "assets/images/freccia_dx.png");

    // --- CARICAMENTO IMMAGINE MENU ---
    img_menu_princ = PP.assets.image.load(s, "assets/images/menu_princ.png");
}

function create(s) {
    tavole_current = 0;
    is_animating = false;
    
    // Sfondo bianco
    tavole_bg = PP.shapes.rectangle_add(s, 640, 400, 1280, 800, "0xe5e4d3", 1);
    
    
    // --- CREAZIONE SPRITE TAVOLE ---
    tavole_sprite = PP.assets.sprite.add(s, img_tavole_spritesheet, 640, 375, 0.5, 0.5);
    
    tavole_sprite.geometry.scale_x = 0.44;
    tavole_sprite.geometry.scale_y = 0.44;

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

    // --- SOSTITUZIONE FRECCE TESTUALI CON IMMAGINI ---
    
    // Hint freccia sinistra (immagine)
    tavole_hint_left = PP.assets.image.add(s, img_freccia_sx, 100, 380, 0.5, 0.5);
    
    // Hint freccia destra (immagine)
    tavole_hint_right = PP.assets.image.add(s, img_freccia_dx, 1180, 380, 0.5, 0.5);
    
    // --- ZONE CLICKABILI FRECCE (Invisibili) ---
    // Rettangolo sopra la freccia sinistra
    zone_sx = PP.shapes.rectangle_add(s, 80, 400, 100, 100, "0x00FF00", 0);
    PP.layers.set_z_index(zone_sx, 101);
    
    // Rettangolo sopra la freccia destra
    zone_dx = PP.shapes.rectangle_add(s, 1200, 400, 100, 100, "0x00FF00", 0);
    PP.layers.set_z_index(zone_dx, 101);

    // EVENTI CLICK
    PP.interactive.mouse.add(zone_sx, "pointerdown", function() {
        if (!is_animating && tavole_current > 0) {
            go_prev(s);
        }
    });

    PP.interactive.mouse.add(zone_dx, "pointerdown", function() {
        if (!is_animating && tavole_current < 2) {
            go_next(s);
        }
    });

    
    // --- NUOVO MENU PRINCIPALE (SOVRAPPOSIZIONE) ---
    let menu_overlay = PP.assets.image.add(s, img_menu_princ, 640, 360, 0.5, 0.5);
    PP.layers.set_z_index(menu_overlay, 100);

    // --- BOTTONE INVISIBILE PER TORNARE AL MENU ---
    btn_home_zone = PP.shapes.rectangle_add(s, 238, 57, 408, 66, "0x00FF00", 0); 
    PP.layers.set_z_index(btn_home_zone, 101); 
    
    PP.interactive.mouse.add(btn_home_zone, "pointerdown", function() {
        PP.scenes.start("main_menu");
    });
    
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
    
    if (is_animating) return;

    if (!tavole_key_was_pressed) {
        
        // --- NAVIGAZIONE INDIETRO (SINISTRA) ---
        if (left_pressed && tavole_current > 0) {
            tavole_key_was_pressed = true;
            go_prev(s);
        }
        
        // NAVIGAZIONE AVANTI (DESTRA)
        if (right_pressed && tavole_current < 2) {
            tavole_key_was_pressed = true;
            go_next(s);
        }
        
        // ESCI
        if (esc_pressed) {
            tavole_key_was_pressed = true;
            PP.scenes.start("main_menu");
        }
    }
}

// Funzioni helper per la logica di navigazione (condivise tra tastiera e mouse)
function go_prev(s) {
    if (tavole_current === 1) {
        play_transition(s, "anim_1_to_0", "static_0", 0);
    } else if (tavole_current === 2) {
        play_transition(s, "anim_2_to_1", "static_1", 1);
    }
}

function go_next(s) {
    if (tavole_current === 0) {
        play_transition(s, "anim_0_to_1", "static_1", 1);
    } else if (tavole_current === 1) {
        play_transition(s, "anim_1_to_2", "static_2", 2);
    }
}

// Funzione helper per gestire animazione -> stop
function play_transition(s, anim_key, static_key_after, new_index) {
    is_animating = true; 
    
    PP.assets.sprite.animation_play(tavole_sprite, anim_key);
    
    PP.timers.add_timer(s, 500, function() {
        is_animating = false;
        tavole_current = new_index;
        
        PP.assets.sprite.animation_play(tavole_sprite, static_key_after);
        update_ui_visibility();
        
    }, false);
}

function update_ui_visibility() {
    if (tavole_current === 0) {
        tavole_hint_left.visibility.alpha = 0.3; // Disabilitata
        tavole_hint_right.visibility.alpha = 1;
        // Disabilitiamo interazione mouse se la freccia è grigia
        if(zone_sx && zone_sx.input) zone_sx.input.enabled = false;
        if(zone_dx && zone_dx.input) zone_dx.input.enabled = true;

    } else if (tavole_current === 1) {
        tavole_hint_left.visibility.alpha = 1;
        tavole_hint_right.visibility.alpha = 1;
        if(zone_sx && zone_sx.input) zone_sx.input.enabled = true;
        if(zone_dx && zone_dx.input) zone_dx.input.enabled = true;

    } else { // 2
        tavole_hint_left.visibility.alpha = 1;
        tavole_hint_right.visibility.alpha = 0.3; // Disabilitata
        if(zone_sx && zone_sx.input) zone_sx.input.enabled = true;
        if(zone_dx && zone_dx.input) zone_dx.input.enabled = false;
    }
}

function destroy(s) {
    tavole_sprite = null;
}

PP.scenes.add("tavole", preload, create, update, destroy);