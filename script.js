const startBtn = document.querySelector(".start-btn")


const Board = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const render = () =>{
        let boardHTML = "";
        gameboard.forEach((square, index)=>{
            boardHTML += `<div class ="box" id="square-${index}">${square}</div>`
        })
        document.querySelector(".playBoard").innerHTML = boardHTML;
        const square = document.querySelectorAll(".box");
        square.forEach((square)=>{
            square.addEventListener("click", Game.handleCLick);
        })

    };

    const update = (index, value) => {
        gameboard[index] = value;
        console.log(gameboard)
        render();
    }

    const getGameboard = () => gameboard;

    return {
        render,
        update,
        getGameboard
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
        const square = document.querySelectorAll(".box");
        square.forEach((square)=>{
            square.addEventListener("click", handleCLick);
        })
    };

    const handleCLick = (e) => {
        let index = parseInt(e.target.id.split("-")[1])
       
        
        if (Board.getGameboard()[index] !== "") {
            return;
        }

        
        Board.update(index, players[currentPlayerIndex].mark)
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        
    }

    return {
        start,
        handleCLick
    }
})();

startBtn.addEventListener("click", ()=>{
    Game.start()
})



