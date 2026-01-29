let npc_list = [];
let dialogue_active = false;
let current_dialogue_index = 0;
let current_npc = null;
let dialogue_popup = null;
let dialogue_text = null;
let dialogue_hint = null;
let dialogue_speaker = null;
let e_key_was_pressed = false;

const PLAYER_WIDTH = 70;
const PLAYER_HEIGHT = 246;
const NPC_COLOR = "0x808080";

const PLACEHOLDER_DIALOGUE = [
    { speaker: "npc", text: "Salve, viaggiatore. Fai attenzione alle trappole qui avanti." },
    { speaker: "player", text: "Grazie del consiglio. Cercherò di non farmi male." },
    { speaker: "npc", text: "Se cadi nel vuoto, tornerai all'inizio. Buona fortuna!" }
];

function create_npc(s, x, y, name, dialogues) {
    let npc_width = 50;
    let npc_height = PLAYER_HEIGHT * 0.5;
    
    let npc = PP.shapes.rectangle_add(s, x, y - npc_height/2, npc_width, npc_height, NPC_COLOR, 1);
    PP.physics.add(s, npc, PP.physics.type.STATIC);
    
    npc.npc_name = name;
    npc.dialogues = dialogues;
    npc.interaction_range = PLAYER_WIDTH * 2.5;
    
    npc_list.push(npc);
    return npc;
}

function is_player_near_npc(player, npc) {
    let player_x = player.geometry.x;
    let npc_x = npc.geometry.x;
    let distance = Math.abs(player_x - npc_x);
    
    let player_y = player.geometry.y;
    let npc_y = npc.geometry.y;
    let height_diff = Math.abs(player_y - npc_y);
    
    return distance < npc.interaction_range && height_diff < 200;
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
    
    let popup_width = 800;           
    let popup_height = 150;           
    let screen_center_x = 640;
    let popup_y = 100;
    
    dialogue_popup = PP.shapes.rectangle_add(s, 0, 0, popup_width, popup_height, "0x1a1a2e", 0.95);
    dialogue_popup.tile_geometry.scroll_factor_x = 0;
    dialogue_popup.tile_geometry.scroll_factor_y = 0;
    dialogue_popup.geometry.x = screen_center_x;
    dialogue_popup.geometry.y = popup_y;
    
    PP.shapes.set_stroke(dialogue_popup, 3, "0x4a4a6a", 1);
    PP.layers.set_z_index(dialogue_popup, 10001);
    
    let text_x = screen_center_x - popup_width/2 + 20; 
    let text_y = popup_y - popup_height/2 + 20;

    dialogue_speaker = PP.shapes.text_styled_add(s, text_x, text_y, "", 20, "Arial", "bold", "0xffd700", null, 0, 0);
    dialogue_speaker.tile_geometry.scroll_factor_x = 0;
    dialogue_speaker.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_speaker, 10002);
    
    dialogue_text = PP.shapes.text_styled_add(s, text_x, text_y + 35, "", 18, "Arial", "normal", "0xffffff", null, 0, 0);
    dialogue_text.tile_geometry.scroll_factor_x = 0;
    dialogue_text.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_text, 10002);
    
    dialogue_hint = PP.shapes.text_styled_add(s, screen_center_x + popup_width/2 - 20, text_y + 100, "[ Premi E ]", 14, "Arial", "bold", "0x00ff88", null, 1, 0);
    dialogue_hint.tile_geometry.scroll_factor_x = 0;
    dialogue_hint.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogue_hint, 10002);
    
    show_current_dialogue_line();
}

function show_current_dialogue_line() {
    if (!current_npc || current_dialogue_index >= current_npc.dialogues.length) {
        close_dialogue_popup();
        return;
    }
    
    let line = current_npc.dialogues[current_dialogue_index];
    let speaker_name = "";
    
    if (line.speaker === "npc") {
        speaker_name = current_npc.npc_name + ":";
    } else {
        speaker_name = "Tu:";
    }
    
    PP.shapes.text_change(dialogue_speaker, speaker_name);
    PP.shapes.text_change(dialogue_text, line.text);
    
    if (current_dialogue_index >= current_npc.dialogues.length - 1) {
        PP.shapes.text_change(dialogue_hint, "[ E per Chiudere ]");
    } else {
        PP.shapes.text_change(dialogue_hint, "[ E per Continuare ]");
    }
}

function close_dialogue_popup() {
    if (!dialogue_active) return;
    
    dialogue_active = false;
    current_npc = null;
    current_dialogue_index = 0;
    
    if (dialogue_popup) { PP.shapes.destroy(dialogue_popup); dialogue_popup = null; }
    if (dialogue_text) { PP.shapes.destroy(dialogue_text); dialogue_text = null; }
    if (dialogue_hint) { PP.shapes.destroy(dialogue_hint); dialogue_hint = null; }
    if (dialogue_speaker) { PP.shapes.destroy(dialogue_speaker); dialogue_speaker = null; }
}

function advance_dialogue() {
    if (!dialogue_active) return;
    current_dialogue_index++;
    show_current_dialogue_line();
}

function manage_npc_interaction(s, player) {
    if (dialogue_active) {
        let vel_x = PP.physics.get_velocity_x(player);
        if (Math.abs(vel_x) > 10) {
            close_dialogue_popup();
            return;
        }
    }
    
    let e_pressed = PP.interactive.kb.is_key_down(s, PP.key_codes.E);
    
    if (e_pressed && !e_key_was_pressed) {
        if (dialogue_active) {
            advance_dialogue();
        } else {
            let nearby_npc = get_nearest_interactable_npc(player);
            if (nearby_npc) {
                open_dialogue_popup(s, nearby_npc);
                PP.physics.set_velocity_x(player, 0);
            }
        }
    }
    
    e_key_was_pressed = e_pressed;
}

function reset_npcs() {
    npc_list = [];
    close_dialogue_popup();
    e_key_was_pressed = false;
}

function is_dialogue_active() {
    return dialogue_active;
}