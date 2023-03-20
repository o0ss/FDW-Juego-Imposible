var playerName;
var timer = 0;
var move_count = 0;

window.onload = function() {
    playerName = sessionStorage.getItem('playerName');
    document.getElementById("player-name-h").innerHTML = playerName;
    document.getElementById("moves").innerHTML = 0;
    document.getElementById("timer").innerHTML = timer;

    setRandomOrder();
};

function updateTimer() {
    timer++;
    document.getElementById("timer").innerHTML = timer;
}

function updateMoveCount() {
    move_count++;
    document.getElementById("moves").innerHTML = move_count;
}

setInterval(updateTimer, 1000);

function setRandomOrder() {
    let fs = document.getElementsByClassName('ficha');
    let done = Array(fs.length).fill(false);

    for (let i = 0; i < fs.length; i++) {
        let f = fs[i];
        let n;
        do {
            n = Math.floor(Math.random() * done.length);
        } while (done[n]);
        
        f.style.order = n+1;
        f.style.color = 'rgb(50, 50, 50)';
        done[n] = true;
    }

    /* Order as won */ 
    // for (let i = 0; i < fs.length; i++) {
    //     const f = fs[i];
    //     f.style.order = i+1;
    // }

}

function tryMove(id) {
    if(nextToEmpty(id)) {
        move(id);
    }
    if(checkIfWon()) {
        setTimeout(() => {
            alert("Ganaste en "+timer+" segundos con "+move_count+" movimientos.");
            
        }, 150);
    }
}

function move(id) {
    const order_empty = document.getElementById('empty').style.order;
    const order_this = document.getElementById(id).style.order;
    document.getElementById('empty').style.order = order_this;
    document.getElementById(id).style.order = order_empty;
    updateMoveCount();
}

function nextToEmpty(id) {
    coords_this = 
        orderToCoords(parseInt(document.getElementById(id).style.order));
    coords_empty = 
        orderToCoords(parseInt(document.getElementById('empty').style.order));
    if(coords_this[0] == coords_empty[0]) {
        if(coords_this[1] == coords_empty[1]-1 || coords_this[1] == coords_empty[1]+1){
            return true;
        }
    }
    if(coords_this[1] == coords_empty[1]) {
        if(coords_this[0] == coords_empty[0]-1 || coords_this[0] == coords_empty[0]+1){
            return true;
        }
    }
    return false;
}

function orderToCoords(order) {
    coords = Array(2);
    coords[0] = Math.floor((order-1)/4); // Row (0-3)
    coords[1] = (order-1)%4; // Column (0-3)
    return coords;
}

function checkIfWon() {
    let won = false;
    let ok_count=0;
    fs = document.getElementsByClassName("ficha")
    for (let i = 0; i < fs.length-1; i++) {
        const f = fs[i];
        let fnum = parseInt(f.id.slice(1));
        let fpos = parseInt(f.style.order);
        
        if(fnum == fpos) {
            ok_count++;
        } else {
            break;
        }
    }
    if (ok_count == 15) {
        won = true;
    }
    return won;
}