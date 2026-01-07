export function Board() {
    const gameBoard = document.getElementById('game-board');
    const gameBoardPositions = Array.from(gameBoard.children);
    const 
    [board0, board1, board2,
    board3, board4, board5,
    board6, board7, board8] = gameBoardPositions;

    const X = 'public/cross.png';
    const O = 'public/circle.png';

    return {
        getX() {
            return X;
        },
        getO() {
            return O;
        },
        changeTo(boardPosition, element) {
            const targetElement = gameBoardPositions.find(element => element == boardPosition);
            const image = targetElement.querySelector('img');
            image.src = element;
        }
    };
};