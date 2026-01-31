// VARIABILI IMMAGINI SFONDO
let img_background1; // sfondo10
let img_background2; // sfondo11
let img_background3; // sfondo12

let img_player;
let img_info;

// NUOVE VARIABILI NPC E AMBIENTE
let img_pecora;
let img_dialogue_bg_2; 
let img_mulino;
let img_muro_rompibile;

// VARIABILI CASCATE E FUMO
let img_waterfall1;
let img_waterfall2;
let img_waterfall5;
let img_schiuma5;
let img_smoke2; // Nuova immagine fumo
let img_condizionatore1; // Nuova immagine condizionatore

// IMMAGINI COMANDI E VIGNETTE
let img_comando_e;
let img_comando_r;
let img_vignetta_pecora; 

// VARIABILI OGGETTI
let background1;
let background2;
let background3;

let info;
let player;
let floor; // Pavimento iniziale

let mulino_anim;
let muro_pecora;
let pecora;

let funivia_ritorno_zone;

// BOTTONI E VIGNETTE
let btn_e_pecora;
let btn_r_muro;
let btn_e_funivia;
let vignetta_pecora; 

// VARIABILI SISTEMA DIALOGHI
let npc_list = [];
let dialogue_active = false;
let current_dialogue_index = 0;
let current_npc = null;
let dialogue_popup = null;
let dialogue_text = null;
let dialogue_speaker = null;
let action_key_was_pressed = false; 
const NPC_INTERACTION_RANGE = 200; 

// VARIABILI LOGICA LIVELLO
let has_spoken_to_pecora = false;
let wall_broken_pecora = false;
let is_player_attacking = false;

// VARIABILE PER LA VIGNETTA (Per farla sparire per sempre)
let has_seen_vignetta_pecora = false; 

// DEFINIZIONE DIALOGHI
let dialoghi_pecora_fase1 = [
    { speaker: "npc", text: "Oh, grazie!\nStavo ispezionando i campi e ad un certo punto si è fermato…che strano." },
    { speaker: "player", text: "Le alghe hanno bloccato il mulino! Devi eliminarle subito, sono invasive!" },
    { speaker: "npc", text: "Ma no, sono segno che la terra è fertile!\nGli agricoltori dicono che più fertilizzanti usano, meglio è." },
    { speaker: "player", text: "Quello che hai intorno non è fertilità. l’inquinamento ha reso tossico tutto.\nQuesti colori, questi odori non sono normali." },
    { speaker: "npc", text: "Ma io credevo che l’acqua verde fosse… ricca!\nE ultimamente mangio tanto… ma mi sento sempre più debole." },
    { speaker: "player", text: "I fertilizzanti e i pesticidi sono entrati nelle falde.\nState bevendo acqua contaminata senza saperlo." },
    { speaker: "npc", text: "Bevendo veleno… da mesi…\nE io pensavo fosse solo stanchezza del pascolo…" },
    { speaker: "player", text: "Non è colpa tua. È l’incantesimo che ha colpito la Fonte a distorcere la realtà.\nMa posso porre fine a tutto questo." },
    { speaker: "npc", text: "Incantesimo? Allora non perdere tempo.\nLa montagna ti guiderà… finché avremo ancora forza." }
];

let frasi_pecora_fase2 = [
    "Ora so che non tutto ciò che cresce è vita.",
    "Riporta la Fonte alla luce, Tillidak.",
    "Non lasceremo più che il progresso ci schiacci!"
];


