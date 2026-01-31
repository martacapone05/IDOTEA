let img_background13;
let img_background14;

let img_player;
let img_info;
let img_colonna_base;
let img_colonna_finale;

// IMMAGINI
let img_avvoltoio;
let img_dialogue_bg;

let img_waterfall3;
let img_waterfall1;
let img_overlay_cascata;
let img_overlay_cascata2;

// IMMAGINI COMANDI
let img_comando_r;
let img_comando_e;

// OGGETTI SFONDO
let background13;
let background14;

let info;
let player;
let floor;

let avvoltoio;
let level_completed = false; 
let scene_ref = null;

// BOTTONI
let btn_r_col1;
let btn_r_col2;
let btn_r_col3;
let btn_r_col4;
let btn_e_avvoltoio;

// VARIABILI SISTEMA DIALOGHI
let npc_list = [];
let dialogue_active = false;
let current_dialogue_index = 0;
let current_npc = null;
let dialogue_popup = null;
let dialogue_text = null;
let dialogue_speaker = null;
let action_key_was_pressed = false; 

const NPC_INTERACTION_RANGE = 300; 

let has_spoken_to_avvoltoio = false;
let is_player_attacking = false;

// VARIABILI LOGICA DISTRUZIONE COLONNE
let next_column_to_break = 2; // Si inizia obbligatoriamente dalla colonna 2

// VARIABILI PER IL SALTO DELL'AVVOLTOIO
let avvoltoio_flying = false;
let fly_start_time = 0;
let fly_duration = 2500;
let fly_height = 300; 
let avvoltoio_flash_timer = 0; // Timer per il lampeggio

let fly_pos_1_start = { x: 1700, y: -6163 }; 
let fly_pos_1_end = { x: 1490, y: -6550 };
let fly_pos_2_start = { x: 1490, y: -6550 }; 
let fly_pos_2_end = { x: 2980, y: -6550 };   
let fly_pos_3_start = { x: 2980, y: -6550 }; 
let fly_pos_3_end = { x: 1000, y: -6550 }; 
let fly_pos_4_start = { x: 1000, y: -6550 };
let fly_pos_4_end = { x: 2500, y: -6550 };
let fly_pos_escape_start = { x: 2500, y: -6550 };
let fly_pos_escape_end = { x: 2555, y: -7476 };

let current_fly_start = { x: 0, y: 0 };
let current_fly_end = { x: 0, y: 0 };
let current_fly_height = 100; 
let avvoltoio_stage = 0; 

let dialogo_avvoltoio = [
    { speaker: "npc", text: "Così… sei arrivato. Il piccolo viaggiatore che crede di poter salvare il mondo." },
    { speaker: "player", text: "Sei tu che hai avvelenato la Fonte. Per decenni l’acqua ha portato morte invece di vita." },
    { speaker: "npc", text: "Morte? Io lo chiamo ordine. L’acqua è potere, Tillidak." },
    { speaker: "player", text: "Per questo il mondo soffoca? Fogne colme di veleno, città che non respirano,\ncampagne avvelenate?" },
    { speaker: "npc", text: "Un prezzo accettabile. La ricchezza non nasce dalla condivisione, ma dalla scarsità.\nChi controlla la Fonte decide chi beve… e chi no. E solo io la possiedo." },
    { speaker: "player", text: "Hai stregato tutti, tramutando il veleno in normalità." },
    { speaker: "npc", text: "Certo. È più facile governare chi ha dimenticato la purezza." },
    { speaker: "player", text: "Non del tutto, il mondo si sta risvegliando. Finché l’acqua esiste e qualcuno ricorda\nla verità, la speranza vive." },
    { speaker: "npc", text: "Allora prova, eroe. Prova a strapparmi ciò che ho conquistato." }
];

