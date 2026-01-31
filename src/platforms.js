// VARIABILI GLOBALI

let img_blocchetto1, img_blocchetto2, img_blocchetto3, img_blocchetto4, img_blocchetto5, img_blocchetto6, img_blocchetto7,
    img_blocchetto8, img_blocchetto9, img_blocchetto10, img_blocchetto11, img_blocchetto12, img_blocchetto13, img_blocchetto14,
    img_blocchetto15, img_blocchetto16, img_blocchetto17, img_blocchetto18, img_blocchetto19, img_blocchetto20, img_blocchetto21,
    img_blocchetto22, img_blocchetto23, img_blocchetto24, img_blocchetto25, img_blocchetto26, img_blocchetto27, img_blocchetto28,
    img_blocchetto29, img_blocchetto30, img_blocchetto31, img_blocchetto32, img_blocchetto33, img_blocchetto34, img_blocchetto35,
    img_blocchetto36, img_blocchetto37, img_blocchetto38, img_blocchetto39, img_blocchetto40, img_blocchetto41, img_blocchetto42,
    img_blocchetto43, img_blocchetto44, img_blocchetto45, img_blocchetto46, img_blocchetto47, img_blocchetto48, img_blocchetto49,
    img_blocchetto50, img_blocchetto51;

let img_blocco1, img_blocco2, img_blocco3, img_blocco4a, img_blocco4b, img_blocco4, img_blocco5, img_blocco6, img_blocco7,
    img_blocco8, img_blocco9, img_blocco10, img_blocco11, img_blocco12, img_blocco13, img_blocco14, img_blocco15;

let img_blocco_supremo1, img_blocco_supremo2;

let img_platform1, img_platform2, img_platform3, img_platform4, img_platform5, img_platform6, img_platform7, img_platform8,
    img_platform9, img_platform10, img_platform11, img_platform12, img_platform13, img_platform14, img_platform15, img_platform16,
    img_platform17, img_platform18, img_platform19, img_platform20, img_platform21, img_platform22, img_platform23, img_platform24,
    img_platform25, img_platform26, img_platform27, img_platform28, img_platform29, img_platform30;

let img_piattaforma_suprema1;


let img_casetta;
let img_fine_tubo;
let img_fine_tubo1;

let img_lvl1map_pt1, img_lvl1map_pt2, img_lvl2map1_pt1, img_lvl2map2_pt1, img_lvl2map3_pt1, img_lvl2map_pt2, img_lvl3map;

let img_sfondolvl1, img_primo_piano1, img_primo_pianolvl2_2;
let img_colonne;

let img_overlay_tree;
let img_ladder;
let img_ladder_vera;
let ladder;
let player;


