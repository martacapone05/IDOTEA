let img_player;
let img_info;
let img_overlay; 
let img_light;
let img_topo; 

let overlay; 
let info;
let spruzzo_anim;
let img_muro_rompibile;
let player;
let floor;
let traps = [];

// Lista NPC e variabili dialogo
let npc_list = [];
let dialogue_active = false;
let current_dialogue_index = 0;
let current_npc = null;
let dialogue_popup = null;
let dialogue_text = null;
let dialogue_hint = null;
let dialogue_speaker = null;
let e_key_was_pressed = false;

// Configurazione NPC
const NPC_INTERACTION_RANGE = 200; // Distanza per parlare
const NPC_DIALOGUE_COLOR = "0x1a1a2e"; // Colore sfondo popup

function preload(s) {
    preload_hud(s);

    img_info = PP.assets.image.load(s, "assets/images/info.png");
    img_overlay = PP.assets.image.load(s, "assets/images/overlaysewer.png"); 
    
    // PLAYER
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 185, 294);
    
    // TRAPPOLE E OGGETTI
    spruzzo_anim = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/spritesheet_spruzzo.png", 349, 837);
    img_muro_rompibile = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_muro.png", 364, 354);
    img_light = PP.assets.sprite.load_spritesheet(s, "assets/images/light1sprites.png", 707, 873);

    // NPC TOPO
    img_topo = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_topo.png", 209, 214);

    preload_platforms(s);
    preload_player(s);
}

