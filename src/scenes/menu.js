let img_copertina;
let menu_selected = 0; // 0 = Gioca, 1 = Tavole, 2 = Crediti
let menu_options = [];
let menu_key_was_pressed = false;
let menu_scene_ref = null;

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

    // Titolo
    PP.shapes.text_styled_add(s, 
        PP.game.config.canvas_width / 2,
        200,
        "Quando l'Immortalità andò Perduta",
        50,
        "Georgia",
        "bold",
        "0xFFFFFF",
        null,
        0.5,
        0.5
    );

    menu_selected = 0;
    menu_options = [];
    create_menu_options(s);
    
    menu_key_was_pressed = true; // Evita input immediato all'avvio
}
function create_menu_options(s) {
    // Distruggi opzioni esistenti
    for (let i = 0; i < menu_options.length; i++) {
        if (menu_options[i]) {
            PP.shapes.destroy(menu_options[i]);
        }
    }
    menu_options = [];
    
    let labels = ["Gioca", "Tavole", "Crediti"];
    let yPositions = [420, 500, 580];
    
    for (let i = 0; i < 3; i++) {
        let color = (i === menu_selected) ? "0xFFFFFF" : "0x666666";
        
        let opt = PP.shapes.text_styled_add(s, 
            PP.game.config.canvas_width / 2,
            yPositions[i],
            labels[i],
            45,
            "Georgia",
            "normal",
            color,
            null,
            0.5,
            0.5
        );
        menu_options.push(opt);
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
            if (menu_selected < 0) menu_selected = 2;
            create_menu_options(s);
            menu_key_was_pressed = true;
        }
        
        // Navigazione giù
        if (down_pressed) {
            menu_selected++;
            if (menu_selected > 2) menu_selected = 0;
            create_menu_options(s);
            menu_key_was_pressed = true;
        }
        
        // Conferma selezione
        if (space_pressed || enter_pressed) {
            menu_key_was_pressed = true;
            
            if (menu_selected === 0) {
                // GIOCA
                PP.scenes.start("lvl1_pt1");
            } else if (menu_selected === 1) {
                // TAVOLE
                PP.scenes.start("tavole");
            } else if (menu_selected === 2) {
                // CREDITI
                PP.scenes.start("crediti");
            }
        }
    }
}

function destroy(s) {
    menu_options = [];
    menu_scene_ref = null;
}

PP.scenes.add("main_menu", preload, create, update, destroy);