function preload_platforms(s) {
    img_blocchetto1 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto1.png");
    img_blocchetto2 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto2.png");
    img_blocchetto3 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto3.png");
    img_blocchetto4 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto4.png");
    img_blocchetto5 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto5.png");
    img_blocchetto6 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto6.png");
    img_blocchetto7 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto7.png");
    img_blocchetto8 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto8.png");
    img_blocchetto9 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto9.png");
    img_blocchetto10 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto10.png");
    img_blocchetto11 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto11.png");
    img_blocchetto12 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto12.png");
    img_blocchetto13 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto13.png");
    img_blocchetto14 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto14.png");
    img_blocchetto15 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto15.png");
    img_blocchetto16 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto16.png");
    img_blocchetto17 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto17.png");
    img_blocchetto18 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto18.png");
    img_blocchetto19 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto19.png");
    img_blocchetto20 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto20.png");
    img_blocchetto21 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto21.png");
    img_blocchetto22 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto22.png");
    img_blocchetto23 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto23.png");
    img_blocchetto24 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto24.png");
    img_blocchetto25 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto25.png");
    img_blocchetto26 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto26.png");
    img_blocchetto27 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto27.png");
    img_blocchetto28 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto28.png");
    img_blocchetto29 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto29.png");
    img_blocchetto30 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto30.png");
    img_blocchetto31 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto31.png");
    img_blocchetto32 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto32.png");
    img_blocchetto33 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto33.png");
    img_blocchetto34 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto34.png");
    img_blocchetto35 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto35.png");
    img_blocchetto36 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto36.png");
    img_blocchetto37 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto37.png");
    img_blocchetto38 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto38.png");
    img_blocchetto39 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto39.png");
    img_blocchetto40 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto40.png");
    img_blocchetto41 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto41.png");
    img_blocchetto42 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto42.png");
    img_blocchetto43 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto43.png");
    img_blocchetto44 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto44.png");
    img_blocchetto45 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto45.png");
    img_blocchetto46 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto46.png");
    img_blocchetto47 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto47.png");
    img_blocchetto48 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto48.png");
    img_blocchetto49 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto49.png");
    img_blocchetto50 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto50.png");
    img_blocchetto51 = PP.assets.image.load(s, "assets/images/blocchetti/blocchetto51.png");

    img_blocco1 = PP.assets.image.load(s, "assets/images/blocchi/blocco1.png");
    img_blocco2 = PP.assets.image.load(s, "assets/images/blocchi/blocco2.png");
    img_blocco3 = PP.assets.image.load(s, "assets/images/blocchi/blocco3.png");
    img_blocco4 = PP.assets.image.load(s, "assets/images/blocchi/blocco4.png");
    img_blocco4a = PP.assets.image.load(s, "assets/images/blocchi/blocco4a.png");
    img_blocco4b = PP.assets.image.load(s, "assets/images/blocchi/blocco4b.png");
    img_blocco5 = PP.assets.image.load(s, "assets/images/blocchi/blocco5.png");
    img_blocco6 = PP.assets.image.load(s, "assets/images/blocchi/blocco6.png");
    img_blocco7 = PP.assets.image.load(s, "assets/images/blocchi/blocco7.png");
    img_blocco8 = PP.assets.image.load(s, "assets/images/blocchi/blocco8.png");
    img_blocco9 = PP.assets.image.load(s, "assets/images/blocchi/blocco9.png");
    img_blocco10 = PP.assets.image.load(s, "assets/images/blocchi/blocco10.png");
    img_blocco11 = PP.assets.image.load(s, "assets/images/blocchi/blocco11.png");
    img_blocco12 = PP.assets.image.load(s, "assets/images/blocchi/blocco12.png");
    img_blocco13 = PP.assets.image.load(s, "assets/images/blocchi/blocco13.png");
    img_blocco14 = PP.assets.image.load(s, "assets/images/blocchi/blocco14.png");
    img_blocco15 = PP.assets.image.load(s, "assets/images/blocchi/blocco15.png");

    img_blocco_supremo1 = PP.assets.image.load(s, "assets/images/blocchi/blocco_supremo1.png");
    img_blocco_supremo2 = PP.assets.image.load(s, "assets/images/blocchi/blocco_supremo2.png");

    img_platform1 = PP.assets.image.load(s, "assets/images/platforms/platform1.png");
    img_platform2 = PP.assets.image.load(s, "assets/images/platforms/platform2.png");
    img_platform3 = PP.assets.image.load(s, "assets/images/platforms/platform3.png");
    img_platform4 = PP.assets.image.load(s, "assets/images/platforms/platform4.png");
    img_platform5 = PP.assets.image.load(s, "assets/images/platforms/platform5.png");
    img_platform6 = PP.assets.image.load(s, "assets/images/platforms/platform6.png");
    img_platform7 = PP.assets.image.load(s, "assets/images/platforms/platform7.png");
    img_platform8 = PP.assets.image.load(s, "assets/images/platforms/platform8.png");
    img_platform9 = PP.assets.image.load(s, "assets/images/platforms/platform9.png");
    img_platform10 = PP.assets.image.load(s, "assets/images/platforms/platform10.png");
    img_platform11 = PP.assets.image.load(s, "assets/images/platforms/platform11.png");
    img_platform12 = PP.assets.image.load(s, "assets/images/platforms/platform12.png");
    img_platform13 = PP.assets.image.load(s, "assets/images/platforms/platform13.png");
    img_platform14 = PP.assets.image.load(s, "assets/images/platforms/platform14.png");
    img_platform15 = PP.assets.image.load(s, "assets/images/platforms/platform15.png");
    img_platform16 = PP.assets.image.load(s, "assets/images/platforms/platform16.png");
    img_platform17 = PP.assets.image.load(s, "assets/images/platforms/platform17.png");
    img_platform18 = PP.assets.image.load(s, "assets/images/platforms/platform18.png");
    img_platform19 = PP.assets.image.load(s, "assets/images/platforms/platform19.png");
    img_platform20 = PP.assets.image.load(s, "assets/images/platforms/platform20.png");
    img_platform21 = PP.assets.image.load(s, "assets/images/platforms/platform21.png");
    img_platform22 = PP.assets.image.load(s, "assets/images/platforms/platform22.png");
    img_platform23 = PP.assets.image.load(s, "assets/images/platforms/platform23.png");
    img_platform24 = PP.assets.image.load(s, "assets/images/platforms/platform24.png");
    img_platform25 = PP.assets.image.load(s, "assets/images/platforms/platform25.png");
    img_platform26 = PP.assets.image.load(s, "assets/images/platforms/platform26.png");
    img_platform27 = PP.assets.image.load(s, "assets/images/platforms/platform27.png");
    img_platform28 = PP.assets.image.load(s, "assets/images/platforms/platform28.png");
    img_platform29 = PP.assets.image.load(s, "assets/images/platforms/platform29.png");
    img_platform30 = PP.assets.image.load(s, "assets/images/platforms/platform30.png");

    img_piattaforma_suprema1 = PP.assets.image.load(s, "assets/images/platforms/piattaforma_suprema1.png")
    img_piattaforma_suprema2 = PP.assets.image.load(s, "assets/images/platforms/piattaforma_suprema2.png")

    img_casetta = PP.assets.image.load(s, "assets/images/casetta.png")
    img_fine_tubo = PP.assets.image.load(s, "assets/images/fine_tubo.png")
    img_fine_tubo1 = PP.assets.image.load(s, "assets/images/fine_tubo1.png")

    img_lvl1map_pt1 = PP.assets.image.load(s, "assets/images/lvl1map_pt1.png");
    img_lvl1map_pt2 = PP.assets.image.load(s, "assets/images/lvl1map_pt2.png");
    img_lvl2map1_pt1 = PP.assets.image.load(s, "assets/images/lvl2map1_pt1.png");
    img_lvl2map2_pt1 = PP.assets.image.load(s, "assets/images/lvl2map2_pt1.png");
    img_lvl2map3_pt1 = PP.assets.image.load(s, "assets/images/lvl2map3_pt1.png");
    img_lvl2map_pt2 = PP.assets.image.load(s, "assets/images/lvl2map_pt2.png");
    img_lvl3map = PP.assets.image.load(s, "assets/images/lvl3map.png");

    img_sfondolvl1 = PP.assets.image.load(s, "assets/images/sfondi/sfondolvl1.png")
    img_primo_piano1 = PP.assets.image.load(s, "assets/images/primo_piano1.png")
    img_colonne = PP.assets.image.load(s, "assets/images/colonne.png")

    img_overlay_tree = PP.assets.image.load(s, "assets/images/overlaytree.png");

    img_ladder = PP.assets.image.load(s, "assets/images/ladder.png");
    img_ladder_vera = PP.assets.image.load(s, "assets/images/ladder_vera.png");

}

