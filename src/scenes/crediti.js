let crediti_bg;
let crediti_img_loaded;
let crediti_display;
let crediti_back;
let crediti_key_was_pressed = false;

function preload(s) {
    // Carica l'immagine dei crediti
    // NOTA: Sostituisci questo path con l'immagine reale dei crediti
    crediti_img_loaded = PP.assets.image.load(s, "assets/images/crediti/crediti.png");
}

function create(s) {
    // Sfondo
    crediti_bg = PP.shapes.rectangle_add(s, 640, 400, 1280, 800, "0x1a1a2e", 1);
    
    // Immagine crediti
    crediti_display = PP.assets.image.add(s, crediti_img_loaded, 640, 380, 0.5, 0.5);
    // Scala se necessario
    crediti_display.geometry.scale_x = 0.9;
    crediti_display.geometry.scale_y = 0.9;
    
    crediti_key_was_pressed = true;
}

function update(s) {
    let esc_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ESC);
    let space_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);
    
    let any_key = esc_pressed || space_pressed;
    
    if (!any_key) {
        crediti_key_was_pressed = false;
    }
    
    if (!crediti_key_was_pressed) {
        if (esc_pressed || space_pressed) {
            crediti_key_was_pressed = true;
            PP.scenes.start("main_menu");
        }
    }
}

function destroy(s) {
    // Cleanup
}

