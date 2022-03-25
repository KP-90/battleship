export let gameboard = (ships) => {
    let allSquares = document.querySelectorAll(".square")

    allSquares.forEach(square => {
        square.addEventListener("click", () => {
            if (square.classList.contains("active")) {
                square.classList.add('hit')
                hitShip(square, ships)
            }
            else {
                square.classList.add('miss')
            }
        })
    })

    function hitShip(spot, ships) {
        let shipName = spot.dataset.name
        let ship = ships.find(x => x.name == shipName)
        ship.hit()
        console.log(ship.isSink())
        checkWin(ships)
    }

    function checkWin(ships) {
        if (ships.every(ship => ship.isSink() == true)) {
            let modal = document.createElement("div")
            modal.className = "container"
            let content = document.createElement('div')
            content.className = "content"
            modal.appendChild(content)
            
        }
    }
}