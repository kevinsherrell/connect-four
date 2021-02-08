console.log("javascript file is connected");

class Player {
    constructor(name, color, wins, losses) {
        this.name = name;
        this.color = color;
        this.wins = wins;
        this.losses = losses;
    };
};

class Game{
    constructor(currentPlayer){
        this.currentPlayer = currentPlayer;
        this.gameOver = false;
    }
    start(){
        while(this.gameOver === false){
            console.log("game is working");
        }

    }
    end(){
        this.gameOver = true;
    }
    reset(){}

}



let player1 = new Player('Kevin', "red");
let player2 = new Player('Jonathan', 'black');

let game = new Game(player1);

game.start();

const gameCell = document.querySelectorAll('.gameCell');
gameCell.forEach(node =>{
   node.addEventListener("click", ()=>{
       console.log("working");
       node.classList.add("selected");
       node.classList.add("red");
   })
})
console.log(gameCell.length)

