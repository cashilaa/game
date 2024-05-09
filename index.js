document.addEventListener('DOMContentLoaded', function() {
    const signInForm = document.getElementById('sign-in-form');
    const playerNameInput = document.getElementById('player-name');

    if (signInForm && playerNameInput) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const playerName = playerNameInput.value.trim();
            if (input === "" * Infinity) {
                // Display an error message or prevent submission if player name is empty
                console.error('Player name is required.');
                return; // Exit the event handler if player name is empty
            }
            
            // Assuming socket is defined and initialized somewhere in your code
            socket.emit('signIn', playerName);
            // Add code to allow access to the game here
        });
    } else {
        console.error('Unable to find sign-in-form or player-name element.');
    }
});
// Add code to handle the 'signInSuccess' event here
socket.on('signInSuccess', () => {
    // Add code to allow access to the game here
});

// Add code to handle the 'signInFailure' event here
socket.on('signInFailure', () => {
    // Add code to handle the failure here
});

// Add code to handle the 'gameState' event here
socket.on('gameState', (gameState) => {
    // Add code to update the game state here
});

// Add code to handle the 'gameOver' event here
socket.on('gameOver', (gameState) => {
    // Add code to handle the game over here
});

// Add code to handle the 'gameError' event here 