function create(s) {

    reset_npcs(); // Pulisce vecchi NPC se ricarichi la scena

    let start_x = 80;
    let start_y = 500;

    if (PP.game_state.get_variable("punto_di_partenza") == "fine") {
        start_x = 11250;
        start_y = -1210;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    } else {
        PP.game_state.set_variable("player_hp", 4);
        PP.game_state.set_variable("player_fragments", 0);
    }

    // LUCI
    let light_coords = [{x: 916, y: 404}, {x: 6167, y: -765}, {x: 9786, y: -1140}];
    light_coords.forEach(pos => {
        let light = PP.assets.sprite.add(s, img_light, pos.x, pos.y, 0, 1);
        PP.layers.set_z_index(light, 3);
        PP.assets.sprite.animation_add(light, "flash", 0, 14, 8, 0);
        PP.timers.add_timer(s, 3000, function() {
            PP.assets.sprite.animation_play(light, "flash");
        }, true); 
    });

    // PLAYER
    player = PP.assets.sprite.add(s, img_player, start_x, start_y, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 
    PP.physics.set_collision_rectangle(player, 138, 230, 20, 64);

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

    // ============================================================
    // *** NPC TOPO (Con Dialogo) ***
    // ============================================================
    let topo = PP.assets.sprite.add(s, img_topo, 8259, 27, 0, 1);
    
    PP.layers.set_z_index(topo, 29); 
    PP.assets.sprite.animation_add(topo, "idle_topo", 0, 4, 8, -1);
    PP.assets.sprite.animation_play(topo, "idle_topo");
    PP.physics.add(s, topo, PP.physics.type.STATIC);

    // DIALOGO LOREM IPSUM
    let dialoghi_topo = [
        { speaker: "npc", text: "Lorem ipsum dolor sit amet." },
        { speaker: "player", text: "Consectetur adipiscing elit?" },
        { speaker: "npc", text: "Sed do eiusmod tempor incididunt ut labore!" }
    ];

    // REGISTRAZIONE NEL SISTEMA DIALOGHI
    register_npc(topo, "Topo di Fognatura", dialoghi_topo);
    // ============================================================


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
    if(s.cameras && s.cameras.main) s.cameras.main.setBounds(0, -2100, 12000, 3500);

    let barrier_left = PP.shapes.rectangle_add(s, -50, -350, 100, 3500, "0x000000", 0);
    PP.physics.add(s, barrier_left, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_left);

    let barrier_right = PP.shapes.rectangle_add(s, 12050, -350, 100, 3500, "0x000000", 0);
    PP.physics.add(s, barrier_right, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_right);

    player.cam_offset_x = 0; 
    player.cam_target_x = 0;
    player.cam_offset_y = 100;
    player.cam_target_y = 100;
    PP.camera.set_deadzone(s, 10, 50);

    // Overlay
    overlay = PP.assets.image.add(s, img_overlay, 0, 0, 0.5, 0.5);
    overlay.visibility.alpha = 1; 
    PP.layers.set_z_index(overlay, 9000); 

    info = PP.assets.image.add(s, img_info, 0, 0, 0, 0);
    info.tile_geometry.scroll_factor_x = 0;
    info.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(info, 10000);
}

function update(s) {
    manage_npc_interaction(s, player); // Gestione input dialogo
    manage_player_update(s, player);

    if(overlay && player) {
        overlay.geometry.x = player.geometry.x;
        overlay.geometry.y = player.geometry.y-100;
    }

    let vel_x = PP.physics.get_velocity_x(player);
    if (vel_x > 50) player.cam_target_x = -200;
    else if (vel_x < -50) player.cam_target_x = 200;
    else player.cam_target_x = 0;
    
    player.cam_offset_x += (player.cam_target_x - player.cam_offset_x) * 0.03;

    // LOGICA CAMERA Y
    if (player.geometry.x > 7480 && player.geometry.x < 7890 &&
        player.geometry.y > -2100 && player.geometry.y < -1500) {
        player.cam_target_y = -100;
    } 
    else if (player.geometry.x < 2000) {
        player.cam_target_y = 120; 
    } 
    else if (player.geometry.x > 3200 && player.geometry.x < 5050) {
        player.cam_target_y = 120;
    } 
    else if (player.geometry.x > 6800 && player.geometry.x < 8800) {
        player.cam_target_y = 120;
    }
    else if (player.geometry.x > 9270 && player.geometry.x < 12000) {
        player.cam_target_y = 120;
    }
    else {
        player.cam_target_y = -40; 
    }

    player.cam_offset_y += (player.cam_target_y - player.cam_offset_y) * 0.02;
    PP.camera.set_follow_offset(s, player.cam_offset_x, player.cam_offset_y);

    if (player.geometry.y > 1600) {
        PP.game_state.set_variable("last_scene", "lvl1_pt1");
        PP.scenes.start("game_over");
        player.geometry.x = 80;
        player.geometry.y = 400;
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

// ==========================================================
// *** SISTEMA DIALOGHI E NPC ***
// ==========================================================

function register_npc(sprite_obj, name, dialogues) {
    // Aggiungiamo le proprietà necessarie direttamente all'oggetto sprite
    sprite_obj.npc_name = name;
    sprite_obj.dialogues = dialogues;
    sprite_obj.interaction_range = NPC_INTERACTION_RANGE;
    
    npc_list.push(sprite_obj);
}

function reset_npcs() {
    npc_list = [];
    close_dialogue_popup();
    e_key_was_pressed = false;
}

function is_player_near_npc(player, npc) {
    let dist = Math.abs(player.geometry.x - npc.geometry.x);
    let height_diff = Math.abs(player.geometry.y - npc.geometry.y);
    return dist < npc.interaction_range && height_diff < 200;
}

function get_nearest_interactable_npc(player) {
    for (let i = 0; i < npc_list.length; i++) {
        let npc = npc_list[i];
        if (is_player_near_npc(player, npc)) {
            return npc;
        }
    }
    return null;
}

function open_dialogue_popup(s, npc) {
    if (dialogue_active) return;
    dialogue_active = true;
    current_npc = npc;
    current_dialogue_index = 0;
    
    let popup_width = 800;           
    let popup_height = 150;           
    let screen_center_x = 640;
    let popup_y = 100;
    
    // Popup Sfondo
    dialogue_popup = PP.shapes.rectangle_add(s, 0, 0, popup_width, popup_height, NPC_DIALOGUE_COLOR, 0.95);
    dialogue_popup.tile_geometry.scroll_factor_x = 0;
    dialogue_popup.tile_geometry.scroll_factor_y = 0;
    dialogue_popup.geometry.x = screen_center_x;
    dialogue_popup.geometry.y = popup_y;
    PP.shapes.set_stroke(dialogue_popup, 3, "0x4a4a6a", 1);
    PP.layers.set_z_index(dialogue_popup, 10001);
    
    let text_x = screen_center_x - popup_width/2 + 20; 
    let text_y = popup_y - popup_height/2 + 20;

    // Nome Speaker
    dialogue_speaker = PP.shapes.text_styled_add(s, text_x, text_y, "", 20, "Arial", "bold", "0xffd700", null, 0, 0);
    dialogue_speaker.tile_geometry.scroll_factor_x = 0;
    dialogue_speaker.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_speaker, 10002);
    
    // Testo Dialogo
    dialogue_text = PP.shapes.text_styled_add(s, text_x, text_y + 35, "", 18, "Arial", "normal", "0xffffff", null, 0, 0);
    dialogue_text.tile_geometry.scroll_factor_x = 0;
    dialogue_text.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_text, 10002);
    
    // Tasto Hint (E)
    dialogue_hint = PP.shapes.text_styled_add(s, screen_center_x + popup_width/2 - 20, text_y + 100, "[ E ]", 14, "Arial", "bold", "0x00ff88", null, 1, 0);
    dialogue_hint.tile_geometry.scroll_factor_x = 0;
    dialogue_hint.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_hint, 10002);
    
    show_current_dialogue_line();
}

