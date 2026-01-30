let img_copertina;
let menu_selected = 0; // 0 = Gioca, 1 = Storia, 2 = Comandi, 3 = Crediti
let menu_hitboxes = [];
let menu_highlight_layers = []; // Array di rettangoli per effetto sfumato
let menu_key_was_pressed = false;
let menu_scene_ref = null;

// Configurazione sfumatura highlight
let layers_config = [
    { expand: 30, alpha: 0.05 },  // Layer esterno - molto trasparente
    { expand: 22, alpha: 0.10 },
    { expand: 15, alpha: 0.15 },
    { expand: 10, alpha: 0.20 },
    { expand: 5,  alpha: 0.25 },  // Layer interno - più opaco
];

// Colore highlight (modifica qui)
let highlight_color = "0x1E90FF";

// COORDINATE DEI BOTTONI NEL PNG (centro X, centro Y, larghezza, altezza)
// Modifica questi valori per allinearli ai bottoni nella copertina
let button_configs = [
    { x: 610, y: 670, w: 120, h: 35 },  // GIOCA
    { x: 775, y: 672, w: 115, h: 35 },  // STORIA
    { x: 966, y: 670, w: 160, h: 35 },  // COMANDI
    { x: 1163, y: 670, w: 130, h: 35 }   // CREDITI
];

function preload(s) {
    img_copertina = PP.assets.image.load(s, "assets/images/copertina.png");
}

function create(s) {
    menu_scene_ref = s;
    
    // Sfondo copertina
    PP.assets.image.add(s, img_copertina, 0, 0, 0, 0);

    // Reset variabili di gioco
    PP.game_state.set_variable("coins", 0);
    PP.game_state.set_variable("HP", 3);

    menu_selected = 0;
    menu_hitboxes = [];
    menu_highlight_layers = [];
    
    // Crea highlight iniziale
    create_highlight_layers(s, button_configs[0]);
    
    // Crea hitbox invisibili per ogni bottone
    for (let i = 0; i < button_configs.length; i++) {
        let cfg = button_configs[i];
        let hitbox = PP.shapes.rectangle_add(s, cfg.x, cfg.y, cfg.w, cfg.h, "0xFF0000", 0);
        hitbox.button_index = i;
        
        // Aggiungi interazione mouse
        PP.interactive.mouse.add(hitbox, "pointerover", function() {
            menu_selected = i;
            update_highlight(s);
        });
        
        PP.interactive.mouse.add(hitbox, "pointerdown", function() {
            activate_menu_option(menu_selected);
        });
        
        menu_hitboxes.push(hitbox);
    }
    
    menu_key_was_pressed = true;
}

function create_highlight_layers(s, cfg) {
    // Distruggi layer esistenti
    for (let i = 0; i < menu_highlight_layers.length; i++) {
        if (menu_highlight_layers[i]) {
            PP.shapes.destroy(menu_highlight_layers[i]);
        }
    }
    menu_highlight_layers = [];
    
    // Crea nuovi layer con le dimensioni del bottone selezionato
    for (let i = 0; i < layers_config.length; i++) {
        let lc = layers_config[i];
        let layer = PP.shapes.rectangle_add(s, 
            cfg.x, 
            cfg.y, 
            cfg.w + lc.expand * 2, 
            cfg.h + lc.expand, 
            highlight_color,
            lc.alpha
        );
        PP.layers.set_z_index(layer, 99 + i);
        menu_highlight_layers.push(layer);
    }
}

function update_highlight(s) {
    if (button_configs[menu_selected]) {
        create_highlight_layers(s, button_configs[menu_selected]);
    }
}

function activate_menu_option(index) {
    if (index === 0) {
        PP.scenes.start("lvl1_pt1");
    } else if (index === 1) {
        PP.scenes.start("tavole");
    } else if (index === 2) {
        PP.scenes.start("comandi");
    } else if (index === 3) {
        PP.scenes.start("crediti");
    }
}

function update(s) {
    let up_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.UP);
    let down_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.DOWN);
    let space_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);
    let enter_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    
    let any_key = up_pressed || down_pressed || space_pressed || enter_pressed;
    
    // Reset flag quando nessun tasto è premuto
    if (!any_key) {
        menu_key_was_pressed = false;
    }
    
    if (!menu_key_was_pressed) {
        // Navigazione su
        if (up_pressed) {
            menu_selected--;
            if (menu_selected < 0) menu_selected = 3;
            update_highlight(s);
            menu_key_was_pressed = true;
        }
        
        // Navigazione giù
        if (down_pressed) {
            menu_selected++;
            if (menu_selected > 3) menu_selected = 0;
            update_highlight(s);
            menu_key_was_pressed = true;
        }
        
        // Conferma selezione
        if (space_pressed || enter_pressed) {
            menu_key_was_pressed = true;
            activate_menu_option(menu_selected);
        }
    }
}

function destroy(s) {
    menu_highlight_layers = [];
    menu_hitboxes = [];
    menu_scene_ref = null;
}

PP.scenes.add("main_menu", preload, create, update, destroy);