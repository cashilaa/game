const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const players = {};

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/game.html');
});

io.on('connection', (socket)=> {
    console.log('A user has connected');

    socket.on('signIn', (playerName) => {
        if (!players[playerName]) {
            players[playerName] = {
                socket: socket,
                gameBoard: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
                currentPlayer: 'X',
                opponent: null
            };
            socket.emit('signInResponse', { success: true });
            if (Object.keys(players).length === 2) {
                const playerNames = Object.keys(players);
                const player1 = players[playerNames[0]];
                const player2 = players[playerNames[1]];
                player1.opponent = player2;
                player2.opponent = player1;
                socket.emit('opponentName', playerNames[1]);
                player2.socket.emit('opponentName', playerNames[0]);
            }
       } else {
            socket.emit('signInResponse', { success: false });
        }
    });

    socket.on('makeMove', (index, player) => {
        const opponent = players[players[player].opponent.playerName];
        if (opponent && opponent.gameBoard[index] === '0') {
            opponent.gameBoard[index] = player === 'X'? 'O' : 'X';
            opponent.socket.emit('opponentMove', index, player === 'X'? 'O' : 'X');
        }
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});