// Setup the home screen and hide it when the new game button is clicked.
const startScreen = document.querySelector('#start');
const newGameButton = document.querySelector('#start .button');
const winScreen = document.querySelector('#finish');
const playAgainButton = document.querySelector('#finish .button');
const message = document.querySelector('.message');
const player1icon = document.querySelector('#player1');
const player2icon = document.querySelector('#player2');
const items = document.querySelector('.boxes');
const boxes = document.querySelectorAll('.box');
// hide the start game screen when clicked
newGameButton.addEventListener('click', () => startScreen.style.display = 'none' );
// hide the win sreen on page load
winScreen.style.display = "none";
// Setup the winning lines
const winning = [
  {line: [1, 2, 3]},
  {line: [4, 5, 6]},
  {line: [7, 8, 9]},
  {line: [1, 4, 7]},
  {line: [2, 5, 8]},
  {line: [3, 6, 9]},
  {line: [1, 5, 9]},
  {line: [3, 5, 7]}
];
// Create player object
function Player(name, marker) {
  this.marker = marker;
  this.isActive = false;
  this.moves = [];
  this.winningClass = `screen-win-${name}`;
  this.icon = document.querySelector(`#player${marker}`);
}
let player1 = new Player('one', '1');
let player2 = new Player('two', '2');
// Set the currentPlayer and moveCount to 0
let currentPlayer = player1;
let moveCount = 0;
// Set player 1 marker to be active to start off with
player1icon.classList.add('active');
// Use event bubbling on the UL element to track click events to help save looping through them each time
items.addEventListener('click', (e) => {
  // check if the player already has that tile selected
  if (player1.moves.includes([...items.children].indexOf(e.target) + 1) || player2.moves.includes([...items.children].indexOf(e.target) + 1)) {
    return;
  }
  // if not add the class for the background
  e.target.classList.add(`box-filled-${currentPlayer.marker}`);
  // then push it into that players array
  currentPlayer.moves.push([...items.children].indexOf(e.target) + 1);
  // increment moveCount
  moveCount++;
  // Once it is in the array then call another function to check if it is the winning combo
  for (let i=0; i<winning.length; i++) {
    let containsAll = winning[i].line.every(i => currentPlayer.moves.includes(i));
    if (containsAll) {
      winScreen.classList.add(currentPlayer.winningClass);
      winScreen.style.display = "block";
      message.innerText = `Player ${currentPlayer.marker} Wins!`;
      return;
    }
  }
  // If 9 moves have been made then it's a Draw Game!
  if (moveCount === 9) {
    message.innerText = 'Draw Game!';
    winScreen.classList.add('screen-win-tie');
    winScreen.style.display = "block";
  }
  // Switch the players, make this clean function passing in the current player
  if (currentPlayer === player1) {
    player1icon.classList.remove('active');
    player2icon.classList.add('active');
    return currentPlayer = player2;
  } else {
    player2icon.classList.remove('active');
    player1icon.classList.add('active');
    return currentPlayer = player1;
  }
});
// Change background on hover
items.addEventListener('mouseover', (e) => {
  if (e.target.className !== "box box-filled-1" && e.target.className !== "box box-filled-2") {
    e.target.classList.add(`box-filled-${currentPlayer.marker}`);
  }
});
// Remove the background if it was not clicked
items.addEventListener('mouseout', (e) => {
  if (!player1.moves.includes([...items.children].indexOf(e.target) + 1) && !player2.moves.includes([...items.children].indexOf(e.target) + 1)) {
    e.target.classList.remove(`box-filled-${currentPlayer.marker}`);
  }
});
// hide win screen, then reset the game state
playAgainButton.addEventListener('click', () => {
  for (let box of boxes) { box.className = 'box'; }
  moveCount = 0;
  player1.moves = [];
  player2.moves = [];
  winScreen.className = 'screen screen-win';
  winScreen.style.display = 'none';
});
