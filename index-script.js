var playerName;

function Start() {
    let sb = document.getElementById("start-button");
    let h = document.getElementsByClassName("title")[0];
    let pnf = document.getElementById("player-name-field");
    
    sb.innerHTML = "         ";
    sb.classList.add("clicked");
    h.classList.add("fade");
    pnf.classList.add("fade");

    playerName = document.getElementById("player-name-field").value;
    if (playerName == "") {
        playerName = "Player 1";
    }

    sessionStorage.setItem('playerName', playerName);

    setTimeout(() => {
        window.location.href = "imposible.html"
    }, 200);
}