class Game {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer;
        this.gameStart = false;
        this.gameEnd = false;
        this.gameOver = false;
        this.restart = false;
        this.winner = null;
        this.grid = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        this.nameValue = '';
        this.error = false;
    }

    start(callback) {
        player1.name = this.nameValue;
        this.updatePlayerInfo();
        this.gameStart = true;
        this.gameEnd = false;


    }

    end(toggle) {
        this.toggleClass([player1info, player2info, gameContainer], 'gameEnd');
        this.gameEnd = true;
    }

    init() {
        player1.reset();
        player2.reset();
    }

    reset() {
        this.winner = null;
        this.grid = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ]
        if (this.gameOver !== true) {
            this.toggleClass(
                [player1info,
                    player2info,
                    gameContainer
                ],
                "gameEnd"
            )
        } else if (this.gameOver === true) {
            this.currentPlayer = player1;
        }
        gameOverModal.classList.toggle('gameEnd');
        document.querySelectorAll('.selected').forEach(element => {
            element.classList.toggle('selected');
            if (element.classList.contains('red')) {
                element.classList.remove('red')
            } else if (element.classList.contains('black')) {
                element.classList.remove('black')
            }
        })
    }

    calculateScore() {
        if (this.winner === "red") {
            player1.wins++;
            player2.losses++;
        } else if (this.winner === 'black') {
            player2.wins++;
            player1.losses++;
        }
    }

    updatePlayerInfo() {
        document.querySelector('.player1Header').textContent = `${player1.name}`
        document.querySelector('.player2Header').textContent = `${player2.name}`
        document.querySelector('.player1wins').textContent = `Wins: ${player1.wins}`
        document.querySelector('.player1losses').textContent = `Losses ${player1.losses}`
        document.querySelector('.player2wins').textContent = `Wins: ${player2.wins}`
        document.querySelector('.player2losses').textContent = `Losses ${player2.losses}`
    }

    checkHorizontal = () => {
        for (let row = 5; row >= 0; row--) {
            for (let column = 0; column < 4; column++) {
                let current = this.grid[row][column];
                if (current !== 0) {
                    if (current === this.grid[row][column + 1] &&
                        current === this.grid[row][column + 2] &&
                        current === this.grid[row][column + 3]) {

                        this.winner = current;
                        this.updatePlayerInfo();
                    }
                }
            }
        }

    }
    checkVertical = () => {

        for (let row = 5; row > 2; row--) {
            for (let column = 0; column < 7; column++) {
                let current = this.grid[row][column];
                if (current !== 0 && this.grid[row] !== this.grid.length) {
                    if (current === this.grid[row - 1][column] &&
                        current === this.grid[row - 2][column] &&
                        current === this.grid[row - 3][column]) {
                        this.winner = current;
                        // this.updatePlayerInfo();
                    }
                }
            }
        }

    }
    checkDiagonalRight = () => {

        for (let row = 5; row > 2; row--) {
            for (let column = 0; column < 4; column++) {
                let current = this.grid[row][column];
                if (current !== 0) {
                    if (current === this.grid[row - 1][column + 1],
                    current === this.grid[row - 2][column + 2],
                    current === this.grid[row - 3][column + 3]) {
                        this.winner = current
                        // this.updatePlayerInfo();
                    }
                }
            }
        }

    }
    checkDiagonalLeft = () => {
        for (let row = 5; row > 2; row--) {
            for (let column = 6; column > 2; column--) {
                let current = this.grid[row][column];
                if (current !== 0) {
                    if (current === this.grid[row - 1][column - 1],
                    current === this.grid[row - 2][column - 2],
                    current === this.grid[row - 3][column - 3]) {
                        this.winner = current
                        // this.updatePlayerInfo();
                    }
                }
            }
        }

    }

    check(element, className) {
        if (this.winner === null) {
            this.checkHorizontal();
            this.checkVertical();
            this.checkDiagonalRight();
            this.checkDiagonalLeft();
        }
        if (this.winner) {
            //todo find a way to play sound for five seconds before modal appears
            setTimeout(() => {
                this.calculateScore();
                this.updatePlayerInfo();
                this.end();
                this.updateGameOverModal();
                gameOverModal.classList.toggle('gameEnd');
            }, 1500)
        }
    }

    toggleClass([...elements], className) {
        elements.forEach(element => {
            element.classList.toggle(className);
        })
    }

    toggleModal(element, className) {
        element.classList.toggle(className);
    }

    updateGameOverModal() {
        document.querySelector('.displayWinner').textContent = `${game.winner === 'red' ? player1.name : player2.name} wins!!`
//=====================================================================
    }
}

