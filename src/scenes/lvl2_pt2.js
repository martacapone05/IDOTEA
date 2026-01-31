// VARIABILI IMMAGINI SFONDO
let img_background1; // sfondo8
let img_background2; // sfondo9

let img_player;
let img_info;

// VARIABILI OGGETTI SFONDO
let background1;
let background2;
let img_primo_pianolvl2_2;
let img_piattaforma_suprema2;
let img_sottolvl2_pt2;

// VARIABILE CASCATA
let img_waterfall5; 

let info;
let player;
let floor;

function preload(s) {
    preload_hud(s);

    // CARICAMENTO SFONDI PARALLASSE
    img_background1 = PP.assets.image.load(s, "assets/images/sfondi/sfondo8.png");
    img_background2 = PP.assets.image.load(s, "assets/images/sfondi/sfondo9.png");
    img_primo_pianolvl2_2 = PP.assets.image.load(s, "assets/images/primo_pianolvl2_2.png");
    img_sottolvl2_pt2 = PP.assets.image.load(s, "assets/images/sottolvl2_pt2.png");

    img_info = PP.assets.image.load(s, "assets/images/info.png");
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 185, 294);

    // CARICAMENTO CASCATA (10 frame, 214x218)
    img_waterfall5 = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/waterfall5sprites.png", 214, 218);

    preload_platforms(s);
    preload_player(s);
}

function create(s) {
    // SFONDI PARALLASSE
    background1 = PP.assets.tilesprite.add(s, img_background1, 0, 0, 1280, 800, 0, 0);
    background1.tile_geometry.scroll_factor_x = 0;
    background1.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(background1, -10);

    background2 = PP.assets.tilesprite.add(s, img_background2, 0, 0, 1280, 800, 0, 0);
    background2.tile_geometry.scroll_factor_x = 0;
    background2.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(background2, -9);

    let primo_pianolvl2_2 = PP.assets.image.add(s, img_primo_pianolvl2_2, -1000, 2000, 0, 1);
    let sottolvl2_pt2 = PP.assets.image.add(s, img_sottolvl2_pt2, -1000, 2000, 0, 1);

    PP.layers.set_z_index(primo_pianolvl2_2, 40);
    PP.layers.set_z_index(sottolvl2_pt2, -4);

    // Checkpoint: salva questo livello come punto di respawn
    PP.game_state.set_variable("last_scene", "lvl2_pt2");

    // ===============================================
    // *** GENERAZIONE CASCATE (CORRETTE) ***
    // ===============================================
    let waterfall_configs = [
        { x: 1032, start_y: -824, end_y: 2000 },
        { x: 1202, start_y: -824, end_y: 2000 },
        { x: 1372, start_y: -824, end_y: 2000 },
        { x: 1542, start_y: -824, end_y: 2000 },
        { x: 2102, start_y: -2061, end_y: -600 },
        { x: 2272, start_y: -2061, end_y: -600 },
        { x: 2442, start_y: -2061, end_y: -600 },
        { x: 2612, start_y: -2061, end_y: -600 }
    ];

    let step_y = 218 - 15;

    waterfall_configs.forEach((config, group_idx) => {
        let current_y = config.start_y;
        let count = 0;
        while (current_y < config.end_y) {
            let wf = PP.assets.sprite.add(s, img_waterfall5, config.x, current_y, 0, 1);
            let anim_name = "wf5_" + group_idx + "_" + count;
            PP.assets.sprite.animation_add(wf, anim_name, 0, 9, 10, -1);
            PP.assets.sprite.animation_play(wf, anim_name);
            PP.layers.set_z_index(wf, -3); 
            current_y += step_y;
            count++;
        }
    });

    // SPAWN
    let start_x = 0;
    let start_y = 550;

    let punto = PP.game_state.get_variable("punto_di_partenza");

    // Ritorno da lvl3 (backtracking)
    if (punto == "fine") {
        // --- MODIFICATO QUI: PIU' A SINISTRA ---
        start_x = 4250; // Era 4300, spostato leggermente più a sinistra
        start_y = -4390;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }
    // Arrivo da lvl2_pt1 (andando avanti)
    else if (punto == "avanti_da_pt1") {
        start_x = 0;
        start_y = 550;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }
    else if (punto == "resume_pause") {
        console.log("Riprendo dalla pausa...");
        start_x = PP.game_state.get_variable("pausa_x");
        start_y = PP.game_state.get_variable("pausa_y");
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }
    // Fallback per compatibilità
    else {
        start_x = 0;
        start_y = 550;
    }

    player = PP.assets.sprite.add(s, img_player, start_x, start_y, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 
    PP.physics.set_collision_rectangle(player, 138, 230, 20, 64);

    floor = PP.shapes.rectangle_add(s, 0, 620, 2000, 10, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, floor);

    configure_player_animations(s, player); 
    
    if(typeof create_platforms_lvl2_pt2 === "function") {
        create_platforms_lvl2_pt2(s, player);
    }

    create_hud(s, player);
    create_collectible_fragment(s, 479, -3540, player);

    PP.camera.start_follow(s, player, 0, -40);


    player.cam_offset_x = 0; 
    player.cam_target_x = 0;
    PP.camera.set_deadzone(s, 10, 50);

    player.can_climb = false; 
    player.is_climbing = false;

    info = PP.assets.image.add(s, img_info, 0, 0, 0, 0);
    info.tile_geometry.scroll_factor_x = 0;
    info.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(info, 10000);
}

function update(s) {
    // CAMERA BOUNDS
    PP.camera.set_bounds(s, -350, -6720, 5000, 8720);


    manage_player_update(s, player);    

    // --- LOGICA PASSAGGI DI LIVELLO ---
    
    // 1. VERSO LVL 3 (NUOVE COORDINATE)
    // --- MODIFICATO QUI: TRIGGER PIU' A DESTRA ---
    if (player.geometry.x >= 4650 && player.geometry.y <= -4300) { // Era 4500
        PP.game_state.set_variable("punto_di_partenza", "inizio");
        PP.scenes.start("lvl3");
    }

    // 2. VERSO LVL 1 PT 2 (INDIETRO)
    if (player.geometry.x <= -240) {
        PP.game_state.set_variable("punto_di_partenza", "fine");
        PP.scenes.start("lvl2_pt1");
    }

    // CAMERA INTERPOLATION X
    let vel_x = PP.physics.get_velocity_x(player);
    if (vel_x > 50) player.cam_target_x = -200;
    else if (vel_x < -50) player.cam_target_x = 200;
    else player.cam_target_x = 0;
    
    player.cam_offset_x += (player.cam_target_x - player.cam_offset_x) * 0.03;
    PP.camera.set_follow_offset(s, player.cam_offset_x, 100);

    let scroll_x = PP.camera.get_scroll_x(s);
    background2.tile_geometry.x = scroll_x * 0.1; 

    // Caduta nel vuoto
    if (player.geometry.y > 1600) {
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