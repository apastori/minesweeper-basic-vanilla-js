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
    let squares = [];
    const grid = document.getElementsByClassName("grid")[0];
    const flagsLeft = document.getElementById("flags-left");
    const bombArray = new Array(bombAmount);
    bombArray.fill("bomb");
    const emptyCellArray = new Array(Math.pow(width, 2) - bombAmount);
    emptyCellArray.fill("valid");
    const gameArray = emptyCellArray.concat(bombArray);
    console.log(gameArray);
    const gameArrayShuffled = shuffle(gameArray);
    console.log(gameArrayShuffled);
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
            square.addEventListener("click", (e) => {
                //addFlagSquare(square);
            })
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
    }
    function addFlagSquare(square) {

    }
}