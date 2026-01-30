let img_background;
let img_player;
let img_info;
let img_colonna_base;
let img_colonna_finale;

// IMMAGINI
let img_avvoltoio;
let img_dialogue_bg;

let background;
let info;
let player;
let floor;

let avvoltoio;

let scene_ref = null;

// VARIABILI SISTEMA DIALOGHI
let npc_list = [];
let dialogue_active = false;
let current_dialogue_index = 0;
let current_npc = null;
let dialogue_popup = null;
let dialogue_text = null;
let dialogue_speaker = null;
let action_key_was_pressed = false; 

// RAGGIO D'AZIONE STANDARD (Per altri NPC se ce ne fossero)
const NPC_INTERACTION_RANGE = 300; 

// VARIABILI LOGICA LIVELLO
let has_spoken_to_avvoltoio = false;
let is_player_attacking = false;

// --- VARIABILI PER IL SALTO DELL'AVVOLTOIO ---
let avvoltoio_flying = false;
let fly_start_time = 0;
let fly_duration = 2500;
let fly_height = 300; 

// Coordinate Volo
let fly_pos_1_start = { x: 1700, y: -6163 }; 
let fly_pos_1_end = { x: 1490, y: -6550 };

let fly_pos_2_start = { x: 1490, y: -6550 }; 
let fly_pos_2_end = { x: 2980, y: -6550 };   

let fly_pos_3_start = { x: 2980, y: -6550 }; 
let fly_pos_3_end = { x: 1000, y: -6550 }; 

let fly_pos_4_start = { x: 1000, y: -6550 };
let fly_pos_4_end = { x: 2500, y: -6550 };

// Swoop finale
let fly_pos_escape_start = { x: 2500, y: -6550 };
let fly_pos_escape_end = { x: 2555, y: -7476 };

let current_fly_start = { x: 0, y: 0 };
let current_fly_end = { x: 0, y: 0 };
let current_fly_height = 100; 

// 0 = Inizio, 1..5 = Fasi successive
let avvoltoio_stage = 0; 

// DEFINIZIONE DIALOGO AVVOLTOIO
let dialogo_avvoltoio = [
    { speaker: "npc", text: "Così… sei arrivato. Il piccolo viaggiatore che crede di poter salvare il mondo." },
    { speaker: "player", text: "Sei tu che hai avvelenato la Fonte. Per decenni l’acqua ha portato morte invece di vita." },
    { speaker: "npc", text: "Morte? Io la chiamo ordine. L’acqua è potere, Tillidak." },
    { speaker: "player", text: "Per questo il mondo soffoca? Fogne colme di veleno, città che non respirano,\ncampagne avvelenate?" },
    { speaker: "npc", text: "Un prezzo accettabile. La ricchezza non nasce dalla condivisione, ma dalla scarsità.\nChi controlla la Fonte decide chi beve… e chi no. E solo io la possiedo." },
    { speaker: "player", text: "Hai stregato tutti, tramutando il veleno in normalità." },
    { speaker: "npc", text: "Certo. È più facile governare chi ha dimenticato la purezza." },
    { speaker: "player", text: "Non del tutto, il mondo si sta risvegliando. Finché l’acqua esiste e qualcuno ricorda\nla verità, la speranza vive." },
    { speaker: "npc", text: "Allora prova, eroe. Prova a strapparmi ciò che ho conquistato." }
];

function preload(s) {

    preload_hud(s);

    img_background = PP.assets.image.load(s, "assets/images/sfondi/sfondo.png");
    img_info = PP.assets.image.load(s, "assets/images/info.png");
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 185, 294);
    
    // CARICAMENTO COLONNE
    img_colonna_base = PP.assets.sprite.load_spritesheet(s, "assets/images/colonna_base_sprite.png", 400, 450);
    img_colonna_finale = PP.assets.sprite.load_spritesheet(s, "assets/images/colonna_finale_sprite.png", 900, 450);

    // CARICAMENTO AVVOLTOIO
    img_avvoltoio = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_avvoltoio.png", 746, 533);
    img_dialogue_bg = PP.assets.image.load(s, "assets/images/dialoghi/dialogo4.png");

    preload_platforms(s);
    preload_player(s);
}

