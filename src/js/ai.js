import {Board} from './board.js';
const board = Board();

const winningPossibilities = board.getWinningPoss();

// CHECKS IF IT IS THE BOT'S TURN
function canBotPlay() {
    const gameBoard = board.getGameBoard();
    const OArray = gameBoard.filter(pos => {
        const img = pos.querySelector('img');
        return (img.src.includes(board.getO()));
    });
    const XArray = gameBoard.filter(pos => {
        const img = pos.querySelector('img');
        return (img.src.includes(board.getX()));
    });
    if (XArray.length > OArray.length) {
        return true;
    } else {
        return false;
    };
};

// RETURNS THE WIN POSSIBILITIES ARRAY MAPPED (EACH ARRAY) WITH THE UNFILLED ONES
function checkUnfilled() {
    const unfilled = winningPossibilities.map(poss => {
        const [poss1, poss2, poss3] = poss;
        const img1 = poss1.querySelector('img');
        const img2 = poss2.querySelector('img');
        const img3 = poss3.querySelector('img');
        const imgArray = [img1, img2, img3];
        const imgFiltered = imgArray.filter(img => {
            return (img.src.endsWith('/'));
        });
        return imgFiltered;
    });
    console.log(unfilled);
    return unfilled;
};

// CHOOSE AN UNFILED ARRAY THAT HAS ONLY ONE UNFILLED ELEMENT AND FILLS IT (winning and blocking purpose)
function blockOpponent() {
    const unfilled = checkUnfilled();
    // REMOVE EMPTY ARRAYS
    const unfilledFilter = unfilled.filter(arr => arr.length === 1);
    console.log(unfilledFilter)
    // const unfilledFilterWithX = unfilledFilter.filter(arr => {
    //     element = arr[0];
    //     const img = element.querySelector('img');
    //     return (img.src.includes(board.getX()));
    // })
    // CHOOSE THE FIRST ARRAY AND BLOCKS IT
    const chosenArray = unfilledFilter[0];
    if (chosenArray !== undefined) {
        board.changeTo(chosenArray[0], board.getO());  
    } else {
        return
    };
};

// HELPER (CHOOSES A RANDOM WIN CONDITION)
function chooseRandomWinCondition() {
    const chosenCondition = Math.floor(Math.random() * 8);
    const chosenWin = winningPossibilities[chosenCondition];
    return chosenWin;
};

// HELPER (CHECKS IF ANY ELEMENT ON THE WINARRAY HAS THE ELEMENT)
function filledWith(winCondition, element, num) {
    const filterArray = winCondition.filter(el => el.src.includes(element));
    return (filterArray.length === num);
};

let chosen = chooseRandomWinCondition();
console.log(chosen);

function bestMove() {
    // THIS chosenWIN WILL BE DEFINED AT MAIN JS
    let chosenWinImgs = chosen.map(pos => pos.querySelector('img'));
    let chosenWinNullImgs = chosenWinImgs.filter(img => img.src.endsWith('/'));
    if (chosenWinNullImgs.length === 3) {
        const index = Math.floor(Math.random() * 3);
        const chosenSpot = chosenWinNullImgs[index];
        board.changeTo(chosenSpot, board.getO());
    } else if (chosenWinNullImgs.length === 2 && filledWith(chosenWinImgs, board.getO(), 1)) {
        const random = Math.floor(Math.random() * 2);
        board.changeTo(chosenWinNullImgs[random], board.getO());
    } else if (chosenWinNullImgs.length === 1 && filledWith(chosenWinImgs, board.getO(), 2)) {
        board.changeTo(chosenWinNullImgs[0], board.getO());
    } else if (chosenWinNullImgs.length === 2 && filledWith(chosenWinImgs, board.getX(), 1)) {
        let chosen = chooseRandomWinCondition();
        console.log('recursion');
    } else {
        return;
    };
};

export function AI() {
    return {
        canBotPlay() {
            return canBotPlay()
        },
        chooseRandomWinCondition() {
            return chooseRandomWinCondition()  
        },
        blockOpponent() {
            return blockOpponent()
        },
        bestMove() {
            return bestMove()
        }
    };
};