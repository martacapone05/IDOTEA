// Variabili per le animazioni HUD (interfaccia fissa)
let hud_cuore_anim;
let hud_boccetta_anim;

// Variabili per le immagini degli oggetti da raccogliere (a terra)
let img_cuore_pickup;
let img_boccetta_pickup;

let hud_heart_positions = [];
let hud_active_hearts = [];

function preload_hud(s) {
    // 1. Carichiamo gli asset per l'HUD (Interfaccia)
    hud_cuore_anim = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_cuore.png", 1280, 720);
    hud_boccetta_anim = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_boccetta.png", 1280, 720);

    // 2. Carichiamo le immagini per gli oggetti a terra
    img_cuore_pickup = PP.assets.image.load(s, "assets/images/cuore.png");
    img_boccetta_pickup = PP.assets.image.load(s, "assets/images/boccetta.png");
}

function create_hud(s, player) {
    // 1. Reset delle liste
    hud_heart_positions = [];
    hud_active_hearts = [];

    // --- RECUPERO DATI SALVATI ---
    let saved_hp = PP.game_state.get_variable("player_hp");
    if (saved_hp === undefined || saved_hp === null) {
        saved_hp = 4;
        PP.game_state.set_variable("player_hp", 4);
    }
    
    let saved_fragments = PP.game_state.get_variable("player_fragments");
    if (saved_fragments === undefined || saved_fragments === null) {
        saved_fragments = 0;
        PP.game_state.set_variable("player_fragments", 0);
    }

    // Applico i dati al player corrente
    player.hp = saved_hp;
    player.frammenti = saved_fragments;

    // 2. Setup Grafica Cuore (HUD fisso sullo schermo - Z 10000)
    let cuore = PP.assets.sprite.add(s, hud_cuore_anim, 0, 0, 0, 0);
    cuore.tile_geometry.scroll_factor_x = 0;
    cuore.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(cuore, 10000);

    PP.assets.sprite.animation_add(cuore, "hp_4", 0, 0, 10, 0);
    PP.assets.sprite.animation_add(cuore, "hp_3", 1, 1, 10, 0);
    PP.assets.sprite.animation_add(cuore, "hp_2", 2, 2, 10, 0);
    PP.assets.sprite.animation_add(cuore, "hp_1", 3, 3, 10, 0);
    
    player.cuore = cuore;
    update_cuore_graphic(player);

    // 3. Setup Grafica Boccetta (HUD fisso sullo schermo - Z 10000)
    let boccetta = PP.assets.sprite.add(s, hud_boccetta_anim, 0, 0, 0, 0);
    boccetta.tile_geometry.scroll_factor_x = 0;
    boccetta.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(boccetta, 10000);

    PP.assets.sprite.animation_add(boccetta, "frag_0", 0, 0, 10, 0); 
    PP.assets.sprite.animation_add(boccetta, "frag_1", 1, 1, 10, 0);
    PP.assets.sprite.animation_add(boccetta, "frag_2", 2, 2, 10, 0);
    PP.assets.sprite.animation_add(boccetta, "frag_3", 3, 3, 10, 0);
    PP.assets.sprite.animation_add(boccetta, "frag_4", 4, 4, 10, 0); 
    
    player.boccetta = boccetta;
    update_boccetta_graphic(player);

    // Salviamo la funzione di respawn nel player
    player.respawn_hearts_func = function() {
        respawn_hearts(s, player);
    };
}

// --- FUNZIONI LOGICHE ---

function create_collectible_fragment(s, x, y, player) {
    // MODIFICA: Uso l'immagine invece del rettangolo
    // 0.5, 0.5 serve per centrare l'immagine sul punto x, y
    let frammento = PP.assets.image.add(s, img_boccetta_pickup, x, y, 0.5, 0.5);
    
    // --- Z-INDEX IMPOSTATO A 30 ---
    PP.layers.set_z_index(frammento, 30);
    // ------------------------------

    PP.physics.add(s, frammento, PP.physics.type.STATIC);
    
    // Se necessario, aggiusta la collision box se l'immagine è troppo grande
    // PP.physics.set_collision_rectangle(frammento, 30, 30); 

    PP.physics.add_overlap_f(s, player, frammento, function(s, player_obj, fragment_obj) {
        collect_fragment(s, player_obj, fragment_obj);
    });
}

function collect_fragment(s, player, frammento_obj) {
    PP.assets.destroy(frammento_obj);
    if (player.frammenti < 4) {
        player.frammenti = player.frammenti + 1;
        PP.game_state.set_variable("player_fragments", player.frammenti);
        console.log("Frammento raccolto! Totale: " + player.frammenti);
        update_boccetta_graphic(player);
    } else {
        console.log("Boccetta già piena!");
    }
}

function update_boccetta_graphic(player) {
    if (player.boccetta) {
        if (player.frammenti == 0) PP.assets.sprite.animation_play(player.boccetta, "frag_0");
        if (player.frammenti == 1) PP.assets.sprite.animation_play(player.boccetta, "frag_1");
        if (player.frammenti == 2) PP.assets.sprite.animation_play(player.boccetta, "frag_2");
        if (player.frammenti == 3) PP.assets.sprite.animation_play(player.boccetta, "frag_3");
        if (player.frammenti >= 4) PP.assets.sprite.animation_play(player.boccetta, "frag_4");
    }
}

function create_collectible_heart(s, x, y, player, is_respawn) {
    if (is_respawn !== true) {
        hud_heart_positions.push({x: x, y: y});
    }

    // MODIFICA: Uso l'immagine invece del rettangolo
    // 0.5, 0.5 serve per centrare l'immagine sul punto x, y
    let heart_pickup = PP.assets.image.add(s, img_cuore_pickup, x, y, 0.5, 0.5);
    
    // --- Z-INDEX IMPOSTATO A 30 ---
    PP.layers.set_z_index(heart_pickup, 30);
    // ------------------------------

    PP.physics.add(s, heart_pickup, PP.physics.type.STATIC);
    hud_active_hearts.push(heart_pickup);
    
    PP.physics.add_overlap_f(s, player, heart_pickup, function(s, player_obj, heart_obj) {
        collect_heart(s, player_obj, heart_obj);
    });
}

function collect_heart(s, player, heart_obj) {
    hud_active_hearts = hud_active_hearts.filter(h => h !== heart_obj);
    PP.assets.destroy(heart_obj);

    if (player.hp < 4) {
        player.hp = player.hp + 1;
        PP.game_state.set_variable("player_hp", player.hp);
        
        if (typeof update_cuore_graphic === "function") {
            update_cuore_graphic(player);
        }
    }
}

function respawn_hearts(s, player) {
    console.log("Respawn dei cuori...");
    for (let i = 0; i < hud_active_hearts.length; i++) {
        if (hud_active_hearts[i]) {
            PP.assets.destroy(hud_active_hearts[i]);
        }
    }
    hud_active_hearts = [];
    for (let i = 0; i < hud_heart_positions.length; i++) {
        let pos = hud_heart_positions[i];
        create_collectible_heart(s, pos.x, pos.y, player, true);
    }
}

function update_cuore_graphic(player) {
    if (player.cuore) {
        if (player.hp == 4) PP.assets.sprite.animation_play(player.cuore, "hp_4");
        if (player.hp == 3) PP.assets.sprite.animation_play(player.cuore, "hp_3");
        if (player.hp == 2) PP.assets.sprite.animation_play(player.cuore, "hp_2");
        if (player.hp == 1) PP.assets.sprite.animation_play(player.cuore, "hp_1");
    }
    PP.game_state.set_variable("player_hp", player.hp);
}