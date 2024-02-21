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
        if (gameOver) {
            return;
        }
        let index = parseInt(e.target.id.split("-")[1])
       
        
        if (Board.getGameboard()[index] !== "") {
            return;
        }

        
        
        Board.update(index, players[currentPlayerIndex].mark)
        if(checkForWin(Board.getGameboard(), players[currentPlayerIndex].mark)){
            gameOver = true;
            console.log(`${players[currentPlayerIndex].name} Win!`)
            // alert(`${players[currentPlayerIndex].name} Win!`)
        } else if (checkForTie(Board.getGameboard())) {
            gameOver = true;
            // alert("Its a tie")
            console.log("Its a tie")
        }
        
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        
    }

    const restart = () => {
        gameOver = false;
        for (let i = 0; i < 9; i++){
            Board.update(i, "")
        }
        Board.render()
    }
    return {
        start,
        handleCLick,
        restart
    }
})();

function checkForWin(board) {
    console.log(board)
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winningCombinations.length; i++){
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            return true
        }
    }
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell !== "")
}

const restartButton = document.querySelector(".restart-btn")
const startButton = document.querySelector(".start-btn")


restartButton.addEventListener("click", ()=>{
    Game.restart()
})
startButton.addEventListener("click", ()=>{
    Game.start()
})