function preload(s) {
    preload_hud(s);
    
    img_background13 = PP.assets.image.load(s, "assets/images/sfondi/sfondo13.png");
    img_background14 = PP.assets.image.load(s, "assets/images/sfondi/sfondo14.png");

    img_info = PP.assets.image.load(s, "assets/images/info.png");
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 185, 294);
    img_colonna_base = PP.assets.sprite.load_spritesheet(s, "assets/images/colonna_base_sprite.png", 400, 450);
    img_colonna_finale = PP.assets.sprite.load_spritesheet(s, "assets/images/colonna_finale_sprite.png", 900, 450);
    img_avvoltoio = PP.assets.sprite.load_spritesheet(s, "assets/images/sprite_avvoltoio.png", 746, 533);
    img_dialogue_bg = PP.assets.image.load(s, "assets/images/dialoghi/dialogo4.png");
    
    // CARICAMENTO CASCATE
    img_waterfall3 = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/waterfall3sprites.png", 57, 203);
    img_waterfall1 = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/waterfall1sprites.png", 119, 211);
    img_overlay_cascata = PP.assets.image.load(s, "assets/images/overlay_cascata.png");
    img_overlay_cascata2 = PP.assets.image.load(s, "assets/images/overlay_cascata2.png");

    // CARICAMENTO COMANDI
    img_comando_r = PP.assets.image.load(s, "assets/images/comando_r.png");
    img_comando_e = PP.assets.image.load(s, "assets/images/comando_e.png");

    preload_platforms(s);
    preload_player(s);
}