function preload(s) {

    preload_hud(s); 

    // CARICAMENTO SFONDI PARALLASSE
    img_background1 = PP.assets.image.load(s, "assets/images/sfondi/sfondo10.png");
    img_background2 = PP.assets.image.load(s, "assets/images/sfondi/sfondo11.png");
    img_background3 = PP.assets.image.load(s, "assets/images/sfondi/sfondo12.png");

    img_info = PP.assets.image.load(s, "assets/images/info.png");
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 185, 294);

    // NUOVI CARICAMENTI
    img_pecora = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_pecora.png", 250, 284);
    img_dialogue_bg_2 = PP.assets.image.load(s, "assets/images/dialoghi/dialogo3.png");
    img_mulino = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_mulino.png", 160, 480);
    img_muro_rompibile = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_muro.png", 364, 354);

    // CARICAMENTO CASCATE E FUMO
    img_waterfall1 = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/waterfall1sprites.png", 119, 211);
    img_waterfall2 = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/waterfall2sprites.png", 126, 210);
    img_waterfall5 = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/waterfall5sprites.png", 214, 218);
    img_schiuma5 = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/schiuma5sprites.png", 244, 83);
    
    // Fumo (250x600) e Condizionatore
    img_smoke2 = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/smoke2sprite.png", 250, 600);
    img_condizionatore1 = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/condizionatore1.png", 132, 102); 

    // CARICAMENTO COMANDI E VIGNETTA
    img_comando_e = PP.assets.image.load(s, "assets/images/comando_e.png");
    img_comando_r = PP.assets.image.load(s, "assets/images/comando_r.png");
    img_vignetta_pecora = PP.assets.image.load(s, "assets/images/vignette/vignetta_pecora.png");

    preload_platforms(s);
    preload_player(s);
}


