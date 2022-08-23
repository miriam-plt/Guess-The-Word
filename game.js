const inputs = document.querySelector('.inputs');
const guessLeft = document.querySelector('.guess-left span');
const wrongLetter = document.querySelector('.wrong-letter span');
const resetBtn = document.querySelector('.reset-btn');
const typingInput = document.querySelector('.typing-input');

let word;
let incorrectLetters = [];



// function to get a random word
function randomWord() {
  let random = wordList[Math.floor(Math.random() * wordList.length)]; // <- to get a random object
  word = random.word; // <- to get a word from the object
  // word = word.replace(/\s/g, "-"); // to get spaces when multiple words
  
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



function play(letter) {
  let key = letter.target.value;
  // to allow typing only letters
  if (key.match(/^[A-Za-z]+$/)) {
    // if the letter is in word show all matching letters
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          inputs.querySelectorAll('input')[i].value = key;
        }
      }
    } else {
      incorrectLetters.push(` ${key}`);
    }
  }
  
  wrongLetter.innerText = incorrectLetters; //
  typingInput.value = ""; // to clear the input after typing
}

// the reset button gets a new word
resetBtn.addEventListener('click', randomWord);
// the input activate the game function
typingInput.addEventListener('input', play);
// the input gets the letter typed
document.addEventListener('keydown', () => typingInput.focus());





// function to give a limited amount of guesses depending on word length

// winning game - with gif

// losing game - with gif 

