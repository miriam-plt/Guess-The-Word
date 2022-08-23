const inputs = document.querySelector('.inputs');
const guessLeft = document.querySelector('.guess-left span');
const wrongLetter = document.querySelector('.wrong-letter span');
const resetBtn = document.querySelector('.reset-btn');
const typingInput = document.querySelector('.typing-input');

let word;
let incorrectLetters = [];
let correctLetters= [];
let maxGuesses = [];


// function to get a random word
function randomWord() {
  let random = wordList[Math.floor(Math.random() * wordList.length)]; // <- to get a random object
  word = random.word; // <- to get a word from the object
  // word = word.replace(/\s/g, "-"); // to get spaces when multiple words
  maxGuesses = 8; // change the limited amount of guesses depending on word length!!
  incorrectLetters = []; 
  correctLetters= [];

  guessLeft.innerHTML = maxGuesses;
  wrongLetter.innerText = incorrectLetters;
  
  let htmlWord = '';
  for (let i = 0; i < word.length; i++) {
      if (word[i] === '-') {
      // htmlWord += '<div><br><p>&nbsp;&nbsp;&nbsp;&nbsp;</p></div>';
       htmlWord += '<input type="text" style="background-color:#B5B5B5;">'
      } else if (word[i] !== '_') {
        htmlWord += '<input type="text">';
      }  
    }
  inputs.innerHTML = htmlWord;   
  console.log(word)
  console.log(htmlWord)
}

randomWord(); // change this with a start button that returns this function?



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
  wrongLetter.innerText = incorrectLetters; //
  typingInput.value = ''; // to clear the input after typing

  if (correctLetters.length === word.length -1) {
    console.log("YOU WON")
  } else if (maxGuesses < 1){
    console.log('GAME OVER')
    // show all letters in the input
    // throw a game over message
  }
}

// the reset button gets a new word
resetBtn.addEventListener('click', randomWord);
// the input activate the game function
typingInput.addEventListener('input', play);
// the input gets the letter typed
document.addEventListener('keydown', () => typingInput.focus());




// TO-DO
// hint button that returns a pop-up message
// start button
// winning game - with gif
// losing game - with gif 

