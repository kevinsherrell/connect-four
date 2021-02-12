/*
todo for each row in the grid generate a div with a className of "row" and an attribute of "data-row: " and a value of the index of the row;
todo inside of the row generate 7 div with className of "column" and an attribute of "data-column: " and a value of the index of the column;
todo when a grid cell is selected (player 1: red, player 2: black), change the corresponding value of the row/column based upon the data of the cell selected.
for example:
    you select a div with a data attribute of data-column: 0 and a parent element with an attribute of data-row: 0,
    you will then change grid[data-row][data-column] to 0 for player1; or 1 for player 2;

* */

// Classes
class Game {
    constructor() {
        this.currentPlayer = {};
        this.gameStart = false;
        this.gameEnd = false;
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
        this.startModal = document.createElement('div');
        this.gameBoard = document.createElement('div');
        this.player1info = document.querySelector('.player1');
        this.player2info = document.querySelector('.player2');
        this.gameContainer = document.querySelector('.gameContainer');
        this.gameOverModal = document.createElement('div');
        this.nameValue = "";
    }


    start() {
        this.gameOver = false;
        this.gameStart = true;
        player1.name = this.nameValue;
        // Submits player name
        if (this.nameValue.length !== 0) {
            // Resets input
            document.querySelector('.nameInput').value = '';
            if (this.restart === true) {
                this.startModal.classList.add('restart')
            }
            if (this.gameStart === true) {
                this.startModal.classList.toggle('gameStart');
            }
            if (this.gameEnd === true) {
                this.gameOverModal.classList.toggle('gameEnd');
            }
            const hiddenItems = document.querySelectorAll('.hide');
            hiddenItems.forEach(item => {
                if (item.classList.contains('hide')) {
                    item.classList.toggle("hide")
                }
            })
            console.log(hiddenItems);

            // add wins and losses

            this.player1info.innerHTML = `
            <h3 class="playerHeader">${player1.name}</h3>
            <h4>Wins: ${player1.wins}</h4>
            <h4>Losses: ${player1.losses}</h4>
        `
            this.player2info.innerHTML = `
        
            <h3 class="playerHeader">${player2.name}</h3>
            <h4>Wins: ${player2.wins}</h4>      
            <h4>Losses: ${player2.losses}</h4>      
`
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.classList.add('error');
            errorMessage.innerText = "Must enter a name to continue";
            document.querySelector('.inputContainer').appendChild(errorMessage);
        }


    }

    end() {
        this.gameEnd = true;
        this.generateGameOverModal();

    };

    reset() {
        this.player1info.classList.toggle('gameOver');
        console.log(this.player1info);
        this.player2info.classList.toggle('gameOver');
        console.log(this.player2info);
        this.gameContainer.classList.toggle('gameOver');
        console.log(this.gameContainer);

    }

