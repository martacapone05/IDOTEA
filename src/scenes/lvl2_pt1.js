// VARIABILI IMMAGINI SFONDO
let img_background1; // sfondo5 (più lontano)
let img_background2; // sfondo6 (medio)
let img_background3; // sfondo7 (più vicino)

let img_player;
let img_info;

// VARIABILI OGGETTI SFONDO
let background1;
let background2;
let background3;

let info;
let player;
let floor;

// Variabile per la zona di ritorno
let funivia_ritorno_zone;

function preload(s) {

    preload_hud(s); 

    // CARICAMENTO SFONDI PARALLASSE
    img_background1 = PP.assets.image.load(s, "assets/images/sfondi/sfondo5.png");
    img_background2 = PP.assets.image.load(s, "assets/images/sfondi/sfondo6.png");
    img_background3 = PP.assets.image.load(s, "assets/images/sfondi/sfondo7.png");

    img_info = PP.assets.image.load(s, "assets/images/info.png");
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 185, 294);

    preload_platforms(s);
    preload_player(s);
}


function create(s) {

    // CREAZIONE SFONDI PARALLASSE (Z-INDEX NEGATIVO PER STARE DIETRO)
    background1 = PP.assets.tilesprite.add(s, img_background1, 0, 0, 1280, 800, 0, 0);
    background1.tile_geometry.scroll_factor_x = 0;
    background1.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(background1, -10);

    background2 = PP.assets.tilesprite.add(s, img_background2, 0, 0, 1280, 800, 0, 0);
    background2.tile_geometry.scroll_factor_x = 0;
    background2.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(background2, -9);

    background3 = PP.assets.tilesprite.add(s, img_background3, 0, 0, 1280, 800, 0, 0);
    background3.tile_geometry.scroll_factor_x = 0;
    background3.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(background3, -8);


    // PUNTO DI PARTENZA
    let start_x = -373;
    let start_y = 600;
    
    player = PP.assets.sprite.add(s, img_player, start_x, start_y, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC);

    // *** MODIFICA COLLISIONE PLAYER ***
    PP.physics.set_collision_rectangle(player, 138, 230, 20, 64);

    floor = PP.shapes.rectangle_add(s, -300, 620, 2000, 10, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, floor);


    configure_player_animations(s, player);
    create_platforms_lvl2_pt1(s, player); 

    create_hud(s, player); 

    create_collectible_fragment(s, 1200, 470, player);
    create_collectible_heart(s, 1700, 470, player);

    // ZONA FUNIVIA RITORNO (TRIGGER)
    funivia_ritorno_zone = PP.shapes.rectangle_add(s, -373, 464, 220, 253, "0x00FF00", 0.5);
    PP.physics.add(s, funivia_ritorno_zone, PP.physics.type.STATIC);
    
    // LOGICA DI RITORNO
    PP.physics.add_overlap_f(s, player, funivia_ritorno_zone, function(scene, p, zone) {
        
        if (PP.interactive.kb.is_key_down(scene, PP.key_codes.E)) {
            console.log("Ritorno con la funivia -> lvl1_pt2");
            PP.game_state.set_variable("punto_di_partenza", "funivia_ritorno");
            PP.scenes.start("lvl1_pt2");
        }
        
    });


    // CONFIGURAZIONE TELECAMERA
    PP.camera.start_follow(s, player, 0, -40);

    // *** LIMITI TELECAMERA ***
    if(s.cameras && s.cameras.main) {
        s.cameras.main.setBounds(-1300, -2550, 17621, 3500);
    }
    
    // *** BARRIERE INVISIBILI ***
    let barrier_left = PP.shapes.rectangle_add(s, -1350, -800, 100, 3500, "0x000000", 0);
    PP.physics.add(s, barrier_left, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_left);

    let barrier_right = PP.shapes.rectangle_add(s, 16371, -800, 100, 3500, "0x000000", 0);
    PP.physics.add(s, barrier_right, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_right);

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
    manage_player_update(s, player);

    // LOGICA CAMERA
    let vel_x = PP.physics.get_velocity_x(player);
    if (vel_x > 50) player.cam_target_x = -200;      
    else if (vel_x < -50) player.cam_target_x = 200; 
    else player.cam_target_x = 0;                    

    player.cam_offset_x += (player.cam_target_x - player.cam_offset_x) * 0.03;
    PP.camera.set_follow_offset(s, player.cam_offset_x, -40);
    
    // GESTIONE PARALLASSE
    let scroll_x = PP.camera.get_scroll_x(s);
    
    // Sfondo 5 (Lontano) - Si muove piano (0.1)
    background1.tile_geometry.x = scroll_x * 0.1;
    
    // Sfondo 6 (Medio) - Si muove un po' più veloce (0.2)
    background2.tile_geometry.x = scroll_x * 0.2;
    
    // Sfondo 7 (Vicino) - Si muove più veloce (0.5)
    background3.tile_geometry.x = scroll_x * 0.5;


    // Caduta nel vuoto -> Game Over
    if (player.geometry.y > 1600) {
        console.log("Caduto nel vuoto! Game Over...");
        PP.game_state.set_variable("last_scene", "lvl2_pt1");
        PP.scenes.start("game_over");

        player.geometry.x = 0;
        player.geometry.y = 520;
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

PP.scenes.add("lvl2_pt1", preload, create, update, destroy);