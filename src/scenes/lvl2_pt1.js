let img_background;
let img_player;
let img_info;

let background;
let info;
let player;
let floor;

// Variabile per la zona di ritorno
let funivia_ritorno_zone;

function preload(s) {

    preload_hud(s); 

    img_background = PP.assets.image.load(s, "assets/images/sfondi/sfondo.png");
    img_info = PP.assets.image.load(s, "assets/images/info.png");
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 165, 263);

    preload_platforms(s);
    preload_player(s);
}


function create(s) {

    background = PP.assets.tilesprite.add(s, img_background, 0, 0, 1280, 800, 0, 0);
    background.tile_geometry.scroll_factor_x = 0;
    background.tile_geometry.scroll_factor_y = 0;

    // PUNTO DI PARTENZA
    let start_x = -373;
    let start_y = 600;
    
    // Se volessi gestire anche qui l'arrivo dalla funivia in futuro, potresti farlo qui.

    player = PP.assets.sprite.add(s, img_player, start_x, start_y, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC);

    // *** MODIFICA COLLISIONE PLAYER ***
    PP.physics.set_collision_rectangle(player, 123, 198, 18, 65);

    floor = PP.shapes.rectangle_add(s, -300, 620, 2000, 10, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, floor);


    configure_player_animations(s, player);
    create_platforms_lvl2_pt1(s, player); 

    create_hud(s, player); 

    create_collectible_fragment(s, 1200, 470, player);
    create_collectible_heart(s, 1700, 470, player);

    // ZONA FUNIVIA RITORNO (TRIGGER)
    // Rettangolo verde per tornare indietro
    funivia_ritorno_zone = PP.shapes.rectangle_add(s, -373, 464, 220, 253, "0x00FF00", 0.5);
    PP.physics.add(s, funivia_ritorno_zone, PP.physics.type.STATIC);
    
    // LOGICA DI RITORNO
    PP.physics.add_overlap_f(s, player, funivia_ritorno_zone, function(scene, p, zone) {
        
        if (PP.interactive.kb.is_key_down(scene, PP.key_codes.T)) {
            console.log("Ritorno con la funivia -> lvl1_pt2");
            
            // *** IMPORTANTE: Diciamo al gioco che stiamo tornando indietro ***
            PP.game_state.set_variable("punto_di_partenza", "funivia_ritorno");
            
            PP.scenes.start("lvl1_pt2");
        }
        
    });


    // CONFIGURAZIONE TELECAMERA
    PP.camera.start_follow(s, player, 0, -40);

    // *** LIMITI TELECAMERA ***
    // x=-1300, width=17621 (quindi destra = 16321)
    if(s.cameras && s.cameras.main) {
        s.cameras.main.setBounds(-1300, -2550, 17621, 3500);
    }
    
    // *** BARRIERE INVISIBILI (Corrette per pivot centrale) ***
    // Altezza totale 3500 partendo da -2550. Centro Y = -800.
    // Sinistra (Bordo a -1300, larghezza 100 -> Centro a -1350)
    let barrier_left = PP.shapes.rectangle_add(s, -1350, -800, 100, 3500, "0x000000", 0);
    PP.physics.add(s, barrier_left, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_left);

    // Destra (Bordo a 16321, larghezza 100 -> Centro a 16371)
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
    
    background.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.3;

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