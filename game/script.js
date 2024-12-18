const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");
const newGameButton = document.getElementById("newGame");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    if (gameBoard[index] === "" && isGameActive) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            endGame(`${currentPlayer} Wins!`);
        } else if (gameBoard.every(cell => cell !== "")) {
            endGame("It's a Draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check for winner
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === currentPlayer);
    });
}

function endGame(message) {
    isGameActive = false;
    resultMessage.textContent = message;
    resultScreen.style.display = "flex";
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    status.textContent = "Player X's turn";
    document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
    resultScreen.style.display = "none";
}

board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);