function create(s) {
    scene_ref = s; 

    PP.game_state.set_variable("last_scene", "lvl3");

    reset_npcs();
    has_spoken_to_avvoltoio = false;
    is_player_attacking = false;
    avvoltoio_flying = false; 
    avvoltoio_stage = 0; 
    level_completed = false;
    current_fly_height = 300;
    
    // Reset sequenza colonne
    next_column_to_break = 2;

    //SFONDI
    
    background13 = PP.assets.tilesprite.add(s, img_background13, 0, 0, 1280, 800, 0, 0);
    background13.tile_geometry.scroll_factor_x = 0;
    background13.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(background13, -102); 

    background14 = PP.assets.tilesprite.add(s, img_background14, 0, 0, 1280, 800, 0, 0);
    background14.tile_geometry.scroll_factor_x = 0;
    background14.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(background14, -101); 


    // CASCATE
    let create_wf3_column = function(x, y_start, y_end) {
        let h = 203; 
        let overlap = 20;
        let stride = h - overlap; 
        let step = (y_end > y_start) ? stride : -stride;
        let cur = y_start;
        let condition = (y_end > y_start) ? () => cur < y_end : () => cur > y_end;

        while (condition()) {
             let w = PP.assets.sprite.add(s, img_waterfall3, x, cur, 0, 1);
             PP.assets.sprite.animation_add(w, "flow3", 0, 9, 10, -1);
             PP.assets.sprite.animation_play(w, "flow3");
             PP.layers.set_z_index(w, -5); 
             cur += step;
        }
    };

    create_wf3_column(-1081, -3147, -700);  
    create_wf3_column(126, 565, -540);      
    create_wf3_column(3796, -931, -100);    
    create_wf3_column(3317, -2094, -1200);  
    create_wf3_column(4763, -3622, -1900);  
    create_wf3_column(5424, -4158, -1900);  
    create_wf3_column(4763, -3322, -4375);  
    create_wf3_column(2574, -5346, -4100); 

    let create_wf1_column = function(x, y_start, y_end) {
        let h = 211; 
        let overlap = 20;
        let stride = h - overlap;
        let cur = y_start;
        while (cur < y_end) {
             let w = PP.assets.sprite.add(s, img_waterfall1, x, cur + h, 0, 1); 
             PP.assets.sprite.animation_add(w, "flow1", 0, 9, 10, -1);
             PP.assets.sprite.animation_play(w, "flow1");
             PP.layers.set_z_index(w, 25); 
             cur += stride;
        }
    };

    create_wf1_column(2860, 670, 1880);

    let wf1_single = PP.assets.sprite.add(s, img_waterfall1, 4544, 264, 0, 1);
    PP.assets.sprite.animation_add(wf1_single, "flow1", 0, 9, 10, -1);
    PP.assets.sprite.animation_play(wf1_single, "flow1");
    PP.layers.set_z_index(wf1_single, 25); 

    let overlay_wf1 = PP.assets.image.add(s, img_overlay_cascata2, 4481, 328, 0, 1);
    PP.layers.set_z_index(overlay_wf1, 26); 

    let wf3_single = PP.assets.sprite.add(s, img_waterfall3, 2284, -6326, 0, 1);
    PP.assets.sprite.animation_add(wf3_single, "flow3", 0, 9, 10, -1);
    PP.assets.sprite.animation_play(wf3_single, "flow3");
    PP.layers.set_z_index(wf3_single, 15); 

    let overlay_wf3 = PP.assets.image.add(s, img_overlay_cascata, 2226, -6271, 0, 1);
    PP.layers.set_z_index(overlay_wf3, 16);


    // SPAWN INIZIALE LVL3

    let start_x = 1000
    let start_y = -6500

    if (PP.game_state.get_variable("punto_di_partenza") == "fine") {
        start_x = -1400; 
        start_y = 600;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }
    else if (PP.game_state.get_variable("punto_di_partenza") == "resume_pause") {
        console.log("Riprendo dalla pausa...");
        start_x = PP.game_state.get_variable("pausa_x");
        start_y = PP.game_state.get_variable("pausa_y");
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }

    player = PP.assets.sprite.add(s, img_player, start_x, start_y, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC);
    PP.physics.set_collision_rectangle(player, 138, 230, 20, 64);
    player.last_column_touch_time = 0;
    
    PP.layers.set_z_index(player, 100); 

    // COLONNE
    // ID assegnati da sinistra a destra (1, 2, 3, 4)
    
    let create_base_column = function(x, y, id) {
        let col = PP.assets.sprite.add(s, img_colonna_base, x, y, 0, 1);
        col.is_broken = false;
        col.id = id; // Assegna ID
        
        PP.assets.sprite.animation_add(col, "base_idle", 0, 0, 1, 0);
        PP.assets.sprite.animation_add(col, "base_break", 0, 43, 18, 0); 
        PP.assets.sprite.animation_play(col, "base_idle");
        col.break_anim_key = "base_break";
        PP.physics.add(s, col, PP.physics.type.STATIC);
        PP.layers.set_z_index(col, 10);
        let sensore = PP.shapes.rectangle_add(s, x + 205, y - 210, 150, 402, "0x00FF00", 0);
        sensore.visibility.visible = false;
        sensore.colonna_collegata = col;
        PP.physics.add(s, sensore, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, sensore, function(scene, p, zone) {
            if (has_spoken_to_avvoltoio) {
                p.current_column = zone.colonna_collegata;
                p.last_column_touch_time = PP.timers.get_time(scene);
            }
        });
        return col;
    };

    let create_final_column = function(x, y, id) {
        let col = PP.assets.sprite.add(s, img_colonna_finale, x, y, 0, 1);
        col.is_broken = false;
        col.id = id; // Assegna ID
        
        PP.assets.sprite.animation_add(col, "final_idle", 0, 0, 1, 0);
        PP.assets.sprite.animation_add(col, "final_break", 0, 51, 18, 0);
        PP.assets.sprite.animation_play(col, "final_idle");
        col.break_anim_key = "final_break";
        PP.physics.add(s, col, PP.physics.type.STATIC);
        PP.layers.set_z_index(col, 10);
        let sensore = PP.shapes.rectangle_add(s, x + 455, y - 210, 150, 402, "0x00FF00", 0);
        sensore.visibility.visible = false;
        sensore.colonna_collegata = col;
        PP.physics.add(s, sensore, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, sensore, function(scene, p, zone) {
            if (has_spoken_to_avvoltoio) {
                p.current_column = zone.colonna_collegata;
                p.last_column_touch_time = PP.timers.get_time(scene);
            }
        });
        return col;
    };

    // Creazione colonne con ID (1, 2, 3, 4 da sinistra a destra)
    create_base_column(1094, -6250, 1); // ID 1
    create_base_column(1594, -6250, 2); // ID 2
    create_base_column(3095, -6250, 4); // ID 4 (Ultima a destra)
    create_final_column(2345, -6245, 3); // ID 3 (Penultima)

    // GGIUNTA BOTTONI (PROMPT)
    
    // Bottone 1 -> Colonna 1
    btn_r_col1 = PP.assets.image.add(s, img_comando_r, 1324, -6400, 0, 0);
    btn_r_col1.visibility.alpha = 0;
    PP.layers.set_z_index(btn_r_col1, 9999);

    // Bottone 2 -> Colonna 2
    btn_r_col2 = PP.assets.image.add(s, img_comando_r, 1824, -6400, 0, 0);
    btn_r_col2.visibility.alpha = 0;
    PP.layers.set_z_index(btn_r_col2, 9999);

    // Bottone 3 -> Colonna 3
    btn_r_col3 = PP.assets.image.add(s, img_comando_r, 2746, -6400, 0, 0);
    btn_r_col3.visibility.alpha = 0;
    PP.layers.set_z_index(btn_r_col3, 9999);

    // Bottone 4 -> Colonna 4
    btn_r_col4 = PP.assets.image.add(s, img_comando_r, 3249, -6400, 0, 0);
    btn_r_col4.visibility.alpha = 0;
    PP.layers.set_z_index(btn_r_col4, 9999);

    // BOTTONE E AVVOLTOIO
    btn_e_avvoltoio = PP.assets.image.add(s, img_comando_e, 2080, -6400, 0, 0);
    btn_e_avvoltoio.visibility.alpha = 0;
    PP.layers.set_z_index(btn_e_avvoltoio, 9999);


    floor = PP.shapes.rectangle_add(s, -500, 620, 3000, 10, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, floor);

    configure_player_animations(s, player); 
    if(typeof create_platforms_lvl3 === "function") create_platforms_lvl3(s, player);

    avvoltoio = PP.assets.sprite.add(s, img_avvoltoio, fly_pos_1_start.x, fly_pos_1_start.y, 0, 1);
    avvoltoio.custom_interaction_area = { min_x: 1600, max_x: 2500, min_y: -6400, max_y: -6000 };
    PP.assets.sprite.animation_add(avvoltoio, "idle", 0, 3, 6, -1);
    PP.assets.sprite.animation_add(avvoltoio, "fly", 5, 19, 10, -1);
    PP.assets.sprite.animation_play(avvoltoio, "idle");
    PP.physics.add(s, avvoltoio, PP.physics.type.STATIC);
    PP.layers.set_z_index(avvoltoio, 20);
    register_npc(avvoltoio, "Avvoltoio", dialogo_avvoltoio);

    create_hud(s, player);
    
    PP.camera.start_follow(s, player, 0, -40); 
    
    player.cam_offset_x = 0; 
    player.cam_target_x = 0;
    
    player.cam_offset_y = -40;
    player.cam_target_y = -40;

    PP.camera.set_deadzone(s, 10, 50);

    info = PP.assets.image.add(s, img_info, 0, 0, 0, 0);
    info.tile_geometry.scroll_factor_x = 0;
    info.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(info, 10000);
}

