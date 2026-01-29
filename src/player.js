let player_speed = 550;
let jump_speed = 1350;
let floor_height = 620; 
let climb_speed = 450; 

// MODIFICA 1: Iniziamo con "idle" invece di "stop"
let curr_anim = "idle"; 

function preload_player(s) {
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 185, 294);
}

function configure_player_animations(s, player) {
    PP.assets.sprite.animation_add(player, "run", 0, 7, 9, -1);         
    PP.assets.sprite.animation_add(player, "jump_up", 10, 12, 8, 0);
    PP.assets.sprite.animation_add_list(player, "jump_down", [14, 13, 15, 16, 17, 18], 8, 0);
    
    // MODIFICA 2: Definizione dell'animazione IDLE
    // Sostituisci 0 e 3 con i tuoi frame di inizio e fine per l'idle.
    // Il parametro -1 alla fine significa "loop infinito" (continua a ripetersi)
    PP.assets.sprite.animation_add_list(player, "idle", [24, 25, 26, 25], 6, -1);
    
    PP.assets.sprite.animation_add(player, "climb", 27, 34, 8, -1);
    PP.assets.sprite.animation_add_list(player, "piccone", [19, 20, 21, 22, 23, 22, 21, 20, 19], 12, 1);

    player.hp = 4;                  
    player.invulnerable = false;
    player.is_acting = false; 
    
    player.can_climb = false; 
    player.is_on_platform = false;
    player.is_head_blocked = false; 
    
    player.auto_move_target = null; 
}

function manage_player_update(s, player) {
    
    if ((typeof is_dialogue_active === 'function' && is_dialogue_active()) || player.is_acting) {
        PP.physics.set_velocity_x(player, 0);
        
        // Opzionale: se sta parlando o agendo ma non picconando, assicuriamoci che sia in idle
        if (!player.is_acting && curr_anim !== "idle") {
             PP.assets.sprite.animation_play(player, "idle");
             curr_anim = "idle";
        }
        return;
    }

    let next_anim = curr_anim;
    let is_auto_walking = false;

    // MOVIMENTO AUTOMATICO
    if (typeof player.auto_move_target === "number") {
        if (player.geometry.x < player.auto_move_target) {
            PP.physics.set_velocity_x(player, player_speed);
            player.geometry.flip_x = false;
            next_anim = "run";
            is_auto_walking = true;
        } else {
            player.auto_move_target = null;
            PP.physics.set_velocity_x(player, 0);
        }
    }

    // CONTROLLI MANUALI
    if (!is_auto_walking) {
        
        // INPUT SCALA
        if (player.can_climb && PP.interactive.kb.is_key_down(s, PP.key_codes.UP)) {
            PP.physics.set_velocity_y(player, -climb_speed);
            PP.physics.set_velocity_x(player, 0);
        }
        else {
            // INPUT ORIZZONTALE
            if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
                PP.physics.set_velocity_x(player, player_speed);
                player.geometry.flip_x = false;
                next_anim = "run";
            }
            else if(PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
                PP.physics.set_velocity_x(player, -player_speed);
                player.geometry.flip_x = true;
                next_anim = "run";
            } else {
                PP.physics.set_velocity_x(player, 0);
                // MODIFICA 3: Se non preme nulla, l'animazione successiva è "idle"
                next_anim = "idle";
            }
        }

        // PARETE ROMPIBILE
        if (player.near_breakable_wall && player.current_wall) {
            let muro = player.current_wall;
            if (PP.interactive.kb.is_key_down(s, PP.key_codes.R) && !muro.is_broken && player.geometry.flip_x === false) { 
                muro.is_broken = true;
                PP.physics.set_velocity_x(player, 0);
                PP.physics.set_velocity_y(player, 0); 
                PP.assets.sprite.animation_play(player, "piccone");
                curr_anim = "piccone";
                PP.assets.sprite.animation_play(muro, "break");
                PP.timers.add_timer(s, 1400, function() {
                    if(muro) PP.physics.set_collision_rectangle(muro, 0, 0, -10000, -10000);
                }, false);
                player.is_acting = true;
                PP.timers.add_timer(s, 1500, function() {
                    player.is_acting = false; 
                    // MODIFICA 4: Finita l'azione, torna in "idle"
                    PP.assets.sprite.animation_play(player, "idle");
                    curr_anim = "idle";
                }, false);
                player.near_breakable_wall = false;
                player.current_wall = null;
                return; 
            }
        }
        
        // --- SALTO ---
        let vel_y = PP.physics.get_velocity_y(player);
        let is_stable = Math.abs(vel_y) < 10;
        let is_on_floor = (player.geometry.y >= 610);
        let can_jump = is_stable && (is_on_floor || player.is_on_platform) && !player.is_head_blocked;

        if (can_jump) {
            if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
                PP.physics.set_velocity_y(player, -jump_speed);
            }
        }
    }

    // LOGICA ANIMAZIONI
    let current_vel_y = PP.physics.get_velocity_y(player);
    let is_climbing_detected = (Math.abs(current_vel_y + climb_speed) < 10); 

    if (is_climbing_detected) {
        next_anim = "climb";
    } 
    else {
        if(current_vel_y < -10) {
            next_anim = "jump_up";
        }
        else if(current_vel_y > 10) {
            next_anim = "jump_down";
        }
    }

    // APPLICA ANIMAZIONE
    if(next_anim != curr_anim) {
        PP.assets.sprite.animation_play(player, next_anim);
        curr_anim = next_anim;
    }

    if (PP.physics.get_velocity_x(player) < 0) player.geometry.flip_x = true;
    else if (PP.physics.get_velocity_x(player) > 0) player.geometry.flip_x = false;

    // GESTIONE DINAMICA COLLISIONE
    if (Math.abs(current_vel_y) > 50 && !is_climbing_detected) {
        PP.physics.set_collision_rectangle(player, 138, 230, 20, 64);
    } else {
        PP.physics.set_collision_rectangle(player, 138, 230, 20, 64);
    }

    // Reset flags
    player.can_climb = false; 
    player.near_breakable_wall = false;
    player.current_wall = null;
    player.is_on_platform = false; 
    player.is_head_blocked = false;
}