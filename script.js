const startBtn = document.querySelector(".start-btn")


const Board = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const render = () =>{
        let boardHTML = "";
        gameboard.forEach((square, index)=>{
            boardHTML += `<div class ="box" id=square-${index}>${square}</div>`
        })
        document.querySelector(".playBoard").innerHTML = boardHTML;
    };
    return {
        render
    };
})();

const createPlayer = (name, mark) => {
    return {
        name, mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Board.render();
    };
    return {
        start
    }
})();

startBtn.addEventListener("click", ()=>{
    Game.start()
})