function show_current_dialogue_line() {
    if (!current_npc || current_dialogue_index >= current_npc.dialogues.length) {
        close_dialogue_popup();
        return;
    }
    
    let line = current_npc.dialogues[current_dialogue_index];
    let speaker_name = (line.speaker === "npc") ? current_npc.npc_name + ":" : "Tu:";
    
    PP.shapes.text_change(dialogue_speaker, speaker_name);
    PP.shapes.text_change(dialogue_text, line.text);
    
    if (current_dialogue_index >= current_npc.dialogues.length - 1) {
        PP.shapes.text_change(dialogue_hint, "[ E per Chiudere ]");
    } else {
        PP.shapes.text_change(dialogue_hint, "[ E per Continuare ]");
    }
}

function close_dialogue_popup() {
    if (!dialogue_active) return;
    dialogue_active = false;
    current_npc = null;
    current_dialogue_index = 0;
    
    if (dialogue_popup) { PP.shapes.destroy(dialogue_popup); dialogue_popup = null; }
    if (dialogue_text) { PP.shapes.destroy(dialogue_text); dialogue_text = null; }
    if (dialogue_hint) { PP.shapes.destroy(dialogue_hint); dialogue_hint = null; }
    if (dialogue_speaker) { PP.shapes.destroy(dialogue_speaker); dialogue_speaker = null; }
}

function advance_dialogue() {
    if (!dialogue_active) return;
    current_dialogue_index++;
    show_current_dialogue_line();
}

function manage_npc_interaction(s, player) {
    // Se ti muovi troppo, chiudi il dialogo
    if (dialogue_active) {
        let vel_x = PP.physics.get_velocity_x(player);
        if (Math.abs(vel_x) > 10) {
            close_dialogue_popup();
            return;
        }
    }
    
    let e_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.E);
    
    if (e_pressed && !e_key_was_pressed) {
        if (dialogue_active) {
            advance_dialogue();
        } else {
            let nearby_npc = get_nearest_interactable_npc(player);
            if (nearby_npc) {
                open_dialogue_popup(s, nearby_npc);
                PP.physics.set_velocity_x(player, 0); // Ferma il player
            }
        }
    }
    e_key_was_pressed = e_pressed;
}

function is_dialogue_active() {
    return dialogue_active;
}