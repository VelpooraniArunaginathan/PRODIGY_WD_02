let board;
let currentPlayer;
let gameActive;

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

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

function startGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('win');
        cell.addEventListener('click', handleCellClick);
    });
    message.innerText = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        message.innerText = `Player ${currentPlayer} wins!`;
        highlightWinningCells();
    } else if (board.every(cell => cell !== '')) {
        gameActive = false;
        message.innerText = `It's a draw!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] === currentPlayer && board[a] === board[b] && board[a] === board[c];
    });
}

function highlightWinningCells() {
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (board[a] === currentPlayer && board[a] === board[b] && board[a] === board[c]) {
            document.querySelector(`[data-index='${a}']`).classList.add('win');
            document.querySelector(`[data-index='${b}']`).classList.add('win');
            document.querySelector(`[data-index='${c}']`).classList.add('win');
        }
    });
}

function resetGame() {
    startGame();
}

startGame();
