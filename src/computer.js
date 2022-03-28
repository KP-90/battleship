import { gameboard } from "./gameboard"

export let compy = (compShips) => {

    const side = document.querySelector('#right')

    function handleInput(in_1, in_2, length, ships) {
        let squares = document.querySelectorAll(".right")
        let x = Number(in_1)
        let y = Number(in_2)
        if (length + y > 9) {
            return false
        }
    
        // Check that all spaces are available
        // If available, assign each spot
        loop1:
        for (let j = 0; j < 2; j++) {
            loop2:
            for (let i = 0; i < length; i++) {
                let index = (x * 10) + y + i
                // Check availability
                if (j == 0) {
                    if (squares[index].classList.contains('active')) {
                        console.log("ERROR PLACING SHIPS")
                        return false
                        break loop1;
                    }
                }
                // Assign ship to squares
                else {
                    squares[index].classList.add("active")
                    squares[index].dataset.name = ships.name
                }
            }
        }
    }

    function setupBoard() {
        let board = document.createElement("div")
        board.id = "board"
        //board.style.display = 'none'
        let count = 0
        for(let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let square = document.createElement("div")
                square.className = 'square'
                square.classList.add(`right`)
                board.appendChild(square)
                count++
            }
        }
        side.appendChild(board)
    }

    function fobar() {

    }

    setupBoard()
    handleInput(0, 0, 2, compShips[0])
}