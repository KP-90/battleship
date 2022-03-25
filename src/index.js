import Ship from './class'
import {setUp} from './dom'
import {gameboard} from './gameboard'

// Build ships
const ships = {
    "tug": 2,
    "sub": 4
}
let shipArray = []
for (let item in ships) {
    let foo = new Ship(item, ships[item])
    shipArray.push(foo)
}

let foo = setUp(shipArray)
foo
gameboard(shipArray)
