var playerName;

window.onload = function () {
    sf = document.getElementById("size-field")
    sf.addEventListener('blur', function(){
        sizeValidator(this);
    });
}

function sizeValidator(field) {
    if(field.value < 3){
        document.getElementById("start-button").disabled = true;
        document.getElementById('size-field-error').classList.add('on');
    } else {
        document.getElementById("start-button").disabled = false;
        document.getElementById('size-field-error').classList.remove('on');
    }
}

function Start() {
    let sb = document.getElementById("start-button");
    let h = document.getElementsByClassName("title")[0];
    let fc = document.getElementById("fields-column");
    
    sb.innerHTML = "         ";
    sb.classList.add("clicked");
    h.classList.add("fade");
    fc.classList.add("fade");

    playerName = document.getElementById("player-name-field").value;
    if (playerName == "") {
        playerName = "Player 1";
    }

    size = parseInt(document.getElementById('size-field').value);
    size = Math.max(size, 3);
    sessionStorage.setItem('playerName', playerName);
    sessionStorage.setItem('size', size);

    setTimeout(() => {
        window.location.href = "imposible.html"
    }, 200);
}