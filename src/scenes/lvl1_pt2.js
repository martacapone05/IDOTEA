let img_background1;
let img_background2;
let img_background3;
let img_background4;
let img_player;
let img_info;

// Variabili per oggetti animati
let img_waterfall;
let img_waterfall2; 
let waterfall_segments = []; 
let img_insegna_vertical;
let img_condizionatore; 
let img_vending_machine;
let img_cat;
let img_sgabelli;

let background1;
let background2;
let background3;
let background4
let info;

let player;
let floor;

// Variabile per la zona funivia
let funivia_zone; 

function preload(s) {

    preload_hud(s);

    img_background1 = PP.assets.image.load(s, "assets/images/sfondi/sfondo1.png");
    img_background2 = PP.assets.image.load(s, "assets/images/sfondi/sfondo2.png");
    img_background3 = PP.assets.image.load(s, "assets/images/sfondi/sfondo3.png");
    img_background4 = PP.assets.image.load(s, "assets/images/sfondi/sfondo4.png");

    img_info = PP.assets.image.load(s, "assets/images/info.png");
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 185, 294);

    img_waterfall = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/waterfall1sprites.png", 119, 211);
    img_waterfall2 = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/waterfall2sprites.png", 126, 210);

    img_insegna_vertical = PP.assets.sprite.load_spritesheet(s, "assets/images/insegna_vertical.png", 173, 225);
    img_condizionatore = PP.assets.sprite.load_spritesheet(s, "assets/images/condizionatore1.png", 132, 102);
    img_vending_machine = PP.assets.sprite.load_spritesheet(s, "assets/images/vending_machine.png", 180, 365);
    img_cat = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_cat.png", 150, 150);
    img_sgabelli = PP.assets.image.load(s, "assets/images/sgabelli.png");

    preload_platforms(s);
    preload_player(s);
}


