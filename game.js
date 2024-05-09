const socket = io();
const tiles = document.querySelectorAll('.tile');
const displayPlayer = document.querySelector('.display-player');
const announcer = document.querySelector('.announcer');
const resetButton = document.querySelector('#reset');
let currentPlayer = 'X';
let gameBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
let opponentName = '';

// Add event listener to each tile
tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
        if (gameBoard[index] === '0') {
            tile.textContent = currentPlayer;
            gameBoard[index] = currentPlayer;
            socket.emit('makeMove', index, currentPlayer);
            checkWin(currentPlayer);
            switchPlayer();
        }
    });
});

// Switch player function
function switchPlayer() {
    currentPlayer = currentPlayer === 'X'? 'O' : 'X';
    displayPlayer.textContent = `Player ${currentPlayer}'s turn`;
}

// Check win function
function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
            announcer.textContent = `Player ${player} wins!`;
            announcer.classList.remove('hide');
            resetButton.classList.remove('hide');
            disableTiles();
            return;
        }
    }

    if (!gameBoard.includes('0')) {
        announcer.textContent = `It's a draw!`;
        announcer.classList.remove('hide');
        resetButton.classList.remove('hide');
        disableTiles();
    }
}

// Disable tiles function
function disableTiles() {
    tiles.forEach((tile) => {
        tile.removeEventListener('click', () => {});
    });
}

// Reset function
function reset() {
    gameBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    tiles.forEach((tile) => {
        tile.textContent = '';
    });
    announcer.classList.add('hide');
    resetButton.classList.add('hide');
    enableTiles();
    switchPlayer();
}

// Enable tiles function
function enableTiles() {
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
            if (gameBoard[index] === '0') {
                tile.textContent = currentPlayer;
                gameBoard[index] = currentPlayer;
                socket.emit('makeMove', index, currentPlayer);
                checkWin(currentPlayer);
                switchPlayer();
            }
        });
    });
}

// Listen for opponent's move
socket.on('opponentMove', (index, player) => {
    tiles[index].textContent = player;
    gameBoard[index] = player;
    checkWin(player);
    switchPlayer();
});

// Listen for opponent's name
socket.on('opponentName', (name) => {
    opponentName = name;
    displayPlayer.textContent = `Player ${currentPlayer}'s turn vs ${opponentName}`;
});

// Add event listener to reset button
resetButton.addEventListener('click', reset);

// Initialize the game
switchPlayer();