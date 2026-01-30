let img_background1;
let img_background2;
let img_background3;
let img_background4;
let img_player;
let img_info;

// Variabili per oggetti animati
let img_waterfall;
let img_waterfall2;
let img_waterfall_off; 
let img_waterfall_on;  
let waterfall_segments = []; 
let img_insegna_vertical;
let img_condizionatore; 
let img_vending_machine;
let img_cat;
let img_sgabelli;
let img_muro_rompibile;

// NUOVA VARIABILE SCALA
let img_ladder_vera; 

// SFONDO DIALOGO
let img_dialogue_bg; 

let background1;
let background2;
let background3;
let background4
let info;

let player;
let floor;

// Variabile per la zona funivia
let funivia_zone; 
let wf_damage_zone; 

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
let has_spoken_to_cat = false;
let waterfall_sequence_triggered = false;
let cat_npc_ref = null; 

// DEFINIZIONE DIALOGHI
let dialoghi_gatto_fase1 = [
    { speaker: "npc", text: "Oh, buonasera, giovane minatore! Forse tu puoi aiutarmi, nè?\nQuesto scarico d'acqua sta riversando proprio davanti alla mia\nbancarella, e io non so proprio come fare." },
    { speaker: "npc", text: "Forse è colpa di quell'ostacolo che ha deviato il flusso, sì sì…" }
];

let dialoghi_gatto_fase2 = [
    { speaker: "npc", text: "Ah! Ottima tecnica di spalla, wakamono, molto bene!\nCome dice il sensei: l'acqua che scorre lenta,\ncol tempo modella anche la roccia." },
    { speaker: "npc", text: "Prima o poi avrebbe danneggiato il mio umile mise, nè…" },
    { speaker: "player", text: "Quella non è acqua, sono residui chimici.\nNon dovrebbero scorrere a cielo aperto, è veleno!" },
    { speaker: "npc", text: "Ma è l'unico modo che ho per cucinare il mio ramen, anche se…\nun tempo, ho l'impressione che il sapore fosse migliore, sì…" },
    { speaker: "player", text: "È colpa di un incantesimo che ha avvelenato la Fonte.\nIl mondo non deve essere così, e io posso spezzare tutto questo\nse raggiungo la Fonte Eterna." },
    { speaker: "npc", text: "Ara… dunque sono le nostre menti a essere state modellate…\nHayaku, wakamono! Ike, ike!" }
];


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
    
    // NUOVE SPRITE CASCATA
    img_waterfall_off = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/waterfall1offsprites.png", 119, 211);
    img_waterfall_on = PP.assets.sprite.load_spritesheet(s, "assets/images/traps/waterfall1onsprites.png", 119, 211);

    img_insegna_vertical = PP.assets.sprite.load_spritesheet(s, "assets/images/insegna_vertical.png", 173, 225);
    img_condizionatore = PP.assets.sprite.load_spritesheet(s, "assets/images/condizionatore1.png", 132, 102);
    img_vending_machine = PP.assets.sprite.load_spritesheet(s, "assets/images/vending_machine.png", 180, 365);
    img_cat = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_cat.png", 150, 150);
    img_sgabelli = PP.assets.image.load(s, "assets/images/sgabelli.png");
    
    // CARICAMENTO MURO
    img_muro_rompibile = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_muro.png", 364, 354);

    // CARICAMENTO SCALA VERA
    img_ladder_vera = PP.assets.image.load(s, "assets/images/ladder_vera.png");

    // CARICAMENTO SFONDO DIALOGO
    img_dialogue_bg = PP.assets.image.load(s, "assets/images/dialoghi/dialogo2.png");

    preload_platforms(s);
    preload_player(s);
}


