const xClass = "x";
const oClass = "o";
const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let isAWinner = false;
let xPattern = [];
let oPattern = [];
let huPlayer;
let aiPlayer;
let origBoard = Array.from(Array(9).keys());
let winnerX;
let winnerO;

// SELECTING DOM ELEMENTS
let allBox = document.getElementsByClassName("box");
let turn = document.getElementById("turn");
const gameBoard = document.getElementById("game-board");
const gameMenu = document.getElementById("game-menu");
let gameState = ["", "", "", "", "", "", "", "", ""];
const cells = document.querySelectorAll(".box");
const cellsArr = Array.from(cells);
const btnX = document.getElementById("btn-x");
const btnO = document.getElementById("btn-o");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const cpuBtn = document.getElementById("cpu-btn");
const playerBtn = document.getElementById("player-btn");
let isPlayerTurn = true;
const modal = document.getElementById("modal");
const endGame = document.getElementById("endGameModal");
const restartingGame = document.getElementById("restartGame");
const winnerTakes = document.getElementById("winnerTakes");
const winnerName = document.getElementById("winnerName");
const xScore = document.getElementById("x-score");
const drawScore = document.getElementById("tie-score");
const oScore = document.getElementById("o-score");
const winnerMark = document.getElementById("winner-mark");
const box0 = document.getElementById("0");
const box1 = document.getElementById("1");
const box2 = document.getElementById("2");
const box3 = document.getElementById("3");
const box4 = document.getElementById("4");
const box5 = document.getElementById("5");
const box6 = document.getElementById("6");
const box7 = document.getElementById("7");
const box8 = document.getElementById("8");

function selectMarkX() {
  btnX.classList.add("svg-fill");
  btnO.classList.remove("svg-fill");
}

function selectMarkO() {
  btnO.classList.add("svg-fill");
  btnX.classList.remove("svg-fill");
}

function newGameCpu() {
  gameBoard.style.display = "grid";
  gameMenu.style.display = "none";
  if (btnX.classList.contains("svg-fill")) {
    huPlayer = "X";
    aiPlayer = "O";
    player1.innerText = "X (You)";
    player2.innerText = "0 (CPU) ";
  } else {
    huPlayer = "O";
    aiPlayer = "X";
    player1.innerText = "X (CPU)";
    player2.innerText = "0 (YOU) ";
  }
  cpuBtn.setAttribute("data-value", "active");
  playerBtn.setAttribute("data-value", "");
  cpuTurn();
}
function newGamePlayer() {
  gameBoard.style.display = "grid";
  gameMenu.style.display = "none";
  if (btnX.classList.contains("svg-fill")) {
    huPlayer = "X";
    aiPlayer = "O";
    player1.innerText = "X (Player1)";
    player2.innerText = "0 (Player2) ";
  } else {
    huPlayer = "O";
    aiPlayer = "X";
    player1.innerText = "X (Player2)";
    player2.innerText = "0 (Player1) ";
  }
  playerBtn.setAttribute("data-value", "active");
  cpuBtn.setAttribute("data-value", "");
}

function restartGame() {
  window.location.reload();
}

