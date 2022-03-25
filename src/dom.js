const body = document.querySelector("body")
const main = document.querySelector(".container")
const content = document.querySelector(".content")
const SIZE = 10 //9 => 10x10

export let setUp = (ships, errors) => {
    
    // Inputs can only be 0-9
    function keyUpEvent(target, e) {
        // Prevents inputs of signs and 'e'
        if (!(e.keyCode >= '96' && e.keyCode <= '105') && !(e.keyCode >= '48' && e.keyCode <= '57')) {
            e.preventDefault()
        }
        // Only allows one digit, if more than one is pressed, defaults last digit entered
        if (target.value.length >= 1) {
            target.value = ""
            target.value = e.key
        }
    }
    function setUpInput(ships) {
        console.log(ships)
        while (content.firstChild) {
            content.removeChild(content.firstChild)
        }
        let x_coord = document.createElement("span")
        let y_coord = document.createElement("span")
        y_coord.className = "y"
        x_coord.innerText = " X "
        y_coord.innerText = " Y "
        content.append(x_coord, y_coord)
        for (let i = 0; i < ships.length; i++) {
            let div_1 = document.createElement("div")
            div_1.className = "input-field"
            let label_1 = document.createElement("label")
            let input_1 = document.createElement("input")
            let input_2 = document.createElement("input")
            label_1.innerText = `${ships[i].name}`
            input_1.type = "number"
            input_1.name = `${ships[i].name}`
            input_2.type = 'number'
            input_2.name = `${ships[i].name}`
            input_1.onkeyup = (e) => {keyUpEvent(input_1, e)}
            input_2.onkeyup = (e) => {keyUpEvent(input_2, e)}
            div_1.append(label_1, input_1, input_2)
            content.appendChild(div_1)
        }
    }

    function drawBoard() {
        let board = document.createElement("div")
        board.id = "board"
        board.style.display = 'none'
        let count = 0
        for(let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                let square = document.createElement("div")
                square.className = 'square'
                
                board.appendChild(square)
                count++
            }
        }
        body.appendChild(board)
    }

    setUpInput(ships)
    drawBoard()

    let mainBtn = document.createElement("button")
    let btn = document.createElement("button")

    mainBtn.innerText = "Open"
    mainBtn.onclick = toggleModal
    mainBtn.style.display = 'none'
    body.appendChild(mainBtn)
    btn.innerText = "Close"
    btn.onclick = toggleModal
    content.appendChild(btn)
    if (errors) {
        let e = document.createElement("p")
        e.innerText = errors
        e.id = "error"
        content.appendChild(e)
    }
    function toggleModal() {
        let board = document.querySelector("#board")
        if (main.style.display == 'none') {
            main.style.display = 'grid'
            mainBtn.style.display = 'none'
            board.style.display = 'none'
        }
        else {
            let inputs = document.querySelectorAll("input")
            console.log(ships[0].length)
            let index = 0
            for (let i = 0; i < inputs.length; i += 2) { 
                if ((handleInput(inputs[i].value, inputs[i+1].value, ships[index].length, ships[index]))==false) {
                    let error = "Something is overlapping"
                    return setUp(error)
                }
                index++
            }

            main.style.display = 'none'
            mainBtn.style.display = 'grid'
            board.style.display = 'grid'
        }
    }
    return {setUpInput}
}

function handleInput(in_1, in_2, length, ships) {
    let squares = document.querySelectorAll(".square")
    let x = Number(in_1)
    let y = Number(in_2)
    if (length + y > SIZE) {
        return false
    }

    // Check that all spaces are available
    // If available, assign each spot
    loop1:
    for (let j = 0; j < 2; j++) {
        loop2:
        for (let i = 0; i < length; i++) {
            let index = (x * 10) + y + i
            if (j == 0) {
                if (squares[index].classList.contains('active')) {
                    return false
                    break loop1;
                }
            }
            else {
                squares[index].classList.add("active")
                squares[index].dataset.name = ships.name
            }
        }
    }
}