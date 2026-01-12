import {Board} from './board.js';
import {AI} from './ai.js';

const board = Board();
window.addEventListener('click', (e) => {
    const targetElement = e.target;
    if (targetElement.classList.contains('board-sizing')) {
        board.changeTo(targetElement, board.getX());
    };
});

const ai = AI();
window.addEventListener('click', (e) => {
    const targetElement = e.target;
    if (targetElement.classList.contains('board-sizing')) {
        if (ai.canBotPlay() === true) {
            ai.blockOpponent();
            if (ai.canBotPlay()) {
                ai.bestMove();
            };
        };
    };
});