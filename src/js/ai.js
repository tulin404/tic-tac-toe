import {Board} from './board.js';
const board = Board();

const winningPossibilities = board.getWinningPoss();

// RETURNS THE POSSIBILITIES ARRAY MAPPED (EACH ARRAY) WITH THE UNFILLED ONES
function checkUnfilled() {
    const unfilled = winningPossibilities.map(poss => {
        const [poss1, poss2, poss3] = poss;
        const img1 = poss1.querySelector('img');
        const img2 = poss2.querySelector('img');
        const img3 = poss3.querySelector('img');
        const imgArray = [img1, img2, img3];
        const imgFiltered = imgArray.filter(img => {
            return (img.getAttribute('src') == "");
        });
        return imgFiltered;
    });
    return unfilled;
};

// CHOOSE AN UNFILED ARRAY THAT HAS ONLY ONE UNFILLED ELEMENT AND FILLS IT (winning and blocking purpose)
function blockOpponent() {
    const unfilled = checkUnfilled();
    // REMOVE EMPTY ARRAYS
    const unfilledFilter = unfilled.filter(arr => arr.length === 1);
    const chosenArray = unfilledFilter[0];
    if (chosenArray !== undefined) {
        board.changeTo(chosenArray[0], board.getO());  
    } else {
        bestMove();
    }
};

// HELPER (CHOOSES A RANDOM WIN CONDITION)
function chooseRandomWinCondition() {
    const choosenCondition = Math.floor(Math.random() * 8);
    const choosenWin = winningPossibilities[choosenCondition];
    return choosenWin;
};

// HELPER (CHECKS IF ANY ELEMENT ON THE WINARRAY HAS THE ELEMENT)
function hasElementFilledWith(winCondition, element) {
    const [e1, e2, e3] = winCondition;
    const e1Img = e1.querySelector('img');
    const e2Img = e2.querySelector('img');
    const e3Img = e3.querySelector('img');
    if (e1Img.src == element || e2Img.src == element || e3Img.src == element) {
        return true
    } else {
        return false
    };
};

const choosenWin = chooseRandomWinCondition();
function bestMove() {
    if (choosenWin.length === 3) {
        const index = Math.floor(Math.random() * 3);
        const choosenSpot = choosenWin[index];
        board.changeTo(choosenSpot, board.getO());
    } else if (choosenWin.length === 2 && hasElementFilledWith(choosenWin, board.getO())) {
        const unfilledInWin = choosenWin.filter(position => {
            const image = position.querySelector('img');
            return (image.src.endsWith('/'))
        });
        const random = Math.floor(Math.random() * 2);
        board.changeTo(unfilledInWin[random], board.getO());
    } else {
        randomMove()
    };
};

function randomMove() {
    const gameBoard = board.getGameBoard();
    const random = Math.floor(Math.random() * 9);
    board.changeTo(gameBoard[random], board.getO());
};

function AImove() {

}

export function AI() {
    return {
        blockOpponent() {
            return blockOpponent()
        },
        bestMove() {
            return bestMove()
        },
        randomMove() {
            return randomMove()
        }
    };
};