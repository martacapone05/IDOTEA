let img_transizione_anim;
let transizione_sprite;

function preload(s) {
    img_transizione_anim = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_funivia.png", 1280, 720);
}

function create(s) {
    transizione_sprite = PP.assets.sprite.add(s, img_transizione_anim, 640, 360, 0.5, 0.5);
    
    transizione_sprite.tile_geometry.scroll_factor_x = 0;
    transizione_sprite.tile_geometry.scroll_factor_y = 0;

    // 12 fps?
    PP.assets.sprite.animation_add(transizione_sprite, "play_anim", 0, 59, 12, 0);
    
    PP.assets.sprite.animation_play(transizione_sprite, "play_anim");

    let duration_ms = (60 / 12) * 1000; 

    PP.timers.add_timer(s, duration_ms, function() {
        console.log("Animazione finita, vado al livello 2!");
        // Imposta il punto di partenza per lo spawn corretto in lvl2_pt1
        PP.game_state.set_variable("punto_di_partenza", "funivia_arrivo");
        PP.scenes.start("lvl2_pt1");
    }, false);
}

function update(s) {
}

function destroy(s) {
    transizione_sprite = null;
}

PP.scenes.add("animazione_transizione", preload, create, update, destroy);