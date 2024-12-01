const board = document.querySelector("#board");
const reinicio = document.querySelector("#restart");
const boardItem = document.querySelectorAll(".board_item");
const turnPlayer = document.querySelector('.turn')
let currentPlayer = "player";
const modal = document.querySelector(".modal");
const quit = document.querySelector('#quit')
const score = document.querySelector('#score')
const score2 = document.querySelector('#score2')
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
    gameStart = false
    updateItem(item, index, player)
    if (!winner()) {
      currentPlayer = "cpu";
      randomItem()
    }
  }
}
function updateItem(item, index, turnPlayer) {
  item.innerHTML = turnPlayer
  inputCells[index] = turnPlayer
  turn(turnPlayer)
}

/* function changePlayer() {
  player = player === `<svg class="icon cross">
  <use  xlink:href="./icons/icon-x.svg#icon-x"></use>
  </svg>`? o : `<svg class="icon cross">
  <use  xlink:href="./icons/icon-x.svg#icon-x"></use>
  </svg>`;

} */
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
  }, 300)

}

function winner() {
  for (let i = 0; i < windCondition.length; i++) {
    let [a,b,c] = windCondition[i]
    if ( inputCells[a] !== "" && inputCells[a] === inputCells[b] && inputCells[b] === inputCells[c] ) {
      ganadorModal(inputCells[a])
    }
  }
 /*  windCondition.forEach((element) => {
    let [a, b, c] = element
    if ( inputCells[a] !== "" && inputCells[a] === inputCells[b] && inputCells[b] === inputCells[c] ) {
      ganadorModal(inputCells[a])
      
      return true
    }
  }) */
}

function limpiarTablero() {
  pauseGame = false
  gameStart = false
  boardItem.forEach((element) => {
    element.innerHTML = ""
  })
}
function ganadorModal(turnPlayer) {
  modal.style = " display:block !important;"
  nextRoundGame(turnPlayer)
  if (turnPlayer === player) {
    document.querySelector('#winner').innerHTML = `<use xlink:href="./icons/icon-x.svg#icon-x"></use>`
  } else if (turnPlayer === o) {
    document.querySelector('#winner').innerHTML = `<use class="icon circle" xlink:href="./icons/icon-o.svg#icon-o"></use>`

  }
  
}

function quitModal() {
  
  modal.style = "display:none !important;"
  limpiarTablero()
}
function nextRoundQuitModal() {
  modal.style = "display:none !important;"
  nextRoundGame()
  limpiarTablero()
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

function nextRoundGame(turnPlayer) {
  if (turnPlayer === player) {
    score.textContent = parseInt(score.textContent) + 1
  } else if (turnPlayer === o) {
    score2.textContent = parseInt(score2.textContent) + 1
  }
}

limpiarTablero()
reinicio.addEventListener('click', limpiarTablero)
quit.addEventListener('click', quitModal)
nextRound.addEventListener('click', nextRoundQuitModal) 