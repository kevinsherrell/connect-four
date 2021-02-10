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
        this.winner = "";
        this.grid = [
            [-1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1]
        ];
        this.gameBoard = document.createElement('div');
    }


    start() {
        this.gameOver = false;
        this.gameBoard.classList.toggle("gameOver");

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
                console.log("working");
            }
            this.gameBoard.appendChild(row);
        }
        //===================================================================

        // append gameboard to play area and play area to body
        document.body.appendChild(this.gameBoard);
        // document.body.appendChild(playArea);
        //====================================================================

        // add event listener to each cell
        const cells = document.querySelectorAll('.column');
        cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                let row = parseInt(cell.dataset.row);
                let column = parseInt(cell.dataset.column);
                game.currentPlayer.select(cell, row, column);
            })
        })
        //============================================================
    }

    generateStartModal() {
        let startButton = document.querySelector('.startButton');
        console.log(startButton);
        startButton.addEventListener('click', (e) => {
            e.preventDefault();
            game.start();
            console.log('click working')
        })
//============================================================
    }

    check

    init() {
    }

}


class Player {
    constructor(name, color, wins, losses) {
        this.name = name;
        this.color = color;
        this.wins = wins;
        this.losses = losses;
    };

    select(element, row, column) {
        /*
         selection conditions (cell is selectable if....):
            selection is on bottom row (5) or...
            the cell in the row below current row is selected.
        */
        if (element.dataset.row == 5 || game.grid[row + 1][column] != -1) {
            game.grid[row][column] = 'selected';
            element.classList.add("selected")
            element.classList.add(game.currentPlayer.color);
            if (game.currentPlayer === player1) {
                game.currentPlayer = player2;
            } else {
                game.currentPlayer = player1;
            }
            console.log(game.grid);
            console.log(element)
        }
    }
};

// Create players
const player1 = new Player('Kevin', 'red');
const player2 = new Player('cpu', 'black');
// Create game object
const game = new Game();
game.currentPlayer = player1; // player1 always goes first.
game.generateStartModal();
game.generateBoard();

/*
Horizontal check logic:
    if row at index is equal to row at index + 1 add 1 to count
        if count equals 3 current player wins
            if row at index is not equal to row at index + 1 count is reset to zero;
 */