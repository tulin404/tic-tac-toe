import {Board} from './board.js';

const board = Board();
window.addEventListener('click', (e) => {
    const targetElement = e.target;
    board.changeTo(targetElement, board.getX());
})