let img_player;
let img_info;
let img_overlay; 

// Variabile per la luce
let img_light;

let overlay; 
let info;
let spruzzo_anim;
let img_muro_rompibile;
let npc_test;
let player;
let floor;
let traps = [];

function preload(s) {
    preload_hud(s);

    img_info = PP.assets.image.load(s, "assets/images/info.png");
    
    img_overlay = PP.assets.image.load(s, "assets/images/overlaysewer.png"); 
    
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 165, 263);
    spruzzo_anim = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/spritesheet_spruzzo.png", 349, 837);
    
    img_muro_rompibile = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_muro.png", 364, 354);

    // *** CARICAMENTO LUCE ***
    // File: light1sprites.png | 707x873 px
    img_light = PP.assets.sprite.load_spritesheet(s, "assets/images/light1sprites.png", 707, 873);

    preload_platforms(s);
    preload_player(s);
}

function create(s) {

    let start_x = 80;
    let start_y = 600;

    if (PP.game_state.get_variable("punto_di_partenza") == "fine") {
        start_x = 11250;
        start_y = -1210;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    } else {
        PP.game_state.set_variable("player_hp", 4);
        PP.game_state.set_variable("player_fragments", 0);
    }

    // *** CREAZIONE LUCI INTERMITTENTI ***
    let light_coords = [
        {x: 916, y: 404},
        {x: 6167, y: -765},
        {x: 9786, y: -1140}
    ];

    light_coords.forEach(pos => {
        // Pivot 0, 1 come richiesto
        let light = PP.assets.sprite.add(s, img_light, pos.x, pos.y, 0, 1);
        PP.layers.set_z_index(light, 3);

        // Definizione animazione:
        // 15 frame (da 0 a 14)
        // 8 fps
        // 0 ripetizioni (la fa una volta sola e si ferma)
        PP.assets.sprite.animation_add(light, "flash", 0, 14, 8, 0);

        // Timer che scatta ogni 3s e fa partire l'animazione
        PP.timers.add_timer(s, 3000, function() {
            PP.assets.sprite.animation_play(light, "flash");
        }, true); // true = ripeti il timer all'infinito
    });


    player = PP.assets.sprite.add(s, img_player, start_x, start_y, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 
    
    // *** MODIFICA COLLISIONE PLAYER ***
    PP.physics.set_collision_rectangle(player, 123, 198, 18, 65);

    floor = PP.shapes.rectangle_add(s, 640, 620, 4000, 10, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, floor);

    configure_player_animations(s, player); 
    
    if (start_x === 80) {
        PP.timers.add_timer(s, 100, function() {
            player.auto_move_target = 450;
        }, false);
    }

    create_platforms_lvl1_pt1(s, player);

    // MURO ROMPIBILE
    let x_muro = 7964;
    let y_muro = 25;

    let muro = PP.assets.sprite.add(s, img_muro_rompibile, x_muro, y_muro, 0.5, 1);
    muro.is_broken = false;
    PP.layers.set_z_index(muro, 30); 

    PP.assets.sprite.animation_add(muro, "break", 0, 22, 10, 0);
    PP.assets.sprite.animation_add(muro, "idle", 0, 0, 1, 0);
    PP.assets.sprite.animation_play(muro, "idle");

    PP.physics.add(s, muro, PP.physics.type.STATIC);
    PP.physics.set_collision_rectangle(muro, 137, 271, 92, 78);
    PP.physics.add_collider(s, player, muro);

    let sensore = PP.shapes.rectangle_add(s, x_muro - 30, y_muro - 180, 200, 354, "0x00FF00", 0);
    sensore.visibility.alpha = 0; 
    sensore.muro_collegato = muro;
    PP.physics.add(s, sensore, PP.physics.type.STATIC);

    let on_sensore_overlap = function(s, p, obj_sensore) {
        p.near_breakable_wall = true;
        p.current_wall = obj_sensore.muro_collegato; 
    };
    PP.physics.add_overlap_f(s, player, sensore, on_sensore_overlap);

    create_hud(s, player);
    create_collectible_fragment(s, 1200, 470, player);
    create_collectible_heart(s, 1700, 470, player);

    // Trappole
    traps = [];
    let t1 = create_spruzzo_trap(s, 4850, 220, 500, spruzzo_anim, player);
    traps.push(t1);
    if(t1) PP.layers.set_z_index(t1, 30);

    // Camera
    PP.camera.start_follow(s, player, 0, 100);
    
    // Bounds: 0 a 12000. Altezza totale 3500 partendo da -2100. Centro Y = -350.
    if(s.cameras && s.cameras.main) {
        s.cameras.main.setBounds(0, -2100, 12000, 3500);
    }

    // *** BARRIERE INVISIBILI (Corrette per pivot centrale) ***
    // Barriera Sinistra (Bordo a 0, larghezza 100 -> Centro a -50)
    let barrier_left = PP.shapes.rectangle_add(s, -50, -350, 100, 3500, "0x000000", 0);
    PP.physics.add(s, barrier_left, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_left);

    // Barriera Destra (Bordo a 12000, larghezza 100 -> Centro a 12050)
    let barrier_right = PP.shapes.rectangle_add(s, 12050, -350, 100, 3500, "0x000000", 0);
    PP.physics.add(s, barrier_right, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_right);


    player.cam_offset_x = 0; 
    player.cam_target_x = 0;
    player.cam_offset_y = 100;
    player.cam_target_y = 100;

    PP.camera.set_deadzone(s, 10, 50);

    // OVERLAY SETUP
    overlay = PP.assets.image.add(s, img_overlay, 0, 0, 0.5, 0.5);
    overlay.visibility.alpha = 1; 
    PP.layers.set_z_index(overlay, 9000); 

    info = PP.assets.image.add(s, img_info, 0, 0, 0, 0);
    info.tile_geometry.scroll_factor_x = 0;
    info.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(info, 10000);

    reset_npcs();
    npc_test = create_npc(s, 400, 620, "Vecchio Saggio", PLACEHOLDER_DIALOGUE);
}

function update(s) {
    
    manage_npc_interaction(s, player);
    
    manage_player_update(s, player);

    // OVERLAY SEGUE IL PLAYER
    if(overlay && player) {
        overlay.geometry.x = player.geometry.x;
        overlay.geometry.y = player.geometry.y-100;
    }

    // Camera X
    let vel_x = PP.physics.get_velocity_x(player);
    if (vel_x > 50) player.cam_target_x = -200;
    else if (vel_x < -50) player.cam_target_x = 200;
    else player.cam_target_x = 0;
    
    player.cam_offset_x += (player.cam_target_x - player.cam_offset_x) * 0.03;

    // Camera Y Logic
    if (player.geometry.x < 2000) {
        player.cam_target_y = 120; // Intro
    } else if (player.geometry.x > 3600 && player.geometry.x < 5050) {
        player.cam_target_y = 50;  // Zona Trappola
    } else if (player.geometry.x > 6800 && player.geometry.x < 8800) {
        player.cam_target_y = 120; // Nuova Zona Bassa
    } else {
        player.cam_target_y = -40; // Standard
    }

    player.cam_offset_y += (player.cam_target_y - player.cam_offset_y) * 0.02;
    PP.camera.set_follow_offset(s, player.cam_offset_x, player.cam_offset_y);


    // Caduta nel vuoto -> Game Over
    if (player.geometry.y > 1600) {
        console.log("Caduto nel vuoto! Game Over...");
        PP.game_state.set_variable("last_scene", "lvl1_pt1");
        PP.scenes.start("game_over");

        player.geometry.x = 80;
        player.geometry.y = 500;
        player.hp = 4;
        PP.game_state.set_variable("player_hp", 4); 
        PP.physics.set_velocity_x(player, 0);
        PP.physics.set_velocity_y(player, 0);
        PP.timers.add_timer(s, 100, function() {
            player.auto_move_target = 450;
        }, false);
        if (typeof update_cuore_graphic === "function") update_cuore_graphic(player);
        respawn_hearts(s, player);
    }

    if (player.geometry.y < -2100) {
        PP.scenes.start("lvl1_pt2");
    }
}

function destroy(s) {
}

PP.scenes.add("lvl1_pt1", preload, create, update, destroy);