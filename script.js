var playerName;

function Start() {
    document.getElementById("start-button").innerHTML = "";
    document.getElementById("start-button").classList.add("clicked");

    playerName = document.getElementById("player-name-field").value;
    if (playerName == "") {
        playerName = "Player 1";
    }

    sessionStorage.setItem('playerName', playerName);

    setTimeout(() => {
        window.location.href = "imposible.html"
    }, 500);
}