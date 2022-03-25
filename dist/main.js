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
    constructor(name, marks) {
        this.name = name
        this.marks = marks
        this.length = marks
    }

    hit() {
        this.marks -= 1
    }

    isSink() {
        return this.marks <= 0 ? true : false
    }
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
const body = document.querySelector("body")
const main = document.querySelector(".container")
const content = document.querySelector(".content")
const SIZE = 10 //9 => 10x10

let setUp = (ships, errors) => {
    
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
let gameboard = (ships) => {
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
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");




// Build ships
const ships = {
    "tug": 2,
    "sub": 4
}
let shipArray = []
for (let item in ships) {
    let foo = new _class__WEBPACK_IMPORTED_MODULE_0__["default"](item, ships[item])
    shipArray.push(foo)
}

let foo = (0,_dom__WEBPACK_IMPORTED_MODULE_1__.setUp)(shipArray)
foo
;(0,_gameboard__WEBPACK_IMPORTED_MODULE_2__.gameboard)(shipArray)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsY0FBYztBQUNqRDtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUMsc0NBQXNDO0FBQ3RDLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFVBQVU7QUFDakMsNEJBQTRCLFVBQVU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsbUJBQW1CO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMxSU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNqQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjBCO0FBQ0M7QUFDVTs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsOENBQUk7QUFDdEI7QUFDQTs7QUFFQSxVQUFVLDJDQUFLO0FBQ2Y7QUFDQSxzREFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL3piYXR0bGVzaGlwdGVzdGluZy8uL3NyYy9jbGFzcy5qcyIsIndlYnBhY2s6Ly96YmF0dGxlc2hpcHRlc3RpbmcvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3piYXR0bGVzaGlwdGVzdGluZy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vemJhdHRsZXNoaXB0ZXN0aW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3piYXR0bGVzaGlwdGVzdGluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vemJhdHRsZXNoaXB0ZXN0aW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vemJhdHRsZXNoaXB0ZXN0aW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vemJhdHRsZXNoaXB0ZXN0aW5nLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1hcmtzKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5tYXJrcyA9IG1hcmtzXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbWFya3NcbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMubWFya3MgLT0gMVxuICAgIH1cblxuICAgIGlzU2luaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya3MgPD0gMCA/IHRydWUgOiBmYWxzZVxuICAgIH1cbn0iLCJjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIilcbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKVxuY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKVxuY29uc3QgU0laRSA9IDEwIC8vOSA9PiAxMHgxMFxuXG5leHBvcnQgbGV0IHNldFVwID0gKHNoaXBzLCBlcnJvcnMpID0+IHtcbiAgICBcbiAgICAvLyBJbnB1dHMgY2FuIG9ubHkgYmUgMC05XG4gICAgZnVuY3Rpb24ga2V5VXBFdmVudCh0YXJnZXQsIGUpIHtcbiAgICAgICAgLy8gUHJldmVudHMgaW5wdXRzIG9mIHNpZ25zIGFuZCAnZSdcbiAgICAgICAgaWYgKCEoZS5rZXlDb2RlID49ICc5NicgJiYgZS5rZXlDb2RlIDw9ICcxMDUnKSAmJiAhKGUua2V5Q29kZSA+PSAnNDgnICYmIGUua2V5Q29kZSA8PSAnNTcnKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIH1cbiAgICAgICAgLy8gT25seSBhbGxvd3Mgb25lIGRpZ2l0LCBpZiBtb3JlIHRoYW4gb25lIGlzIHByZXNzZWQsIGRlZmF1bHRzIGxhc3QgZGlnaXQgZW50ZXJlZFxuICAgICAgICBpZiAodGFyZ2V0LnZhbHVlLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICB0YXJnZXQudmFsdWUgPSBcIlwiXG4gICAgICAgICAgICB0YXJnZXQudmFsdWUgPSBlLmtleVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFVwSW5wdXQoc2hpcHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpXG4gICAgICAgIHdoaWxlIChjb250ZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGNvbnRlbnQucmVtb3ZlQ2hpbGQoY29udGVudC5maXJzdENoaWxkKVxuICAgICAgICB9XG4gICAgICAgIGxldCB4X2Nvb3JkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICAgICAgbGV0IHlfY29vcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgICAgICB5X2Nvb3JkLmNsYXNzTmFtZSA9IFwieVwiXG4gICAgICAgIHhfY29vcmQuaW5uZXJUZXh0ID0gXCIgWCBcIlxuICAgICAgICB5X2Nvb3JkLmlubmVyVGV4dCA9IFwiIFkgXCJcbiAgICAgICAgY29udGVudC5hcHBlbmQoeF9jb29yZCwgeV9jb29yZClcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRpdl8xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAgICAgZGl2XzEuY2xhc3NOYW1lID0gXCJpbnB1dC1maWVsZFwiXG4gICAgICAgICAgICBsZXQgbGFiZWxfMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxuICAgICAgICAgICAgbGV0IGlucHV0XzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgICAgICAgICAgIGxldCBpbnB1dF8yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gICAgICAgICAgICBsYWJlbF8xLmlubmVyVGV4dCA9IGAke3NoaXBzW2ldLm5hbWV9YFxuICAgICAgICAgICAgaW5wdXRfMS50eXBlID0gXCJudW1iZXJcIlxuICAgICAgICAgICAgaW5wdXRfMS5uYW1lID0gYCR7c2hpcHNbaV0ubmFtZX1gXG4gICAgICAgICAgICBpbnB1dF8yLnR5cGUgPSAnbnVtYmVyJ1xuICAgICAgICAgICAgaW5wdXRfMi5uYW1lID0gYCR7c2hpcHNbaV0ubmFtZX1gXG4gICAgICAgICAgICBpbnB1dF8xLm9ua2V5dXAgPSAoZSkgPT4ge2tleVVwRXZlbnQoaW5wdXRfMSwgZSl9XG4gICAgICAgICAgICBpbnB1dF8yLm9ua2V5dXAgPSAoZSkgPT4ge2tleVVwRXZlbnQoaW5wdXRfMiwgZSl9XG4gICAgICAgICAgICBkaXZfMS5hcHBlbmQobGFiZWxfMSwgaW5wdXRfMSwgaW5wdXRfMilcbiAgICAgICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZGl2XzEpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3Qm9hcmQoKSB7XG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgYm9hcmQuaWQgPSBcImJvYXJkXCJcbiAgICAgICAgYm9hcmQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBTSVpFOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgU0laRTsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gJ3NxdWFyZSdcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpXG4gICAgICAgICAgICAgICAgY291bnQrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoYm9hcmQpXG4gICAgfVxuXG4gICAgc2V0VXBJbnB1dChzaGlwcylcbiAgICBkcmF3Qm9hcmQoKVxuXG4gICAgbGV0IG1haW5CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcblxuICAgIG1haW5CdG4uaW5uZXJUZXh0ID0gXCJPcGVuXCJcbiAgICBtYWluQnRuLm9uY2xpY2sgPSB0b2dnbGVNb2RhbFxuICAgIG1haW5CdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobWFpbkJ0bilcbiAgICBidG4uaW5uZXJUZXh0ID0gXCJDbG9zZVwiXG4gICAgYnRuLm9uY2xpY2sgPSB0b2dnbGVNb2RhbFxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoYnRuKVxuICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgbGV0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxuICAgICAgICBlLmlubmVyVGV4dCA9IGVycm9yc1xuICAgICAgICBlLmlkID0gXCJlcnJvclwiXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZSlcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9nZ2xlTW9kYWwoKSB7XG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmRcIilcbiAgICAgICAgaWYgKG1haW4uc3R5bGUuZGlzcGxheSA9PSAnbm9uZScpIHtcbiAgICAgICAgICAgIG1haW4uc3R5bGUuZGlzcGxheSA9ICdncmlkJ1xuICAgICAgICAgICAgbWFpbkJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICBib2FyZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwc1swXS5sZW5ndGgpXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkgKz0gMikgeyBcbiAgICAgICAgICAgICAgICBpZiAoKGhhbmRsZUlucHV0KGlucHV0c1tpXS52YWx1ZSwgaW5wdXRzW2krMV0udmFsdWUsIHNoaXBzW2luZGV4XS5sZW5ndGgsIHNoaXBzW2luZGV4XSkpPT1mYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBcIlNvbWV0aGluZyBpcyBvdmVybGFwcGluZ1wiXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRVcChlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5kZXgrK1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtYWluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIG1haW5CdG4uc3R5bGUuZGlzcGxheSA9ICdncmlkJ1xuICAgICAgICAgICAgYm9hcmQuc3R5bGUuZGlzcGxheSA9ICdncmlkJ1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7c2V0VXBJbnB1dH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlSW5wdXQoaW5fMSwgaW5fMiwgbGVuZ3RoLCBzaGlwcykge1xuICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIilcbiAgICBsZXQgeCA9IE51bWJlcihpbl8xKVxuICAgIGxldCB5ID0gTnVtYmVyKGluXzIpXG4gICAgaWYgKGxlbmd0aCArIHkgPiBTSVpFKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIENoZWNrIHRoYXQgYWxsIHNwYWNlcyBhcmUgYXZhaWxhYmxlXG4gICAgLy8gSWYgYXZhaWxhYmxlLCBhc3NpZ24gZWFjaCBzcG90XG4gICAgbG9vcDE6XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAyOyBqKyspIHtcbiAgICAgICAgbG9vcDI6XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9ICh4ICogMTApICsgeSArIGlcbiAgICAgICAgICAgIGlmIChqID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoc3F1YXJlc1tpbmRleF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgYnJlYWsgbG9vcDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3F1YXJlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIHNxdWFyZXNbaW5kZXhdLmRhdGFzZXQubmFtZSA9IHNoaXBzLm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgbGV0IGdhbWVib2FyZCA9IChzaGlwcykgPT4ge1xuICAgIGxldCBhbGxTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIilcblxuICAgIGFsbFNxdWFyZXMuZm9yRWFjaChzcXVhcmUgPT4ge1xuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2hpdCcpXG4gICAgICAgICAgICAgICAgaGl0U2hpcChzcXVhcmUsIHNoaXBzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBoaXRTaGlwKHNwb3QsIHNoaXBzKSB7XG4gICAgICAgIGxldCBzaGlwTmFtZSA9IHNwb3QuZGF0YXNldC5uYW1lXG4gICAgICAgIGxldCBzaGlwID0gc2hpcHMuZmluZCh4ID0+IHgubmFtZSA9PSBzaGlwTmFtZSlcbiAgICAgICAgc2hpcC5oaXQoKVxuICAgICAgICBjb25zb2xlLmxvZyhzaGlwLmlzU2luaygpKVxuICAgICAgICBjaGVja1dpbihzaGlwcylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dpbihzaGlwcykge1xuICAgICAgICBpZiAoc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU2luaygpID09IHRydWUpKSB7XG4gICAgICAgICAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgICAgICBtb2RhbC5jbGFzc05hbWUgPSBcImNvbnRhaW5lclwiXG4gICAgICAgICAgICBsZXQgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb250ZW50LmNsYXNzTmFtZSA9IFwiY29udGVudFwiXG4gICAgICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChjb250ZW50KVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgU2hpcCBmcm9tICcuL2NsYXNzJ1xuaW1wb3J0IHtzZXRVcH0gZnJvbSAnLi9kb20nXG5pbXBvcnQge2dhbWVib2FyZH0gZnJvbSAnLi9nYW1lYm9hcmQnXG5cbi8vIEJ1aWxkIHNoaXBzXG5jb25zdCBzaGlwcyA9IHtcbiAgICBcInR1Z1wiOiAyLFxuICAgIFwic3ViXCI6IDRcbn1cbmxldCBzaGlwQXJyYXkgPSBbXVxuZm9yIChsZXQgaXRlbSBpbiBzaGlwcykge1xuICAgIGxldCBmb28gPSBuZXcgU2hpcChpdGVtLCBzaGlwc1tpdGVtXSlcbiAgICBzaGlwQXJyYXkucHVzaChmb28pXG59XG5cbmxldCBmb28gPSBzZXRVcChzaGlwQXJyYXkpXG5mb29cbmdhbWVib2FyZChzaGlwQXJyYXkpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=