function update(s) {
    // CAMERA BOUNDS
    PP.camera.set_bounds(s, -1500, -7500, 8600, 8830);


    manage_npc_interaction(s, player);

    // TRIGGER RITORNO A LVL2_PT2
    if (player.geometry.x <= -1480 && player.geometry.y > -1600 ) { 
        PP.game_state.set_variable("punto_di_partenza", "fine");
        PP.scenes.start("lvl2_pt2");
    }

    if (avvoltoio_flying) {
        let elapsed = PP.timers.get_time(s) - fly_start_time;
        let t = Math.min(1, elapsed / fly_duration);
        let current_x = current_fly_start.x + (current_fly_end.x - current_fly_start.x) * t;
        let linear_y = current_fly_start.y + (current_fly_end.y - current_fly_start.y) * t;
        let arc = current_fly_height * 4 * t * (1 - t);
        avvoltoio.geometry.x = current_x;
        avvoltoio.geometry.y = linear_y - arc; 

        // LAMPEGGIO (FLASHING)
        let current_time = PP.timers.get_time(s);
        if (current_time > avvoltoio_flash_timer && avvoltoio_stage >= 2) {
            avvoltoio.visibility.alpha = (avvoltoio.visibility.alpha === 1) ? 0.5 : 1;
            avvoltoio_flash_timer = current_time + 100;
        } else if (avvoltoio_stage < 2) {
            // Se siamo al primo volo (stage 1), assicuriamoci che l'alpha sia 1
            avvoltoio.visibility.alpha = 1;
        }

        if (t >= 1) {
            avvoltoio_flying = false;
            avvoltoio.visibility.alpha = 1; // Reset visibilità
            PP.assets.sprite.animation_play(avvoltoio, "idle");
            if (avvoltoio_stage === 5 && !level_completed) {
                level_completed = true;
                PP.timers.add_timer(s, 2000, function() {
                    PP.scenes.start("tavole_finali");
                }, false);
            }
        }
    }

    if (PP.interactive.kb.is_key_down(s, PP.key_codes.R)) {
        let is_near_column = (PP.timers.get_time(s) - player.last_column_touch_time) < 100;
        
        // CONTROLLO AGGIUNTIVO: ORDINE COLONNE
        let is_correct_column = false;
        if (player.current_column && player.current_column.id === next_column_to_break) {
            is_correct_column = true;
        }

        if (!is_player_attacking && is_near_column && has_spoken_to_avvoltoio && player.current_column && !player.current_column.is_broken && is_correct_column) {
            is_player_attacking = true;
            player.is_acting = true; 
            PP.physics.set_velocity_x(player, 0);
            PP.assets.sprite.animation_play(player, "piccone");
            PP.timers.add_timer(s, 500, function() {
                if(player.current_column) {
                    player.current_column.is_broken = true;
                    
                    // DISTRUZIONE BOTTONE SPECIFICO
                    if (player.current_column.id === 1) safe_destroy(btn_r_col1);
                    if (player.current_column.id === 2) safe_destroy(btn_r_col2);
                    if (player.current_column.id === 3) safe_destroy(btn_r_col3);
                    if (player.current_column.id === 4) safe_destroy(btn_r_col4);

                    PP.assets.sprite.animation_play(player.current_column, player.current_column.break_anim_key);
                    
                    // AGGIORNA IL PROSSIMO OBIETTIVO (Ordine: 2 -> 4 -> 1 -> 3)
                    if (player.current_column.id === 2) next_column_to_break = 4;
                    else if (player.current_column.id === 4) next_column_to_break = 1;
                    else if (player.current_column.id === 1) next_column_to_break = 3;
                    else if (player.current_column.id === 3) next_column_to_break = -1; // Finito

                    PP.timers.add_timer(s, 1000, function() {
                        if (avvoltoio_stage === 1) { avvoltoio_stage = 2; current_fly_start = fly_pos_2_start; current_fly_end = fly_pos_2_end; current_fly_height = 300; }
                        else if (avvoltoio_stage === 2) { avvoltoio_stage = 3; current_fly_start = fly_pos_3_start; current_fly_end = fly_pos_3_end; current_fly_height = 300; }
                        else if (avvoltoio_stage === 3) { avvoltoio_stage = 4; current_fly_start = fly_pos_4_start; current_fly_end = fly_pos_4_end; current_fly_height = 300; }
                        else if (avvoltoio_stage === 4) { avvoltoio_stage = 5; current_fly_start = fly_pos_escape_start; current_fly_end = fly_pos_escape_end; current_fly_height = -300; }
                        
                        fly_start_time = PP.timers.get_time(s);
                        avvoltoio_flying = true;
                        
                        // Attiva lampeggio
                        avvoltoio_flash_timer = PP.timers.get_time(s);
                        
                        PP.assets.sprite.animation_play(avvoltoio, "fly");
                    }, false);
                }
                PP.timers.add_timer(s, 500, function() { is_player_attacking = false; player.is_acting = false; }, false);
            }, false);
        }
    }

    if (!is_dialogue_active() && !is_player_attacking) manage_player_update(s, player);
    else if (is_dialogue_active()) { PP.physics.set_velocity_x(player, 0); PP.assets.sprite.animation_play(player, "idle"); }

    // LOGICA CAMERA COMPLETA (X + Y)
    let vel_x = PP.physics.get_velocity_x(player);
    if (vel_x > 50) player.cam_target_x = -200;
    else if (vel_x < -50) player.cam_target_x = 200;
    else player.cam_target_x = 0;

    player.cam_offset_x += (player.cam_target_x - player.cam_offset_x) * 0.03;

    if (player.geometry.y < -5800) { 
        player.cam_target_y = 270; // Molto in alto
    } else {
        player.cam_target_y = 40;  // Normale
    }
    
    player.cam_offset_y += (player.cam_target_y - player.cam_offset_y) * 0.02;

    PP.camera.set_follow_offset(s, player.cam_offset_x, player.cam_offset_y);

    // AGGIORNAMENTO PARALLASSE
    let scroll_x = PP.camera.get_scroll_x(s);
    
    // SOTTRAGGO UN OFFSET PER SPOSTARE LA TEXTURE A SINISTRA
    background14.tile_geometry.x = (scroll_x * 0.08) + 500; 

    if (player.geometry.y > 2000) {
        PP.game_state.set_variable("last_scene", "lvl3");
        PP.scenes.start("game_over");
    }

    // GESTIONE VISIBILITÀ BOTTONI COLONNE
    // Mostra solo se vicino, non attaccando e se è il turno giusto
    
    // Bottone 1
    if (btn_r_col1 && btn_r_col1.ph_obj) { // Check extra se è già distrutto
        let d = Math.abs(player.geometry.x - 1324);
        if (d < 400 && !is_player_attacking && next_column_to_break === 1 && has_spoken_to_avvoltoio) btn_r_col1.visibility.alpha = 1;
        else btn_r_col1.visibility.alpha = 0;
    }

    // Bottone 2
    if (btn_r_col2 && btn_r_col2.ph_obj) {
        let d = Math.abs(player.geometry.x - 1824);
        if (d < 400 && !is_player_attacking && next_column_to_break === 2 && has_spoken_to_avvoltoio) btn_r_col2.visibility.alpha = 1;
        else btn_r_col2.visibility.alpha = 0;
    }

    // Bottone 3
    if (btn_r_col3 && btn_r_col3.ph_obj) {
        let d = Math.abs(player.geometry.x - 2746);
        if (d < 400 && !is_player_attacking && next_column_to_break === 3 && has_spoken_to_avvoltoio) btn_r_col3.visibility.alpha = 1;
        else btn_r_col3.visibility.alpha = 0;
    }

    // Bottone 4
    if (btn_r_col4 && btn_r_col4.ph_obj) {
        let d = Math.abs(player.geometry.x - 3249);
        if (d < 400 && !is_player_attacking && next_column_to_break === 4 && has_spoken_to_avvoltoio) btn_r_col4.visibility.alpha = 1;
        else btn_r_col4.visibility.alpha = 0;
    }

    // GESTIONE BOTTONE E (AVVOLTOIO)
    if (btn_e_avvoltoio) {
        let p = player.geometry;
        // Controllo se il player è nell'area
        let in_area = (p.x >= 1600 && p.x <= 2500 && p.y >= -6400 && p.y <= -6000);
        
        // Deve essere nell'area E il dialogo non deve essere attivo E non deve aver già parlato
        if (in_area && !dialogue_active && !has_spoken_to_avvoltoio) {
            btn_e_avvoltoio.visibility.alpha = 1;
        } else {
            btn_e_avvoltoio.visibility.alpha = 0;
        }
    }
}

