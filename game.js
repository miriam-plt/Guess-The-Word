const inputs = document.querySelector('.inputs');
const guessLeft = document.querySelector('.guess-left span');
const wrongLetter = document.querySelector('.wrong-letter span');
const resetBtn = document.querySelector('.reset-btn');
const typingInput = document.querySelector('.typing-input');
const popupBtn = document.querySelector('.popup-btn');
const closeBtn = document.querySelector('.close-btn');
const closeLoseBtn = document.querySelector('.lose-close-btn');
const closeWinBtn = document.querySelector('.win-close-btn');
const hintPop = document.querySelector('.popup h2');



let word;
let incorrectLetters = [];
let correctLetters= [];
let maxGuesses = [];




// function to get a random word
function randomWord() {
  let random = wordList[Math.floor(Math.random() * wordList.length)]; // <- to get a random object
  word = random.word; // <- to get a word from the object
  hint = random.hint;
  // word = word.replace(/\s/g, "-"); // to get spaces when multiple words
  // change the limited amount of guesses depending on word length
  if (word.length <= 7) {
    maxGuesses = 6;
  } else if (word.length <= 10) {
    maxGuesses = 8;
  } else if ((word.length > 10) && (word.length <= 14)) {
    maxGuesses = 10
  } else if ((word.length > 14)) {
    maxGuesses = 12
  }

  hintPop.innerText = hint;
  
  incorrectLetters = []; 
  correctLetters= [];
  
  guessLeft.innerHTML = maxGuesses;
  wrongLetter.innerText = incorrectLetters;
  
  // function to print the letters square
  let htmlWord = '';
  for (let i = 0; i < word.length; i++) {
      if (word[i] === ' ') {
       htmlWord += '<input type="text" style="background-color:#B5B5B5;">'
      } else if (word[i] !== ' ') {
        htmlWord += '<input type="text">';
      }  
    }
  inputs.innerHTML = htmlWord;   
  console.log(word)
  console.log(hint)
}

randomWord(); // starts the game when you load the page


// function to play by typing letters
function play(letter) {
  let key = letter.target.value;
  // to allow typing only letters && check if the wrong&right letter was already typed 
  if ((key.match(/^[A-Za-z]+$/)) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
    // if the letter is in word show all matching letters
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correctLetters += key;
          inputs.querySelectorAll('input')[i].value = key;
        }
      }
    } else {
      maxGuesses--;
      incorrectLetters.push(` ${key}`);
    }
  }
  guessLeft.innerHTML = maxGuesses;
  wrongLetter.innerText = incorrectLetters; 
  typingInput.value = ''; // to clear the input after typing

  

  // winning and losing options
  if (word.includes(' ') && correctLetters.length === word.length -1) {
    console.log("YOU WON")
    // throw a winning message with delay
    win();
  } else if (correctLetters.length === word.length) {
    console.log("YOU WON")
    // throw a winning message with delay
    win();
  } else if (maxGuesses < 1){
    console.log('GAME OVER')
    // show all letters in the input
    for (let i = 0; i < word.length; i++) {
      inputs.querySelectorAll('input')[i].value = word[i];  
    }
    // throw a game over message with delay
    lose();

  }
}

// hint button that returns a pop-up message
let pop = document.querySelector('.popup');
let popLose = document.querySelector('.popup-lose');
let popWin = document.querySelector('.popup-win')

function lose() {
  popLose.classList.add('open-popup');
}

function win() {
  popWin.classList.add('open-popup');
}

function openPopup() {
  pop.classList.add('open-popup');
}

function closePopup() {
  pop.classList.remove('open-popup');
  popLose.classList.remove('open-popup');
  popWin.classList.remove('open-popup');
}



// the reset button gets a new word
resetBtn.addEventListener('click', randomWord);
// the input activate the game function
typingInput.addEventListener('input', play);
// the input gets the letter typed
document.addEventListener('keydown', () => typingInput.focus());
// hint button that returns a pop-up message
popupBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
closeLoseBtn.addEventListener('click', closePopup);
closeWinBtn.addEventListener('click', closePopup);




