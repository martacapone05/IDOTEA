let img_tavole_fin;
let sprite_fin;
let sequence = [];
let current_seq_index = 0;
let space_was_pressed = false;

function preload(s) {
    // Carica lo spritesheet con i frame 1280x720
    img_tavole_fin = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_tavolefin.png", 1280, 720);
}

function create(s) {
    let muri_rotti = PP.game_state.get_variable("muri_rotti") || 0;

    // LOGICA FINALi
    if (muri_rotti >= 3) {
        sequence = [0, 1, 2]; // Finale Positivo
    } else if (muri_rotti >= 1) {
        sequence = [3, 4, 5]; // Finale Neutro
    } else {
        sequence = [3, 6, 7]; // Finale Negativo
    }

    current_seq_index = 0;
    space_was_pressed = true; // Evita salto immediato del primo frame

    // Mostra lo sprite
    sprite_fin = PP.assets.sprite.add(s, img_tavole_fin, 640, 360, 0.5, 0.5);
    
    // Creiamo le animazioni statiche per i frame necessari (0-7)
    for (let i = 0; i <= 7; i++) {
        PP.assets.sprite.animation_add(sprite_fin, "f" + i, i, i, 1, 0);
    }

    // Visualizza il primo frame della sequenza
    PP.assets.sprite.animation_play(sprite_fin, "f" + sequence[current_seq_index]);
}

function update(s) {
    let space = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);

    if (!space) { space_was_pressed = false; }

    if (space && !space_was_pressed) {
        space_was_pressed = true;
        current_seq_index++;

        if (current_seq_index < sequence.length) {
            // Mostra il frame successivo
            PP.assets.sprite.animation_play(sprite_fin, "f" + sequence[current_seq_index]);
        } else {
            // Fine delle tavole -> torna al menu
            PP.scenes.start("main_menu");
        }
    }
}

function destroy(s) {
    sprite_fin = null;
}

PP.scenes.add("tavole_finali", preload, create, update, destroy);