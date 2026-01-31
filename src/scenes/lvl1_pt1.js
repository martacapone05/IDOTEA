let img_player;
let img_info;
let img_overlay; 
let img_light;
let img_topo; 
let img_dialogue_bg; 
let img_condizionatore2;
let img_smoke3;

let img_button_e;
let img_button_r;
let img_vignetta_topo; 

let overlay; 
let info;
let spruzzo_anim;
let img_muro_rompibile;
let player;
let floor;
let traps = [];

// Variabili per la gestione della vignetta
let vignetta_obj; 
let vignetta_removed = false;

// Lista NPC e variabili dialogo
let npc_list = [];
let dialogue_active = false;
let current_dialogue_index = 0;
let current_npc = null;
let dialogue_popup = null;
let dialogue_text = null;
let dialogue_speaker = null;
let action_key_was_pressed = false; 

let is_player_attacking = false;

let has_spoken_to_topo = false;

// Configurazione NPC
const NPC_INTERACTION_RANGE = 200; 

// DIALOGHI
let dialoghi_topo_fase1 = [
    { speaker: "npc", text: "Coff coff… Grazie, ero intrappolato da ore…\nqualcuno deve avermi bloccato." },
    { speaker: "player", text: "Il tubo deve aver ceduto, questo posto sta cadendo a pezzi\nper colpa delle tossine nell’acqua e della ruggine." },
    { speaker: "npc", text: "Ma noi topi delle fogne viviamo qui da generazioni.\nLe acque sono diventate più dense, sì… ma così restano anche più calde d’inverno." },
    { speaker: "player", text: "È veleno! Metalli pesanti, scarti chimici…\nTi confonde i sensi, ti indebolisce senza che tu te ne accorga." },
    { speaker: "npc", text: "Effettivamente, sento le zampe sempre più pesanti ultimamente…\ne molti dei miei amici sono scomparsi nelle pozze più profonde…" },
    { speaker: "player", text: "È tutto frutto dell’incantesimo che ha avvelenato la Fonte della Vita." },
    { speaker: "npc", text: "La… Fonte? Quindi tutto questo - questo fango, questo buio,\nquesta fatica - non è la normalità?" },
    { speaker: "player", text: "No. E posso rimediare, se arrivo in cima al Monte Tefnut." },
    { speaker: "npc", text: "Allora vai. Ti devo la vita, Tillidak.\nFa’ tornare il mondo limpido… anche le nostre fogne." }
];

let frasi_topo_fase2 = [
    "Continua così. Anche dal buio si può guarire.",
    "Non mi ero mai accorto di quanto fosse pesante l’aria qui sotto."
];


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
    
    img_smoke3 = PP.assets.sprite.load_spritesheet(s, "assets/images/smoke3sprites.png", 500, 625);

    // Condizionatore 2
    img_condizionatore2 = PP.assets.sprite.load_spritesheet(s, "assets/images/condizionatore2.png", 172, 134);

    // NPC TOPO
    img_topo = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_topo.png", 209, 214);

    // SFONDO DIALOGO
    img_dialogue_bg = PP.assets.image.load(s, "assets/images/dialoghi/dialogo1.png");

    // CARICAMENTO BOTTONI E VIGNETTA
    img_button_e = PP.assets.image.load(s, "assets/images/comando_e.png");
    img_button_r = PP.assets.image.load(s, "assets/images/comando_r.png");
    img_vignetta_topo = PP.assets.image.load(s, "assets/images/vignette/vignetta_topo.png");

    preload_platforms(s);
    preload_player(s);
}

