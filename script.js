import toastr from "https://cdn.skypack.dev/toastr@2.1.4";
const memoryCards = document.querySelectorAll('.memory-card');
const resetButton = document.getElementById("stop");
let isTurned = false;
let firstCardTurned;
let secondCardTurned;
let stopBoard = false;
let matchesFound = 0;
const totalMatches = memoryCards.length / 2;

function cardTurn(){
  if(stopBoard){
    return;
  }
  // corner case of double click
  if(this === firstCardTurned){
    return;
  }
  this.classList.add('turn');
  // if isTurned is false, then the user is clicking for the first time
  if(!isTurned){
    
    isTurned=true;
    // this is the element that fired the event, which in this case is the memory card
    firstCardTurned = this;
    
  }
  else{
    // if isTurned is false then it is the second click
    isTurned=false;
    secondCardTurned=this;
    // if it's a match
    if(firstCardTurned.dataset.animal=== secondCardTurned.dataset.animal){
      
      firstCardTurned.removeEventListener('click', cardTurn);
      secondCardTurned.removeEventListener('click', cardTurn);
      reset();
        matchesFound++;
  if(matchesFound === totalMatches){
   toastr.success("Congratulations! You found all matches!");
  }
    }
    else{
      // not a match
      // lock the board
      stopBoard=true;
      
      setTimeout(() => {
      firstCardTurned.classList.remove('turn');
      secondCardTurned.classList.remove('turn');
      // unlock the board
      reset();
      }, 1250);
    }
  
  }
 
}
function shuffleCards() {
  memoryCards.forEach(card => {
    // assigns each card a random number between 0 and 12
    let random_num=Math.floor(Math.random()*12);
    card.style.order = random_num;
    card.dataset.order = random_num;
  });
}

(function shuffle(){
  shuffleCards();
})();


function reset() {
  isTurned = false;
  stopBoard = false;
  firstCardTurned = null;
  secondCardTurned = null;
 
  
}
function tryAgain(){
  memoryCards.forEach(card => {
    // reset the order of each card to its original order
    let originalOrder = card.dataset.order;
    card.style.order = originalOrder;
    card.classList.remove('turn');
    card.addEventListener('click', cardTurn);
  });
  shuffleCards();
  reset();
  
}


// loop through list and attach event listener
// whenever a card is clicked the function cardTurn is executed
memoryCards.forEach(card => card.addEventListener('click', cardTurn));
resetButton.addEventListener('click', tryAgain);