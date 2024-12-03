const board = document.querySelector("#board");
const reinicio = document.querySelector("#restart");
const boardItem = document.querySelectorAll(".board_item");
const turnPlayer = document.querySelector('.turn')
let currentPlayer = "player";
const modal = document.querySelector(".modal");
const modalTie = document.querySelector(".modal-tie");
const quit = document.querySelector('#quit')
const scoreBoardX = document.querySelector('#score-board-x')
const scoreBoardO = document.querySelector('#score-board-o')
const scoreBoardTie = document.querySelector('#score-board-tie')
const nextRound = document.querySelector('#nextRound')
let player = `<svg class="icon cross">
<use  xlink:href="./icons/icon-x.svg#icon-x"></use>
</svg>`;
let o = ` <svg class="icon circle">
<use  xlink:href="./icons/icon-o.svg#icon-o"></use>
</svg>`;

let pauseGame = false
let gameStart = false

const inputCells = ['', '', '', '', '', '', '', '', '',]

const windCondition = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

boardItem.forEach((item, index) => {
  item.addEventListener('click', () => {
    if(currentPlayer === "player")
    tapItem(item, index)

  })
})
function tapItem(item, index) {
  if (item.innerHTML === "" && !pauseGame) {
    gameStart = true
    updateItem(item, index, player)
    if (!winner()) {
      currentPlayer = "compu";
      randomItem()
    }
  }
}
function updateItem(item, index, turnPlayer) {
  item.innerHTML = turnPlayer
  inputCells[index] = turnPlayer
  turn(turnPlayer)

}
function randomItem() {
  pauseGame = true
  let cpuClick;
  setTimeout(() => {
    do {
      cpuClick = Math.floor(Math.random() * inputCells.length)
    } while (inputCells[cpuClick] !== "");
    updateItem(boardItem[cpuClick], cpuClick, o)
    if (!winner()) {
      currentPlayer = "player";
    }
    pauseGame = false
  }, 400)

}

function winner() {
  for (let i = 0; i < windCondition.length; i++) {
    let [a,b,c] = windCondition[i]
    
    if ( inputCells[a] !== "" && inputCells[a] === inputCells[b] && inputCells[b] === inputCells[c] ) {
      ganadorModal(inputCells[a])
     
      return true
    } 
  }
  if (inputCells.every(cell => cell !== '')) {
    scoreBoard()
    return true;
}
}

function limpiarTablero() {
  boardItem.forEach((element) => {
    element.innerHTML = ""
  })
  inputCells.fill('') 
  pauseGame = false
  gameStart = false
}
function ganadorModal(turnPlayer) {
  modal.style = " display:block !important; display:flex !important; align-items:center !important;"
  currentPlayer = "player"; 
  nextRoundGame(turnPlayer)
  if (turnPlayer === player) {
    document.querySelector('#winner').innerHTML = `<use xlink:href="./icons/icon-x.svg#icon-x"></use>`
  } else if (turnPlayer === o) {
    document.querySelector('#winner').innerHTML = `<use class="icon circle" xlink:href="./icons/icon-o.svg#icon-o"></use>`
  }
  
}
function nextRoundQuitModal() {
  modal.style = "display:none !important;"
  limpiarTablero()
  nextRoundGame()
}

function turn(value) {
  if (value === player) {
    turnPlayer.innerHTML = ` <svg class="icon">
          <use xlink:href="./icons/icon-o.svg#icon-o"></use>
        </svg><span>TURN</span>`
  } else {
    turnPlayer.innerHTML = ` <svg class="icon">
          <use xlink:href="./icons/icon-x.svg#icon-x"></use>
        </svg> <span>TURN</span>`
  }
}
function scoreBoard() {
  scoreBoardTie.textContent = parseInt(scoreBoardTie.textContent) + 1;
    pauseGame = false
    limpiarTablero()
 
}
function nextRoundGame(turnPlayer) {
  if (turnPlayer === player) {
    scoreBoardX.textContent = parseFloat(scoreBoardX.textContent) + 1
  } else if (turnPlayer === o) {
    scoreBoardO.textContent = parseInt(scoreBoardO.textContent) + 1
  }
}
function quitModal() {
  modal.style = "display:none !important; "
  limpiarTablero()
  inputCells.fill('')
  scoreBoardX.textContent = 0
  scoreBoardO.textContent = 0
  pauseGame = false
  gameStart = false
}
reinicio.addEventListener('click', limpiarTablero)
quit.addEventListener('click', quitModal)
nextRound.addEventListener('click', nextRoundQuitModal) 