function create(s) {

    scene_ref = s; 

    reset_npcs();
    has_spoken_to_avvoltoio = false;
    is_player_attacking = false;
    avvoltoio_flying = false; 
    avvoltoio_stage = 0; 
    current_fly_height = 300;

    background = PP.assets.tilesprite.add(s, img_background, 0, 0, 1280, 800, 0, 0);
    background.tile_geometry.scroll_factor_x = 0;
    background.tile_geometry.scroll_factor_y = 0;

    // SPAWN
    let start_x = 1500;
    let start_y = -7000;

    if (PP.game_state.get_variable("punto_di_partenza") == "fine") {
        start_x = 0; 
        start_y = 550;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    } else {
        PP.game_state.set_variable("player_hp", 4);
        PP.game_state.set_variable("player_fragments", 0);
    }

    player = PP.assets.sprite.add(s, img_player, start_x, start_y, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC);
    PP.physics.set_collision_rectangle(player, 138, 230, 20, 64);
    
    player.last_column_touch_time = 0;

    // ===============================================
    // *** 1. FUNZIONE PER COLONNE BASE ***
    // ===============================================
    let create_base_column = function(x, y) {
        let col = PP.assets.sprite.add(s, img_colonna_base, x, y, 0, 1);
        col.is_broken = false;
        
        PP.assets.sprite.animation_add(col, "base_idle", 0, 0, 1, 0);
        PP.assets.sprite.animation_add(col, "base_break", 0, 43, 18, 0); 
        
        PP.assets.sprite.animation_play(col, "base_idle");
        col.break_anim_key = "base_break";
        
        PP.physics.add(s, col, PP.physics.type.STATIC);
        PP.layers.set_z_index(col, 10);

        // --- SENSORE BASE ---
        let sensor_w = 150;
        let sensor_h = 402;
        let sensor_x = x + 205; 
        let sensor_y = y - 210; 

        let sensore = PP.shapes.rectangle_add(s, sensor_x, sensor_y, sensor_w, sensor_h, "0x00FF00", 0);
        sensore.visibility.alpha = 0; 
        sensore.colonna_collegata = col;
        PP.physics.add(s, sensore, PP.physics.type.STATIC);

        PP.physics.add_overlap_f(s, player, sensore, function(scene, p, zone) {
            if (has_spoken_to_avvoltoio) {
                p.current_column = zone.colonna_collegata;
                p.last_column_touch_time = s.time.now;
            }
        });
        
        return col;
    };

    // ===============================================
    // *** 2. FUNZIONE PER COLONNA FINALE ***
    // ===============================================
    let create_final_column = function(x, y) {
        let col = PP.assets.sprite.add(s, img_colonna_finale, x, y, 0, 1);
        col.is_broken = false;
        
        PP.assets.sprite.animation_add(col, "final_idle", 0, 0, 1, 0);
        PP.assets.sprite.animation_add(col, "final_break", 0, 51, 18, 0);
        
        PP.assets.sprite.animation_play(col, "final_idle");
        col.break_anim_key = "final_break";
        
        PP.physics.add(s, col, PP.physics.type.STATIC);
        PP.layers.set_z_index(col, 10);

        // --- SENSORE FINALE ---
        let sensor_w = 150;
        let sensor_h = 402;
        let sensor_x = x + 455; 
        let sensor_y = y - 210;

        let sensore = PP.shapes.rectangle_add(s, sensor_x, sensor_y, sensor_w, sensor_h, "0x00FF00", 0);
        sensore.visibility.alpha = 0; 
        sensore.colonna_collegata = col;
        PP.physics.add(s, sensore, PP.physics.type.STATIC);

        PP.physics.add_overlap_f(s, player, sensore, function(scene, p, zone) {
            if (has_spoken_to_avvoltoio) {
                p.current_column = zone.colonna_collegata;
                p.last_column_touch_time = s.time.now;
            }
        });
        
        return col;
    };

    // CREAZIONE OGGETTI (TUE COORDINATE)
    let colonna_base1 = create_base_column(1094, -6250);
    let colonna_base2 = create_base_column(1594, -6250);
    let colonna_base3 = create_base_column(3095, -6250);
    let colonna_finale = create_final_column(2345, -6245);

    // PAVIMENTO BASE
    floor = PP.shapes.rectangle_add(s, -500, 620, 3000, 10, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, floor);

    configure_player_animations(s, player); 
    
    if(typeof create_platforms_lvl3 === "function") {
        create_platforms_lvl3(s, player);
    }

    // ===============================================
    // *** AVVOLTOIO (BOSS/NPC) ***
    // ===============================================
    avvoltoio = PP.assets.sprite.add(s, img_avvoltoio, fly_pos_1_start.x, fly_pos_1_start.y, 0, 1);

    // *** NUOVO: Definiamo l'area ESATTA per interagire con l'Avvoltoio ***
    // Se il player è tra X 1600 e 2500, e altezza corretta, il dialogo parte.
    avvoltoio.custom_interaction_area = {
        min_x: 1600,
        max_x: 2500,
        min_y: -6400, // Un po' sopra la testa
        max_y: -6000  // Un po' sotto i piedi
    };

    PP.assets.sprite.animation_add(avvoltoio, "idle", 0, 4, 6, -1); 
    PP.assets.sprite.animation_add(avvoltoio, "fly", 5, 19, 10, -1); 
    PP.assets.sprite.animation_play(avvoltoio, "idle");
    
    PP.physics.add(s, avvoltoio, PP.physics.type.STATIC);
    PP.layers.set_z_index(avvoltoio, 20);

    register_npc(avvoltoio, "Avvoltoio", dialogo_avvoltoio);


    // HUD E CAMERA
    create_hud(s, player);
    create_collectible_fragment(s, 1200, 470, player);
    create_collectible_heart(s, 1700, 470, player);

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
    
    manage_npc_interaction(s, player);

    // --- GESTIONE VOLO AVVOLTOIO ---
    if (avvoltoio_flying) {
        let now = s.time.now; 
        let elapsed = now - fly_start_time;
        
        let t = Math.min(1, elapsed / fly_duration);
        
        let current_x = current_fly_start.x + (current_fly_end.x - current_fly_start.x) * t;
        let linear_y = current_fly_start.y + (current_fly_end.y - current_fly_start.y) * t;
        
        // Uso current_fly_height (se negativo fa lo swoop)
        let arc = current_fly_height * 4 * t * (1 - t);
        let current_y = linear_y - arc; 

        avvoltoio.geometry.x = current_x;
        avvoltoio.geometry.y = current_y;

        if (t >= 1) {
            avvoltoio_flying = false;
            PP.assets.sprite.animation_play(avvoltoio, "idle");
        }
    }

    // ===============================================
    // *** GESTIONE AZIONE PICCONE (TASTO R) ***
    // ===============================================
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.R)) {
        
        let is_near_column = (s.time.now - player.last_column_touch_time) < 100;

        if (!is_player_attacking && is_near_column && has_spoken_to_avvoltoio && 
            player.current_column && !player.current_column.is_broken) {
            
            is_player_attacking = true;
            player.is_acting = true; 
            PP.physics.set_velocity_x(player, 0);
            
            PP.assets.sprite.animation_play(player, "piccone");
            
            PP.timers.add_timer(s, 500, function() {
                
                if(player.current_column) {
                    player.current_column.is_broken = true;
                    PP.assets.sprite.animation_play(player.current_column, player.current_column.break_anim_key);

                    // *** TIMER VOLO (1000ms = Frame 18) ***
                    PP.timers.add_timer(s, 1000, function() {
                        
                        // STAGE 1 -> 2
                        if (avvoltoio_stage === 1) {
                            avvoltoio_stage = 2;
                            current_fly_start = fly_pos_2_start;
                            current_fly_end = fly_pos_2_end;
                            current_fly_height = 300; 
                            
                            fly_start_time = s.time.now;
                            avvoltoio_flying = true;
                            PP.assets.sprite.animation_play(avvoltoio, "fly");
                        }
                        // STAGE 2 -> 3
                        else if (avvoltoio_stage === 2) {
                            avvoltoio_stage = 3;
                            current_fly_start = fly_pos_3_start;
                            current_fly_end = fly_pos_3_end;
                            current_fly_height = 300;
                            
                            fly_start_time = s.time.now;
                            avvoltoio_flying = true;
                            PP.assets.sprite.animation_play(avvoltoio, "fly");
                        }
                        // STAGE 3 -> 4
                        else if (avvoltoio_stage === 3) {
                            avvoltoio_stage = 4;
                            current_fly_start = fly_pos_4_start;
                            current_fly_end = fly_pos_4_end;
                            current_fly_height = 300;
                            
                            fly_start_time = s.time.now;
                            avvoltoio_flying = true;
                            PP.assets.sprite.animation_play(avvoltoio, "fly");
                        }
                        // STAGE 4 -> 5 (FUGA CON SWOOP)
                        else if (avvoltoio_stage === 4) {
                            avvoltoio_stage = 5;
                            current_fly_start = fly_pos_escape_start;
                            current_fly_end = fly_pos_escape_end;
                            
                            current_fly_height = -300; // SWOOP IN BASSO
                            
                            fly_start_time = s.time.now;
                            avvoltoio_flying = true;
                            PP.assets.sprite.animation_play(avvoltoio, "fly");
                        }

                    }, false);
                }
                
                PP.timers.add_timer(s, 500, function() { 
                    is_player_attacking = false;
                    player.is_acting = false; 
                }, false);

            }, false);
        }
    }

    if (is_dialogue_active()) {
        PP.physics.set_velocity_x(player, 0);
        PP.assets.sprite.animation_play(player, "idle");
    } 
    else if (!is_player_attacking) {
        manage_player_update(s, player);    
    }

    let vel_x = PP.physics.get_velocity_x(player);
    if (vel_x > 50) player.cam_target_x = -200;
    else if (vel_x < -50) player.cam_target_x = 200;
    else player.cam_target_x = 0;
    
    player.cam_offset_x += (player.cam_target_x - player.cam_offset_x) * 0.03;
    PP.camera.set_follow_offset(s, player.cam_offset_x, 200);

    background.tile_geometry.x = PP.camera.get_scroll_x(s) * 1;
    background.tile_geometry.x = PP.camera.get_scroll_x(s) * 1;

    if (player.geometry.y > 2000) {
        console.log("Caduto nel vuoto! Game Over...");
        PP.game_state.set_variable("last_scene", "lvl3");
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
// *** SISTEMA DIALOGHI ***
// ==========================================================

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
    
    // *** NUOVO CONTROLLO: Se l'NPC ha un'area custom, usa quella ***
    if (npc.custom_interaction_area) {
        let area = npc.custom_interaction_area;
        let px = player.geometry.x;
        let py = player.geometry.y;
        
        if (px >= area.min_x && px <= area.max_x && 
            py >= area.min_y && py <= area.max_y) {
            return true;
        }
        return false;
    }

    // Altrimenti usa il controllo standard (raggio)
    let dist = Math.abs(player.geometry.x - npc.geometry.x);
    let height_diff = Math.abs(player.geometry.y - npc.geometry.y);
    return dist < npc.interaction_range && height_diff < 300; 
}

