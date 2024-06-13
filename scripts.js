let board;
let currentPlayer;
let isGameActive;
const PLAYER_X = "X";
const PLAYER_O = "O";
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");

function initializeGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = PLAYER_X;
    isGameActive = true;
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("winning-cell");
    });
    message.innerText = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (board[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkForWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
}

function checkForWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            cells[a].classList.add("winning-cell");
            cells[b].classList.add("winning-cell");
            cells[c].classList.add("winning-cell");
            break;
        }
    }

    if (roundWon) {
        message.innerText = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        message.innerText = "It's a draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    message.innerText = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", initializeGame);

initializeGame();
