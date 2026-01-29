/*

let img_background;
let img_player;
let img_info;

let background;
let info;
let player;
let floor;

function preload(s) {
    console.log("Executing preload() - SCENE LVL 3");
    preload_hud(s); // HUD

    img_background = PP.assets.image.load(s, "assets/images/sfondi/sfondo.png");
    img_info = PP.assets.image.load(s, "assets/images/info.png");
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 140, 246);

    preload_platforms(s);
    preload_player(s);
}


function create(s) {
    console.log("Executing create() - SCENE LVL 3");

    background = PP.assets.tilesprite.add(s, img_background, 0, 0, 1280, 800, 0, 0);
    background.tile_geometry.scroll_factor_x = 0;
    background.tile_geometry.scroll_factor_y = 0;

    player = PP.assets.sprite.add(s, img_player, 0, 620, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC);

    // Warm-up
    player.controls_disabled = true; 
    PP.timers.add_timer(s, 1000, function() {
        player.controls_disabled = false;
    }, false);

    floor = PP.shapes.rectangle_add(s, -300, 620, 1400, 1, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, floor);

    configure_player_animations(s, player);
    create_platforms_lvl1_pt2(s, player); 

    create_hud(s, player); // HUD

    create_collectible_fragment(s, 1200, 470, player);
    create_collectible_heart(s, 1700, 470, player);

    PP.camera.start_follow(s, player, 0, 120);
    player.cam_offset_x = 0;
    player.cam_target_x = 0;
    PP.camera.set_deadzone(s, 50, 200);

    player.can_climb = false;
    player.is_climbing = false;

    info = PP.assets.image.add(s, img_info, 0, 0, 0, 0);
    info.tile_geometry.scroll_factor_x = 0;
    info.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(info, 10000);
} 


function update(s) {
    manage_player_update(s, player);

    let vel_x = PP.physics.get_velocity_x(player);
    if (vel_x > 50) player.cam_target_x = -200;
    else if (vel_x < -50) player.cam_target_x = 200;
    else player.cam_target_x = 0;

    player.cam_offset_x += (player.cam_target_x - player.cam_offset_x) * 0.03;
    PP.camera.set_follow_offset(s, player.cam_offset_x, 120);
    background.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.3

    if (player.geometry.y > 1600) {
        console.log("Caduto nel vuoto! Respawn...");
        player.geometry.x = 0;
        player.geometry.y = 620;
        
        // Reset HP Globali
        player.hp = 4;
        PP.game_state.set_variable("player_hp", 4);
        
        PP.physics.set_velocity_x(player, 0);
        PP.physics.set_velocity_y(player, 0);
        if (typeof update_cuore_graphic === "function") update_cuore_graphic(player);
        respawn_hearts(s, player);
    }
}

function destroy(s) {
    console.log("Executing destroy() - SCENE LVL 3");
}

PP.scenes.add("lvl3", preload, create, update, destroy);

*/