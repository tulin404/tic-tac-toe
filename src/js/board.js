export function Board() {
    const gameBoard = document.getElementById('game-board');
    const gameBoardPositions = Array.from(gameBoard.children);
    const 
    [board0, board1, board2,
    board3, board4, board5,
    board6, board7, board8] = gameBoardPositions;

    const winningPossibilities = [
        [board0, board1, board2], [board3, board4, board5], [board6, board7, board8],
        [board0, board3, board6], [board1, board4, board7], [board2, board5, board8],
        [board0, board4, board8], [board2, board4, board6]
    ];
    const X = 'public/cross.png';
    const O = 'public/circle.png';

    return {
        getX() {
            return X;
        },
        getO() {
            return O;
        },
        getGameBoard() {
            return gameBoardPositions;
        },
        getWinningPoss() {
            return winningPossibilities;
        },
        changeTo(boardPosition, element) {
            console.log(boardPosition);
            if (gameBoardPositions.includes(boardPosition)) {
                const img = boardPosition.querySelector('img');
                img.src = element;
            } else {
                boardPosition.src = element;
            };
        }
    };
};