function create(s) {

    PP.game_state.set_variable("last_scene", "lvl1_pt1");

    reset_npcs(); 
    is_player_attacking = false;
    has_spoken_to_topo = false; 
    vignetta_removed = false; // Reset logica vignetta

    let start_x = 80;
    let start_y = 500;

    if (PP.game_state.get_variable("punto_di_partenza") == "fine") {
        start_x = 11250;
        start_y = -1210;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    } else if (PP.game_state.get_variable("punto_di_partenza") == "resume_pause") {
        console.log("Riprendo dalla pausa...");
        start_x = PP.game_state.get_variable("pausa_x");
        start_y = PP.game_state.get_variable("pausa_y");
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }
    else {
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

    let cond2 = PP.assets.sprite.add(s, img_condizionatore2, 10910, -980, 0, 1);
    PP.assets.sprite.animation_add(cond2, "spin", 0, 4, 10, -1);
    PP.assets.sprite.animation_play(cond2, "spin");
    PP.layers.set_z_index(cond2, 15); // Z-index intermedio per visibilità corretta

    // PRIMO FUMO
    let smoke1 = PP.assets.sprite.add(s, img_smoke3, 572, 672, 0, 1);
    PP.layers.set_z_index(smoke1, 9);
    PP.assets.sprite.animation_add(smoke1, "puff", 0, 11, 10, -1);
    PP.assets.sprite.animation_play(smoke1, "puff");

    // SECONDO FUMO
    let smoke2 = PP.assets.sprite.add(s, img_smoke3, 1254, 672, 0, 1);
    PP.layers.set_z_index(smoke2, 9);
    PP.assets.sprite.animation_add(smoke2, "puff", 0, 11, 10, -1);
    PP.assets.sprite.animation_play(smoke2, "puff");

    // TERZO FUMO
    let smoke3 = PP.assets.sprite.add(s, img_smoke3, 6083, 815, 0, 1);
    PP.layers.set_z_index(smoke3, 9);
    PP.assets.sprite.animation_add(smoke3, "puff", 0, 11, 10, -1);
    PP.assets.sprite.animation_play(smoke3, "puff");

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

    // NPC TOPO
    let topo = PP.assets.sprite.add(s, img_topo, 8259, 27, 0, 1);
    
    PP.layers.set_z_index(topo, 29); 

    PP.assets.sprite.animation_add(topo, "idle_topo", 0, 4, 8, -1);
    PP.assets.sprite.animation_play(topo, "idle_topo");
    PP.physics.add(s, topo, PP.physics.type.STATIC);

    // Registriamo l'NPC con il dialogo iniziale
    register_npc(topo, "Topo", dialoghi_topo_fase1);

    let btn_topo = PP.assets.image.add(s, img_button_e, 8300, -91, 0, 0); 
    PP.layers.set_z_index(btn_topo, 30);
    
    vignetta_obj = PP.assets.image.add(s, img_vignetta_topo, 7556, -289, 0, 0);
    vignetta_obj.visibility.alpha = 0; // Invisibile all'inizio
    PP.layers.set_z_index(vignetta_obj, 30);


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

    let btn_r_muro = PP.assets.image.add(s, img_button_r, 7857, -91, 0, 0);
    PP.layers.set_z_index(btn_r_muro, 30);


    create_hud(s, player);
    create_collectible_fragment(s, 10553, -1139, player);
    create_collectible_heart(s, 5750, 100, player);

    // Trappole
    traps = [];
    let t1 = create_spruzzo_trap(s, 4850, 220, 500, spruzzo_anim, player);
    traps.push(t1);
    if(t1) PP.layers.set_z_index(t1, 30);

    // Camera
    PP.camera.start_follow(s, player, 0, 100);

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
    // CAMERA BOUNDS
    PP.camera.set_bounds(s, 0, -2100, 12000, 3500);

    // LOGICA VIGNETTA TOPO
    if (vignetta_obj && !vignetta_removed && player) {
        let dist_topo = Math.abs(player.geometry.x - 8259);

        // Controllo se il muro è già stato rotto prima di mostrare la vignetta
        if (player.current_wall && player.current_wall.is_broken) {
            vignetta_obj.visibility.alpha = 0;
            vignetta_removed = true;
        } 
        else if (dist_topo <= 50) {
            vignetta_obj.visibility.alpha = 0;
            vignetta_removed = true;
        } 
        else if (dist_topo <= 800) {
            vignetta_obj.visibility.alpha = 1;
        } 
        else {
            vignetta_obj.visibility.alpha = 0;
        }
    }


    // GESTIONE INPUT DIALOGHI
    manage_npc_interaction(s, player);

    // GESTIONE TASTO R (ROTTURA MURO)
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.R)) {
        if (!is_player_attacking && player.near_breakable_wall && player.current_wall && !player.current_wall.is_broken) {
            is_player_attacking = true;
            player.is_acting = true;
            PP.physics.set_velocity_x(player, 0);
            PP.assets.sprite.animation_play(player, "piccone");
            
            PP.timers.add_timer(s, 500, function() {
                if(player.current_wall) {
                    player.current_wall.is_broken = true;
                    PP.assets.sprite.animation_play(player.current_wall, "break");
                    
                    // Sparizione vignetta nel momento dell'impatto
                    if (vignetta_obj) {
                        vignetta_obj.visibility.alpha = 0;
                        vignetta_removed = true;
                    }

                    let muri = PP.game_state.get_variable("muri_rotti") || 0;
                    PP.game_state.set_variable("muri_rotti", muri + 1);
                }
                
                PP.timers.add_timer(s, 1500, function() {
                    if(player.current_wall) {
                        PP.assets.destroy(player.current_wall);
                    }
                    is_player_attacking = false;
                    player.is_acting = false;
                }, false);
            }, false);
        }
    }

    // GESTIONE MOVIMENTO E IDLE
    if (is_dialogue_active()) {
        PP.physics.set_velocity_x(player, 0);
        PP.assets.sprite.animation_play(player, "idle");
        
    } else if (!is_player_attacking) {
        manage_player_update(s, player);
    }

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
        PP.game_state.set_variable("punto_di_partenza", "arrivo_da_pt1");
        PP.scenes.start("lvl1_pt2");
    }
}

