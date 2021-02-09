// console.log("javascript file is connected");
//
// class Player {
//     constructor(name, color, wins, losses) {
//         this.name = name;
//         this.color = color;
//         this.wins = wins;
//         this.losses = losses;
//     };
// };
//
// class Game {
//     constructor(currentPlayer) {
//         this.currentPlayer = currentPlayer;
//         this.gameOver = false;
//     }
//
//     start() {
//     }
//
//     end() {
//         this.gameOver = true;
//         gameOverModal.classList.add("true");
//     }
//
//     reset() {
//     }
//
// }
//
//
// let player1 = new Player('Kevin', "red");
// let player2 = new Player('Jonathan', 'black');
// const game = new Game(player1);
//
// const rows = document.querySelectorAll('.row');
// const gameCell = document.querySelectorAll('.gameCell');
//
// const gameOverModal = document.createElement("div");
// gameOverModal.setAttribute('id', 'gameOver');
// document.body.appendChild(gameOverModal);
//
// const select = (node, currentPlayer) => {
//     currentPlayer = game.currentPlayer;
//     console.log("working");
//     console.log(currentPlayer);
//     if (currentPlayer === player1) {
//         node.classList.add("selected");
//         node.classList.add("red");
//         game.currentPlayer = player2;
//     } else if (currentPlayer === player2) {
//         node.classList.add("selected");
//         node.classList.add("black");
//         game.currentPlayer = player1;
//         console.log(currentPlayer);
//     }
// }
//
//
// const checkHorizontal = () => {
//     let consecutiveRed = 0;
//     let consecutiveBlack = 0;
//
//     // Check horizontally for 3 consecutive chips following current chip (4 consecutive chips);
//     for (let i = 0; i < 41; i++) {
//         if (gameCell[i].classList.contains('red') && gameCell[i + 1].classList.contains('red')) {
//             consecutiveRed++;
//         } else if (gameCell[i].classList.contains('black') && gameCell[i + 1].classList.contains('black')) {
//             consecutiveBlack++;
//         }
//
//     }
//     if (consecutiveRed === 3) {
//         console.log("player 1 wins!");
//         game.end()
//     } else if (consecutiveBlack === 3) {
//         console.log("player 2 wins");
//         game.end();
//     }
//     console.log("consecutive black", consecutiveBlack);
//     console.log("consecutive red", consecutiveRed);
// }
// // console.log(rows);
// gameCell.forEach((node, index) => {
//
//     node.addEventListener('click', () => {
//
//         console.log(index);
//         console.log(gameCell[index]);
//
//         /* This controls the basic mechanics of the game.
//            The bottom rown can always be selected.
//            any cells in row other than the bottom can only be selected if there is already a chip in the previous spot in the previous row.
//         */
//         if (index >= 35 && index <= 41 || gameCell[index + 7].classList.contains("selected")) {
//             select(node);
//             checkHorizontal();
//         }
//
//
//         // Check vertically for 3 consecutive chips following current chip (4 consecutive);
//         // Check diagonally for 3 consecutive chips following current chip (4 consecutive);
//
//     })
// })
// // console.log(gameCell.length)



/*
todo for each row in the grid generate a div with a className of "row" and an attribute of "data-row: " and a value of the index of the row;
todo inside of the row generate 7 div with className of "column" and an attribute of "data-column: " and a value of the index of the column;
todo when a grid cell is selected (player 1: red, player 2: black), change the corresponding value of the row/column based upon the data of the cell selected.
for example:
    you select a div with a data attribute of data-column: 0 and a parent element with an attribute of data-row: 0,
    you will then change grid[data-row][data-column] to 0 for player1; or 1 for player 2;

* */
let grid= [
    [-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1]
]
// Generate game board
for(let i = 0; i < grid.length; i ++){
    let row = document.createElement("div");
    row.classList.add("row")
    row.setAttribute("data-row", `${i}`)
    for(let j = 0; j < grid[i].length; j++){
        let column = document.createElement("div");
        column.classList.add('column');
        column.setAttribute('data-row', `${i}`);
        column.setAttribute('data-column', `${j}`);
        row.appendChild(column);
        console.log("working");
    }
    document.querySelector('#gameBoard').appendChild(row);
}
const cells = document.querySelectorAll('.column');
cells.forEach((cell)=>{
    cell.addEventListener('click', (e)=>{
        let row = parseInt(cell.dataset.row);
        let column = parseInt(cell.dataset.column);
        grid[row][column] = 'selected';
        console.log(grid);
    })
})

