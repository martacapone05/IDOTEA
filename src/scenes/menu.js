let img_copertina;
let img_btn_gioca;
let img_btn_storia;
let img_btn_comandi;
let img_btn_crediti;

let menu_selected = 0; // 0 = Gioca, 1 = Storia, 2 = Comandi, 3 = Crediti
let menu_buttons = []; // Array per i bottoni immagine
let menu_key_was_pressed = false;
let menu_scene_ref = null;

// COORDINATE DEI BOTTONI (centro X, centro Y)
let button_positions = [
    { x: 609, y: 671 },   // GIOCA
    { x: 774, y: 671 },   // STORIA
    { x: 965, y: 671 },   // COMANDI
    { x: 1162, y: 671 }   // CREDITI
];

// Scala dei bottoni
let button_scale = 0.038;

function preload(s) {
    img_copertina = PP.assets.image.load(s, "assets/images/copertina.png");
    img_btn_gioca = PP.assets.image.load(s, "assets/images/btn_gioca.png");
    img_btn_storia = PP.assets.image.load(s, "assets/images/btn_storia.png");
    img_btn_comandi = PP.assets.image.load(s, "assets/images/btn_comandi.png");
    img_btn_crediti = PP.assets.image.load(s, "assets/images/btn_crediti.png");
}

function create(s) {
    menu_scene_ref = s;

    PP.game_state.set_variable("muri_rotti", 0);
    
    PP.assets.image.add(s, img_copertina, 0, 0, 0, 0);

    // Reset variabili di gioco
    PP.game_state.set_variable("coins", 0);
    PP.game_state.set_variable("HP", 3);

    menu_selected = 0;
    menu_buttons = [];
    
    // Array delle immagini bottoni
    let btn_images = [img_btn_gioca, img_btn_storia, img_btn_comandi, img_btn_crediti];
    
    // Crea i bottoni immagine
    for (let i = 0; i < button_positions.length; i++) {
        let pos = button_positions[i];
        let btn = PP.assets.image.add(s, btn_images[i], pos.x, pos.y, 0.5, 0.5);
        btn.geometry.scale_x = button_scale;
        btn.geometry.scale_y = button_scale;
        btn.button_index = i;
        
        // Aggiungi interazione mouse
        PP.interactive.mouse.add(btn, "pointerover", function() {
            menu_selected = i;
            update_button_highlight();
        });
        
        PP.interactive.mouse.add(btn, "pointerdown", function() {
            activate_menu_option(menu_selected);
        });
        
        menu_buttons.push(btn);
    }
    
    // Evidenzia il primo bottone
    update_button_highlight();
    
    menu_key_was_pressed = true;
}

// Funzione per evidenziare il bottone selezionato
function update_button_highlight() {
    for (let i = 0; i < menu_buttons.length; i++) {
        if (i === menu_selected) {
            // Bottone selezionato: scala più grande e alpha pieno
            menu_buttons[i].geometry.scale_x = button_scale * 1.15;
            menu_buttons[i].geometry.scale_y = button_scale * 1.15;
            menu_buttons[i].visibility.alpha = 1;
        } else {
            // Bottoni non selezionati: scala normale e leggermente trasparenti
            menu_buttons[i].geometry.scale_x = button_scale;
            menu_buttons[i].geometry.scale_y = button_scale;
            menu_buttons[i].visibility.alpha = 0.7;
        }
    }
}

function activate_menu_option(index) {
    if (index === 0) {
        PP.scenes.start("schermata_idotea");
    } else if (index === 1) {
        PP.scenes.start("tavole");
    } else if (index === 2) {
        PP.scenes.start("comandi");
    } else if (index === 3) {
        PP.scenes.start("crediti");
    }
}

function update(s) {
    let left_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT);
    let right_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT);
    let space_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);
    let enter_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    
    let any_key = left_pressed || right_pressed || space_pressed || enter_pressed;
    
    // Reset flag quando nessun tasto è premuto
    if (!any_key) {
        menu_key_was_pressed = false;
    }
    
    if (!menu_key_was_pressed) {
        // Navigazione sinistra
        if (left_pressed) {
            menu_selected--;
            if (menu_selected < 0) menu_selected = 3;
            update_button_highlight();
            menu_key_was_pressed = true;
        }
        
        // Navigazione destra
        if (right_pressed) {
            menu_selected++;
            if (menu_selected > 3) menu_selected = 0;
            update_button_highlight();
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
    menu_buttons = [];
    menu_scene_ref = null;
}

PP.scenes.add("main_menu", preload, create, update, destroy);