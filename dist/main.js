/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/class.js":
/*!**********************!*\
  !*** ./src/class.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
    constructor(name, marks, owner) {
        this.name = name
        this.marks = marks
        this.length = marks
        this.owner = owner
    }

    hit() {
        this.marks -= 1
    }

    isSink() {
        return this.marks <= 0 ? true : false
    }
}

/***/ }),

/***/ "./src/computer.js":
/*!*************************!*\
  !*** ./src/computer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compy": () => (/* binding */ compy)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


let compy = (compShips) => {

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

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setUp": () => (/* binding */ setUp)
/* harmony export */ });
const main = document.querySelector(".container")
const content = document.querySelector(".content")
const left = document.querySelector("#left")
const SIZE = 10 //9 => 10x10

let setUp = (ships, errors) => {

    while (content.firstChild) {
        content.removeChild(content.firstChild)
    }

    // Inputs can only be 0-9
    function keyUpEvent(target, e) {
        let buffer = target.value
        // Prevents inputs of signs and 'e'
        if (!(e.keyCode >= '96' && e.keyCode <= '105') && !(e.keyCode >= '48' && e.keyCode <= '57')) {
            target.value = buffer
        }
        // Only allows one digit, if more than one is pressed, defaults last digit entered
        if (target.value.length >= 1) {
            target.value = ""
            target.value = e.key
        }
    }
    function setUpInput(ships, errors) {
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
        let btn = document.createElement("button")

        btn.innerText = "Close"
        btn.onclick = toggleModal
        content.appendChild(btn)
        if (errors) {
            let e = document.createElement("p")
            e.innerText = errors
            e.id = "error"
            content.appendChild(e)
        }
    }

    function drawBoard(side) {
        let board = document.createElement("div")
        board.id = "board"
        //board.style.display = 'none'
        let count = 0
        for(let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                let square = document.createElement("div")
                square.className = 'square'
                square.classList.add(`${side.id}`)
                board.appendChild(square)
                count++
            }
        }
        side.appendChild(board)
    }

    setUpInput(ships)
    drawBoard(left)

    

    function toggleModal() {
        let board = document.querySelector("#board")
        if (main.style.display == 'none') {
            main.style.display = 'grid'
            board.style.display = 'none'
        }
        else {
            let inputs = document.querySelectorAll("input")
            let index = 0
            for (let i = 0; i < inputs.length; i += 2) { 
                if ((handleInput(inputs[i].value, inputs[i+1].value, ships[index].length, ships[index]))==false) {
                    let error = "Something is overlapping or out of bounds"
                    return setUpInput(ships, error)
                }
                index++
            }

            main.style.display = 'none'
            board.style.display = 'grid'
        }
    }
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
            // Check availability
            if (j == 0) {
                if (squares[index].classList.contains('active')) {
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

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboard": () => (/* binding */ gameboard)
/* harmony export */ });
let banner = document.querySelector(".banner")
const sleep = ms => new Promise(r => setTimeout(r, ms));
let gameboard = (ships, side) => {
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class */ "./src/class.js");
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computer */ "./src/computer.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");





const banner = document.querySelector(".banner")
// Build ships
const ships = {
    "tug": 2
    //"sub": 4
}
let player_1 = []
for (let item in ships) {
    let foo = new _class__WEBPACK_IMPORTED_MODULE_0__["default"](item, ships[item], "player")
    player_1.push(foo)
}

let comp = []
for (let item in ships) {
    let foo = new _class__WEBPACK_IMPORTED_MODULE_0__["default"](item, ships[item], "computer")
    comp.push(foo)
}

(0,_dom__WEBPACK_IMPORTED_MODULE_2__.setUp)(player_1)
;(0,_gameboard__WEBPACK_IMPORTED_MODULE_3__.gameboard)(player_1, 'left')

;(0,_computer__WEBPACK_IMPORTED_MODULE_1__.compy)(comp)
;(0,_gameboard__WEBPACK_IMPORTED_MODULE_3__.gameboard)(comp, 'right')