function checkWin(currentPlayer) {
  for (some of winningCombo) {
    const isContained = (a, b) => {
      for (const c of new Set(a)) {
        if (!b.some((e) => e === c)) return false;
      }
      for (empty of allBox) {
        if (empty.getAttribute("data-value") === "") {
          empty.classList.remove("hover-x");
          empty.classList.remove("hover-o");
          empty.setAttribute("onclick", "");
        }
      }

      isAWinner = true;
      results();
      return true;
    };
    isContained(some, currentPlayer);
  }

  if (isAWinner === false && xPattern.length + oPattern.length === 9) {
    for (all of allBox) {
      all.classList.remove("hover-o");
      all.classList.remove("hover-x");
      all.setAttribute("onclick", "");
    }
    draw();
  }
}
function pickBox(box) {
  if (!isPlayerTurn) {
    return;
  }
  console.log(isAWinner);
  let pickedBox = document.getElementById(box);
  let img = document.createElement("img");

  if (turn.getAttribute("data-value") === "X") {
    img.src = "./assets/icon-x.svg";
    img.setAttribute("class", "boxPlayed");
    pickedBox.appendChild(img);
    pickedBox.classList.remove("hover-x");
    pickedBox.setAttribute("data-value", "X");
    pickedBox.setAttribute("onclick", "");
    turn.setAttribute("data-value", "O");
    console.log(pickedBox);
    turn.src = "./assets/icon-o.svg";
    xPattern.push(parseInt(pickedBox.id, 10));
    xPattern.sort();

    if (btnX.classList.contains("svg-fill")) {
      origBoard.splice(
        parseInt(pickedBox.id, 10),
        1,
        (parseInt(pickedBox.id, 10), huPlayer)
      );
    } else {
      origBoard.splice(
        parseInt(pickedBox.id, 10),
        1,
        (parseInt(pickedBox.id, 10), aiPlayer)
      );
    }
    for (empty of allBox) {
      if (empty.getAttribute("data-value") === "") {
        empty.classList.add("hover-o");
        empty.classList.remove("hover-x");
      }
    }
    checkWin(xPattern);
  } else {
    img.src = "./assets/icon-o.svg";
    img.setAttribute("class", "boxPlayed");
    pickedBox.appendChild(img);
    pickedBox.classList.remove("hover-o");
    console.log(pickedBox);
    pickedBox.setAttribute("data-value", "O");
    pickedBox.setAttribute("onclick", "");
    turn.setAttribute("data-value", "X");
    turn.src = "./assets/icon-x.svg";
    oPattern.push(parseInt(pickedBox.id, 10));
    oPattern.sort();

    if (btnO.classList.contains("svg-fill")) {
      origBoard.splice(
        parseInt(pickedBox.id, 10),
        1,
        (parseInt(pickedBox.id, 10), huPlayer)
      );
    } else {
      origBoard.splice(
        parseInt(pickedBox.id, 10),
        1,
        (parseInt(pickedBox.id, 10), aiPlayer)
      );
    }
    for (empty of allBox) {
      if (empty.getAttribute("data-value") === "") {
        empty.classList.add("hover-x");
        empty.classList.remove("hover-o");
      }
    }
    checkWin(oPattern);
  }
  if (cpuBtn.getAttribute("data-value") === "active") {
    cpuTurn();
  }
}

async function cpuTurn() {
  if (btnX.classList.contains("svg-fill")) {
    const promise = new Promise((resolve, reject) => {
      if (turn.getAttribute("data-value") === "O") {
        box0.setAttribute("onclick", "");
        box1.setAttribute("onclick", "");
        box2.setAttribute("onclick", "");
        box3.setAttribute("onclick", "");
        box4.setAttribute("onclick", "");
        box5.setAttribute("onclick", "");
        box6.setAttribute("onclick", "");
        box7.setAttribute("onclick", "");
        box8.setAttribute("onclick", "");
        resolve();
      }
      if (winnerX === true) {
        reject();
      }
    });
    await promise;

    setTimeout(cpuPlay, 800);
  }

  if (btnO.classList.contains("svg-fill")) {
    const promise = new Promise((resolve) => {
      if (turn.getAttribute("data-value") === "X") {
        box0.setAttribute("onclick", "");
        box1.setAttribute("onclick", "");
        box2.setAttribute("onclick", "");
        box3.setAttribute("onclick", "");
        box4.setAttribute("onclick", "");
        box5.setAttribute("onclick", "");
        box6.setAttribute("onclick", "");
        box7.setAttribute("onclick", "");
        box8.setAttribute("onclick", "");

        resolve();
      }
      if (winnerO === true) {
        reject();
      }
    });
    await promise;
    setTimeout(cpuPlay, 800);
  }
}

function bestMove() {
  return minimax(origBoard, aiPlayer).index;
}
function cpuPlay() {
  pickBox(bestMove());

  box0.setAttribute("onclick", "pickBox('0')");
  box1.setAttribute("onclick", "pickBox('1')");
  box2.setAttribute("onclick", "pickBox('2')");
  box3.setAttribute("onclick", "pickBox('3')");
  box4.setAttribute("onclick", "pickBox('4')");
  box5.setAttribute("onclick", "pickBox('5')");
  box6.setAttribute("onclick", "pickBox('6')");
  box7.setAttribute("onclick", "pickBox('7')");
  box8.setAttribute("onclick", "pickBox('8')");
}

