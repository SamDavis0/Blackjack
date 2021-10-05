let deal = document.querySelector('#deal-button')
let hit = document.querySelector('#hit-button')
let stand = document.querySelector('#stand-button')
let dHand = document.querySelector('#dealer-hand')
let pHand = document.querySelector('#player-hand')
let dPoints = document.querySelector('#dealer-points')
let pPoints = document.querySelector('#player-points')
let playerBust = document.querySelector('#player-bust')

let restart = document.querySelector('#restart-button')

var suits = ['clubs','diamonds','hearts','spades']
var ranks = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace']
var deck = []
var playerCards = []
var dealerCards = []
var dealerScore = 0
var playerScore = 0


let gameStart = false
let gameOver = false

//CREATE DECK
function createDeck(){
  for(var suitCount = 0; suitCount < suits.length; suitCount ++){
    for(var rankCount = 0; rankCount < ranks.length; rankCount ++){
      var cardVal = parseInt(ranks[rankCount])
      if (ranks[rankCount] == "jack" || ranks[rankCount] == "queen" || ranks[rankCount] == "king")
        cardVal = 10
      if(ranks[rankCount] == "ace")
        cardVal = 11

      var card = {Rank: ranks[rankCount], Suit: suits[suitCount], Value: cardVal, imgSrc: `images/${ranks[rankCount]}_of_${suits[suitCount]}.png` }
      deck.push(card)     
  }
}
return deck
}

function removeImage(id) {
  var img = document.getElementById(id);
  img.parentNode.removeChild(img);
}


// STARTS THE GAME
deal.addEventListener('click', function() {
  gameStart = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  startGame();
  showStatus();
  checkEndGame()
  console.log(deck);
  
})

// DEALS 2 CARDS TO EACH PLAYER
function startGame(){
  drawRandom(deck, "player");
  drawRandom(deck, "player");
  drawRandom(deck, "dealer");
  drawRandom(deck, "dealer");
  
  showStatus();
}

// HIT BUTTON
hit.addEventListener('click', function(){
  drawRandom(deck, "player");
  
  showStatus();
  checkEndGame();
  console.log(deck);
})


// STAND BUTTON
stand.addEventListener('click', function(){
  while(dealerScore <= 16){
    showStatus()
    drawRandom(deck, "dealer");
    showStatus()
  }
  
  showStatus();
  gameOver = true
  checkEndGame();
})


// DRAW RANDOM CARD
function drawRandom(deck, hand){
  let img = document.createElement('img')
  dealtCard = deck.pop()

  img.src = dealtCard.imgSrc
  img.append(dealtCard.imgSrc)
  if(hand == "player"){
    pHand.append(img)
    playerCards.push(dealtCard)
  }
  if(hand == "dealer"){
    dHand.append(img)
    dealerCards.push(dealtCard)
  }
  return dealtCard
}

// UPDATES POINTS
function showStatus(){
  updateScores();
}
function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
  pPoints.innerHTML = `${playerScore}`
  dPoints.innerHTML = `${dealerScore}`
  
}

function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for(let i=0; i<cardArray.length; i++){
    let card = cardArray[i];
    score += card.Value;
    // if(card.Rank == "ace"){
    //   hasAce = true;
    // }
    // if(hasAce && score-10<=21){
    //   return playerScore-10;
    // }
  }
  
  return score; 
}
// SHUFFLE DECK
function shuffleDeck(deck){
  for(let i = 0; i < deck.length; i++){
    let swapIdx = Math.trunc(Math.random() *deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp; 
  }
}

//CHECK END GAME
function checkEndGame(){
  updateScores();
  if(gameOver){
    if(dealerScore<playerScore && playerScore <=21 && dealerScore <=21){
      showStatus()
      setTimeout(function(){ alert("YOU WIN!"); }, 100);
      
    }
    if(dealerScore>playerScore && playerScore <=21 && dealerScore <=21){
      showStatus()
      setTimeout(function(){ alert("YOU LOSE!"); }, 100);
      
    }
  }
    if(playerScore == 21){
      showStatus()
      setTimeout(function(){ alert("BLACKJACK!!!"); }, 100);
    }
    if(dealerScore == 21){
      showStatus()
      setTimeout(function(){ alert("DEALER BLACKJACK! YOU LOSE!"); }, 100);
    }
    if(playerScore >= 16 == dealerScore){
      showStatus()
      setTimeout(function(){ alert("TIE!"); }, 100);
    }
    if(playerScore>21){
      playerWon=false;
      gameOver = true;
      showStatus()
      setTimeout(function(){ alert("BUST!"); }, 100);
    }
    else if(dealerScore>21){
      playerWon = true;
      gameOver = true;
      showStatus()
      setTimeout(function(){ alert("DEALER BUST! YOU WIN!"); }, 100);
    } 
    else if(gameOver){
      if(playerScore>dealerScore){
        playerWon = true;
      }
      else{
        playerWon = false;
      }
    }
}







































