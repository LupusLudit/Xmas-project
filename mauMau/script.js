import { Game } from "./game.js";

/**
 * This file runs the whole code, it serves as the main method
 */

const game = new Game();
window.onload = function () {
    game.menu();
}