let cover = document.createElement("div")
cover.id = "cover"
let main = document.querySelector("#boardArea")
main.appendChild(cover)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O1VDaEdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOMEI7QUFDTTtBQUNMO0FBQ1U7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsOENBQUk7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLDhDQUFJO0FBQ3RCO0FBQ0E7O0FBRUEsMkNBQUs7QUFDTCxzREFBUzs7QUFFVCxpREFBSztBQUNMLHNEQUFTOzs7QUFHVDtBQUNBO0FBQ0E7QUFDQSx1QiIsInNvdXJjZXMiOlsid2VicGFjazovL3piYXR0bGVzaGlwdGVzdGluZy8uL3NyYy9jbGFzcy5qcyIsIndlYnBhY2s6Ly96YmF0dGxlc2hpcHRlc3RpbmcvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vemJhdHRsZXNoaXB0ZXN0aW5nLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly96YmF0dGxlc2hpcHRlc3RpbmcvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3piYXR0bGVzaGlwdGVzdGluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly96YmF0dGxlc2hpcHRlc3Rpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3piYXR0bGVzaGlwdGVzdGluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3piYXR0bGVzaGlwdGVzdGluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3piYXR0bGVzaGlwdGVzdGluZy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtYXJrcywgb3duZXIpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLm1hcmtzID0gbWFya3NcbiAgICAgICAgdGhpcy5sZW5ndGggPSBtYXJrc1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXJcbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMubWFya3MgLT0gMVxuICAgIH1cblxuICAgIGlzU2luaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya3MgPD0gMCA/IHRydWUgOiBmYWxzZVxuICAgIH1cbn0iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIlxuXG5leHBvcnQgbGV0IGNvbXB5ID0gKGNvbXBTaGlwcykgPT4ge1xuXG4gICAgY29uc3Qgc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyaWdodCcpXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVJbnB1dChpbl8xLCBpbl8yLCBsZW5ndGgsIHNoaXBzKSB7XG4gICAgICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yaWdodFwiKVxuICAgICAgICBsZXQgeCA9IE51bWJlcihpbl8xKVxuICAgICAgICBsZXQgeSA9IE51bWJlcihpbl8yKVxuICAgICAgICBpZiAobGVuZ3RoICsgeSA+IDkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIC8vIENoZWNrIHRoYXQgYWxsIHNwYWNlcyBhcmUgYXZhaWxhYmxlXG4gICAgICAgIC8vIElmIGF2YWlsYWJsZSwgYXNzaWduIGVhY2ggc3BvdFxuICAgICAgICBsb29wMTpcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAyOyBqKyspIHtcbiAgICAgICAgICAgIGxvb3AyOlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9ICh4ICogMTApICsgeSArIGlcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBhdmFpbGFiaWxpdHlcbiAgICAgICAgICAgICAgICBpZiAoaiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVzW2luZGV4XS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBMQUNJTkcgU0hJUFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgbG9vcDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQXNzaWduIHNoaXAgdG8gc3F1YXJlc1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcXVhcmVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZXNbaW5kZXhdLmRhdGFzZXQubmFtZSA9IHNoaXBzLm5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cEJvYXJkKCkge1xuICAgICAgICBsZXQgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIGJvYXJkLmlkID0gXCJib2FyZFwiXG4gICAgICAgIC8vYm9hcmQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSAnc3F1YXJlJ1xuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGByaWdodGApXG4gICAgICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKVxuICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzaWRlLmFwcGVuZENoaWxkKGJvYXJkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvYmFyKCkge1xuXG4gICAgfVxuXG4gICAgc2V0dXBCb2FyZCgpXG4gICAgaGFuZGxlSW5wdXQoMCwgMCwgMiwgY29tcFNoaXBzWzBdKVxufSIsImNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKVxuY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKVxuY29uc3QgbGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGVmdFwiKVxuY29uc3QgU0laRSA9IDEwIC8vOSA9PiAxMHgxMFxuXG5leHBvcnQgbGV0IHNldFVwID0gKHNoaXBzLCBlcnJvcnMpID0+IHtcblxuICAgIHdoaWxlIChjb250ZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgY29udGVudC5yZW1vdmVDaGlsZChjb250ZW50LmZpcnN0Q2hpbGQpXG4gICAgfVxuXG4gICAgLy8gSW5wdXRzIGNhbiBvbmx5IGJlIDAtOVxuICAgIGZ1bmN0aW9uIGtleVVwRXZlbnQodGFyZ2V0LCBlKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSB0YXJnZXQudmFsdWVcbiAgICAgICAgLy8gUHJldmVudHMgaW5wdXRzIG9mIHNpZ25zIGFuZCAnZSdcbiAgICAgICAgaWYgKCEoZS5rZXlDb2RlID49ICc5NicgJiYgZS5rZXlDb2RlIDw9ICcxMDUnKSAmJiAhKGUua2V5Q29kZSA+PSAnNDgnICYmIGUua2V5Q29kZSA8PSAnNTcnKSkge1xuICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gYnVmZmVyXG4gICAgICAgIH1cbiAgICAgICAgLy8gT25seSBhbGxvd3Mgb25lIGRpZ2l0LCBpZiBtb3JlIHRoYW4gb25lIGlzIHByZXNzZWQsIGRlZmF1bHRzIGxhc3QgZGlnaXQgZW50ZXJlZFxuICAgICAgICBpZiAodGFyZ2V0LnZhbHVlLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICB0YXJnZXQudmFsdWUgPSBcIlwiXG4gICAgICAgICAgICB0YXJnZXQudmFsdWUgPSBlLmtleVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFVwSW5wdXQoc2hpcHMsIGVycm9ycykge1xuICAgICAgICB3aGlsZSAoY29udGVudC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBjb250ZW50LnJlbW92ZUNoaWxkKGNvbnRlbnQuZmlyc3RDaGlsZClcbiAgICAgICAgfVxuICAgICAgICBsZXQgeF9jb29yZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgICAgIGxldCB5X2Nvb3JkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICAgICAgeV9jb29yZC5jbGFzc05hbWUgPSBcInlcIlxuICAgICAgICB4X2Nvb3JkLmlubmVyVGV4dCA9IFwiIFggXCJcbiAgICAgICAgeV9jb29yZC5pbm5lclRleHQgPSBcIiBZIFwiXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kKHhfY29vcmQsIHlfY29vcmQpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkaXZfMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgICAgIGRpdl8xLmNsYXNzTmFtZSA9IFwiaW5wdXQtZmllbGRcIlxuICAgICAgICAgICAgbGV0IGxhYmVsXzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcbiAgICAgICAgICAgIGxldCBpbnB1dF8xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gICAgICAgICAgICBsZXQgaW5wdXRfMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICAgICAgICAgICAgbGFiZWxfMS5pbm5lclRleHQgPSBgJHtzaGlwc1tpXS5uYW1lfWBcbiAgICAgICAgICAgIGlucHV0XzEudHlwZSA9IFwibnVtYmVyXCJcbiAgICAgICAgICAgIGlucHV0XzEubmFtZSA9IGAke3NoaXBzW2ldLm5hbWV9YFxuICAgICAgICAgICAgaW5wdXRfMi50eXBlID0gJ251bWJlcidcbiAgICAgICAgICAgIGlucHV0XzIubmFtZSA9IGAke3NoaXBzW2ldLm5hbWV9YFxuICAgICAgICAgICAgaW5wdXRfMS5vbmtleXVwID0gKGUpID0+IHtrZXlVcEV2ZW50KGlucHV0XzEsIGUpfVxuICAgICAgICAgICAgaW5wdXRfMi5vbmtleXVwID0gKGUpID0+IHtrZXlVcEV2ZW50KGlucHV0XzIsIGUpfVxuICAgICAgICAgICAgZGl2XzEuYXBwZW5kKGxhYmVsXzEsIGlucHV0XzEsIGlucHV0XzIpXG4gICAgICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKGRpdl8xKVxuICAgICAgICB9XG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG5cbiAgICAgICAgYnRuLmlubmVyVGV4dCA9IFwiQ2xvc2VcIlxuICAgICAgICBidG4ub25jbGljayA9IHRvZ2dsZU1vZGFsXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoYnRuKVxuICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICBsZXQgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXG4gICAgICAgICAgICBlLmlubmVyVGV4dCA9IGVycm9yc1xuICAgICAgICAgICAgZS5pZCA9IFwiZXJyb3JcIlxuICAgICAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZChlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd0JvYXJkKHNpZGUpIHtcbiAgICAgICAgbGV0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBib2FyZC5pZCA9IFwiYm9hcmRcIlxuICAgICAgICAvL2JvYXJkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgU0laRTsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFNJWkU7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9ICdzcXVhcmUnXG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYCR7c2lkZS5pZH1gKVxuICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSlcbiAgICAgICAgICAgICAgICBjb3VudCsrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2lkZS5hcHBlbmRDaGlsZChib2FyZClcbiAgICB9XG5cbiAgICBzZXRVcElucHV0KHNoaXBzKVxuICAgIGRyYXdCb2FyZChsZWZ0KVxuXG4gICAgXG5cbiAgICBmdW5jdGlvbiB0b2dnbGVNb2RhbCgpIHtcbiAgICAgICAgbGV0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib2FyZFwiKVxuICAgICAgICBpZiAobWFpbi5zdHlsZS5kaXNwbGF5ID09ICdub25lJykge1xuICAgICAgICAgICAgbWFpbi5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnXG4gICAgICAgICAgICBib2FyZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkgKz0gMikgeyBcbiAgICAgICAgICAgICAgICBpZiAoKGhhbmRsZUlucHV0KGlucHV0c1tpXS52YWx1ZSwgaW5wdXRzW2krMV0udmFsdWUsIHNoaXBzW2luZGV4XS5sZW5ndGgsIHNoaXBzW2luZGV4XSkpPT1mYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBcIlNvbWV0aGluZyBpcyBvdmVybGFwcGluZyBvciBvdXQgb2YgYm91bmRzXCJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFVwSW5wdXQoc2hpcHMsIGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmRleCsrXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1haW4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgYm9hcmQuc3R5bGUuZGlzcGxheSA9ICdncmlkJ1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVJbnB1dChpbl8xLCBpbl8yLCBsZW5ndGgsIHNoaXBzKSB7XG4gICAgbGV0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKVxuICAgIGxldCB4ID0gTnVtYmVyKGluXzEpXG4gICAgbGV0IHkgPSBOdW1iZXIoaW5fMilcbiAgICBpZiAobGVuZ3RoICsgeSA+IFNJWkUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhhdCBhbGwgc3BhY2VzIGFyZSBhdmFpbGFibGVcbiAgICAvLyBJZiBhdmFpbGFibGUsIGFzc2lnbiBlYWNoIHNwb3RcbiAgICBsb29wMTpcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDI7IGorKykge1xuICAgICAgICBsb29wMjpcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gKHggKiAxMCkgKyB5ICsgaVxuICAgICAgICAgICAgLy8gQ2hlY2sgYXZhaWxhYmlsaXR5XG4gICAgICAgICAgICBpZiAoaiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNxdWFyZXNbaW5kZXhdLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrIGxvb3AxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFzc2lnbiBzaGlwIHRvIHNxdWFyZXNcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNxdWFyZXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICBzcXVhcmVzW2luZGV4XS5kYXRhc2V0Lm5hbWUgPSBzaGlwcy5uYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwibGV0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFubmVyXCIpXG5jb25zdCBzbGVlcCA9IG1zID0+IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCBtcykpO1xuZXhwb3J0IGxldCBnYW1lYm9hcmQgPSAoc2hpcHMsIHNpZGUpID0+IHtcbiAgICBsZXQgYWxsU3F1YXJlcyA9IHVuZGVmaW5lZDtcbiAgICBsZXQgb3Bwb25lbnQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHNpZGUgPT0gJ2xlZnQnKSB7XG4gICAgICAgIGFsbFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxlZnRcIilcbiAgICAgICAgb3Bwb25lbnQgPSBcIkNvbXB1dGVyXCJcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFsbFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJpZ2h0XCIpXG4gICAgICAgIG9wcG9uZW50ID0gXCJQbGF5ZXIgT25lXCJcbiAgICB9XG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuICAgICAgICBhbGxTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNoZWNrSGl0KHNxdWFyZSlcbiAgICAgICAgICAgICAgICB0b2dnbGVUdXJuKClcbiAgICAgICAgICAgICAgICBzcXVhcmUucmVwbGFjZVdpdGgoc3F1YXJlLmNsb25lTm9kZSgpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgYWRkTGlzdGVuZXJzKClcblxuICAgIGFzeW5jIGZ1bmN0aW9uIHRvZ2dsZVR1cm4oKSB7XG4gICAgICAgIGF3YWl0IHNsZWVwKDEwMDApXG4gICAgICAgIGxldCB0dXJuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3ZlclwiKVxuICAgICAgICBsZXQgdGV4dCA9ICcnXG4gICAgICAgIGlmICh0dXJuLnN0eWxlLmxlZnQgPT0gJzB2dycgfHwgdHVybi5zdHlsZS5sZWZ0ID09ICcnKSB7XG4gICAgICAgICAgICB0dXJuLnN0eWxlLmxlZnQgPSAnNTB2dydcbiAgICAgICAgICAgIHRleHQgPSBgQ29tcHV0ZXJzIHR1cm5gXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0dXJuLnN0eWxlLmxlZnQgPSAnMHZ3J1xuICAgICAgICAgICAgdGV4dCA9IFwiUGxheWVyIE9uZXMgdHVybi4uLlwiXG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdHlwZVdyaXRlcih0ZXh0LCAxMDApXG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gY2hlY2tIaXQoc3F1YXJlKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gJydcbiAgICAgICAgaWYgKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuICAgICAgICAgICAgaGl0U2hpcChzcXVhcmUsIHNoaXBzKVxuICAgICAgICAgICAgdGV4dCA9IFwiSXQncyBhIGhpdCEhIVwiXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnbWlzcycpXG4gICAgICAgICAgICB0ZXh0ID0gXCJJdCdzIGEgbWlzcy4uLi5cIlxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHR5cGVXcml0ZXIodGV4dCwgNSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaXRTaGlwKHNwb3QsIHNoaXBzKSB7XG4gICAgICAgIGxldCBzaGlwTmFtZSA9IHNwb3QuZGF0YXNldC5uYW1lXG4gICAgICAgIGNvbnNvbGUubG9nKHNwb3QpXG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBOYW1lKVxuICAgICAgICBsZXQgc2hpcCA9IHNoaXBzLmZpbmQoeCA9PiB4Lm5hbWUgPT0gc2hpcE5hbWUpXG4gICAgICAgIHNoaXAuaGl0KClcbiAgICAgICAgY2hlY2tXaW4oc2hpcHMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXaW4oc2hpcHMpIHtcbiAgICAgICAgaWYgKHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1NpbmsoKSA9PSB0cnVlKSkge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKVxuICAgICAgICAgICAgbGV0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAgICAgbW9kYWwuY2xhc3NOYW1lID0gXCJjb250YWluZXJcIlxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGVudC5jbGFzc05hbWUgPSBcImNvbnRlbnRcIlxuICAgICAgICAgICAgY29udGVudC5pbm5lclRleHQgPSBgJHtvcHBvbmVudH0gV0lOUyEhIWBcbiAgICAgICAgICAgIC8vIFBsYXkgYWdhaW5cbiAgICAgICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICAgICAgICBidG4uaW5uZXJUZXh0ID0gXCJQbGF5IGFnYWluXCJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZChidG4pXG4gICAgICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChjb250ZW50KVxuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChtb2RhbClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gTWFrZXMgdGV4dCBzbG93bHkgdHlwZSBvdXQsIGluc3RlYWQgb2YgYmVpbmcgaW5zdGFudFxuICAgIGZ1bmN0aW9uIHR5cGVXcml0ZXIodGV4dCwgc3BlZWQpIHtcbiAgICAgICAgY29uc29sZS5sb2codGV4dClcbiAgICAgICAgYmFubmVyLmlubmVySFRNTCA9ICcnXG4gICAgICAgIGxldCBpID0gMFxuICAgICAgICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICAgIGlmIChpIDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGJhbm5lci5pbm5lckhUTUwgKz0gdGV4dC5jaGFyQXQoaSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHN0YXJ0LCBzcGVlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0YXJ0KClcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgU2hpcCBmcm9tICcuL2NsYXNzJ1xuaW1wb3J0IHtjb21weX0gZnJvbSAnLi9jb21wdXRlcidcbmltcG9ydCB7c2V0VXB9IGZyb20gJy4vZG9tJ1xuaW1wb3J0IHtnYW1lYm9hcmR9IGZyb20gJy4vZ2FtZWJvYXJkJ1xuXG5jb25zdCBiYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhbm5lclwiKVxuLy8gQnVpbGQgc2hpcHNcbmNvbnN0IHNoaXBzID0ge1xuICAgIFwidHVnXCI6IDJcbiAgICAvL1wic3ViXCI6IDRcbn1cbmxldCBwbGF5ZXJfMSA9IFtdXG5mb3IgKGxldCBpdGVtIGluIHNoaXBzKSB7XG4gICAgbGV0IGZvbyA9IG5ldyBTaGlwKGl0ZW0sIHNoaXBzW2l0ZW1dLCBcInBsYXllclwiKVxuICAgIHBsYXllcl8xLnB1c2goZm9vKVxufVxuXG5sZXQgY29tcCA9IFtdXG5mb3IgKGxldCBpdGVtIGluIHNoaXBzKSB7XG4gICAgbGV0IGZvbyA9IG5ldyBTaGlwKGl0ZW0sIHNoaXBzW2l0ZW1dLCBcImNvbXB1dGVyXCIpXG4gICAgY29tcC5wdXNoKGZvbylcbn1cblxuc2V0VXAocGxheWVyXzEpXG5nYW1lYm9hcmQocGxheWVyXzEsICdsZWZ0JylcblxuY29tcHkoY29tcClcbmdhbWVib2FyZChjb21wLCAncmlnaHQnKVxuXG5cbmxldCBjb3ZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbmNvdmVyLmlkID0gXCJjb3ZlclwiXG5sZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmRBcmVhXCIpXG5tYWluLmFwcGVuZENoaWxkKGNvdmVyKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==