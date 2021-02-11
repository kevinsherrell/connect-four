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
        this.gameOver = true;
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
        this.nameValue = "";
    }


    start() {
        this.gameOver = false;
        player1.name = this.nameValue;
        // Submits player name
        if (this.nameValue.length !== 0) {
            // Resets input
            document.querySelector('.nameInput').value = '';
            this.startModal.classList.toggle('show');
            const hiddenItems = document.querySelectorAll('.gameOver');
            hiddenItems.forEach(item => {
                if (item.classList.contains('gameOver')) {
                    item.classList.toggle("gameOver")
                }
            })
            console.log(hiddenItems);

            // add wins and losses
            const player1info = document.querySelector('.player1');
            player1info.innerHTML = `
            <h3 class="playerHeader">${player1.name}</h3>
            <h4>Wins: ${player1.wins}</h4>
            <h4>Losses: ${player1.losses}</h4>
        `
            const player2info = document.querySelector('.player2');
            player2info.innerHTML = `
        
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
        this.gameOver = true;
    };

    reset() {
    }

    generateBoard() {
        // generate game board/play area
        this.gameBoard.setAttribute('id', 'gameBoard');
        this.gameBoard.classList.add("gameOver");
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
                    game.currentPlayer.select(cell, row, column, game.check());
                }
                // game.check(game.currentPlayer);

            })
        })
        //============================================================
    }

    generateStartModal() {
        this.startModal.classList.add("startModal");
        this.startModal.classList.add("show");
        this.startModal.innerHTML = `
                <img src="./images/header_logo.png" alt="">
                <div class="inputContainer">
                    <h2>Please Enter Your Name</h2>
                    <input type="text" class="nameInput">
                    <button class="startButton">Start Game!</button>
                </div>
        `
        // Add modal to dom
        document.body.appendChild(this.startModal);
        //========================================

        // Add input listener to change player name.
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

    check() {
        const checkHorizontal = () => {
            for (let row = 0; row < game.grid.length; row++) {
                for (let column = 0; column < game.grid[row].length - 3; column++) {
                    let current = game.grid[row][column];
                    let nextColumn = game.grid[row][column + 1];
                    let nextColumn2 = game.grid[row][column + 2];
                    let nextColumn3 = game.grid[row][column + 3];

                    if (current !== 0) {
                        if (current === game.grid[row][column + 1] &&
                            current === game.grid[row][column + 2] &&
                            current === game.grid[row][column + 3]) {
                            this.winner = current;
                        }
                    }
                }
            }

        }
        const checkVertical = ()=>{
            for (let row = 0; row < game.grid.length; row++) {
                for (let column = 0; column < game.grid[row].length - 3; column++) {
                    let current = game.grid[row][column];
                    let nextColumn = game.grid[row][column + 1];
                    let nextColumn2 = game.grid[row][column + 2];
                    let nextColumn3 = game.grid[row][column + 3];

                    if(current !== 0){
                        if(current === game.grid[row - 1][column] &&
                            current === game.grid[row - 2][column] &&
                            current === game.grid[row - 3][column]){
                            this.winner = current;
                        }
                    }
                }
            }

        }
        const checkDiagonalRight = ()=>{
            for (let row = 0; row < game.grid.length; row++) {
                for (let column = 0; column < game.grid[row].length; column++) {
                    let current = game.grid[row][column];
                    let nextColumn = game.grid[row][column + 1];
                    let nextColumn2 = game.grid[row][column + 2];
                    let nextColumn3 = game.grid[row][column + 3];

                    if(current !== 0){
                        if(current === game.grid[row - 1][nextColumn],
                        current === game.grid[row - 2][nextColumn2],
                        current === game.grid[row - 3][nextColumn3]){
                            this.winner = current
                            console.log(this.winner)
                        }
                    }
                }
            }

        }
        if (this.winner === null) {
            checkHorizontal();
            checkVertical();
            checkDiagonalRight();
        }
        if (this.winner === 'red') {
            alert(`${player1.name} wins!!!!!`);
        } else if (this.winner === 'black') {
            alert(`${player2.name} wins!!!`);
        }


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