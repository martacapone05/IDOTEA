let img_tavole_fin;
let sprite_fin;
let sequence = [];
let current_seq_index = 0;
let space_was_pressed = false;

// Nuove variabili per le immagini finali
let img_end_positivo;
let img_end_neutro;
let img_end_negativo;
let end_card_obj; 
let showing_end_card = false;

function preload(s) {
    img_tavole_fin = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_tavolefin.png", 1280, 720);
    
    // Caricamento immagini finali statiche
    img_end_positivo = PP.assets.image.load(s, "assets/images/end_positivo.png");
    img_end_neutro = PP.assets.image.load(s, "assets/images/end_neutro.png");
    img_end_negativo = PP.assets.image.load(s, "assets/images/end_negativo.png");
}

function create(s) {
    let muri_rotti = PP.game_state.get_variable("muri_rotti") || 0;
    
    // Variabile per decidere quale immagine finale mostrare dopo
    let img_scelta;

    // LOGICA FINALi
    if (muri_rotti >= 3) {
        sequence = [0, 1, 2]; // Finale Positivo
        img_scelta = img_end_positivo;
    } else if (muri_rotti >= 1) {
        sequence = [3, 4, 5]; // Finale Neutro
        img_scelta = img_end_neutro;
    } else {
        sequence = [3, 6, 7]; // Finale Negativo
        img_scelta = img_end_negativo;
    }

    current_seq_index = 0;
    showing_end_card = false;
    space_was_pressed = true; // Evita salto immediato

    // 1. Aggiungiamo lo sprite della sequenza
    sprite_fin = PP.assets.sprite.add(s, img_tavole_fin, 640, 360, 0.5, 0.5);
    PP.layers.set_z_index(sprite_fin, 1);
    
    for (let i = 0; i <= 7; i++) {
        PP.assets.sprite.animation_add(sprite_fin, "f" + i, i, i, 1, 0);
    }
    PP.assets.sprite.animation_play(sprite_fin, "f" + sequence[current_seq_index]);

    // 2. Aggiungiamo l'immagine finale ma la nascondiamo (alpha 0)
    end_card_obj = PP.assets.image.add(s, img_scelta, 640, 360, 0.5, 0.5);
    end_card_obj.visibility.alpha = 0; // Invisibile all'inizio
    PP.layers.set_z_index(end_card_obj, 10); // Sopra a tutto
}

function update(s) {
    let space = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);

    if (!space) { space_was_pressed = false; }

    if (space && !space_was_pressed) {
        space_was_pressed = true;

        // Se NON stiamo ancora mostrando la end card, andiamo avanti con i frame
        if (!showing_end_card) {
            current_seq_index++;

            if (current_seq_index < sequence.length) {
                // Mostra il frame successivo
                PP.assets.sprite.animation_play(sprite_fin, "f" + sequence[current_seq_index]);
            } else {
                // Fine sequenza frame -> MOSTRA IMMAGINE FINALE
                sprite_fin.visibility.alpha = 0; // Nascondi sprite
                end_card_obj.visibility.alpha = 1; // Mostra end card
                showing_end_card = true; // Cambia stato
            }
        } 
        // Se stiamo GIÀ mostrando la end card, torna al menu
        else {
            PP.scenes.start("main_menu");
        }
    }
}

function destroy(s) {
    sprite_fin = null;
    end_card_obj = null;
}

PP.scenes.add("tavole_finali", preload, create, update, destroy);