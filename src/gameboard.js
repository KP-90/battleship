let banner = document.querySelector(".banner")
const sleep = ms => new Promise(r => setTimeout(r, ms));
export let gameboard = (ships, side) => {
    let allSquares = undefined;
    let opponent = undefined;
    if (side == 'left') {
        allSquares = document.querySelectorAll(".left")
        opponent = "Computer"
    }
    else {
        allSquares = document.querySelectorAll(".right")
        opponent = "Player One"
    }
    async function addListeners() {
        allSquares.forEach(square => {
            square.addEventListener("click", () => {
                checkHit(square)
                toggleTurn()
                square.replaceWith(square.cloneNode())
            })
        })
    }
    addListeners()

    async function toggleTurn() {
        await sleep(1000)
        let turn = document.querySelector("#cover")
        let text = ''
        if (turn.style.left == '0vw' || turn.style.left == '') {
            turn.style.left = '50vw'
            text = `Computers turn`
        }
        else {
            turn.style.left = '0vw'
            text = "Player Ones turn..."
        }
        await typeWriter(text, 100)
    }

    async function checkHit(square) {
        let text = ''
        if (square.classList.contains("active")) {
            square.classList.add('hit')
            hitShip(square, ships)
            text = "It's a hit!!!"
        }
        else {
            square.classList.add('miss')
            text = "It's a miss...."
        }
        await typeWriter(text, 5)
    }

    function hitShip(spot, ships) {
        let shipName = spot.dataset.name
        console.log(spot)
        console.log(shipName)
        let ship = ships.find(x => x.name == shipName)
        ship.hit()
        checkWin(ships)
    }

    function checkWin(ships) {
        if (ships.every(ship => ship.isSink() == true)) {
            let body = document.querySelector("body")
            let modal = document.createElement("div")
            modal.className = "container"
            let content = document.createElement('div')
            content.className = "content"
            content.innerText = `${opponent} WINS!!!`
            // Play again
            let btn = document.createElement("button")
            btn.innerText = "Play again"
            btn.addEventListener("click", () => {
                location.reload()
            })
            content.appendChild(btn)
            modal.appendChild(content)
            body.appendChild(modal)
            return true
        }
    }
    // Makes text slowly type out, instead of being instant
    function typeWriter(text, speed) {
        console.log(text)
        banner.innerHTML = ''
        let i = 0
        function start() {
            if (i < text.length) {
            banner.innerHTML += text.charAt(i);
            i++;
            setTimeout(start, speed);
          }
        }
        start()
    }
}