function destroy(s) {
}

PP.scenes.add("lvl1_pt1", preload, create, update, destroy);


function register_npc(sprite_obj, name, dialogues) {
    sprite_obj.npc_name = name;
    sprite_obj.dialogues = dialogues;
    sprite_obj.interaction_range = NPC_INTERACTION_RANGE;
    npc_list.push(sprite_obj);
}

function reset_npcs() {
    npc_list = [];
    close_dialogue_popup();
    action_key_was_pressed = false;
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
    
    if (npc.npc_name === "Topo" && has_spoken_to_topo) {
        let frase_random = frasi_topo_fase2[Math.floor(Math.random() * frasi_topo_fase2.length)];
        npc.dialogues = [{ speaker: "npc", text: frase_random }];
    }
    
    dialogue_active = true;
    current_npc = npc;
    current_dialogue_index = 0;
    
    let screen_center_x = 0; 
    let popup_y = 0; 
    
    dialogue_popup = PP.assets.image.add(s, img_dialogue_bg, screen_center_x, popup_y, 0, 0);
    dialogue_popup.visibility.alpha = 0.85;
    dialogue_popup.tile_geometry.scroll_factor_x = 0;
    dialogue_popup.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_popup, 10001);
    
    let text_padding_left = 260;  
    let text_padding_top = 32;   

    dialogue_speaker = PP.shapes.text_styled_add(s, text_padding_left, text_padding_top, "", 22, "Luminari", "bold", "0x01AA03", null, 0, 0);
    dialogue_speaker.tile_geometry.scroll_factor_x = 0;
    dialogue_speaker.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_speaker, 10002);
    
    dialogue_text = PP.shapes.text_styled_add(s, text_padding_left, text_padding_top + 55, "", 20, "Avenir", "normal", "0xffffff", null, 0, 0);
    dialogue_text.tile_geometry.scroll_factor_x = 0;
    dialogue_text.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_text, 10002);
    
    show_current_dialogue_line();
}

function show_current_dialogue_line() {
    if (!current_npc || current_dialogue_index >= current_npc.dialogues.length) {
        close_dialogue_popup();
        return;
    }
    
    let line = current_npc.dialogues[current_dialogue_index];
    let speaker_name = (line.speaker === "npc") ? current_npc.npc_name : "Tillidak";
    
    PP.shapes.text_change(dialogue_speaker, speaker_name);
    PP.shapes.text_change(dialogue_text, line.text);
}

function close_dialogue_popup() {
    if (!dialogue_active) return;
    
    if (current_npc && current_npc.npc_name === "Topo") {
        has_spoken_to_topo = true;
    }
    
    dialogue_active = false;
    current_npc = null;
    current_dialogue_index = 0;
    
    if (dialogue_popup) {
        PP.assets.destroy(dialogue_popup);
        dialogue_popup = null;
    }
    
    if (dialogue_text) { PP.shapes.destroy(dialogue_text); dialogue_text = null; }
    if (dialogue_speaker) { PP.shapes.destroy(dialogue_speaker); dialogue_speaker = null; }
}

function advance_dialogue() {
    if (!dialogue_active) return;
    current_dialogue_index++;
    show_current_dialogue_line();
}

function manage_npc_interaction(s, player) {
    let e_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.E);
    let down_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);
    
    let is_input_active = dialogue_active ? (e_pressed || down_pressed) : e_pressed;
    
    if (is_input_active && !action_key_was_pressed) {
        if (dialogue_active) {
            advance_dialogue();
        } else {
            let nearby_npc = get_nearest_interactable_npc(player);
            if (nearby_npc) {
                open_dialogue_popup(s, nearby_npc);
            }
        }
    }
    action_key_was_pressed = is_input_active;
}

function is_dialogue_active() {
    return dialogue_active;
}

function safe_destroy(obj) {
    if (!obj) return;
    if (typeof obj.destroy === 'function') { obj.destroy(); return; }
    if (obj.ph_obj && typeof obj.ph_obj.destroy === 'function') { obj.ph_obj.destroy(); return; }
    if (obj.sprite && typeof obj.sprite.destroy === 'function') { obj.sprite.destroy(); return; }
    if (obj.visibility) obj.visibility.alpha = 0;
    if (obj.geometry) obj.geometry.y = 10000;
}