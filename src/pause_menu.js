// ============================================================
// *** SISTEMA MENU DI PAUSA ***
// ============================================================

let pause_is_active = false;
let pause_elements = []; // Array per tutti gli elementi del menu
let pause_esc_hint = null;
let pause_key_was_pressed = false;
let pause_current_scene = null;

function create_pause_button(s, player) {
    pause_current_scene = s;
    pause_is_active = false;
    pause_key_was_pressed = true; // Evita che si apra subito
    pause_elements = [];
    
    // Hint ESC in alto a destra (sempre visibile durante il gioco)
    pause_esc_hint = PP.shapes.text_styled_add(s,
        1175, 40,
        "ESC",
        20,
        "Georgia",
        "bold",
        "0xFFFFFF",
        null,
        0.5, 0.5
    );
    pause_esc_hint.tile_geometry.scroll_factor_x = 0;
    pause_esc_hint.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(pause_esc_hint, 9999);
}

function show_pause_menu(s) {
    if (pause_is_active) return;
    pause_is_active = true;
    pause_elements = [];
    
    // Overlay scuro semi-trasparente
    let overlay = PP.shapes.rectangle_add(s, 640, 360, 1280, 720, "0x000000", 0.85);
    overlay.tile_geometry.scroll_factor_x = 0;
    overlay.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(overlay, 11000);
    pause_elements.push(overlay);
    
    // Titolo PAUSA
    let title = PP.shapes.text_styled_add(s,
        640, 80,
        "PAUSA",
        50,
        "Georgia",
        "bold",
        "0xFFFFFF",
        null,
        0.5, 0.5
    );
    title.tile_geometry.scroll_factor_x = 0;
    title.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(title, 11001);
    pause_elements.push(title);
    
    // Lista comandi
    let comandi_lista = [
        "← →  -  Muoviti a sinistra/destra",
        "↑  -  Arrampicati sulle scale",
        "SPAZIO  -  Salta",
        "E  -  Interagisci / Parla con NPC",
        "R  -  Rompi muri (quando vicino)"
    ];
    
    let y_start = 180;
    let y_spacing = 45;
    
    for (let i = 0; i < comandi_lista.length; i++) {
        let txt = PP.shapes.text_styled_add(s,
            640, y_start + (i * y_spacing),
            comandi_lista[i],
            24,
            "Georgia",
            "normal",
            "0xCCCCCC",
            null,
            0.5, 0.5
        );
        txt.tile_geometry.scroll_factor_x = 0;
        txt.tile_geometry.scroll_factor_y = 0;
        PP.layers.set_z_index(txt, 11001);
        pause_elements.push(txt);
    }
    
    // Separatore
    let separator = PP.shapes.rectangle_add(s, 640, 430, 600, 2, "0x555555", 1);
    separator.tile_geometry.scroll_factor_x = 0;
    separator.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(separator, 11001);
    pause_elements.push(separator);
    
    // Pulsante CONTINUA (sfondo)
    let btn_continua_bg = PP.shapes.rectangle_add(s, 640, 510, 300, 60, "0x2E7D32", 1);
    btn_continua_bg.tile_geometry.scroll_factor_x = 0;
    btn_continua_bg.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(btn_continua_bg, 11001);
    pause_elements.push(btn_continua_bg);
    
    // Rendi cliccabile il pulsante CONTINUA
    PP.interactive.mouse.add(btn_continua_bg, "pointerdown", function(scene) {
        hide_pause_menu();
    });
    
    // Testo CONTINUA
    let btn_continua_text = PP.shapes.text_styled_add(s,
        640, 510,
        "CONTINUA (ESC)",
        24,
        "Georgia",
        "bold",
        "0xFFFFFF",
        null,
        0.5, 0.5
    );
    btn_continua_text.tile_geometry.scroll_factor_x = 0;
    btn_continua_text.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(btn_continua_text, 11002);
    pause_elements.push(btn_continua_text);
    
    // Pulsante MENU PRINCIPALE (sfondo)
    let btn_menu_bg = PP.shapes.rectangle_add(s, 640, 600, 300, 60, "0x8B0000", 1);
    btn_menu_bg.tile_geometry.scroll_factor_x = 0;
    btn_menu_bg.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(btn_menu_bg, 11001);
    pause_elements.push(btn_menu_bg);
    
    // Rendi cliccabile il pulsante MENU
    PP.interactive.mouse.add(btn_menu_bg, "pointerdown", function(scene) {
        hide_pause_menu();
        PP.scenes.start("main_menu");
    });
    
    // Testo MENU PRINCIPALE
    let btn_menu_text = PP.shapes.text_styled_add(s,
        640, 600,
        "MENU PRINCIPALE",
        24,
        "Georgia",
        "bold",
        "0xFFFFFF",
        null,
        0.5, 0.5
    );
    btn_menu_text.tile_geometry.scroll_factor_x = 0;
    btn_menu_text.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(btn_menu_text, 11002);
    pause_elements.push(btn_menu_text);
}

function hide_pause_menu() {
    if (!pause_is_active) return;
    pause_is_active = false;
    
    // Distruggi tutti gli elementi del menu
    for (let i = 0; i < pause_elements.length; i++) {
        if (pause_elements[i]) {
            try {
                PP.shapes.destroy(pause_elements[i]);
            } catch(e) {
                // Ignora errori di distruzione
            }
        }
    }
    pause_elements = [];
}

function manage_pause_input(s) {
    let esc_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ESC);
    
    if (!esc_pressed) {
        pause_key_was_pressed = false;
    }
    
    if (esc_pressed && !pause_key_was_pressed) {
        pause_key_was_pressed = true;
        
        if (pause_is_active) {
            hide_pause_menu();
        } else {
            show_pause_menu(s);
        }
    }
}

function is_game_paused() {
    return pause_is_active;
}

function cleanup_pause_menu() {
    hide_pause_menu();
    if (pause_esc_hint) {
        try {
            PP.shapes.destroy(pause_esc_hint);
        } catch(e) {}
        pause_esc_hint = null;
    }
    pause_current_scene = null;
}
