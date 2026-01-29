var config = {
    canvas_width: 1280,
    canvas_height: 800,
    canvas_id: "game_area",
    background_color: 0x000000,
    debug_mode: true,
    gravity_value: 2500
};


var game_div = document.getElementById("game_area");

game_div.style.position = "absolute";
game_div.style.top = "50%";
game_div.style.left = "50%";
game_div.style.transform = "translate(-50%, -50%)";

document.body.style.backgroundColor = "#ffffff";
document.body.style.margin = "0";
document.body.style.overflow = "hidden"; // Toglie le barre di scorrimento


PP.game.create(config);