function results() {
  modal.style.display = "block";
  endGame.style.display = "flex";
  restartingGame.style.display = "none";
  if (turn.getAttribute("data-value") === "O") {
    winnerName.style.display = "block";

    if (playerBtn.getAttribute("data-value") === "active") {
      if (btnX.classList.contains("svg-fill")) {
        winnerName.innerHTML = "Player 1 wins";
      }
      if (btnO.classList.contains("svg-fill")) {
        winnerName.innerHTML = "Player 1 wins";
      }
    }
    if (cpuBtn.getAttribute("data-value") === "active") {
      if (btnX.classList.contains("svg-fill")) {
        winnerName.innerHTML = "You won!";
      }
      if (btnO.classList.contains("svg-fill")) {
        winnerName.innerHTML = "Oh no,you lost...";
      }
    }
    winnerMark.src = "./assets/icon-x.svg";
    winnerMark.style.display = "initial";
    winnerTakes.style = "color: hsl( var(--clr-lightBlue) )";
    winnerTakes.innerText = "takes the round";
    xScore.innerHTML++;
    winnerX = true;
    winnerName.style.display = "initial";
  } else {
    if (playerBtn.getAttribute("data-value") === "active") {
      if (btnO.classList.contains("svg-fill")) {
        winnerName.innerHTML = "Player 2 wins!";
      }
      if (btnX.classList.contains("svg-fill")) {
        winnerName.innerHTML = "Player 2 wins!";
      }
    }
    if (cpuBtn.getAttribute("data-value") === "active") {
      if (btnO.classList.contains("svg-fill")) {
        winnerName.innerHTML = "You won!";
      }
      if (btnX.classList.contains("svg-fill")) {
        winnerName.innerHTML = "Oh no, you lost...";
      }
    }
    winnerMark.src = "./assets/icon-o.svg";
    winnerMark.style.display = "initial";
    winnerTakes.style = "color: hsl( var(--clr-orange) );";
    winnerTakes.innerHTML = "takes the round";
    oScore.innerHTML++;
    winnerO = true;
  }
}

function draw() {
  modal.style.display = "initial";
  endGame.style.display = "flex";
  restartingGame.style.display = "none";
  winnerMark.style.display = "none";
  winnerTakes.innerHTML = "round tied";
  winnerTakes.style = "color: hsl( var(--clr-silver) );";
  winnerName.style.display = "none";
  drawScore.innerHTML++;
}
function nextRound() {
  isAWinner = false;
  let boxPlayed = document.querySelectorAll(".boxPlayed");
  modal.style.display = "none";
  endGame.style.display = "none";
  restartingGame.style.display = "none";
  for (all of boxPlayed) {
    all.parentNode.removeChild(all);
  }
  for (all of allBox) {
    all.setAttribute("data-value", "");
    all.classList.add("hover-x");
  }
  turn.setAttribute("data-value", "X");
  turn.src = "./assets/icon-x.svg";
  box0.setAttribute("onclick", "pickBox('0')");
  box1.setAttribute("onclick", "pickBox('1')");
  box2.setAttribute("onclick", "pickBox('2')");
  box3.setAttribute("onclick", "pickBox('3')");
  box4.setAttribute("onclick", "pickBox('4')");
  box5.setAttribute("onclick", "pickBox('5')");
  box6.setAttribute("onclick", "pickBox('6')");
  box7.setAttribute("onclick", "pickBox('7')");
  box8.setAttribute("onclick", "pickBox('8')");
  xPattern = [];
  oPattern = [];
  origBoard = Array.from(Array(9).keys());
  cpuTurn();
}
function restart() {
  modal.style.display = "initial";
  endGame.style.display = "none";
  restartingGame.style.display = "flex";
}

function cancelReset() {
  modal.style.display = "none";
}

function emptySquares() {
  return origBoard.filter((s) => typeof s == "number");
}
function checkWinner(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winningCombo.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}
function minimax(newBoard, player) {
  let availSpots = emptySquares();

  if (checkWinner(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWinner(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  let moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      let result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  let bestMove;
  if (player === aiPlayer) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
