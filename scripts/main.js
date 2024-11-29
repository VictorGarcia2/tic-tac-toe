const board = document.querySelector("#board");
const reinicio = document.querySelector("#restart");
const boardItem = document.querySelectorAll(".board_item");
let jugadorActual = true;
const turnPlayer = document.querySelector('.turn')
const score = document.querySelector('#score')
const score2 = document.querySelector('#score2')
let x = `<svg class="icon cross">
<use xlink:href="./icons/icon-x.svg#icon-x"></use>
</svg>`;

let o = ` <svg class="icon circle">
<use  xlink:href="./icons/icon-o.svg#icon-o"></use>
</svg>`;

for (let i = 0; i < boardItem.length; i++) {
  boardItem[i].addEventListener("click", boardtTable);
}
function boardtTable(e) {
  let clickAction = e.target.innerHTML;
  if (!clickAction.length) {
    e.target.innerHTML = jugadorActual ? x : o;
    jugadorActual = !jugadorActual;
    turn(jugadorActual)
    
    ganadorBoard(0, 1, 2, jugadorActual);
    ganadorBoard(3, 4, 5, jugadorActual);
    ganadorBoard(6, 7, 8, jugadorActual);
    ganadorBoard(0, 3, 6, jugadorActual);
    ganadorBoard(1, 4, 7, jugadorActual);
    ganadorBoard(2, 5, 8, jugadorActual);
    ganadorBoard(0, 4, 8, jugadorActual);
    ganadorBoard(2, 4, 6, jugadorActual);
  }
}
function ganadorBoard(celda1, celda2, celda3, jugadorActual) {
  
  if (boardItem[celda1].innerHTML.length &&
    boardItem[celda1].innerHTML === boardItem[celda2].innerHTML &&
     boardItem[celda2].innerHTML === boardItem[celda3].innerHTML) {
       ganadorModal(jugadorActual)
       nextRoundGame(jugadorActual)
    }
      
}
 function limpiarTablero() {
  boardItem.forEach((element) => {
      element.innerHTML = ""
  })
}
const modal = document.querySelector(".modal");
const quit = document.querySelector('#quit')

function ganadorModal(value) {
  modal.style = " display:block !important;"
  if(value === false){
    document.querySelector('#winner').innerHTML = `<use xlink:href="./icons/icon-x.svg#icon-x"></use>`
  } else { 
    document.querySelector('#winner').innerHTML = `<use class="icon circle" xlink:href="./icons/icon-o.svg#icon-o"></use>`
  }
}
function quitModal() {
  modal.style = "display:none !important;"
  score.textContent = 0
core2.textContent = 0
  limpiarTablero()
  
}
function nextGame() {
  modal.style = "display:none !important;"
  nextRoundGame()
}

function turn(value){
  if(value === false){
    turnPlayer.innerHTML = ` <svg class="icon">
          <use xlink:href="./icons/icon-o.svg#icon-o"></use>
        </svg><span>TURN</span>`
  } else { 
    turnPlayer.innerHTML = ` <svg class="icon">
          <use xlink:href="./icons/icon-x.svg#icon-x"></use>
        </svg> <span>TURN</span>`
  }
}
const nextRound = document.querySelector('#nextRound')
function nextRoundGame(value){
  if(value === false){
   score.textContent = 1  
  } else { 
    score2.textContent = 1
  }
}
turn()
limpiarTablero()
reinicio.addEventListener('click', limpiarTablero)
quit.addEventListener('click', quitModal)
nextRound.addEventListener('click', nextGame)