function collision_platform(s, player, platform) {
    let tolleranza_x = 70;

    // 1. Controllo orizzontale
    if(player.geometry.x >= platform.geometry.x - tolleranza_x &&
        player.geometry.x <= platform.geometry.x + platform.geometry.display_width + tolleranza_x) {
            
            let platform_top = platform.geometry.y - platform.geometry.display_height;
            let vel_y = PP.physics.get_velocity_y(player);

            // 2. Controllo VERTICALE + VELOCITÀ
            // - I piedi devono essere sopra (con margine)
            // - La velocità deve essere >= 0 (sto cadendo o sono fermo). 
            //   Se vel_y < 0 sto saltando verso l'alto, quindi non sono appoggiato.
            if (player.geometry.y <= platform_top + 35 && vel_y >= 0) {
                player.is_on_platform = true;
            } else {
                // Se sono sotto o sto saltando e sbatto, attivo il blocco testa
                // Ma solo se sono fisicamente sotto il livello del "tetto"
                if (player.geometry.y > platform_top + 35) {
                    player.is_head_blocked = true;
                }
            }
    }
}

function on_ladder_overlap(s, player, ladder) {
    player.can_climb = true;
}

function vai_indietro(s, player, ladder) {
    console.log("Torno al livello 1...");
    PP.game_state.set_variable("punto_di_partenza", "fine");
    PP.scenes.start("lvl1_pt1");
}