class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.wins = 0;
        this.losses = 0;
    }

    reset() {
        this.name = "";
        this.wins = 0;
        this.losses = 0;
        player2.name = "player2";
    }

    select(element, row, column) {
        /*
         selection conditions (cell is selectable if....):
            selection is on bottom row (5) or...
            the cell in the row below current row is selected.
        */
        if (element.classList.contains('selected')) {
            console.log("you cannot select this cell")
        } else if (element.dataset.row == 5 || game.grid[row + 1][column] != 0) {
            game.grid[row][column] = game.currentPlayer.color;
            element.classList.add("selected")
            element.classList.add(game.currentPlayer.color);
            if (game.currentPlayer === player1) {
                game.currentPlayer = player2;
            } else {
                game.currentPlayer = player1;
            }
        }
    }
}

const player1 = new Player('default', 'red');
const player2 = new Player('player2', 'black');
const game = new Game(player1);
player1.name = game.nameValue;
// GAMEBOARD
const gameBoard = document.createElement('div');
gameBoard.setAttribute('id', 'gameBoard');
// gameBoard.classList.add("hide");
for (let i = 0; i < game.grid.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row")
    row.setAttribute("data-row", `${i}`)
    for (let j = 0; j < game.grid[i].length; j++) {
        let column = document.createElement("div");
        column.classList.add('column');
        column.setAttribute('data-row', `${i}`);
        column.setAttribute('data-column', `${j}`);
        row.appendChild(column);
    }
    gameBoard.appendChild(row);
}
document.querySelector('.gameContainer').appendChild(gameBoard);

const cells = document.querySelectorAll('.column');
cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
        let row = parseInt(cell.dataset.row);
        let column = parseInt(cell.dataset.column);
        if (game.winner === null) {
            game.currentPlayer.select(cell, row, column);
            game.check();
        }

    })
})

//=======================================================================
const player1info = document.querySelector('.player1');
const player2info = document.querySelector('.player2');
const gameContainer = document.querySelector('.gameContainer');
// START MODAL==========================================================
const startModal = document.querySelector('.startModal');
// Get input value
document.querySelector('.nameInput').addEventListener('input', e => {
    e.preventDefault();
    game.nameValue = e.target.value;
})

document.querySelector('.startButton').addEventListener('click', e => {
    e.preventDefault();
    if (game.nameValue.length > 0 && game.error !== true) {
        game.toggleClass(
            [player1info,
                player2info,
                gameContainer],
            'gameEnd'
        );
        game.toggleClass([startModal], 'gameStart');
        game.start();
        document.querySelector('.nameInput').value = "";
    } else {
        let intervalID;
        const errorMessage = document.createElement('P');
        errorMessage.classList.add('error');
        errorMessage.textContent = "Please enter a name to play the game";
        const showError = () => {
            startModal.appendChild(errorMessage);
        }
        showError();
        setTimeout(() => {
            document.querySelector('.error').remove();
        }, 5000)


    }
})
//====================================================================

//=========================================================================
// GAME OVER MODAL
const gameOverModal = document.querySelector('.gameOverModal');
document.querySelector('.playAgain').addEventListener('click', e => {
    e.preventDefault();
    game.reset();
    game.start();
})
document.querySelector('.endGameButton').addEventListener('click', e => {
    game.gameOver = true;
    player1.reset();
    player2.reset();
    game.reset();
    setTimeout(() => {
        startModal.classList.toggle("gameStart");
    }, 1000)
})