    generateBoard() {
        // generate game board/play area
        this.gameBoard.setAttribute('id', 'gameBoard');
        this.gameBoard.classList.add("hide");
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
                // console.log("working");
            }
            this.gameBoard.appendChild(row);
        }
        //===================================================================

        // append gameboard to play area and play area to body
        document.querySelector('.gameContainer').appendChild(this.gameBoard);
        // document.body.appendChild(playArea);
        //====================================================================

        // add event listener to each cell
        const cells = document.querySelectorAll('.column');
        cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                let row = parseInt(cell.dataset.row);
                let column = parseInt(cell.dataset.column);
                if (this.winner === null) {
                    game.currentPlayer.select(cell, row, column);
                    this.check();
                }
                // game.check(game.currentPlayer);

            })
        })
        //============================================================
    }

    generateStartModal() {
        this.startModal.classList.add("startModal");
        // this.startModal.classList.add("show");
        this.startModal.innerHTML = `
                <img src="./images/header_logo.png" alt="">
                <div class="inputContainer">
                    <h2>Please Enter Your Name</h2>
                    <input type="text" class="nameInput">
                    <button class="startButton">Start Game!</button>
                </div>
        `
        // Add modal to dom.
        document.body.appendChild(this.startModal);
        //========================================

        // Add input listener to change player name..
        document.querySelector('.nameInput').addEventListener('input', (e) => {
            e.preventDefault();
            this.nameValue = e.target.value;
            // console.log(e.target.value);
            // console.log(this.nameValue)
            // console.log(player1);
        })
        //==========================================

        // Start button functionality
        let startButton = document.querySelector('.startButton');
        // console.log(startButton);
        startButton.addEventListener('click', (e) => {
            e.preventDefault();
            game.start();
            console.log('click working')
        })
        //===========================================================
    }

    generateGameOverModal() {
        this.gameOverModal.classList.add("gameOverModal");
        this.gameOverModal.classList.add("gameEnd");
        this.gameOverModal.innerHTML = `
                <img src="./images/header_logo.png" alt="">
                <div class="inputContainer">
                    <h2>${this.winner === 'red' ? player1.name : player2.name} wins!!!</h2>
                    <button class="playAgain">Play Again!</button>
                </div>
        `
        // Add modal to dom
        document.body.appendChild(this.gameOverModal);
        //========================================
        //
        // // Add input listener to change player name.
        // document.querySelector('.nameInput').addEventListener('input', (e) => {
        //     e.preventDefault();
        //     this.nameValue = e.target.value;
        //     // console.log(e.target.value);
        //     // console.log(this.nameValue)
        //     // console.log(player1);
        // })
        // //==========================================
        // game over is to true

        if (this.winner === "red") {
            player1.wins++;
            player2.losses++;
        } else if (this.winner === 'black') {
            player2.wins++;
            player1.losses++;
        }
        // makes gameboard dissapear and resets board
        this.reset();
        // Start button functionality
        let playAgain = document.querySelector('.playAgain');
        // console.log(startButton);
        playAgain.addEventListener('click', (e) => {
            e.preventDefault();
            this.restart = true;
            const selected = document.querySelectorAll('.selected');
            selected.forEach(element => {
                element.className = 'column';
            })
            this.grid = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ]
            this.winner = null;
            game.start();
            console.log('click working')
        })
        //===========================================================
    }

    check() {

        const checkHorizontal = () => {
            for (let row = 0; row < 6; row++) {
                for (let column = 0; column < 4; column++) {
                    let current = this.grid[row][column];
                    let nextColumn = this.grid[row][column + 1];
                    let nextColumn2 = this.grid[row][column + 2];
                    let nextColumn3 = this.grid[row][column + 3];

                    if (current !== 0) {
                        if (current === this.grid[row][column + 1] &&
                            current === this.grid[row][column + 2] &&
                            current === this.grid[row][column + 3]) {
                            this.winner = current;
                            this.end()
                        }
                    }
                }
            }

        }
        const checkVertical = () => {
            for (let row = 0; row < 3; row++) {
                for (let column = 0; column < 7; column++) {
                    let current = this.grid[row][column];
                    let nextColumn = this.grid[row][column + 1];
                    let nextColumn2 = this.grid[row][column + 2];
                    let nextColumn3 = this.grid[row][column + 3];

                    if (current !== 0 && this.grid[row] !== this.grid.length) {
                        if (current === this.grid[row + 1][column] &&
                            current === this.grid[row + 2][column] &&
                            current === this.grid[row + 3][column]) {
                            this.winner = current;
                            this.end();
                        }
                    }
                }
            }

        }
        const checkDiagonalRight = () => {
            for (let row = 0; row < 3; row++) {
                for (let column = 0; column <= 4; column++) {
                    let current = this.grid[row][column];
                    let nextColumn = this.grid[row][column + 1];
                    let nextColumn2 = this.grid[row][column + 2];
                    let nextColumn3 = this.grid[row][column + 3];

                    if (current !== 0) {
                        if (current === this.grid[row + 1][nextColumn],
                        current === this.grid[row + 2][nextColumn2],
                        current === this.grid[row + 3][nextColumn3]) {
                            this.winner = current
                            this.end();
                            console.log(this.winner)
                        }
                    }
                }
            }

        }
        const checkDiagonalLeft = () => {
            for (let row = 3; row < 6; row++) {
                for (let column = 0; column <= 4; column++) {
                    let current = this.grid[row][column];
                    let nextColumn = this.grid[row][column + 1];
                    let nextColumn2 = this.grid[row][column + 2];
                    let nextColumn3 = this.grid[row][column + 3];

                    if (current !== 0) {
                        if (current === this.grid[row - 1][nextColumn],
                        current === this.grid[row - 2][nextColumn2],
                        current === this.grid[row - 3][nextColumn3]) {
                            this.winner = current
                            this.end();
                            console.log(this.winner)
                        }
                    }
                }
            }
        }
        if (this.winner === null) {
            checkHorizontal();
            console.log(this.grid)
            checkVertical();
            console.log(this.grid)
            checkDiagonalRight();
            console.log(this.grid)
            checkDiagonalLeft();
            console.log(this.grid)
        }
        // if (this.winner === 'red') {
        //     alert(`${player1.name} wins!!!!!`);
        // } else if (this.winner === 'black') {
        //     alert(`${player2.name} wins!!!`);
        // }


    }

    init() {
    }

    getNameInput() {
        return this.nameValue;
    }
}


class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.wins = 0;
        this.losses = 0;
    };

    select(element, row, column, check) {
        /*
         selection conditions (cell is selectable if....):
            selection is on bottom row (5) or...
            the cell in the row below current row is selected.
        */
        if (element.classList.contains('selected')) {
            console.log('space has already been selected');
        } else if (element.dataset.row == 5 || game.grid[row + 1][column] != 0) {
            game.grid[row][column] = game.currentPlayer.color;
            element.classList.add("selected")
            element.classList.add(game.currentPlayer.color);
            if (game.currentPlayer === player1) {
                game.currentPlayer = player2;
            } else {
                game.currentPlayer = player1;
            }
            // console.log(game.grid);
            // console.log(element)
        }
    }
};

const game = new Game();
// Create players
const player1 = new Player('default', "red");
const player2 = new Player('CPU', 'black');
// Create game object
game.currentPlayer = player1; // player1 always goes first.
// console.log(game.currentPlayer)
game.generateStartModal();
game.generateBoard();

/*
Horizontal check logic:
    if row at index is equal to row at index + 1 add 1 to count
        if count equals 3 current player wins
            if row at index is not equal to row at index + 1 count is reset to zero;
 */