let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

const cells = document.querySelectorAll('.cell');
const turnIndicator = document.getElementById('turnIndicator');
const resetButton = document.getElementById('resetButton');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const gameStatus = document.getElementById('gameStatus');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleMove(index, cell));
});

resetButton.addEventListener('click', resetGame);

function handleMove(index, cell) {
    if (board[index] !== '') return;
    
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('marked');

    if (checkWinner(currentPlayer)) {
        gameStatus.textContent = `🎉 Player ${currentPlayer} Wins!`;
        updateScore(currentPlayer);
        return;
    }

    if (!board.includes('')) {
        gameStatus.textContent = ' It\'s a Draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

function updateScore(player) {
    if (player === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('marked');
    });
    currentPlayer = 'X';
    turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
    gameStatus.textContent = '';
}
