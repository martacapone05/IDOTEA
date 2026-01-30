// VARIABILI IMMAGINI SFONDO
let img_background1; // sfondo8
let img_background2; // sfondo9

let img_player;
let img_info;

// VARIABILI OGGETTI SFONDO
let background1;
let background2;

let info;
let player;
let floor;

function preload(s) {

    preload_hud(s);

    // CARICAMENTO SFONDI PARALLASSE
    img_background1 = PP.assets.image.load(s, "assets/images/sfondi/sfondo8.png");
    img_background2 = PP.assets.image.load(s, "assets/images/sfondi/sfondo9.png");

    img_info = PP.assets.image.load(s, "assets/images/info.png");
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 185, 294);

    preload_platforms(s);
    preload_player(s);
}

function create(s) {

    // CREAZIONE SFONDI PARALLASSE (Z-INDEX NEGATIVO)
    // Sfondo più lontano (sfondo8)
    background1 = PP.assets.tilesprite.add(s, img_background1, 0, 0, 1280, 800, 0, 0);
    background1.tile_geometry.scroll_factor_x = 0;
    background1.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(background1, -10);

    // Sfondo più vicino (sfondo9)
    background2 = PP.assets.tilesprite.add(s, img_background2, 0, 0, 1280, 800, 0, 0);
    background2.tile_geometry.scroll_factor_x = 0;
    background2.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(background2, -9);


    // SPAWN
    let start_x = 0;
    let start_y = 550;

    // Se arrivi dalla fine (es. livello successivo), cambi coordinate
    if (PP.game_state.get_variable("punto_di_partenza") == "fine") {
        start_x = 0; 
        start_y = 550;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    } else {
        // Reset Stats se inizio livello
        PP.game_state.set_variable("player_hp", 4);
        PP.game_state.set_variable("player_fragments", 0);
    }

    player = PP.assets.sprite.add(s, img_player, start_x, start_y, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 

    // *** MODIFICA COLLISIONE PLAYER ***
    PP.physics.set_collision_rectangle(player, 138, 230, 20, 64);

    // Pavimento base
    floor = PP.shapes.rectangle_add(s, 0, 620, 2000, 10, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, floor);

    configure_player_animations(s, player); 
    
    // Attenzione: Assicurati che questa funzione esista in platforms.js, 
    // altrimenti commentala per avere il livello vuoto.
    if(typeof create_platforms_lvl2_pt2 === "function") {
        create_platforms_lvl2_pt2(s, player);
    }

    create_hud(s, player);
    create_collectible_fragment(s, 1200, 470, player);
    create_collectible_heart(s, 1700, 470, player);

    // CAMERA SETUP
    PP.camera.start_follow(s, player, 0, -40);

    // if(s.cameras && s.cameras.main) {
//         s.cameras.main.setBounds(-1000, -6720, 4800, 2000);
   // }

    player.cam_offset_x = 0; 
    player.cam_target_x = 0;
    
    // Deadzone Standard
    PP.camera.set_deadzone(s, 10, 50);

    player.can_climb = false; 
    player.is_climbing = false;

    info = PP.assets.image.add(s, img_info, 0, 0, 0, 0);
    info.tile_geometry.scroll_factor_x = 0;
    info.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(info, 10000);
}

function update(s) {
    
    manage_player_update(s, player);    

    // CAMERA INTERPOLATION X
    let vel_x = PP.physics.get_velocity_x(player);
    if (vel_x > 50) player.cam_target_x = -200;
    else if (vel_x < -50) player.cam_target_x = 200;
    else player.cam_target_x = 0;
    
    player.cam_offset_x += (player.cam_target_x - player.cam_offset_x) * 0.03;

    // CAMERA INTERPOLATION Y
    PP.camera.set_follow_offset(s, player.cam_offset_x, 120);

    // GESTIONE PARALLASSE
    let scroll_x = PP.camera.get_scroll_x(s);
    background2.tile_geometry.x = scroll_x * 0.1; // Più veloce (vicino)

    // Caduta nel vuoto -> Game Over
    if (player.geometry.y > 1600) {
        console.log("Caduto nel vuoto! Game Over...");
        PP.game_state.set_variable("last_scene", "lvl2_pt2");

        
        player.geometry.x = 0;
        player.geometry.y = 550;
        
        player.hp = 4;
        PP.game_state.set_variable("player_hp", 4); 
        
        PP.physics.set_velocity_x(player, 0);
        PP.physics.set_velocity_y(player, 0);

        if (typeof update_cuore_graphic === "function") update_cuore_graphic(player);
        respawn_hearts(s, player);
    }
}

function destroy(s) {
}

PP.scenes.add("lvl2_pt2", preload, create, update, destroy);