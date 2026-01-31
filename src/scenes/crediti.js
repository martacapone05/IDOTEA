let crediti_sprite;
let crediti_bg;
let crediti_key_was_pressed = false;

let img_menu_princ;
let btn_home_zone;

function preload(s) {
    crediti_sprite = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_crediti.png", 1280, 720);
    
    img_menu_princ = PP.assets.image.load(s, "assets/images/menu_princ.png");
}

function create(s) {
    crediti_bg = PP.shapes.rectangle_add(s, 0, 0, 1280, 720, "0x1a1a2e", 1);
    
    // Animazione crediti
    let anim_obj = PP.assets.sprite.add(s, crediti_sprite, 0, 0, 0, 0);
    PP.assets.sprite.animation_add(anim_obj, "play_credits", 0, 2, 4, -1);
    PP.assets.sprite.animation_play(anim_obj, "play_credits");

    // IMMAGINE MENU PRINCIPALE (OVERLAY)
    let menu_overlay = PP.assets.image.add(s, img_menu_princ, 640, 360, 0.5, 0.5);
    PP.layers.set_z_index(menu_overlay, 100); // Sopra all'animazione

    // BOTTONE INVISIBILE PER TORNARE AL MENU
    btn_home_zone = PP.shapes.rectangle_add(s, 238, 57, 408, 66, "0x00FF00", 0);
    PP.layers.set_z_index(btn_home_zone, 101);
    
    // Interazione Mouse/Touch sul bottone
    PP.interactive.mouse.add(btn_home_zone, "pointerdown", function() {
        PP.scenes.start("main_menu");
    });
    
    crediti_key_was_pressed = true;
}

function update(s) {
    let esc_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ESC);
    let space_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);
    let enter_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    
    let any_key = esc_pressed || space_pressed || enter_pressed;
    
    if (!any_key) {
        crediti_key_was_pressed = false;
    }
    
    if (!crediti_key_was_pressed) {
        // Manteniamo anche i tasti fisici come scorciatoia
        if (any_key) {
            crediti_key_was_pressed = true;
            PP.scenes.start("main_menu");
        }
    }
}

function destroy(s) {
}

PP.scenes.add("crediti", preload, create, update, destroy);