import Ship from './class'
import {compy} from './computer'
import {setUp} from './dom'
import {gameboard} from './gameboard'

const banner = document.querySelector(".banner")
// Build ships
const ships = {
    "tug": 2
    //"sub": 4
}
let player_1 = []
for (let item in ships) {
    let foo = new Ship(item, ships[item], "player")
    player_1.push(foo)
}

let comp = []
for (let item in ships) {
    let foo = new Ship(item, ships[item], "computer")
    comp.push(foo)
}

setUp(player_1)
gameboard(player_1, 'left')

compy(comp)
gameboard(comp, 'right')


let cover = document.createElement("div")
cover.id = "cover"
let main = document.querySelector("#boardArea")
main.appendChild(cover)