function register_npc(sprite_obj, name, dialogues) {
    sprite_obj.npc_name = name;
    sprite_obj.dialogues = dialogues;
    sprite_obj.interaction_range = NPC_INTERACTION_RANGE;
    npc_list.push(sprite_obj);
}

function reset_npcs() { npc_list = []; close_dialogue_popup(); action_key_was_pressed = false; }

function is_player_near_npc(player, npc) {
    if (npc.custom_interaction_area) {
        let area = npc.custom_interaction_area;
        return (player.geometry.x >= area.min_x && player.geometry.x <= area.max_x && 
                player.geometry.y >= area.min_y && player.geometry.y <= area.max_y);
    }
    return Math.abs(player.geometry.x - npc.geometry.x) < 300; 
}

function get_nearest_interactable_npc(player) {
    for (let npc of npc_list) {
        if (is_player_near_npc(player, npc)) {
            if (npc.npc_name === "Avvoltoio" && has_spoken_to_avvoltoio) continue;
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
    if(npc.npc_name === "Avvoltoio") has_spoken_to_avvoltoio = true;
    dialogue_popup = PP.assets.image.add(s, img_dialogue_bg, 0, 0, 0, 0);
    dialogue_popup.tile_geometry.scroll_factor_x = 0;
    dialogue_popup.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_popup, 10001);
    dialogue_speaker = PP.shapes.text_styled_add(s, 260, 32, "", 22, "Luminari", "bold", "0xa430b3", null, 0, 0);
    dialogue_speaker.tile_geometry.scroll_factor_x = 0;
    dialogue_speaker.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_speaker, 10005);
    dialogue_text = PP.shapes.text_styled_add(s, 260, 87, "", 20, "Avenir", "normal", "0xffffff", null, 0, 0);
    dialogue_text.tile_geometry.scroll_factor_x = 0;
    dialogue_text.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_text, 10005);
    show_current_dialogue_line();
}

