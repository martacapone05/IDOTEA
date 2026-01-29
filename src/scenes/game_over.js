let gameover_bg;
let gameover_title;
let gameover_options = [];
let gameover_selected = 0; // 0 = Riprova, 1 = Menu
let gameover_key_was_pressed = false;
let gameover_scene_ref = null;

function preload(s) {
    // Nessun asset da caricare per ora
}

function create(s) {
    gameover_scene_ref = s;
    
    // Sfondo scuro semi-trasparente
    gameover_bg = PP.shapes.rectangle_add(s, 640, 400, 1280, 800, "0x000000", 0.85);
    
    // Titolo "SEI MORTO"
    gameover_title = PP.shapes.text_styled_add(s, 
        640, 250,
        "SEI MORTO",
        80,
        "Georgia",
        "bold",
        "0xFF0000",
        null,
        0.5, 0.5
    );
    
    gameover_selected = 0;
    gameover_options = [];
    create_gameover_options(s);
    
    gameover_key_was_pressed = true; // Evita input immediato
}

function create_gameover_options(s) {
    // Distruggi opzioni esistenti
    for (let i = 0; i < gameover_options.length; i++) {
        if (gameover_options[i]) {
            PP.shapes.destroy(gameover_options[i]);
        }
    }
    gameover_options = [];
    
    let labels = ["Riprova", "Menu Principale"];
    let yPositions = [420, 500];
    
    for (let i = 0; i < 2; i++) {
        let color = (i === gameover_selected) ? "0xFFFFFF" : "0x666666";
        
        let opt = PP.shapes.text_styled_add(s, 
            640,
            yPositions[i],
            labels[i],
            40,
            "Georgia",
            "normal",
            color,
            null,
            0.5, 0.5
        );
        gameover_options.push(opt);
    }
}

function update(s) {
    let up_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.UP);
    let down_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.DOWN);
    let space_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);
    let enter_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    
    let any_key = up_pressed || down_pressed || space_pressed || enter_pressed;
    
    if (!any_key) {
        gameover_key_was_pressed = false;
    }
    
    if (!gameover_key_was_pressed) {
        // Navigazione su/giù
        if (up_pressed || down_pressed) {
            gameover_selected = (gameover_selected === 0) ? 1 : 0;
            create_gameover_options(s);
            gameover_key_was_pressed = true;
        }
        
        // Conferma selezione
        if (space_pressed || enter_pressed) {
            gameover_key_was_pressed = true;
            
            if (gameover_selected === 0) {
                // Riprova - torna all'ultimo livello
                let last_scene = PP.game_state.get_variable("last_scene");
                if (last_scene) {
                    PP.scenes.start(last_scene);
                } else {
                    PP.scenes.start("lvl1_pt1");
                }
            } else {
                // Menu principale
                PP.scenes.start("main_menu");
            }
        }
    }
}

function destroy(s) {
    gameover_options = [];
    gameover_scene_ref = null;
}

PP.scenes.add("game_over", preload, create, update, destroy);