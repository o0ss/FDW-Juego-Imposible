var playerName;
var size;
var timer = 0;
var move_count = 0;
var won = false;

window.onload = function() {
    playerName = sessionStorage.getItem('playerName');
    if(playerName==null) playerName = 'Player 1';
    document.getElementById("player-name-h").innerHTML = playerName;

    size = Math.max(sessionStorage.getItem('size'), 3);
    if(isNaN(size)){
        size = 3;
    }

    document.documentElement.style.setProperty('--ficha-wh','calc(((100% - 16px)/' + size.toString() + ') - 2px)')
    let fsize = parseFloat(3 - Math.log10(size)*2);
    document.documentElement.style.setProperty('--ficha-font-size', fsize.toString()+'em');

    makeBoard();
    addClickListenerToFichas();
    setRandomOrder();


    document.getElementById("moves").innerHTML = 0;
    document.getElementById("timer").innerHTML = timer;
    setInterval(updateTimer, 1000);

};

function makeBoard() {
    let grid = document.getElementById('grid');
    
    for (let i = 1; i < size*size; i++) {
        let new_ficha = document.createElement('div');
        new_ficha.classList.add('ficha');
        new_ficha.id = 'f' + i.toString();
        new_ficha.innerHTML = i.toString();
        grid.appendChild(new_ficha);
    }
    let ficha_empty = document.createElement('div');
    ficha_empty.classList.add('ficha');
    ficha_empty.classList.add('empty');
    ficha_empty.id = 'empty';
    grid.appendChild(ficha_empty);
}

function addClickListenerToFichas() {
    let fs = document.getElementsByClassName('ficha');

    for (let i = 0; i < fs.length; i++) {
        const f = fs[i];
        if(f.id!= 'empty'){
            f.addEventListener('click', function () {
                tryMoveOf(this);
            })
        }
    }
}

function back() {
    let gb = document.getElementsByClassName("gameboard")[0];
    let h = document.getElementById("player-name-h");
    let bb = document.getElementById("back-button");

    gb.classList.add("shrink");
    h.classList.add("fade");
    bb.classList.add("fade");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 200);
}

function updateTimer() {
    if(!won){
        timer++;
        document.getElementById("timer").innerHTML = timer;
    }
}

function updateMoveCount() {
    move_count++;
    document.getElementById("moves").innerHTML = move_count;
}


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

function tryMoveOf(ficha) {
    tryMove(ficha.id);
}

function tryMove(id) {
    if(nextToEmpty(id)) {
        move(id);
    }
    if(checkIfWonOrdered() || checkIfWonSpiral()) {
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
    coords[0] = Math.floor((order-1)/size); // Row (0-size-1)
    coords[1] = (order-1)%size; // Column (0-size-1)
    return coords;
}

function coordsToOrder(coords) {
    let order = (coords[0] * size) + coords[1] + 1;
    return order;
}

function checkIfWonOrdered() {
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
    let num_fs = size*size-1;
    won = ok_count==num_fs? true: false;
    return won;
}

function checkIfWonSpiral() {
    let moveDir = 0;
    let top = 0
    let bottom = size-1;
    let left = 0;
    let right = size-1;
    let ficha_num = 1;
    let coords = Array(2);
    let count_ok = 0;

    won = false;
    let stop = false;

    while (top <= bottom && left <= right && !stop && ficha_num<size*size) {
        if (moveDir == 0) {
            coords[0] = top;
            for (let i = left; i <= right; i++) {
                coords[1] = i;
                let order_i = coordsToOrder(coords);
                let order_ficha = document.getElementById('f'+ficha_num.toString()).style.order;
                if(order_i == order_ficha) {
                    count_ok++;
                }
                else {
                    stop = true;
                    break;
                }
                ficha_num++;
            }
            top++;
            moveDir = 1;
        } else if (moveDir == 1) {
            coords[1] = right;
            for (let i = top; i <= bottom; i++) {
                coords[0] = i;
                let order_i = coordsToOrder(coords);
                let order_ficha = document.getElementById('f'+ficha_num.toString()).style.order;
                if(order_i == order_ficha) {
                    count_ok++;
                }
                else {
                    stop = true;
                    break;
                }
                ficha_num++;
            }
            right--;
            moveDir = 2;
        } else if (moveDir == 2) {
            coords[0] = bottom;
            for (let i = right; i >= left; i--) {
                coords[1] = i;
                let order_i = coordsToOrder(coords);
                let order_ficha = document.getElementById('f'+ficha_num.toString()).style.order;
                if(order_i == order_ficha) {
                    count_ok++;
                }
                else {
                    stop = true;
                    break;
                }
                ficha_num++;
            }
            bottom--;
            moveDir = 3;
        } else if (moveDir == 3) {
            coords[1] = left;
            for (let i = bottom; i >= top; i--) {
                coords[0] = i;
                let order_i = coordsToOrder(coords);
                let order_ficha = document.getElementById('f'+ficha_num.toString()).style.order;
                if(order_i == order_ficha) {
                    count_ok++;
                }
                else {
                    stop = true;
                    break;
                }
                ficha_num++;
            }
            left++;
            moveDir = 0;
        }
    }

    if(count_ok == size*size-1) {
        won = true;
    }
    return won;
}