function create(s) {

    // PARALLAX
    background1 = PP.assets.tilesprite.add(s, img_background1, 0, 0, 1280, 800, 0, 0);
    background1.tile_geometry.scroll_factor_x = 0;
    background1.tile_geometry.scroll_factor_y = 0;

    background2 = PP.assets.tilesprite.add(s, img_background2, 0, 0, 1280, 800, 0, 0);
    background2.tile_geometry.scroll_factor_x = 0;
    background2.tile_geometry.scroll_factor_y = 0;

    background3 = PP.assets.tilesprite.add(s, img_background3, 0, 0, 1280, 800, 0, 0);
    background3.tile_geometry.scroll_factor_x = 0;
    background3.tile_geometry.scroll_factor_y = 0;

    background4 = PP.assets.tilesprite.add(s, img_background4, 0, 0, 1280, 800, 0, 0);
    background4.tile_geometry.scroll_factor_x = 0;
    background4.tile_geometry.scroll_factor_y = 0;

    // *** CASCATA ORIGINALE (VISIVA) ***
    let wf_x = 3984;
    let wf_y_start = -2844; 
    let wf_y_end = -1711;
    
    let segment_height = 211; 
    let overlap = 14;         
    let step = segment_height - overlap; 

    waterfall_segments = []; 
    let anim_counter = 0;

    for (let current_y = wf_y_start; current_y < wf_y_end; current_y += step) {
        let seg = PP.assets.sprite.add(s, img_waterfall, wf_x, current_y, 0, 0);
        let anim_key = "flow_" + anim_counter;
        PP.assets.sprite.animation_add(seg, anim_key, 0, 7, 10, -1);
        PP.assets.sprite.animation_play(seg, anim_key);
        PP.layers.set_z_index(seg, 30); 
        waterfall_segments.push(seg);
        anim_counter++;
    }

    // *** CASCATE AGGIUNTIVE TIPO 1 ***
    let extra_wf_starts = [
        {x: 2465, y: 853},
        {x: 3149, y: 853}
    ];

    let wf_limit_y = 1800; 
    let extra_anim_counter = 0;

    extra_wf_starts.forEach(start => {
        for (let curr_y = start.y; curr_y < wf_limit_y; curr_y += step) {
            let seg = PP.assets.sprite.add(s, img_waterfall, start.x, curr_y, 0, 1);
            let anim_name = "flow_ext_" + extra_anim_counter;
            PP.assets.sprite.animation_add(seg, anim_name, 0, 7, 10, -1);
            PP.assets.sprite.animation_play(seg, anim_name);
            PP.layers.set_z_index(seg, 30); 
            waterfall_segments.push(seg); 
            extra_anim_counter++;
        }
    });

    // *** NUOVE CASCATE TIPO 2 ***
    let wf2_starts = [
        {x: 5183, y: 193},
        {x: 6387, y: -3414}
    ];

    let wf2_limit_y = 1600; 
    let wf2_height = 210; 
    let wf2_step = wf2_height - 15; 
    let wf2_anim_counter = 0;

    wf2_starts.forEach(start => {
        for (let curr_y = start.y; curr_y < wf2_limit_y; curr_y += wf2_step) {
            let seg = PP.assets.sprite.add(s, img_waterfall2, start.x, curr_y, 0, 1);
            let anim_name = "flow2_" + wf2_anim_counter;
            PP.assets.sprite.animation_add(seg, anim_name, 0, 7, 10, -1);
            PP.assets.sprite.animation_play(seg, anim_name);
            PP.layers.set_z_index(seg, 30); 
            waterfall_segments.push(seg);
            wf2_anim_counter++;
        }
    });
 
    // INSEGNA
    let insegna = PP.assets.sprite.add(s, img_insegna_vertical, 3665, -2112, 0, 1);
    PP.assets.sprite.animation_add(insegna, "play_insegna", 0, 9, 10, -1);
    PP.assets.sprite.animation_play(insegna, "play_insegna");
    PP.layers.set_z_index(insegna, 20);

    // CONDIZIONATORI
    let posizioni_condizionatori = [
        {x: -12, y: 277},
        {x: 2858, y: -352},
        {x: 4994, y: -2622},
        {x: 5235, y: -1619},
        {x: -379, y: -2711},
        {x: 4742, y: -3601}
    ];

    let cond_anim_counter = 0;
    posizioni_condizionatori.forEach(pos => {
        let cond = PP.assets.sprite.add(s, img_condizionatore, pos.x, pos.y, 0, 1);
        let anim_name = "spin_" + cond_anim_counter;
        PP.assets.sprite.animation_add(cond, anim_name, 0, 3, 10, -1);
        PP.assets.sprite.animation_play(cond, anim_name);
        PP.layers.set_z_index(cond, 20);
        cond_anim_counter++;
    });

    // VENDING MACHINE
    let vm = PP.assets.sprite.add(s, img_vending_machine, 5117, -1984, 0, 1);
    PP.assets.sprite.animation_add(vm, "blink_vm", 0, 4, 10, -1);
    PP.assets.sprite.animation_play(vm, "blink_vm");
    PP.layers.set_z_index(vm, 20);

    let cat = PP.assets.sprite.add(s, img_cat, 4209, -2103, 0, 1);
    PP.assets.sprite.animation_add(cat, "idle_cat", 0, 5, 10, -1);
    PP.assets.sprite.animation_play(cat, "idle_cat");

    let sgabelli = PP.assets.image.add(s, img_sgabelli, 4203, -2045, 0, 1);
    PP.layers.set_z_index(cat, 20);
    PP.layers.set_z_index(sgabelli, 21);


    // *** GESTIONE PUNTO DI PARTENZA ***
    let start_x = 4300;
    let start_y = -2000;

    if (PP.game_state.get_variable("punto_di_partenza") == "funivia_ritorno") {
        console.log("Spawn alla stazione della funivia (Ritorno)!");
        start_x = 7099; 
        start_y = -4000;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }

    // ===============================================
    // *** CREAZIONE PLAYER ***
    // ===============================================
    player = PP.assets.sprite.add(s, img_player, start_x, start_y, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC);
    PP.physics.set_collision_rectangle(player, 138, 230, 20, 64);

    // PAVIMENTO
    floor = PP.shapes.rectangle_add(s, -300, 640, 1400, 10, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, floor);

    configure_player_animations(s, player);
    create_platforms_lvl1_pt2(s, player);

    // ==========================================================
    // *** COLLIDER DANNO CASCATA ***
    // ==========================================================
    let wf_height_total = Math.abs(wf_y_end - wf_y_start) + 200; 
    let wf_center_y = wf_y_start + (wf_height_total / 2);
    let wf_center_x = wf_x + (119 / 2); 

    // Rettangolo invisibile per il danno
    let wf_damage_zone = PP.shapes.rectangle_add(s, wf_center_x, wf_center_y, 90, wf_height_total, "0xFF0000", 0);
    PP.physics.add(s, wf_damage_zone, PP.physics.type.STATIC);

    PP.physics.add_overlap_f(s, player, wf_damage_zone, function(scene, p, zone) {
        if (!p.invulnerable) {
            // Spinta via (Knockback)
            let knock_dir = (p.geometry.x < zone.geometry.x) ? -1 : 1;
            PP.physics.set_velocity_x(p, -800 * knock_dir);
            
            // Chiama la funzione di danno
            hit_player(s, p);
        }
    });
    // ==========================================================

    // HUD
    create_hud(s, player);

    // COLLEZIONABILI
    create_collectible_fragment(s, 5750, -120, player);
    create_collectible_heart(s, 5450, -2100, player);

    // ZONA FUNIVIA
    funivia_zone = PP.shapes.rectangle_add(s, 7099, -4180, 220, 253, "0x00FF00", 0.5);
    PP.physics.add(s, funivia_zone, PP.physics.type.STATIC);
    
    PP.physics.add_overlap_f(s, player, funivia_zone, function(scene, p, zone) {
        if (PP.interactive.kb.is_key_down(scene, PP.key_codes.T)) {
            console.log("Andata con funivia -> lvl2_pt1");
            PP.scenes.start("lvl2_pt1");
        }
    });

    // CAMERA
    PP.camera.start_follow(s, player, 0, -40);

    if(s.cameras && s.cameras.main) {
        s.cameras.main.setBounds(-1232, -5125, 10000, 6500);
    }

    let barrier_left = PP.shapes.rectangle_add(s, -1282, -1875, 100, 6500, "0x000000", 0);
    PP.physics.add(s, barrier_left, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_left);

    let barrier_right = PP.shapes.rectangle_add(s, 8818, -1875, 100, 6500, "0x000000", 0);
    PP.physics.add(s, barrier_right, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_right);

    player.cam_offset_x = 0;
    player.cam_target_x = 0;
    player.cam_offset_y = -40; 
    player.cam_target_y = -40;

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

    let vel_x = PP.physics.get_velocity_x(player);
    if (vel_x > 50) player.cam_target_x = -200;
    else if (vel_x < -50) player.cam_target_x = 200;
    else player.cam_target_x = 0;

    player.cam_offset_x += (player.cam_target_x - player.cam_offset_x) * 0.03;

    // LOGICA CAMERA Y
    if (player.geometry.x > 2770 && player.geometry.x < 5690 &&
        player.geometry.y < -1900 && player.geometry.y > -2490) {
        player.cam_target_y = 200;
    } else {
        player.cam_target_y = -40; 
    }

    player.cam_offset_y += (player.cam_target_y - player.cam_offset_y) * 0.02;
    PP.camera.set_follow_offset(s, player.cam_offset_x, player.cam_offset_y);

    background1.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.1
    background2.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.15
    background3.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.2
    background4.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.25

    if (player.geometry.y > 1600) {
        console.log("Caduto nel vuoto! Game Over...");
        PP.game_state.set_variable("last_scene", "lvl1_pt2");
        PP.scenes.start("game_over");
        
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

// ==========================================================
// *** FUNZIONE GESTIONE DANNO (HIT PLAYER) ***
// ==========================================================
function hit_player(s, player) {
    if (player.invulnerable) return;

    // Prendi le vite dal Game State Globale
    let hp = PP.game_state.get_variable("player_hp");
    hp = hp - 1;
    PP.game_state.set_variable("player_hp", hp);
    player.hp = hp; // Aggiorna anche variabile locale per sicurezza

    console.log("Ahi! Vite rimaste: " + hp);
    
    // Aggiorna la grafica dei cuori
    if(typeof update_cuore_graphic === "function") update_cuore_graphic(player);

    if (hp <= 0) {
        console.log("SEI MORTO!");
        PP.game_state.set_variable("last_scene", "lvl1_pt2");
        PP.scenes.start("game_over");  
    } else {
        PP.physics.set_velocity_y(player, -400); // Saltino di dolore
        player.invulnerable = true;

        // Effetto lampeggiante
        function do_blink() {
            if (player.invulnerable === false) {
                player.visibility.alpha = 1;
                return; 
            }
            if (player.visibility.alpha > 0.5) {
                player.visibility.alpha = 0.2;
            } else {
                player.visibility.alpha = 1;
            }
            PP.timers.add_timer(s, 250, do_blink, false);
        }
        do_blink();

        // Rimuovi invulnerabilità dopo 2 secondi
        PP.timers.add_timer(s, 2000, function() {
            player.invulnerable = false;
            player.visibility.alpha = 1;
        }, false);
    }
}

function destroy(s) {
}

PP.scenes.add("lvl1_pt2", preload, create, update, destroy);