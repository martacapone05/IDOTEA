function configure_spruzzo_animations(s, spruzzo) {
    PP.assets.sprite.animation_add(spruzzo, "spray_full", 0, 19, 10, 0); 
}

function configure_waterfall_animations(s, waterfall, foam) {
    // CASCATA: 20 frame totali (5 righe x 4 colonne). Loop infinito (-1)
    PP.assets.sprite.animation_add(waterfall, "flow", 0, 19, 15, -1);
    
    // SCHIUMA: 20 frame totali (4 righe x 5 colonne). Loop infinito (-1)
    PP.assets.sprite.animation_add(foam, "churn", 0, 19, 15, -1);
}


// 1. TRAPPOLA SPRUZZO (A TEMPO)
function create_spruzzo_trap(s, x, y, pause_ms, img_spruzzo, player) {
    let spruzzo = PP.assets.sprite.add(s, img_spruzzo, x, y, 0.5, 1);
    configure_spruzzo_animations(s, spruzzo);

    PP.physics.add(s, spruzzo, PP.physics.type.STATIC);
    PP.physics.set_collision_rectangle(spruzzo, 95, 790, 120, 47);

    spruzzo.visibility.hidden = true; 
    spruzzo.is_active = false; 

    function run_cycle() {
        if (!spruzzo || !spruzzo.ph_obj || !spruzzo.ph_obj.scene) return;

        spruzzo.visibility.hidden = false;
        spruzzo.is_active = false; 
        
        PP.assets.sprite.animation_play(spruzzo, "spray_full");

        PP.timers.add_timer(s, 500, () => {
            if (!spruzzo.visibility.hidden) {
                spruzzo.is_active = true;
            }
        }, false);

        PP.timers.add_timer(s, 1500, () => {
            spruzzo.is_active = false;
        }, false);

        PP.timers.add_timer(s, 2000, () => {
            spruzzo.is_active = false;      
            spruzzo.visibility.hidden = true; 
            PP.timers.add_timer(s, pause_ms, run_cycle, false);
        }, false);
    }

    PP.physics.add_overlap_f(s, player, spruzzo, function(s, player_obj, spruzzo_obj) {
        if (spruzzo_obj.is_active && !player_obj.invulnerable) {
            hit_player(s, player_obj);
        }
    });

    PP.timers.add_timer(s, 100, run_cycle, false);
    return spruzzo;
}

// 2. NUOVA TRAPPOLA CASCATA (CONTINUA)
function create_waterfall_trap(s, x, y, img_waterfall, img_foam, player) {
    
    // A. CASCATA VERTICALE
    // Pivot 0.5, 1 significa che X,Y sono al centro-basso della cascata
    let waterfall = PP.assets.sprite.add(s, img_waterfall, x, y, 0, 1);
    
    // B. SCHIUMA (Posizionata alla base della cascata)
    // La mettiamo esattamente dove finisce la cascata
    let foam = PP.assets.sprite.add(s, img_foam, x - 50, y + 20, 0, 1);

    // Configuriamo le animazioni e facciamole partire subito
    configure_waterfall_animations(s, waterfall, foam); 
    PP.assets.sprite.animation_play(waterfall, "flow");
    PP.assets.sprite.animation_play(foam, "churn");

    // FISICA CASCATA
    PP.physics.add(s, waterfall, PP.physics.type.STATIC);
    // Rimpiccioliamo un po' la hitbox per essere gentili (offset X, Y, W, H)
    // Nota: dovrai aggiustare questi numeri in base alla grandezza reale dell'immagine
    PP.physics.set_collision_rectangle(waterfall, 20, 20, 100, 200); 

    // FISICA SCHIUMA
    PP.physics.add(s, foam, PP.physics.type.STATIC);
    PP.physics.set_collision_rectangle(foam, 10, 10, 100, 50);

    // LOGICA DANNO (La cascata fa SEMPRE male)
    function check_trap_damage(s, player_obj, trap_obj) {
        if (!player_obj.invulnerable) {
            hit_player(s, player_obj);
        }
    }

    PP.physics.add_overlap_f(s, player, waterfall, check_trap_damage);
    PP.physics.add_overlap_f(s, player, foam, check_trap_damage);

    return { waterfall: waterfall, foam: foam };
}


// --- GESTIONE DANNO E GRAFICA ---

function hit_player(s, player) {
    if (player.invulnerable) return;

    player.hp = player.hp - 1;
    console.log("Ahi! Vite rimaste: " + player.hp);
    update_cuore_graphic(player);

    if (player.hp <= 0) {
        console.log("SEI MORTO!");
                // Salva la scena corrente per il respawn
        PP.game_state.set_variable("last_scene", PP.game.current_main_scene_name);
        // Vai alla schermata di Game Over
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

// Funzione per gestire la morte per caduta nel vuoto
function handle_void_death(current_scene_name) {
    PP.game_state.set_variable("last_scene", current_scene_name);
    PP.scenes.start("game_over");
}

function update_cuore_graphic(player) {
    if (player.cuore) {
        if (player.hp == 4) PP.assets.sprite.animation_play(player.cuore, "hp_4");
        if (player.hp == 3) PP.assets.sprite.animation_play(player.cuore, "hp_3");
        if (player.hp == 2) PP.assets.sprite.animation_play(player.cuore, "hp_2");
        if (player.hp == 1) PP.assets.sprite.animation_play(player.cuore, "hp_1");
    }
}


// RENDIAMO GLOBALI LE FUNZIONI PER I MODULI
window.create_spruzzo_trap = create_spruzzo_trap;