function create_platforms_lvl1_pt1(s, player) {
    
    // Z-INDEX STRATEGY:
    // Blocchi e Piattaforme = 5 (BASSO)
    // Mappa = 10 (SOPRA I BLOCCHI)
    // Player = 100 (SOPRA TUTTO)

    PP.layers.set_z_index(player, 100);

    let casetta = PP.assets.image.add(s, img_casetta, 0, 618, 0, 1);

    let blocchetto1 = PP.assets.image.add(s, img_blocchetto1, 2000, 620, 0, 1);
    let blocchetto2 = PP.assets.image.add(s, img_blocchetto2, 2700, 620, 0, 1);
    let blocco1 = PP.assets.image.add(s, img_blocco1, 3300, 620, 0, 1);
    let blocco2 = PP.assets.image.add(s, img_blocco2, 5050, 620, 0, 1);
    let blocchetto3 = PP.assets.image.add(s, img_blocchetto3, 5050, -80, 0, 1);
    let blocchetto4 = PP.assets.image.add(s, img_blocchetto4, 5650, 243, 0, 1);
    let blocco3 = PP.assets.image.add(s, img_blocco3, 6800, 620, 0, 1);
    let platform1 = PP.assets.image.add(s, img_platform1, 7250, -250, 0, 1);
    let platform2 = PP.assets.image.add(s, img_platform2, 6850, -550, 0, 1);
    let blocchetto5 = PP.assets.image.add(s, img_blocchetto5, 7475, -700, 0, 1);
    let blocchetto24 = PP.assets.image.add(s, img_blocchetto24, 7875, 20-271, 0, 1);
    let blocco4a = PP.assets.image.add(s, img_blocco4a, 8010, -443, 0, 1);
    let blocco4b = PP.assets.image.add(s, img_blocco4b, 8616, 20, 0, 1);
    let blocchetto6 = PP.assets.image.add(s, img_blocchetto6, 6300, -1250, 0, 1);
    let blocchetto7 = PP.assets.image.add(s, img_blocchetto7, 6850, -1250, 0, 1);
    let platform4 = PP.assets.image.add(s, img_platform1, 7650, -1550, 0, 1);
    let blocchetto8 = PP.assets.image.add(s, img_blocchetto8, 8300, -980, 0, 1);
    let blocchetto9 = PP.assets.image.add(s, img_blocchetto9, 8850, -980, 0, 1);
    let blocco5 = PP.assets.image.add(s, img_blocco4, 10200, 20, 0, 1);
    let blocchetto10 = PP.assets.image.add(s, img_blocchetto10, 11200, -980, 0, 1);
    
    // MAPPA
    let sfondolvl1 = PP.assets.image.add(s, img_sfondolvl1, 0, 1400, 0, 1);
    let primo_piano1 = PP.assets.image.add(s, img_primo_piano1, 0, 1400, 0, 1);

    
    // Scale e muri
    let ladder1 = PP.assets.image.add(s, img_ladder, 6600, -700, 0, 1);
    let ladder2 = PP.assets.image.add(s, img_ladder, 11400, -1400, 0, 1);
    let ladder_vera = PP.assets.image.add(s, img_ladder_vera, 11396, -1430, 0, 1);

    // IMPOSTAZIONE Z-INDEX
    
    PP.layers.set_z_index(blocchetto1, 5);
    PP.layers.set_z_index(blocchetto2, 5);
    PP.layers.set_z_index(blocco1, 5);
    PP.layers.set_z_index(blocco2, 5);
    PP.layers.set_z_index(blocchetto3, 5);
    PP.layers.set_z_index(blocchetto4, 5);
    PP.layers.set_z_index(blocco3, 5);
    PP.layers.set_z_index(platform1, 5);
    PP.layers.set_z_index(platform2, 5);
    PP.layers.set_z_index(blocchetto5, 5);
    PP.layers.set_z_index(blocchetto24, 5);
    PP.layers.set_z_index(blocco4a, 5);
    PP.layers.set_z_index(blocco4b, 5);
    PP.layers.set_z_index(blocchetto6, 5);
    PP.layers.set_z_index(blocchetto7, 5);
    PP.layers.set_z_index(platform4, 5);
    PP.layers.set_z_index(blocchetto8, 5);
    PP.layers.set_z_index(blocchetto9, 5);
    PP.layers.set_z_index(blocco5, 5);
    PP.layers.set_z_index(blocchetto10, 5);
    PP.layers.set_z_index(ladder1, 0);
    PP.layers.set_z_index(ladder2, 0);
    PP.layers.set_z_index(ladder_vera, 30);


    // Livello 10: Mappa (Sopra ai blocchi)
    PP.layers.set_z_index(sfondolvl1, 2);
    PP.layers.set_z_index(primo_piano1, 11);

    PP.layers.set_z_index(casetta, 110);




    // FISICA

    PP.physics.add(s, blocchetto1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto1, collision_platform);

    PP.physics.add(s, blocchetto2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto2, collision_platform);

    PP.physics.add(s, blocco1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco1, collision_platform);

    PP.physics.add(s, blocco2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco2, collision_platform);

    PP.physics.add(s, blocchetto3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto3, collision_platform);

    PP.physics.add(s, blocchetto4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto4, collision_platform);

    PP.physics.add(s, blocco3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco3, collision_platform);

    PP.physics.add(s, platform1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform1, collision_platform);
   
    PP.physics.add(s, platform2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform2, collision_platform);

    PP.physics.add(s, blocchetto5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto5, collision_platform);

    PP.physics.add(s, blocchetto24, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto24, collision_platform);

    PP.physics.add(s, blocco4a, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco4a, collision_platform);

    PP.physics.add(s, blocco4b, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco4b, collision_platform);

    PP.physics.add(s, blocchetto6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto6, collision_platform);

    PP.physics.add(s, blocchetto7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto7, collision_platform);

    PP.physics.add(s, platform4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform4, collision_platform);

    PP.physics.add(s, blocchetto8, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto8, collision_platform);

    PP.physics.add(s, blocchetto9, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto9, collision_platform);

    PP.physics.add(s, blocco5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco5, collision_platform);

    PP.physics.add(s, blocchetto10, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto10, collision_platform);

    // Scale e Muri
    PP.physics.add(s, ladder1, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(s, player, ladder1, on_ladder_overlap);

    PP.physics.add(s, ladder2, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(s, player, ladder2, on_ladder_overlap);
}




function create_platforms_lvl1_pt2(s, player) {
    
    let platform1 = PP.assets.image.add(s, img_platform1, 850, 550, 0, 1);
    let platform2 = PP.assets.image.add(s, img_platform2, 1550, 660, 0, 1);
    let blocco1 = PP.assets.image.add(s, img_blocco5, 2000, 450, 0, 1);
    let blocchetto11 = PP.assets.image.add(s, img_blocchetto11, 2600, 350, 0, 1);
    let blocchetto12 = PP.assets.image.add(s, img_blocchetto12, 2850, 350, 0, 1);
    let blocchetto13 = PP.assets.image.add(s, img_blocchetto13, 3070, 350, 0, 1);
    let blocchetto14 = PP.assets.image.add(s, img_blocchetto14, 3720, 350, 0, 1);
    let blocchetto15 = PP.assets.image.add(s, img_blocchetto15, 4370, 350, 0, 1);
    let blocchetto16 = PP.assets.image.add(s, img_blocchetto16, 5170, 177, 0, 1);
    let platform3 = PP.assets.image.add(s, img_platform3, 3800, -400, 0, 1);
    let platform4 = PP.assets.image.add(s, img_platform4, 4803, -953, 0, 1);
    let platform5 = PP.assets.image.add(s, img_platform1, 4402, -753, 0, 1);
    let blocchetto6 = PP.assets.image.add(s, img_blocchetto48, 3352, -1902, 0, 1);
    let blocchetto7 = PP.assets.image.add(s, img_blocchetto7, 5100, -1903, 0, 1);
    let blocchetto17 = PP.assets.image.add(s, img_blocchetto17, 2770, -1900, 0, 1);
    let blocchetto18 = PP.assets.image.add(s, img_blocchetto18, 2670, -2050, 0, 1);
    let blocchetto19 = PP.assets.image.add(s, img_blocchetto18, 2090, -2200, 0, 1);
    let blocchetto20 = PP.assets.image.add(s, img_blocchetto18, 1510, -2350, 0, 1);
    let blocchetto21 = PP.assets.image.add(s, img_blocchetto18, 930, -2500, 0, 1);
    let blocchetto22 = PP.assets.image.add(s, img_blocchetto19, -200, -2650, 0, 1);
    let blocchetto23 = PP.assets.image.add(s, img_blocchetto20, -200, -2900, 0, 1);
    let platform6 = PP.assets.image.add(s, img_platform2, 420, -3350, 0, 1);
    let platform7 = PP.assets.image.add(s, img_platform4, 1000, -3550, 0, 1);
    let platform8 = PP.assets.image.add(s, img_platform5, 1400, -3580, 0, 1);
    let platform9 = PP.assets.image.add(s, img_platform6, 2150, -3550, 0, 1);
    let blocchetto24 = PP.assets.image.add(s, img_blocchetto21, 3350, -3750, 0, 1);
    let blocchetto25 = PP.assets.image.add(s, img_blocchetto22, 3700, -3550, 0, 1);
    let platform10 = PP.assets.image.add(s, img_platform7, 4730, -3700, 0, 1);
    let platform11 = PP.assets.image.add(s, img_platform8, 5200, -3600, 0, 1);
    let blocchetto26 = PP.assets.image.add(s, img_blocchetto49, 5907, -3755, 0, 1);
    let blocchetto27 = PP.assets.image.add(s, img_blocchetto50, 6244, -3734, 0, 1);

    let mappa2 = PP.assets.image.add(s, img_lvl1map_pt2, -1232, 1375, 0, 1);

    let ladder1 = PP.assets.image.add(s, img_ladder, 4850, -1280, 0, 1);
    let ladder_vera = PP.assets.image.add(s, img_ladder_vera, 4850, -1280, 0, 1);

    let fine_tubo = PP.assets.image.add(s, img_fine_tubo, 4646, -1984, 0, 1);
    let fine_tubo2 = PP.assets.image.add(s, img_fine_tubo1, 4639, -2249, 0, 1);

    PP.layers.set_z_index(mappa2, 10);
    PP.layers.set_z_index(player, 35);
    PP.layers.set_z_index(ladder_vera, 20);
    PP.layers.set_z_index(fine_tubo, 30);
    PP.layers.set_z_index(fine_tubo2, 31);

    PP.physics.add(s, platform1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform1, collision_platform);

    PP.physics.add(s, platform2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform2, collision_platform);

    PP.physics.add(s, blocco1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco1, collision_platform);

    PP.physics.add(s, blocchetto11, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto11, collision_platform);

    PP.physics.add(s, blocchetto12, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto12, collision_platform);

    PP.physics.add(s, blocchetto13, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto13, collision_platform);

    PP.physics.add(s, blocchetto14, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto14, collision_platform);

    PP.physics.add(s, blocchetto15, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto15, collision_platform);

    PP.physics.add(s, blocchetto16, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto16, collision_platform);

    PP.physics.add(s, platform3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform3, collision_platform);

    PP.physics.add(s, platform4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform4, collision_platform);

    PP.physics.add(s, platform5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform5, collision_platform);

    PP.physics.add(s, blocchetto6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto6, collision_platform);

    PP.physics.add(s, blocchetto7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto7, collision_platform);

    PP.physics.add(s, blocchetto17, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto17, collision_platform);

    PP.physics.add(s, blocchetto18, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto18, collision_platform);

    PP.physics.add(s, blocchetto19, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto19, collision_platform);

    PP.physics.add(s, blocchetto20, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto20, collision_platform);

    PP.physics.add(s, blocchetto21, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto21, collision_platform);

    PP.physics.add(s, blocchetto22, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto22, collision_platform);

    PP.physics.add(s, blocchetto23, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto23, collision_platform);

    PP.physics.add(s, platform6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform6, collision_platform);

    PP.physics.add(s, platform7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform7, collision_platform);

    PP.physics.add(s, platform8, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform8, collision_platform);

    PP.physics.add(s, platform9, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform9, collision_platform);

    PP.physics.add(s, blocchetto24, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto24, collision_platform);

    PP.physics.add(s, blocchetto25, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto25, collision_platform);

    PP.physics.add(s, platform10, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform10, collision_platform);

    PP.physics.add(s, platform11, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform11, collision_platform);

    PP.physics.add(s, blocchetto26, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto26, collision_platform);

    PP.physics.add(s, blocchetto27, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto27, collision_platform);


    PP.physics.add(s, ladder1, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(s, player, ladder1, on_ladder_overlap);
}


function create_platforms_lvl2_pt1(s, player) {

    let blocchetto25 = PP.assets.image.add(s, img_blocchetto25, 700, 620, 0, 1);
    let blocchetto26 = PP.assets.image.add(s, img_blocchetto26, 1570, 570, 0, 1);
    let blocchetto27 = PP.assets.image.add(s, img_blocchetto27, 1820, 570, 0, 1);
    let platform9 = PP.assets.image.add(s, img_platform9, 2680, -300, 0, 1);
    let blocchetto28 = PP.assets.image.add(s, img_blocchetto28, 1850, -580, 0, 1);
    let blocchetto29 = PP.assets.image.add(s, img_blocchetto29, 300, -580, 0, 1);
    let blocchetto30 = PP.assets.image.add(s, img_blocchetto30, 300, -780, 0, 1);
    let blocchetto31 = PP.assets.image.add(s, img_blocchetto31, 300, -1060, 0, 1);
    let platform1 = PP.assets.image.add(s, img_platform1, 800, -1500, 0, 1);
    let blocchetto32 = PP.assets.image.add(s, img_blocchetto32, 1400, -1500, 0, 1);
    let platform10 = PP.assets.image.add(s, img_platform10, 3150, -1400, 0, 1);
    let platform2 = PP.assets.image.add(s, img_platform1, 4350, -1300, 0, 1);
    let platform11 = PP.assets.image.add(s, img_platform11, 4850, -1400, 0, 1);
    let blocco7 = PP.assets.image.add(s, img_blocco7, 3230, 670, 0, 1);
    let blocchetto33 = PP.assets.image.add(s, img_blocchetto33, 6150, -720, 0, 1);
    let platform3 = PP.assets.image.add(s, img_platform1, 6800, -1270, 0, 1);
    let platform4 = PP.assets.image.add(s, img_platform1, 7130, -1000, 0, 1);
    let blocco8 = PP.assets.image.add(s, img_blocco8, 6100, 680, 0, 1);
    let blocchetto34 = PP.assets.image.add(s, img_blocchetto34, 7300, -1000, 0, 1);
    let platform12 = PP.assets.image.add(s, img_platform12, 7500, -500, 0, 1);
    let platform13 = PP.assets.image.add(s, img_platform12, 8500, -500, 0, 1);
    let platform14 = PP.assets.image.add(s, img_platform12, 9500, -500, 0, 1);
    let blocco9 = PP.assets.image.add(s, img_blocco9, 9900, 680, 0, 1);
    let blocchetto35 = PP.assets.image.add(s, img_blocchetto35, 10500, -725, 0, 1);
    let blocchetto36 = PP.assets.image.add(s, img_blocchetto36, 10900, -882, 0, 1);
    let blocchetto37 = PP.assets.image.add(s, img_blocchetto37, 11380, -1130, 0, 1);
    let blocchetto38 = PP.assets.image.add(s, img_blocchetto38, 11650, -1210, 0, 1);
    let blocchetto40 = PP.assets.image.add(s, img_blocchetto40, 12595, -835, 0, 1);
    let blocco10 = PP.assets.image.add(s, img_blocco10, 13996, -150, 0, 1);
    let blocco11 = PP.assets.image.add(s, img_blocco11, 15020, -300, 0, 1);

    let overlay_tree = PP.assets.image.add(s, img_overlay_tree, 16020, -1292, 0, 1);

    let mappa3 = PP.assets.image.add(s, img_lvl2map1_pt1, -1300, 950, 0, 1);
    let mappa4 = PP.assets.image.add(s, img_lvl2map2_pt1, 4700, 950, 0, 1);
    let mappa5 = PP.assets.image.add(s, img_lvl2map3_pt1, 10700, 950, 0, 1);

    PP.layers.set_z_index(mappa3, 10);
    PP.layers.set_z_index(mappa4, 10);
    PP.layers.set_z_index(mappa5, 10);
    PP.layers.set_z_index(player, 30);
    PP.layers.set_z_index(overlay_tree, 40);
    

    PP.physics.add(s, blocchetto25, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto25, collision_platform);

    PP.physics.add(s, blocchetto26, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto26, collision_platform);

    PP.physics.add(s, blocchetto27, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto27, collision_platform);

    PP.physics.add(s, platform9, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform9, collision_platform);

    PP.physics.add(s, blocchetto28, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto28, collision_platform);

    PP.physics.add(s, blocchetto29, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto29, collision_platform);

    PP.physics.add(s, blocchetto30, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto30, collision_platform);

    PP.physics.add(s, blocchetto31, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto31, collision_platform);

    PP.physics.add(s, platform1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform1, collision_platform);

    PP.physics.add(s, blocchetto32, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto32, collision_platform);

    PP.physics.add(s, platform10, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform10, collision_platform);

    PP.physics.add(s, platform2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform2, collision_platform);

    PP.physics.add(s, platform11, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform11, collision_platform);

    PP.physics.add(s, blocco7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco7, collision_platform);

    PP.physics.add(s, blocchetto33, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto33, collision_platform);

    PP.physics.add(s, platform3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform3, collision_platform);

    PP.physics.add(s, platform4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform4, collision_platform);

    PP.physics.add(s, blocco8, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco8, collision_platform);
    
    PP.physics.add(s, blocchetto34, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto34, collision_platform);

    PP.physics.add(s, platform12, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform12, collision_platform);

    PP.physics.add(s, platform13, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform13, collision_platform);

    PP.physics.add(s, platform14, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform14, collision_platform);

    PP.physics.add(s, blocco9, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco9, collision_platform);

    PP.physics.add(s, blocchetto35, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto35, collision_platform);

    PP.physics.add(s, blocchetto36, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto36, collision_platform);

    PP.physics.add(s, blocchetto37, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto37, collision_platform);

    PP.physics.add(s, blocchetto38, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto38, collision_platform);

    PP.physics.add(s, blocchetto40, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto40, collision_platform);

    PP.physics.add(s, blocco10, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco10, collision_platform);

    PP.physics.add(s, blocco11, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco11, collision_platform);


}



function create_platforms_lvl2_pt2(s, player) {
    let blocchino = PP.assets.image.add(s, img_blocchetto33, -850, 650, 0, 1);
    let blocco_supremo1 = PP.assets.image.add(s, img_blocco_supremo1, -500, 220, 0, 1);
    let platform1 = PP.assets.image.add(s, img_platform8, 1200, 800, 0, 1);
    let blocco1 = PP.assets.image.add(s, img_blocco7, 1850, 1996, 0, 1);
    let blocchetto1 = PP.assets.image.add(s, img_blocchetto1, 2400, 494, 0, 1);
    let blocchetto2 = PP.assets.image.add(s, img_blocchetto2, 3100, 500, 0, 1);
    let blocchetto3 = PP.assets.image.add(s, img_blocchetto7, 3030, -3, 0, 1);
    let blocchetto4 = PP.assets.image.add(s, img_blocchetto11, 3450, -80, 0, 1);
    let blocchetto5 = PP.assets.image.add(s, img_blocchetto7, 3390, -289, 0, 1);
    let blocco_supremo2 = PP.assets.image.add(s, img_blocco_supremo2, 3700, 500, 0, 1);
    let platform2 = PP.assets.image.add(s, img_platform13, 3600, -607, 0, 1);
    let blocchetto6 = PP.assets.image.add(s, img_blocchetto23, 3050, -700, 0, 1);
    let platform3 = PP.assets.image.add(s, img_platform3, 2367, -1008, 0, 1);
    let platform4 = PP.assets.image.add(s, img_platform3, 1639, -1007, 0, 1);
    let platform5 = PP.assets.image.add(s, img_platform3, 912, -1031, 0, 1);
    let blocchetto7 = PP.assets.image.add(s, img_blocchetto41, 0, -1200, 0, 1);
    let blocchetto8 = PP.assets.image.add(s, img_blocchetto11, 0, -1260, 0, 1);
    let platform6 = PP.assets.image.add(s, img_platform15, 550, -1800, 0, 1);
    let platform7 = PP.assets.image.add(s, img_platform16, 1200, -2050, 0, 1);
    let platform8 = PP.assets.image.add(s, img_platform17, 2000, -2203, 0, 1);
    let blocchetto9 = PP.assets.image.add(s, img_blocchetto42, 2700, -2252, 0, 1);
    let blocchetto10 = PP.assets.image.add(s, img_blocchetto43, 2620, -3237, 0, 1);
    let blocchetto11 = PP.assets.image.add(s, img_blocchetto43, 3350, -3238, 0, 1);
    let platform9 = PP.assets.image.add(s, img_platform18, 2000, -3050, 0, 1);
    let platform10 = PP.assets.image.add(s, img_platform18, 1300, -3150, 0, 1);
    let blocco2 = PP.assets.image.add(s, img_blocco12, -100, -3202, 0, 1);
    let blocco3 = PP.assets.image.add(s, img_blocchetto51, 400, -3651, 0, 1);
    let platform11 = PP.assets.image.add(s, img_platform13, -100, -3650, 0, 1);
    let platform12 = PP.assets.image.add(s, img_platform13, 300, -3950, 0, 1);
    let platform13 = PP.assets.image.add(s, img_platform13, -100, -4250, 0, 1);
    let blocco_supremo3 = PP.assets.image.add(s, img_blocco_supremo1, -600, -3000, 0, 1);
    let blocchetto12 = PP.assets.image.add(s, img_blocchetto44, 670, -4270, 0, 1);
    let platform14 = PP.assets.image.add(s, img_platform19, 1800, -4100, 0, 1);
    let blocchetto13 = PP.assets.image.add(s, img_blocchetto44, 2300, -4270, 0, 1);
    let blocco4 = PP.assets.image.add(s, img_blocco14, 2800, -4140, 0, 1);
    let bloccone = PP.assets.image.add(s, img_blocchetto33, 4800, -4340, 0, 1);

    let ladder1 = PP.assets.image.add(s, img_ladder, 3100, -2600, 0, 1);

    let mappa6 = PP.assets.image.add(s, img_lvl2map_pt2, -1000, 2000, 0, 1);

    PP.layers.set_z_index(mappa6, 10);
    PP.layers.set_z_index(player, 30);


    PP.physics.add(s, blocchino, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchino, collision_platform);

    PP.physics.add(s, blocco_supremo1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco_supremo1, collision_platform);

    PP.physics.add(s, platform1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform1, collision_platform);

    PP.physics.add(s, blocco1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco1, collision_platform);

    PP.physics.add(s, blocchetto1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto1, collision_platform);

    PP.physics.add(s, blocchetto2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto2, collision_platform);

    PP.physics.add(s, blocchetto3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto3, collision_platform);

    PP.physics.add(s, blocchetto4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto4, collision_platform);

    PP.physics.add(s, blocchetto5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto5, collision_platform);

    PP.physics.add(s, blocco_supremo2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco_supremo2, collision_platform);

    PP.physics.add(s, platform2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform2, collision_platform);

    PP.physics.add(s, blocchetto6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto6, collision_platform);

    PP.physics.add(s, platform3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform3, collision_platform);

    PP.physics.add(s, platform4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform4, collision_platform);

    PP.physics.add(s, platform5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform5, collision_platform);

    PP.physics.add(s, blocchetto7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto7, collision_platform);

    PP.physics.add(s, blocchetto8, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto8, collision_platform);

    PP.physics.add(s, platform6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform6, collision_platform);

    PP.physics.add(s, platform7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform7, collision_platform);

    PP.physics.add(s, platform8, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform8, collision_platform);

    PP.physics.add(s, blocchetto9, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto9, collision_platform);

    PP.physics.add(s, blocchetto10, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto10, collision_platform);

    PP.physics.add(s, blocchetto11, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto11, collision_platform);

    PP.physics.add(s, platform9, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform9, collision_platform);

    PP.physics.add(s, platform10, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform10, collision_platform);

    PP.physics.add(s, blocco2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco2, collision_platform);

    PP.physics.add(s, blocco3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco3, collision_platform);

    PP.physics.add(s, platform11, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform11, collision_platform);

    PP.physics.add(s, platform12, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform12, collision_platform);

    PP.physics.add(s, platform13, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform13, collision_platform);

    PP.physics.add(s, blocco_supremo3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco_supremo3, collision_platform);

    PP.physics.add(s, blocchetto12, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto12, collision_platform);

    PP.physics.add(s, platform14, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform14, collision_platform);

    PP.physics.add(s, blocchetto13, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto13, collision_platform);

    PP.physics.add(s, blocco4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco4, collision_platform);

    PP.physics.add(s, bloccone, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, bloccone, collision_platform);


    PP.physics.add(s, ladder1, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(s, player, ladder1, on_ladder_overlap);

}


function create_platforms_lvl3(s, player) {
    let colonne = PP.assets.image.add(s, img_colonne, -1970, 977, 0, 1);

    let platform1 = PP.assets.image.add(s, img_platform8, 1200, 400, 0, 1);
    let platform2 = PP.assets.image.add(s, img_platform20, 1800, 580, 0, 1);
    let blocco1 = PP.assets.image.add(s, img_blocco15, 3200, 1380, 0, 1);
    let blocchetto1 = PP.assets.image.add(s, img_blocchetto41, 3050, 740, 0, 1);
    let blocchetto2 = PP.assets.image.add(s, img_blocchetto45, 3550, 680, 0, 1);
    let blocchetto3 = PP.assets.image.add(s, img_blocchetto2, 4450, 760, 0, 1);
    let blocchetto4 = PP.assets.image.add(s, img_blocchetto37, 4780, 180, 0, 1);
    let platform3 = PP.assets.image.add(s, img_platform2, 4150, -410, 0, 1);
    let blocchetto5 = PP.assets.image.add(s, img_blocchetto46, 3950, -410, 0, 1);
    let blocchetto6 = PP.assets.image.add(s, img_blocchetto47, 3300, -410, 0, 1);
    let platform4 = PP.assets.image.add(s, img_platform3, 2900, -700, 0, 1);
    let platform5 = PP.assets.image.add(s, img_platform3, 2300, -900, 0, 1);
    let platform6 = PP.assets.image.add(s, img_platform1, 2100, -1200, 0, 1);
    let platform7 = PP.assets.image.add(s, img_platform21, 2650, -1430, 0, 1);
    let platform8 = PP.assets.image.add(s, img_platform22, 2970, -1480, 0, 1);
    let platform9 = PP.assets.image.add(s, img_platform3, 4450, -1750, 0, 1);
    let platform10 = PP.assets.image.add(s, img_platform23, 4900, -2000, 0, 1);
    let platform11 = PP.assets.image.add(s, img_platform24, 5480, -2120, 0, 1);
    let platform12 = PP.assets.image.add(s, img_platform1, 5900, -2470, 0, 1);
    let platform13 = PP.assets.image.add(s, img_platform25, 5300, -2700, 0, 1);
    let platform14 = PP.assets.image.add(s, img_platform25, 4600, -2800, 0, 1);
    let platform15 = PP.assets.image.add(s, img_platform22, 2970, -3000, 0, 1);
    let platform16 = PP.assets.image.add(s, img_platform26, 2650, -3000, 0, 1);
    let platform17 = PP.assets.image.add(s, img_platform27, 2060, -3150, 0, 1);
    let platform18 = PP.assets.image.add(s, img_platform19, 1400, -3050, 0, 1);
    let platform19 = PP.assets.image.add(s, img_platform1, 800, -3250, 0, 1);
    let platform20 = PP.assets.image.add(s, img_platform22, -800, -3400, 0, 1);
    let platform21 = PP.assets.image.add(s, img_platform27, -1200, -3700, 0, 1);
    let platform22 = PP.assets.image.add(s, img_platform1, -1450, -4000, 0, 1);
    let platform23 = PP.assets.image.add(s, img_platform19, -950, -4250, 0, 1);
    let platform24 = PP.assets.image.add(s, img_platform28, -400, -4400, 0, 1);
    let platform25 = PP.assets.image.add(s, img_platform29, 700, -4300, 0, 1);
    let platform26 = PP.assets.image.add(s, img_platform19, 1400, -4400, 0, 1);
    let platform27 = PP.assets.image.add(s, img_platform27, 1950, -4620, 0, 1);
    let platform28 = PP.assets.image.add(s, img_platform1, 2700, -4700, 0, 1);
    let platform29 = PP.assets.image.add(s, img_platform30, 3300, -4800, 0, 1);
    let blocchetto7 = PP.assets.image.add(s, img_blocchetto8, 4200, -4900, 0, 1);
    let platform30 = PP.assets.image.add(s, img_platform1, 5000, -5450, 0, 1);
    let platform31 = PP.assets.image.add(s, img_platform1, 4500, -5750, 0, 1);
    let piattaforma_suprema1 = PP.assets.image.add(s, img_piattaforma_suprema1, 300, -5700, 0, 1)
    let piattaforma_suprema2 = PP.assets.image.add(s, img_piattaforma_suprema2, 700, -5980, 0, 1)

    let ladder1 = PP.assets.image.add(s, img_ladder, 3700, 210, 0, 1);

    let mappa7 = PP.assets.image.add(s, img_lvl3map, -1970, 1380, 0, 1);

    PP.layers.set_z_index(mappa7, 10);
    PP.layers.set_z_index(player, 30);
    PP.layers.set_z_index(colonne, 40);


    PP.physics.add(s, platform1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform1, collision_platform);

    PP.physics.add(s, platform2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform2, collision_platform);

    PP.physics.add(s, blocco1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocco1, collision_platform);

    PP.physics.add(s, blocchetto1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto1, collision_platform);

    PP.physics.add(s, blocchetto2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto2, collision_platform);

    PP.physics.add(s, blocchetto3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto3, collision_platform);

    PP.physics.add(s, blocchetto4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto4, collision_platform);

    PP.physics.add(s, platform3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform3, collision_platform);

    PP.physics.add(s, blocchetto5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto5, collision_platform);

    PP.physics.add(s, blocchetto6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto6, collision_platform);

    PP.physics.add(s, platform4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform4, collision_platform);

    PP.physics.add(s, platform5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform5, collision_platform);

    PP.physics.add(s, platform6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform6, collision_platform);

    PP.physics.add(s, platform7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform7, collision_platform);

    PP.physics.add(s, platform8, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform8, collision_platform);

    PP.physics.add(s, platform9, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform9, collision_platform);

    PP.physics.add(s, platform10, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform10, collision_platform);

    PP.physics.add(s, platform11, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform11, collision_platform);

    PP.physics.add(s, platform12, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform12, collision_platform);

    PP.physics.add(s, platform13, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform13, collision_platform);

    PP.physics.add(s, platform14, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform14, collision_platform);

    PP.physics.add(s, platform15, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform15, collision_platform);

    PP.physics.add(s, platform16, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform16, collision_platform);

    PP.physics.add(s, platform17, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform17, collision_platform);

    PP.physics.add(s, platform18, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform18, collision_platform);

    PP.physics.add(s, platform19, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform19, collision_platform);

    PP.physics.add(s, platform20, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform20, collision_platform);

    PP.physics.add(s, platform21, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform21, collision_platform);

    PP.physics.add(s, platform22, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform22, collision_platform);

    PP.physics.add(s, platform23, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform23, collision_platform);

    PP.physics.add(s, platform24, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform24, collision_platform);

    PP.physics.add(s, platform25, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform25, collision_platform);

    PP.physics.add(s, platform26, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform26, collision_platform);

    PP.physics.add(s, platform27, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform27, collision_platform);

    PP.physics.add(s, platform28, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform28, collision_platform);

    PP.physics.add(s, platform29, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform29, collision_platform);

    PP.physics.add(s, blocchetto7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, blocchetto7, collision_platform);

    PP.physics.add(s, platform30, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform30, collision_platform);

    PP.physics.add(s, platform31, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform31, collision_platform);

    PP.physics.add(s, piattaforma_suprema1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, piattaforma_suprema1, collision_platform);

    PP.physics.add(s, piattaforma_suprema2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, piattaforma_suprema2, collision_platform);


    PP.physics.add(s, ladder1, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(s, player, ladder1, on_ladder_overlap);


}




function update_platforms(s) {

}


// RENDIAMO GLOBALI LE FUNZIONI PER I MODULI
window.preload_platforms = preload_platforms;
window.create_platforms_lvl1_pt1 = create_platforms_lvl1_pt1;
window.create_platforms_lvl1_pt2 = create_platforms_lvl1_pt2;
if (typeof create_platforms_lvl2_pt1 !== 'undefined') window.create_platforms_lvl2_pt1 = create_platforms_lvl2_pt1;
if (typeof create_platforms_lvl2_pt2 !== 'undefined') window.create_platforms_lvl2_pt2 = create_platforms_lvl2_pt2;
if (typeof create_platforms_lvl3 !== 'undefined') window.create_platforms_lvl3 = create_platforms_lvl3;