function create(s) {
    
    reset_npcs(); 
    has_spoken_to_cat = false;
    waterfall_sequence_triggered = false;

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

    // ===============================================
    // *** SCALA PER TORNARE INDIETRO (-700, 1300) ***
    // ===============================================
    let ladder_exit = PP.assets.image.add(s, img_ladder_vera, -700, 1300, 0, 1);
    PP.layers.set_z_index(ladder_exit, 20);
    PP.physics.add(s, ladder_exit, PP.physics.type.STATIC);

    // *** CASCATA ORIGINALE (VISIVA) - QUELLA CHE DEVE SPARIRE ***
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

    // ===============================================
    // *** NPC GATTO (Ora Interagibile) ***
    // ===============================================
    let cat = PP.assets.sprite.add(s, img_cat, 4209, -2103, 0, 1);
    PP.assets.sprite.animation_add(cat, "idle_cat", 0, 5, 10, -1);
    PP.assets.sprite.animation_play(cat, "idle_cat");
    PP.physics.add(s, cat, PP.physics.type.STATIC); 
    PP.layers.set_z_index(cat, 20);

    // REGISTRAZIONE GATTO CON FASE 1
    register_npc(cat, "Gatto", dialoghi_gatto_fase1);
    cat_npc_ref = cat; 
    // ===============================================

    let sgabelli = PP.assets.image.add(s, img_sgabelli, 4203, -2045, 0, 1);
    PP.layers.set_z_index(sgabelli, 21);


    // *** GESTIONE PUNTO DI PARTENZA ***
    let start_x = -100;
    let start_y = 600;

    if (PP.game_state.get_variable("punto_di_partenza") == "funivia_ritorno") {
        console.log("Spawn alla stazione della funivia (Ritorno)!");
        start_x = 7099; 
        start_y = -4000;
        PP.game_state.set_variable("punto_di_partenza", "inizio");
    }

    // ===============================================
    // *** CREAZIONE PLAYER (SPOSTATO PRIMA DEL MURO) ***
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

    // ===============================================
    // *** LOGICA SCALA (SPOSTATA DOPO IL PLAYER) ***
    // ===============================================
    PP.physics.add_overlap_f(s, player, ladder_exit, function(scene, p, l) {
        
        // <<< MODIFICA RICHIESTA: ABILITA ARRAMPICATA >>>
        p.can_climb = true; 
        // ------------------------------------------

        // Se preme E torna indietro
        if (PP.interactive.kb.is_key_down(scene, PP.key_codes.E)) {
            console.log("Torno al livello 1...");
            PP.game_state.set_variable("punto_di_partenza", "fine");
            PP.scenes.start("lvl1_pt1");
        }
    });


    // ===============================================
    // *** MURO ROMPIBILE ***
    // ===============================================
    let x_muro = 4574;
    let y_muro = -2026;
    
    let muro = PP.assets.sprite.add(s, img_muro_rompibile, x_muro, y_muro, 0, 1);
    muro.is_broken = false;
    
    // *** Z-INDEX 25 ***
    PP.layers.set_z_index(muro, 26); 
    
    PP.assets.sprite.animation_add(muro, "break", 0, 22, 10, 0);
    PP.assets.sprite.animation_add(muro, "idle", 0, 0, 1, 0);
    PP.assets.sprite.animation_play(muro, "idle");
    PP.physics.add(s, muro, PP.physics.type.STATIC);
    
    s.muro_oggett = muro;

    // *** SENSORE MURO RIDIMENSIONATO
    let sensore_width = 236;
    let sensore_height = 252;
    let sensore_x = 4734;
    let sensore_y = -2175;

    let sensore = PP.shapes.rectangle_add(s, sensore_x, sensore_y, sensore_width, sensore_height, "0x00FF00", 0);
    sensore.visibility.alpha = 0;
    sensore.muro_collegato = muro;
    PP.physics.add(s, sensore, PP.physics.type.STATIC);

    let on_sensore_overlap = function(s, p, obj_sensore) {
        if (!has_spoken_to_cat) return;
        p.near_breakable_wall = true;
        p.current_wall = obj_sensore.muro_collegato; 
    };
    PP.physics.add_overlap_f(s, player, sensore, on_sensore_overlap);
    // ===============================================


    // ==========================================================
    // *** COLLIDER DANNO CASCATA ***
    // ==========================================================
    let wf_height_total = Math.abs(wf_y_end - wf_y_start) + 200; 
    let wf_center_y = wf_y_start + (wf_height_total / 2);
    let wf_center_x = wf_x + (119 / 2); 

    wf_damage_zone = PP.shapes.rectangle_add(s, wf_center_x, wf_center_y, 90, wf_height_total, "0xFF0000", 0);
    PP.physics.add(s, wf_damage_zone, PP.physics.type.STATIC);

    PP.physics.add_overlap_f(s, player, wf_damage_zone, function(scene, p, zone) {
        if (!p.invulnerable) {
            let knock_dir = (p.geometry.x < zone.geometry.x) ? -1 : 1;
            PP.physics.set_velocity_x(p, -800 * knock_dir);
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
        if (PP.interactive.kb.is_key_down(scene, PP.key_codes.E)) {
            console.log("Andata con funivia -> lvl2_pt1");
            PP.scenes.start("lvl2_pt1");
        }
    });

    // CAMERA
    PP.camera.start_follow(s, player, 0, -40);

    if(s.cameras && s.cameras.main) {s.cameras.main.setBounds(-1232, -5125, 10000, 6500)}

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
    // 1. GESTIONE INPUT DIALOGHI
    manage_npc_interaction(s, player);

    // 2. GESTIONE EVENTO ROTTURA MURO
    if (s.muro_oggett && s.muro_oggett.is_broken && !waterfall_sequence_triggered) {
        waterfall_sequence_triggered = true;
        
        // Aspetta che l'animazione del muro finisca (2300ms)
        PP.timers.add_timer(s, 2300, function() {
            
            // >>> MODIFICA RICHIESTA: DISTRUGGI IL MURO ALLA FINE DELL'ANIMAZIONE <<<
            safe_destroy(s.muro_oggett); 
            // -----------------------------------------------------------------------

            // A. CAMBIA DIALOGO GATTO -> FASE 2
            if (cat_npc_ref) {
                cat_npc_ref.dialogues = dialoghi_gatto_fase2;
            }

            // B. RIMUOVI COLLIDER DANNO
            if (wf_damage_zone) {
                PP.shapes.destroy(wf_damage_zone); 
                wf_damage_zone = null;
            }

            // C. ANIMAZIONE CASCATA VECCHIA CHE SCENDE
            waterfall_segments.forEach((seg, index) => {
                
                // <<< TIMER VELOCIZZATO A 400ms >>>
                PP.timers.add_timer(s, index * 400, function() {
                    let x = seg.geometry.x;
                    let y = seg.geometry.y;
                    
                    safe_destroy(seg);

                    let seg_off = PP.assets.sprite.add(s, img_waterfall_off, x, y, 0, 0);
                    // <<< ANIMAZIONE VELOCIZZATA A 20 FPS >>>
                    PP.assets.sprite.animation_add(seg_off, "play_off", 0, 7, 15, 0);
                    PP.assets.sprite.animation_play(seg_off, "play_off");
                    PP.layers.set_z_index(seg_off, 30);

                    // <<< DISTRUZIONE DOPO 400ms (8 frame / 20 fps) >>>
                    PP.timers.add_timer(s, 400, function() {
                        safe_destroy(seg_off); 
                    }, false);

                }, false);
            });

            // D. NUOVA CASCATA CHE APPARE
            let new_wf = PP.assets.sprite.add(s, img_waterfall_on, 4677, -2066, 0, 1);
            PP.layers.set_z_index(new_wf, 20);
            PP.assets.sprite.animation_add(new_wf, "appear", 0, 7, 10, 0);
            PP.assets.sprite.animation_play(new_wf, "appear");

            PP.timers.add_timer(s, 800, function() {
                safe_destroy(new_wf); 
                
                let final_wf = PP.assets.sprite.add(s, img_waterfall, 4677, -2066, 0, 1);
                PP.layers.set_z_index(final_wf, 20);
                PP.assets.sprite.animation_add(final_wf, "loop_forever", 0, 7, 10, -1);
                PP.assets.sprite.animation_play(final_wf, "loop_forever");
            }, false);

        }, false);
    }


    // 3. GESTIONE MOVIMENTO E IDLE
    if (is_dialogue_active()) {
        PP.physics.set_velocity_x(player, 0);
        PP.assets.sprite.animation_play(player, "idle");
    } else {
        manage_player_update(s, player);
    }

    let vel_x = PP.physics.get_velocity_x(player);
    if (vel_x > 50) player.cam_target_x = -200;
    else if (vel_x < -50) player.cam_target_x = 200;
    else player.cam_target_x = 0;

    player.cam_offset_x += (player.cam_target_x - player.cam_offset_x) * 0.03;

    // LOGICA CAMERA Y

    if (player.geometry.x > 2000 && player.geometry.x < 5700 &&
        player.geometry.y < -1700 && player.geometry.y > -2500) {
        player.cam_target_y = 200;
    }
    else if (player.geometry.x > 4900 && player.geometry.x < 5690 &&
    player.geometry.y < 200 && player.geometry.y > -600) {
    player.cam_target_y = -40;
    }
    else if (player.geometry.x > 2000 && player.geometry.x < 5700 &&
    player.geometry.y < -3550 && player.geometry.y > -4200) {
    player.cam_target_y = -40;
    }
    else if (player.geometry.x > 2000 && player.geometry.x < 5700 &&
    player.geometry.y < -3550 && player.geometry.y > -4200) {
    player.cam_target_y = -40;
    }
    else if (player.geometry.x > 5750 && player.geometry.x < 8500) {
        player.cam_target_y = 200;
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

    let hp = PP.game_state.get_variable("player_hp");
    hp = hp - 1;
    PP.game_state.set_variable("player_hp", hp);
    player.hp = hp; 

    console.log("Ahi! Vite rimaste: " + hp);
    
    if(typeof update_cuore_graphic === "function") update_cuore_graphic(player);

    if (hp <= 0) {
        console.log("SEI MORTO!");
        PP.game_state.set_variable("last_scene", "lvl1_pt2");
        PP.scenes.start("game_over");  
    } else {
        PP.physics.set_velocity_y(player, -400); 
        player.invulnerable = true;

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

        PP.timers.add_timer(s, 2000, function() {
            player.invulnerable = false;
            player.visibility.alpha = 1;
        }, false);
    }
}

function destroy(s) {
}

PP.scenes.add("lvl1_pt2", preload, create, update, destroy);

// ==========================================================
// *** SISTEMA DIALOGHI E NPC ***
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
    dialogue_active = true;
    current_npc = npc;
    current_dialogue_index = 0;
    
    has_spoken_to_cat = true; 

    let screen_center_x = 0; 
    let popup_y = 0; 
    
    dialogue_popup = PP.assets.image.add(s, img_dialogue_bg, screen_center_x, popup_y, 0, 0);
    dialogue_popup.visibility.alpha = 0.85;
    dialogue_popup.tile_geometry.scroll_factor_x = 0;
    dialogue_popup.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_popup, 10001);
    
    let text_padding_left = 260;  
    let text_padding_top = 32;   

    dialogue_speaker = PP.shapes.text_styled_add(s, text_padding_left, text_padding_top, "", 22, "Avenir", "bold", "0x01AA03", null, 0, 0);
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
    current_dialogue_index = 0;
    
    safe_destroy(dialogue_popup);
    dialogue_popup = null;
    
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

// *** FUNZIONE SAFE DESTROY (IMPORTANTE!) ***
function safe_destroy(obj) {
    if (!obj) return;
    
    // Prova 1: Metodo destroy diretto
    if (typeof obj.destroy === 'function') {
        obj.destroy();
        return;
    }
    
    // Prova 2: Oggetto Phaser interno
    if (obj.ph_obj && typeof obj.ph_obj.destroy === 'function') {
        obj.ph_obj.destroy();
        return;
    }
    
    // Prova 3: Se è uno sprite interno
    if (obj.sprite && typeof obj.sprite.destroy === 'function') {
        obj.sprite.destroy();
        return;
    }

    // Fallback: Nascondi e sposta via
    if (obj.visibility) obj.visibility.alpha = 0;
    if (obj.geometry) obj.geometry.y = 10000;
}