function show_current_dialogue_line() {
    if (!current_npc || current_dialogue_index >= current_npc.dialogues.length) {
        let name = current_npc ? current_npc.npc_name : "";
        close_dialogue_popup();
        if(name === "Avvoltoio") {
            avvoltoio_stage = 1; current_fly_start = fly_pos_1_start; current_fly_end = fly_pos_1_end;
            avvoltoio_flying = true; fly_start_time = PP.timers.get_time(scene_ref);
            PP.assets.sprite.animation_play(avvoltoio, "fly");
        }
        return;
    }
    let line = current_npc.dialogues[current_dialogue_index];
    PP.shapes.text_change(dialogue_speaker, (line.speaker === "npc") ? current_npc.npc_name : "Tillidak");
    PP.shapes.text_change(dialogue_text, line.text);
}

function close_dialogue_popup() {
    if (!dialogue_active) return;
    dialogue_active = false;
    if (dialogue_popup) { PP.assets.destroy(dialogue_popup); dialogue_popup = null; }
    if (dialogue_text) { PP.shapes.destroy(dialogue_text); dialogue_text = null; }
    if (dialogue_speaker) { PP.shapes.destroy(dialogue_speaker); dialogue_speaker = null; }
}

function advance_dialogue() { current_dialogue_index++; show_current_dialogue_line(); }

function manage_npc_interaction(s, player) {
    let e = PP.interactive.kb.is_key_down(s, PP.key_codes.E);
    let sp = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE); 
    let input = dialogue_active ? (e || sp) : e;
    if (input && !action_key_was_pressed) {
        if (dialogue_active) advance_dialogue();
        else { let npc = get_nearest_interactable_npc(player); if (npc) open_dialogue_popup(s, npc); }
    }
    action_key_was_pressed = input;
}

function is_dialogue_active() { return dialogue_active; }

function safe_destroy(obj) {
    if (!obj) return;
    if (obj.ph_obj) {
        PP.assets.destroy(obj);
        return;
    }
    if (obj.visibility) obj.visibility.alpha = 0;
    if (obj.geometry) obj.geometry.y = 10000;
}

function destroy(s) {}

PP.scenes.add("lvl3", preload, create, update, destroy);