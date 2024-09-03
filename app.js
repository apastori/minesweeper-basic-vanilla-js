document.addEventListener('DOMContentLoaded', () => {
    mineSweeperApp();
})

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function mineSweeperApp() {
    console.log("MineSweeperStart");
    const width = 10;
    let bombAmount = 20;
    let flagAmount = 0;
    let squares = [];
    let isGameOver = false;
    const grid = document.getElementsByClassName("grid")[0];
    const flagsLeft = document.getElementById("flags-left");
    const result = document.querySelector(".result");
    const bombArray = new Array(bombAmount);
    bombArray.fill("bomb");
    const emptyCellArray = new Array(Math.pow(width, 2) - bombAmount);
    emptyCellArray.fill("valid");
    const gameArray = emptyCellArray.concat(bombArray);
    //console.log(gameArray);
    const gameArrayShuffled = shuffle(gameArray);
    //console.log(gameArrayShuffled);
    // Create Board MineSweeper
    function createBoard() {
        flagsLeft.innerHTML = bombAmount;
        for (let i = 0; i < Math.pow(width, 2); i++) {
            const square = document.createElement("div");
            const squareType = gameArrayShuffled[i];
            square.classList.add("gridElement", squareType);
            square.setAttribute("id", `gridElement${i}`);
            grid.appendChild(square);
            squares.push(square);
            //normal click
            square.addEventListener("click", (e) => {
                clickSquare(square);
            });
            //Control and Left Click
            //square.addEventListener("contextmenu", (e) => {
            square.oncontextmenu = function() {
                console.log("contextMenuEvent");
                //e.preventDefault();
                addFlagSquare(square);
            }
        }
        for (let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);
            if (squares[i].classList.contains("valid")) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb")) {
                    total++;
                }
                if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains("bomb")) {
                    total++;
                }
                if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
                if (i > 11 && !isLeftEdge && squares[i - width - 1].classList.contains("bomb")) total++;
                // Check Right Square
                if (i < 99 && !isRightEdge && squares[i + 1].classList.contains("bomb")) total++;
                // Check Down-left Square
                if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains("bomb")) total++;
                // Check Down-Right Square
                if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains("bomb")) total++;
                // Check Directly Down Square
                if (i < 89 && squares[i + width].classList.contains("bomb")) total++;
                squares[i].setAttribute("data", total);
            }
        }
    }
    createBoard();
    function clickSquare(square) {
        console.log(square);
        let squareId = square.getAttribute("id");
        console.log(squareId)
        let squareIdFinal = squareId.replace("gridElement", "");
        console.log(squareIdFinal);
        if (isGameOver) return;
        let notCheckedOrFlag = square.classList.contains("checked") || square.classList.contains("flag");
        if (notCheckedOrFlag) return;
        let isBomb = square.classList.contains("bomb");
        if (isBomb) {
            gameOver();
        } else {
            let total = square.getAttribute("data");
            console.log(total, typeof total);
            let objNumStr = {
                "1": "one",
                "2": "two",
                "3": "three",
                "4": "four",
                "5": "five",
                "6": "six",
                "7": "seven",
                "8": "eight",
            };
            if (Number(total)) {
                //square.classList.add("checked");
                square.classList.add(objNumStr[String(total)]);
                square.innerHTML = total;
                return;
            }
            checkSquare(square)
        }
        square.classList.add("checked");
    }

    function checkSquare(square) {
        console.log(square);
        const idSquare = square.getAttribute("id");
        let squareIdFinal = idSquare.replace("gridElement", "");
        let squareIdNum = Number(squareIdFinal);
        console.log(squareIdNum, typeof squareIdNum);
        const isLeftEdge = (squareIdNum % width === 0);
        const isRightEdge = (squareIdNum % width === width - 1);
        setTimeout(() => {
            if (squareIdNum > 0 && !isLeftEdge) {
                const newId = squares[squareIdNum - 1].getAttribute("id");
                const newSquare = document.getElementById(newId);
                clickSquare(newSquare);
            }
            if (squareIdNum > 9 && !isRightEdge) {
                const newId = squares[squareIdNum + 1 - width].getAttribute("id");
                const newSquare = document.getElementById(newId);
                clickSquare(newSquare);
            }
            if (squareIdNum > 10) {
                const newId = squares[squareIdNum - width].getAttribute("id");
                const newSquare = document.getElementById(newId);
                clickSquare(newSquare);
            }
            if (squareIdNum > 11 && !isLeftEdge) {
                const newId = squares[squareIdNum - 1 - width].getAttribute("id");
                const newSquare = document.getElementById(newId);
                clickSquare(newSquare);
            }
            if (squareIdNum < 98 && !isRightEdge) {
                const newId = squares[squareIdNum + 1].getAttribute("id");
                const newSquare = document.getElementById(newId);
                clickSquare(newSquare);
            }
            if (squareIdNum < 90 && !isLeftEdge) {
                const newId = squares[squareIdNum - 1 + width].getAttribute("id");
                const newSquare = document.getElementById(newId);
                clickSquare(newSquare);
            }
            if (squareIdNum < 88 && !isRightEdge) {
                const newId = squares[squareIdNum + 1 + width].getAttribute("id");
                const newSquare = document.getElementById(newId);
                clickSquare(newSquare);
            }
        }, 10)
    }

    function addFlagSquare(square) {
        if (isGameOver) return;
        const squareIsFlag = square.classList.contains('flag');
        if (squareIsFlag) return; 
        const squareIsChecked = square.classList.contains('checked');
        const lessFlagsThanBombs = (flagAmount < bombAmount);
        if (!squareIsChecked && lessFlagsThanBombs) {
            square.classList.add("flag");
            flagAmount++;
            square.innerHTML = "🚩";
            flagsLeft.innerHTML = bombAmount - flagAmount;
            checkForWin();
        } else {
            // Eliminate Flag
            square.classList.remove("flag");
            flagAmount--;
            square.innerHTML = "";
            flagsLeft.innerHTML = bombAmount - flagAmount;
        }
    }

    function checkForWin() {
        let matches = 0;
        for (let i = 0; i < squares.length; i++) {
            const square = squares[i];
            const squareIsFlag = square.classList.contains("flag");
            const squareIsBomb = square.classList.contains("bomb");
            if (squareIsFlag && squareIsBomb) {
                matches++;
            }
            if (matches === bombAmount) {
                result.innerHTML = "YOU WIN!!!😀😀😀";
                isGameOver = true;
            }
        }
    }

    function gameOver() {
        result.innerHTML = "Boom! Game Over";
        isGameOver = true;
        // Show all the bombs
        squares.forEach((square) => {
            let isBomb = square.classList.contains("bomb");
            if (isBomb) {
                square.innerHTML = "💣";
                square.classList.remove("bomb");
                square.classList.add("checked");
            }
        });
    }
}