function create(s) {

    // Checkpoint
    PP.game_state.set_variable("last_scene", "lvl2_pt1");

    reset_npcs();
    has_spoken_to_pecora = false;
    wall_broken_pecora = false;
    is_player_attacking = false;
    
    // Reset variabile vignetta quando si ricarica il livello
    has_seen_vignetta_pecora = false; 

    // 1. SFONDI PARALLASSE
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
    background3.visibility.alpha = 0.4; 


    // CREAZIONE CASCATE E FUMO
    create_waterfalls(s);
    create_smoke(s); 

    // CREAZIONE PLAYER
    create_player(s);

    // GESTIONE PUNTO DI PARTENZA
    let start_x = -373; 
    let start_y = 500;

    let punto = PP.game_state.get_variable("punto_di_partenza");

    // Arrivo dalla funivia
    if (punto == "funivia_arrivo") {
        start_x = -373; 
        start_y = 500;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }
    // Ritorno da lvl2_pt2 (backtracking)
    else if (punto == "fine") {
        start_x = 15700;
        start_y = -1340;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }
    // Ripresa dalla PAUSA (comandi)
    else if (punto == "resume_pause") {
        console.log("Riprendo dalla pausa...");
        start_x = PP.game_state.get_variable("pausa_x");
        start_y = PP.game_state.get_variable("pausa_y");
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }


    player = PP.assets.sprite.add(s, img_player, start_x, start_y, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 
    PP.physics.set_collision_rectangle(player, 138, 230, 20, 64);

    configure_player_animations(s, player); 


    // ===============================================
    // *** 5. PAVIMENTO INIZIALE ***
    // ===============================================
    floor = PP.shapes.rectangle_add(s, -300, 620, 2000, 10, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, floor);


    // ===============================================
    // *** 6. CARICAMENTO ALTRE PIATTAFORME ***
    // ===============================================
    if(typeof create_platforms_lvl2_pt1 === "function") {
        create_platforms_lvl2_pt1(s, player);
    }


    // ===============================================
    // *** 7. MULINO (13488, -1040) ***
    // ===============================================
    mulino_anim = PP.assets.sprite.add(s, img_mulino, 13488, -1040, 0, 1);
    
    PP.assets.sprite.animation_add(mulino_anim, "stop", 0, 0, 1, 0); 
    PP.assets.sprite.animation_add(mulino_anim, "spin", 0, 3, 10, -1); 
    
    PP.assets.sprite.animation_play(mulino_anim, "stop");
    
    PP.layers.set_z_index(mulino_anim, 15); 


       // ===============================================
    // *** 8. MURO ROMPIBILE (13226, -1129) ***
    // ===============================================
    muro_pecora = PP.assets.sprite.add(s, img_muro_rompibile, 13226, -1129, 0, 1);
    muro_pecora.is_broken = false;
    
    PP.layers.set_z_index(muro_pecora, 25);
    
    PP.assets.sprite.animation_add(muro_pecora, "break", 0, 22, 10, 0);
    PP.assets.sprite.animation_add(muro_pecora, "idle", 0, 0, 1, 0);
    PP.assets.sprite.animation_play(muro_pecora, "idle");
    
    PP.physics.add(s, muro_pecora, PP.physics.type.STATIC);

    // *** SENSORE INTERAZIONE MURO ***
    let sensore_width = 236;
    let sensore_height = 392; 
    let sensore_x = 13380; 
    let sensore_y = -1284;

    let sensore_muro = PP.shapes.rectangle_add(s, sensore_x, sensore_y, sensore_width, sensore_height, "0x00FF00", 0);
    sensore_muro.visibility.alpha = 0; 
    sensore_muro.muro_collegato = muro_pecora;
    PP.physics.add(s, sensore_muro, PP.physics.type.STATIC);

    // OVERLAP SENSORE
    let on_sensore_overlap = function(scene, p, obj_sensore) {
        if (!has_spoken_to_pecora) return;
        
        p.near_breakable_wall = true;
        p.current_wall = obj_sensore.muro_collegato; 
    };
    PP.physics.add_overlap_f(s, player, sensore_muro, on_sensore_overlap);


    // ===============================================
    // *** 9. NPC PECORA (12840, -1122) ***
    // ===============================================
    pecora = PP.assets.sprite.add(s, img_pecora, 12840, -1122, 0, 1);
    
    PP.assets.sprite.animation_add(pecora, "idle", 0, 4, 8, -1);
    PP.assets.sprite.animation_play(pecora, "idle");
    
    PP.physics.add(s, pecora, PP.physics.type.STATIC);
    
    PP.layers.set_z_index(pecora, 25);

    register_npc(pecora, "Pecora", dialoghi_pecora_fase1);


    // ===============================================
    // *** BOTTONI (PROMPT) ***
    // ===============================================
    
    // Bottone E (Pecora) - 12899, -1275
    btn_e_pecora = PP.assets.image.add(s, img_comando_e, 12899, -1275, 0, 0);
    btn_e_pecora.visibility.alpha = 0; 
    PP.layers.set_z_index(btn_e_pecora, 9999);

    // Bottone R (Muro) - 13301, -1275
    btn_r_muro = PP.assets.image.add(s, img_comando_r, 13301, -1275, 0, 0);
    btn_r_muro.visibility.alpha = 0; 
    PP.layers.set_z_index(btn_r_muro, 9999);

    // Bottone E (Funivia)
    btn_e_funivia = PP.assets.image.add(s, img_comando_e, -392, 476, 0, 0);
    btn_e_funivia.visibility.alpha = 0;
    PP.layers.set_z_index(btn_e_funivia, 9999);

    // ===============================================
    // *** VIGNETTA PECORA (12627, -1483) ***
    // ===============================================
    vignetta_pecora = PP.assets.image.add(s, img_vignetta_pecora, 12627, -1483, 0, 0);
    vignetta_pecora.visibility.alpha = 0;
    PP.layers.set_z_index(vignetta_pecora, 24); 


    // ===============================================
    // *** 10. HUD E CAMERA ***
    // ===============================================
    create_hud(s, player); 
    create_collectible_fragment(s, 1200, 470, player);
    create_collectible_heart(s, 1700, 470, player);

    funivia_ritorno_zone = PP.shapes.rectangle_add(s, -373, 464, 220, 253, "0x00FF00", 0.5);
    PP.physics.add(s, funivia_ritorno_zone, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(s, player, funivia_ritorno_zone, function(scene, p, zone) {
        if (PP.interactive.kb.is_key_down(scene, PP.key_codes.E)) {
            console.log("Ritorno con la funivia -> lvl1_pt2");
            PP.game_state.set_variable("punto_di_partenza", "funivia_ritorno");
            PP.scenes.start("lvl1_pt2");
        }
    });

    PP.camera.start_follow(s, player, 0, 120);
    
    // BARRIERE
    let barrier_left = PP.shapes.rectangle_add(s, -1350, -800, 100, 5000, "0x000000", 0);
    PP.physics.add(s, barrier_left, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_left);

    let barrier_right = PP.shapes.rectangle_add(s, 16420, -800, 100, 5000, "0x000000", 0);
    PP.physics.add(s, barrier_right, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, barrier_right);

    player.cam_offset_x = 0;
    player.cam_target_x = 0;
    
    player.cam_offset_y = 120;
    player.cam_target_y = 120;

    PP.camera.set_deadzone(s, 10, 50);

    player.can_climb = false;
    player.is_climbing = false;

    info = PP.assets.image.add(s, img_info, 0, 0, 0, 0);
    info.tile_geometry.scroll_factor_x = 0;
    info.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(info, 10000);
} 


function update(s) {
    PP.camera.set_bounds(s, -1300, -2550, 17620, 6000);
    
    manage_npc_interaction(s, player);

    if (PP.interactive.kb.is_key_down(s, PP.key_codes.R)) {
        
        if (!is_player_attacking && player.near_breakable_wall && player.current_wall && !player.current_wall.is_broken) {
            
            is_player_attacking = true;
            player.is_acting = true; 
            PP.physics.set_velocity_x(player, 0);
            
            PP.assets.sprite.animation_play(player, "piccone");
            
            // Distruzione bottone R
            if (btn_r_muro) {
                PP.assets.destroy(btn_r_muro);
                btn_r_muro = null;
            }

            PP.timers.add_timer(s, 500, function() {
                
                if(player.current_wall) {
                    player.current_wall.is_broken = true;
                    PP.assets.sprite.animation_play(player.current_wall, "break");
                    let muri = PP.game_state.get_variable("muri_rotti") || 0;
                    PP.game_state.set_variable("muri_rotti", muri + 1);
                }
                
                PP.timers.add_timer(s, 1500, function() {
                    safe_destroy(player.current_wall);
                    wall_broken_pecora = true;
                    
                    if (mulino_anim) {
                        PP.assets.sprite.animation_play(mulino_anim, "spin");
                    }

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

    if (player.geometry.x > 7500) {
        player.cam_target_y = -20;
    } else {
        player.cam_target_y = 120;
    }

    player.cam_offset_y += (player.cam_target_y - player.cam_offset_y) * 0.03;

    PP.camera.set_follow_offset(s, player.cam_offset_x, player.cam_offset_y);

    let scroll_x = PP.camera.get_scroll_x(s);
    background1.tile_geometry.x = scroll_x * 0.1;
    background2.tile_geometry.x = scroll_x * 0.2;
    background3.tile_geometry.x = scroll_x * 0.5;

    if (player.geometry.y > 4000) {
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

    if (player.geometry.x > 16300) { 
        PP.game_state.set_variable("punto_di_partenza", "avanti_da_pt1");
        PP.scenes.start("lvl2_pt2");
    }

    // ===============================================
    // *** GESTIONE VISIBILITÀ BOTTONI (500px) ***
    // ===============================================
    
    // Bottone E (Pecora)
    if (btn_e_pecora) {
        let dist = Math.abs(player.geometry.x - 12840);
        if (dist < 500 && !dialogue_active) {
            btn_e_pecora.visibility.alpha = 1;
        } else {
            btn_e_pecora.visibility.alpha = 0;
        }
    }

    // Bottone R (Muro)
    if (btn_r_muro) {
        let dist = Math.abs(player.geometry.x - 13226);
        if (dist < 500 && !is_player_attacking && !wall_broken_pecora) {
            btn_r_muro.visibility.alpha = 1;
        } else {
            btn_r_muro.visibility.alpha = 0;
        }
    }

    // Bottone E (Funivia)
    if (btn_e_funivia) {
        let dist = Math.abs(player.geometry.x - (-392));
        if (dist < 500) {
            btn_e_funivia.visibility.alpha = 1;
        } else {
            btn_e_funivia.visibility.alpha = 0;
        }
    }

    // GESTIONE VIGNETTA PECORA
    if (vignetta_pecora) {
        if (has_seen_vignetta_pecora) {
            vignetta_pecora.visibility.alpha = 0;
        } else {
            let dist = Math.abs(player.geometry.x - 12627);
            
            // SE SEI TROPPO VICINO (< 100): SPARISCE PER SEMPRE
            if (dist < 100) {
                has_seen_vignetta_pecora = true;
                vignetta_pecora.visibility.alpha = 0;
            } 
            // SE SEI NEL RAGGIO (<= 800)
            else if (dist <= 800) {
                vignetta_pecora.visibility.alpha = 1;
            } 
            // SE SEI LONTANO
            else {
                vignetta_pecora.visibility.alpha = 0;
            }
        }
    }

}

// ==========================================================
// *** FUNZIONI NPC (SISTEMA DIALOGHI) ***
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
    
    if(npc.npc_name === "Pecora") {
        has_spoken_to_pecora = true;
    }

    if(npc.npc_name === "Pecora" && wall_broken_pecora) {
        let frase_random = frasi_pecora_fase2[Math.floor(Math.random() * frasi_pecora_fase2.length)];
        npc.dialogues = [{ speaker: "npc", text: frase_random }];
    }

    let screen_center_x = 0; 
    let popup_y = 0; 
    
    dialogue_popup = PP.assets.image.add(s, img_dialogue_bg_2, screen_center_x, popup_y, 0, 0);
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
    dialogue_active = false;
    current_npc = null;
    
    if (dialogue_popup) {
        PP.assets.destroy(dialogue_popup); 
        dialogue_popup = null;
    }
    
    if (dialogue_text) { 
        PP.shapes.destroy(dialogue_text); 
        dialogue_text = null; 
    }
    if (dialogue_speaker) { 
        PP.shapes.destroy(dialogue_speaker); 
        dialogue_speaker = null; 
    }
}

function advance_dialogue() {
    if (!dialogue_active) return;
    current_dialogue_index++;
    show_current_dialogue_line();
}

function manage_npc_interaction(s, player) {
    let e_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.E);
    let down_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE); 
    
    let is_input_active = false;
    if (dialogue_active) {
        is_input_active = e_pressed || down_pressed;
    } else {
        is_input_active = e_pressed;
    }
    
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
    if (obj.ph_obj) {
        PP.assets.destroy(obj);
        return;
    }
    if (obj.visibility) obj.visibility.alpha = 0;
    if (obj.geometry) obj.geometry.y = 10000;
}


function create_waterfalls(s) {
    
    let create_column = function(image, anim, x, start_y, limit_y, h, custom_z) {
        
        let z_index = (custom_z !== undefined) ? custom_z : 26; 

        let current_y = start_y;
        while(current_y < limit_y) {
            let w = PP.assets.sprite.add(s, image, x, current_y, 0, 1);
            PP.assets.sprite.animation_add(w, anim, 0, 9, 10, -1);
            PP.assets.sprite.animation_play(w, anim);
            PP.layers.set_z_index(w, z_index); 
            current_y += h - 15;
        }
    };

    create_column(img_waterfall1, "flow1", 1376, 622, 1030, 211);
    create_column(img_waterfall1, "flow1", 4378, -1023, 1030, 211);
    create_column(img_waterfall2, "flow2", 2492, 255, 1030, 210);
    create_column(img_waterfall2, "flow2", 2752, 255, 1030, 210);
    create_column(img_waterfall2, "flow2", 3012, 255, 1030, 210);
    create_column(img_waterfall2, "flow2", 5369, -444, 1030, 210);
    create_column(img_waterfall2, "flow2", 5629, -444, 1030, 210);
    create_column(img_waterfall2, "flow2", 5889, -444, 1030, 210);
    create_column(img_waterfall2, "flow2", 5796, -1005, 1030, 210);

    create_column(img_waterfall5, "flow5", 13493, -888, 1030, 210, 8);
    create_column(img_waterfall5, "flow5", 13678, -888, 1030, 210, 8);
    create_column(img_waterfall5, "flow5", 13862, -888, 1030, 210, 8);

}

function create_smoke(s) {
    let add_smoke = function(x, y) {
        let smoke = PP.assets.sprite.add(s, img_smoke2, x, y, 0, 1);
        
        // --- 0-5 Frame (SICURO PER EVITARE CRASH) ---
        // Se cambi l'immagine con una larga 6000px, puoi rimettere 23 qui.
        PP.assets.sprite.animation_add(smoke, "smoke_anim", 0, 5, 10, -1);
        
        PP.assets.sprite.animation_play(smoke, "smoke_anim");
        PP.layers.set_z_index(smoke, 20); 
    };

    // Coordinate Fumo
    add_smoke(-66, -2270);
    add_smoke(456, -2683);
    add_smoke(809, -2683);
    add_smoke(1160, -2683);
    add_smoke(6146, -2343);

    // Condizionatore (ANIMAZIONE AGGIUNTA)
    let cond = PP.assets.sprite.add(s, img_condizionatore1, 818, -1401, 0, 1);
    
    // Animazione condizionatore (Frame 0-3)
    PP.assets.sprite.animation_add(cond, "spin_cond", 0, 3, 10, -1);
    PP.assets.sprite.animation_play(cond, "spin_cond");
    
    PP.layers.set_z_index(cond, 10);
}

function destroy(s) {
}

PP.scenes.add("lvl2_pt1", preload, create, update, destroy);