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
        }
    }
    createBoard();
}