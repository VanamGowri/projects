let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function play(index) {
    if (board[index] === "" && !gameOver) {
        board[index] = currentPlayer;
        document.getElementsByTagName("button")[index].innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWinner() {
    const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let w of wins) {
        if (board[w[0]] && board[w[0]] === board[w[1]] && board[w[1]] === board[w[2]]) {
            document.getElementById("result").innerText = board[w[0]] + " Wins!";
            gameOver = true;
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById("result").innerText = "Draw!";
        gameOver = true;
    }
}

function reset() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    currentPlayer = "X";
    document.getElementById("result").innerText = "";
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < 9; i++) {
        buttons[i].innerText = "";
    }
}
