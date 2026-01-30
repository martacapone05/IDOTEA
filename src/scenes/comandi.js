let comandi_bg;
let comandi_title;
let comandi_text;
let comandi_key_was_pressed = false;

function preload(s) {
    // Nessun asset specifico da caricare
}

function create(s) {
    // Sfondo scuro
    comandi_bg = PP.shapes.rectangle_add(s, 640, 360, 1280, 720, "0x1a1a2e", 1);
    
    // Titolo
    comandi_title = PP.shapes.text_styled_add(s,
        640, 80,
        "COMANDI",
        50,
        "Georgia",
        "bold",
        "0xFFFFFF",
        null,
        0.5, 0.5
    );
    
    // Lista comandi
    let comandi_lista = [
        "← →  -  Muoviti a sinistra/destra",
        "↑  -  Arrampicati sulle scale",
        "SPAZIO  -  Salta",
        "E  -  Interagisci / Parla con NPC",
        "R  -  Rompi muri (quando vicino)"
    ];
    
    let y_start = 200;
    let y_spacing = 60;
    
    for (let i = 0; i < comandi_lista.length; i++) {
        PP.shapes.text_styled_add(s,
            640, y_start + (i * y_spacing),
            comandi_lista[i],
            30,
            "Georgia",
            "normal",
            "0xCCCCCC",
            null,
            0.5, 0.5
        );
    }
    
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
    
    comandi_key_was_pressed = true;
}

function update(s) {
    let esc_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ESC);
    let space_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);
    let enter_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    
    let any_key = esc_pressed || space_pressed || enter_pressed;
    
    if (!any_key) {
        comandi_key_was_pressed = false;
    }
    
    if (!comandi_key_was_pressed) {
        if (any_key) {
            comandi_key_was_pressed = true;
            PP.scenes.start("main_menu");
        }
    }
}

function destroy(s) {
    // Cleanup
}

PP.scenes.add("comandi", preload, create, update, destroy);
