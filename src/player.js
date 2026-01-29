let player_speed = 550;
let jump_speed = 1350;
let floor_height = 620; 
let climb_speed = 450; 

let curr_anim = "stop"; 

function preload_player(s) {
    // Larghezza 165 come richiesto
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 165, 263);
}

function configure_player_animations(s, player) {
    PP.assets.sprite.animation_add(player, "run", 0, 7, 9, -1);         
    PP.assets.sprite.animation_add(player, "jump_up", 10, 12, 8, 0);
    PP.assets.sprite.animation_add_list(player, "jump_down", [14, 13, 15, 16, 17, 18], 8, 0);
    PP.assets.sprite.animation_add(player, "stop", 0, 0, 8, 0);
    
    // Loop infinito (-1) per la scala
    PP.assets.sprite.animation_add(player, "climb", 27, 34, 8, -1);
    
    PP.assets.sprite.animation_add(player, "piccone", 19, 23, 10, 0);

    player.hp = 4;                  
    player.invulnerable = false;
    player.is_acting = false; 
    
    // Reset flags
    player.can_climb = false; 
    player.is_on_platform = false;
    player.is_head_blocked = false; 
    
    player.auto_move_target = null; 
}

function manage_player_update(s, player) {
    
    // BLOCCO PRIORITARIO (Dialoghi/Picconata)
    if ((typeof is_dialogue_active === 'function' && is_dialogue_active()) || player.is_acting) {
        PP.physics.set_velocity_x(player, 0);
        return;
    }

    let next_anim = curr_anim;
    let is_auto_walking = false;

    // MOVIMENTO AUTOMATICO (Cutscene/Intro)
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

    // 3. CONTROLLI MANUALI
    if (!is_auto_walking) {
        
        // INPUT SCALA (Priorità su Salto e Movimento X)
        if (player.can_climb && PP.interactive.kb.is_key_down(s, PP.key_codes.UP)) {
            PP.physics.set_velocity_y(player, -climb_speed);
            PP.physics.set_velocity_x(player, 0); // Blocco X per stabilità
            // Non impostiamo l'animazione qui, ci pensa la logica di velocità sotto
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
                next_anim = "stop";
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
                PP.timers.add_timer(s, 500, function() {
                    player.is_acting = false; 
                    PP.assets.sprite.animation_play(player, "stop");
                    curr_anim = "stop";
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

    // LOGICA ANIMAZIONI (BASATA SU VELOCITÀ REALE)
    let current_vel_y = PP.physics.get_velocity_y(player);

    // Rileva se stiamo effettivamente scalando (velocità Y ~= -climb_speed)
    let is_climbing_detected = (Math.abs(current_vel_y + climb_speed) < 10); 

    if (is_climbing_detected) {
        next_anim = "climb";
    } 
    else {
        // Se non stiamo scalando, controlliamo salto/caduta
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
    
    // Se ci stiamo muovendo verticalmente (salto/caduta) E NON stiamo scalando
    if (Math.abs(current_vel_y) > 50 && !is_climbing_detected) {
        
        // *** COLLISIONE SALTO (Più alta, stessi lati) ***
        // Larghezza: 123 (uguale)
        // Altezza: 220 (più alta di 22px rispetto a 198)
        // Offset X: 18 (uguale)
        // Offset Y: 43 (alzata di 22px rispetto a 65)
        // 
        PP.physics.set_collision_rectangle(player, 123, 260, 18, 3);
    
    } else {
        
        // *** COLLISIONE STANDARD (Terra/Scala) ***
        // Larghezza: 123, Altezza: 198
        // Offset X: 18, Offset Y: 65
        PP.physics.set_collision_rectangle(player, 123, 198, 18, 65);
    }

    // Reset flags fine frame
    player.can_climb = false; 
    player.near_breakable_wall = false;
    player.current_wall = null;
    player.is_on_platform = false; 
    player.is_head_blocked = false;
}