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
    currentPlayer = 'player 1';
    gameOver = true;
    winner = "";
    grid = [
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1]
    ];
    cells = document.querySelectorAll('.column');

    startModal = document.createElement('div')

    init() {
        /*
        This modal will be displayed before anything else on the screen. Game content only displays when game is started;
    * */
        this.startModal.classList.add('gameStart');
        this.startModal.classList.add('true');
        this.startModal.innerHTML = `
            <img src="./images/header_logo.png" alt="">
            <input type="text" class="nameInput">
            <button class="colorInput">Red</button>
            <button class="colorInput">Black</button>
            <button class="startGame">Start Game!</button>
`
        document.body.appendChild(this.startModal);
        document.querySelector('.startGame').addEventListener('click', (e) => {
            game.start();
        })
        console.log(this.startModal);
    }

    start() {
        // game over becomes false to display the gameBoard
        this.gameOver = false;
        // get rid of start modal
        this.startModal.classList.remove("true");

        // generate game board
        const playArea = document.createElement('div');
        playArea.setAttribute('id', 'playArea');
        playArea.className = this.gameOver === true ? 'gameOver' : null;

        const gameBoard = document.createElement('div');
        gameBoard.setAttribute('id', 'gameBoard');

        for (let i = 0; i < this.grid.length; i++) {
            let row = document.createElement("div");
            row.classList.add("row")
            row.setAttribute("data-row", `${i}`)
            for (let j = 0; j < this.grid[i].length; j++) {
                let column = document.createElement("div");
                column.classList.add('column');
                column.setAttribute('data-row', `${i}`);
                column.setAttribute('data-column', `${j}`);
                row.appendChild(column);
                console.log("working");
            }
            gameBoard.appendChild(row);
        }
        // append gameboard to play area and play area to body
        playArea.appendChild(gameBoard);
        document.body.appendChild(playArea);

        // add event listener to each cell
        this.cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                let row = parseInt(cell.dataset.row);
                let column = parseInt(cell.dataset.column);
                /*
                 selection conditions (cell is selectable if....):
                    selection is on bottom row (5) or...
                    the cell in the row below current row is selected.
                */
                if (cell.dataset.row == 5 || game.grid[row + 1][column] != -1) {
                    game.grid[row][column] = 'selected';
                    console.log(this.grid);
                }
            })
        })


    }

    end() {
        this.gameOver = true;
    };

    reset() {

    }
}


// Player
class Player {
    constructor(name, color, wins, losses) {
        this.name = name;
        this.color = color;
        this.wins = wins;
        this.losses = losses;
    };

    select() {

    }
};

const game = new Game();
const player1 = new Player();

game.init();

