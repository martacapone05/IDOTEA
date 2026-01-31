let img_idotea_bg; 

function preload_idotea(s) {
    img_idotea_bg = PP.assets.image.load(s, "assets/images/salva_idotea.png");
}

function create_idotea(s) {
    PP.assets.image.add(s, img_idotea_bg, 0, 0, 0, 0);
    // Rettangolo invisibile
    let btn_salva = PP.shapes.rectangle_add(s, 641, 632, 272, 60, "0x000000", 0.01);
    PP.interactive.mouse.add(btn_salva, "pointerdown", function() {
        PP.scenes.start("lvl1_pt1");
    });
}

function update_idotea(s) {
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER) || 
        PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
        PP.scenes.start("lvl1_pt1");
    }
}

PP.scenes.add("schermata_idotea", preload_idotea, create_idotea, update_idotea, function(){});

PP.scenes.add("main_menu", preload, create, update, destroy);