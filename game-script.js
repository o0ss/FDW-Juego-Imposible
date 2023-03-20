var playerName;
var timer = 0;
var moves = 0;

// var tablero = [][]

window.onload = function() {
    playerName = sessionStorage.getItem('playerName');
    document.getElementById("player-name-h").innerHTML = playerName;
    document.getElementById("moves").innerHTML = 0;
    document.getElementById("timer").innerHTML = timer;
};

function updateTimer() {
    timer++;
    document.getElementById("timer").innerHTML = timer;
}

function updateMoves() {
    moves++;
    document.getElementById("moves").innerHTML = moves;
}

setInterval(updateTimer, 1000);