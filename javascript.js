const gridContainer = document.querySelector(".grid-container");
const leftSide = document.querySelector(".left");
leftSide.style.backgroundColor = "#7ceca1d8";
const rightSide = document.querySelector(".right");
const boxButton = document.querySelector(".box-button");
const box = document.querySelector(".congratWin");
const message = document.querySelector("#message");
boxButton.addEventListener("click", () => {
  box.style.display = "none";
  game.startGame();
});

const board = (function () {
  const matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const getStroke = (x, y, sign) => {
    matrix[x][y] = sign;

    if (checkWinner()) {
      congrats();
    }
  };

  const congrats = () => {
    if (checkWinner() === 1) {
      message.innerHTML = `X wins!<br>Congratulations!`;
    } else {
      message.innerHTML = `O wins!<br>Congratulations!`;
    }
    box.style.display = "flex";
  };

  const resetMatrix = () => {
    res = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        matrix[i][j] = 0;
      }
    }
  };

  const printBoard = () => {
    matrix.forEach((row) => console.log(row.join(" ")));
  };
  const checkWinner = () => {
    let res = 0;
    function checker(res) {
      res /= 3;
      res = res >= 0 ? Math.floor(res) : Math.ceil(res);
      return res;
    }

    for (const row of matrix) {
      res = row.reduce((a, b) => a + b);
      res = checker(res);

      if (res) {
        return res;
      }
    }
    res = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        res += matrix[j][i];
      }
      res = checker(res);
      if (res) {
        return res;
      }
    }
    res = 0;
    for (let i = 0; i < 3; i++) {
      res += matrix[i][i];
    }
    res = checker(res);
    if (res) {
      return res;
    }

    res = 0;
    for (let i = 0; i < 3; i++) {
      res += matrix[i][2 - i];
    }

    res = checker(res);

    printBoard();
    if (res != 0) {
      return res;
    }
    return 0;
  };
  return { printBoard, checkWinner, resetMatrix, getStroke };
})();
let toggler;
let counter;
const game = (function () {
  const startGame = () => {
    counter = 0;
    const crossMan = createGamer("CrossMan", 1);
    const zeroMan = createGamer("ZeroMan", -1);
    board.resetMatrix();
    board.printBoard();
    gridContainer.innerHTML = `<div id='id0-0'class="cell"></div><div id='id0-1'class="cell"></div><div id='id0-2'class="cell"></div><div id='id1-0'class="cell"></div><div id='id1-1'class="cell"></div><div id='id1-2'class="cell"></div><div id='id2-0'class="cell"></div><div id='id2-1'class="cell"></div><div id='id2-2'class="cell"></div>`;

    toggler = 0;

    let stroke = 0;
    gridContainer.addEventListener("click", (e) => {
      const target = e.target;
      stroke = target.id.slice(2).split("-");

      if (target.classList.contains("cell") && target.innerHTML === "") {
        if (toggler === 0) {
          board.getStroke(+stroke[0], +stroke[1], crossMan.sign);
          rightSide.style.backgroundColor = "#7ceca1d8";
          leftSide.style.backgroundColor = "#00000000";
          target.innerHTML =
            '<img src="./assets/images/cross.png" alt="cross" >';
          toggler++;
          toggler %= 2;
          counter++;
        } else {
          board.getStroke(+stroke[0], +stroke[1], zeroMan.sign);
          leftSide.style.backgroundColor = "#7ceca1d8";
          rightSide.style.backgroundColor = "#00000000";
          target.innerHTML = '<img src="./assets/images/zero.png" alt="zero" >';
          toggler++;
          toggler %= 2;
          counter++;
        }
      }
      if (counter === 9) {
        if (!board.checkWinner()) {
          box.style.display = "flex";
          message.innerHTML = `No wins!`;
        }
      }
    });
  };

  function createGamer(name, sign) {
    return { name, sign };
  }

  return { startGame };
})();

game.startGame();