function get_nearest_interactable_npc(player) {
    for (let i = 0; i < npc_list.length; i++) {
        let npc = npc_list[i];
        if (is_player_near_npc(player, npc)) {
            if (npc.npc_name === "Avvoltoio" && has_spoken_to_avvoltoio) {
                continue;
            }
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
    
    if(npc.npc_name === "Avvoltoio") {
        has_spoken_to_avvoltoio = true;
    }
    
    let screen_center_x = 0; 
    let popup_y = 0; 
    
    dialogue_popup = PP.assets.image.add(s, img_dialogue_bg, screen_center_x, popup_y, 0, 0);
    dialogue_popup.visibility.alpha = 0.95;
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
        
        let npc_name_temp = current_npc ? current_npc.npc_name : "";
        
        close_dialogue_popup();
        
        // TRIGGER VOLO 1 (Inizio Battaglia)
        if(npc_name_temp === "Avvoltoio") {
            avvoltoio_stage = 1; 
            
            current_fly_start = fly_pos_1_start;
            current_fly_end = fly_pos_1_end;
            current_fly_height = 300;
            
            avvoltoio_flying = true;
            fly_start_time = scene_ref.time.now; 
            PP.assets.sprite.animation_play(avvoltoio, "fly");
        }
        
        return;
    }
    
    let line = current_npc.dialogues[current_dialogue_index];
    let speaker_name = (line.speaker === "npc") ? current_npc.npc_name : "Tillidak";
    
    PP.shapes.text_change(dialogue_speaker, speaker_name);
    PP.shapes.text_change(dialogue_text, line.text);
}

function close_dialogue_popup() {
    if (!dialogue_active) return;
    dialogue_active = false;
    current_npc = null;
    current_dialogue_index = 0;
    
    if (dialogue_popup) {
        try { dialogue_popup.destroy(); } catch(e) {}
        try { PP.shapes.destroy(dialogue_popup); } catch(e) {}
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

function destroy(s) {
}

PP.scenes.add("lvl3", preload, create, update, destroy);