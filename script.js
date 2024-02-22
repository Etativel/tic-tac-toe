// document.addEventListener("DOMContentLoaded", (event) => {
//     Game.start()
//   });

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

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        if (gameOver){
            return;
        }else{
            if (document.querySelector("#player1").value === "" || document.querySelector("#player2").value === ""){
                document.querySelector("#message").innerHTML = `<h1>Please fill the player name</h1>`;
                return;
            } else {
                document.querySelector("#message").innerHTML = "";
                players = [
                    createPlayer(document.querySelector("#player1").value, "X"),
                    createPlayer(document.querySelector("#player2").value, "O")
                ];
                currentPlayerIndex = 0;
                gameOver = false;
                Board.render();
            }
        }


    };

    const handleCLick = (e) => {
        let index = parseInt(e.target.id.split("-")[1])
        if (gameOver) {
            return;
        }
        if (Board.getGameboard()[index] !== "") {
            return;
        }

        Board.update(index, players[currentPlayerIndex].mark)

        if(checkForWin(Board.getGameboard())){
            gameOver = true;

            displayController.renderMessage(`Player ${players[currentPlayerIndex].mark} Win!`)

        } else if (checkForTie(Board.getGameboard())) {
            gameOver = true;
            displayController.renderMessage("Its a tie")

        };
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        
    };

    const restart = () => {
        gameOver = false;
        currentPlayerIndex = 0;
        for (let i = 0; i < 9; i++){
            Board.update(i, "")
        }
        Board.render()
        document.querySelector("#message").innerHTML = "";
    };
    return {
        start,
        handleCLick,
        restart
    };
})();

const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = `<h1>${message}</h1>`;
    }
    return {
        renderMessage
    }
})();

const checkForWin = (board) => {
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
    ];
    for (let i = 0; i < winningCombinations.length; i++){
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            return true
        };
    };
    return false;
};

const checkForTie = (board) => {
    return board.every(cell => cell !== "")
};

const createPlayer = (name, mark) => {
    return {
        name, mark
    }
}

const restartButton = document.querySelector(".restart-btn")
const startButton = document.querySelector(".start-btn")


restartButton.addEventListener("click", ()=>{
    Game.restart()
});
startButton.addEventListener("click", ()=>{
    Game.start()
});