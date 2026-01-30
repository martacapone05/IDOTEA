let crediti_sprite; // Variabile per lo sprite animato
let crediti_bg;
let crediti_key_was_pressed = false;

function preload(s) {
    // Carichiamo lo SPRITESHEET invece dell'immagine singola
    // Parametri: scena, percorso, larghezza frame, altezza frame
    crediti_sprite = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_crediti.png", 1280, 720);
}

function create(s) {
    // Sfondo (opzionale se l'animazione copre tutto, ma male non fa)
    crediti_bg = PP.shapes.rectangle_add(s, 0, 0, 1280, 720, "0x1a1a2e", 1);
    
    // 1. Aggiungiamo lo sprite al centro dello schermo (640, 360 è il centro esatto per 720p)
    let anim_obj = PP.assets.sprite.add(s, crediti_sprite, 0, 0, 0, 0);
    
    // 2. Creiamo l'animazione
    // Parametri: oggetto, nome, frame inizio, frame fine, velocità (fps), ripetizioni (-1 = infinito)
    PP.assets.sprite.animation_add(anim_obj, "play_credits", 0, 2, 4, -1);
    
    // 3. Facciamo partire l'animazione
    PP.assets.sprite.animation_play(anim_obj, "play_credits");

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
    
    crediti_key_was_pressed = true;
}

function update(s) {
    let esc_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ESC);
    let space_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);
    let enter_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER); // Aggiunto anche Enter per comodità
    
    let any_key = esc_pressed || space_pressed || enter_pressed;
    
    if (!any_key) {
        crediti_key_was_pressed = false;
    }
    
    if (!crediti_key_was_pressed) {
        if (any_key) {
            crediti_key_was_pressed = true;
            PP.scenes.start("main_menu");
        }
    }
}

function destroy(s) {
    // Cleanup
}

PP.scenes.add("crediti", preload, create, update, destroy);