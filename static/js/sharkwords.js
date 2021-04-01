const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  // Replace this with your code
  //for (const letter in word) -- if we use in it gives the indices.
  // if we use of is for each element object 
  for (const letter of word) {

  $('#word-container').append(`<div class="letter-box ${letter}"></div>`);
  }
  

};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  

  for (const letter of ALPHABET) {
    $('#letter-buttons').append(`<button>${letter}</button>`);
  }
};

const checkWin = word => {
  console.log(word);
  if($('#word-container').text() === word){
    alert("You won!");
    resetGame();
  }
}

// Set the `disabled` property of `buttonEl` to `true.
// `buttonEl` is an `HTMLElement` object.
  const disableLetterButton = (buttonEl) => {

    //$(buttonEl).attr('disabled', true); 
    //OR above 1 line or below 2 lines
    const button = $(buttonEl);  // Now `button` is a jQuery object!
  
    // Call a method on `button` to disable the button
    button.attr('disabled', true);
  };


// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  // Replace this with your code
  //this will return an array of divs with that letter as a class
  //it's length could be 0 or 1 or 2...and so on
  // e.g. word is hello, letter is l, length will be 2. word is hello, letter is e, length 1. and for z, length is 0
  const letterDivs = $(`div.${letter}`);

  return letterDivs.length > 0;
  //return $(`div.${letter}`)[0] !== undefined;  //this one line can be replaced by the above 2 lines
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  // Replace this with your code
  const letterDivs = $(`div.${letter}`);
  letterDivs.append(letter);
};


// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  // Replace this with your code
  numWrong += 1;
  $('img').attr('src', `/static/images/guess${numWrong}.png`);
  if(numWrong === 5){
    $('button').attr('disabled', true);
    $('#play-again').show();

  }

};

//  Reset game state. Called before restarting the game.
//
const resetGame = () => {
  //window.location = '/sharkwords';
  $('#play-again').hide();
  $('#word-container').empty();
  $('#letter-buttons').empty();
  numWrong = 0;
  $('img').attr('src', `/static/images/guess0.png`);
  startGame();
};

// This is like if __name__ == '__main__' in Python
// when it was (function startGame() { ..... .... }) like this
//But now I changed this functiona s a normal fn so that i can call startGame() fn in any other function.

function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  generateLetterButtons();
  createDivsForChars(word);

  $('button').on('click', async (evt) => {
    const clickedBtn = $(evt.target);
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();

    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
      //run function that's in the first part after the milliseconds(1000) in the second part
      //we needed this timeout as the checkWin() fn was called before the last letter in the word was displayed.
      // so wanted the fn to wait for as sec so that the letter displays. 
      setTimeout(function(){ checkWin(word); }, 1000);

      //setTimeout (checkWin(), 1000); if we are not passing in the arg 'word' then we can use like this 
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
  });
}

// calling the fn

startGame();