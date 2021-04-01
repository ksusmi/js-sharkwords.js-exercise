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
const createDivsForChars = word => {
  // Replace this with your code
  const wordContainer = document.querySelector('#word-container');

  for (const letter of word) {
    //because of the loop, this is essentially a new div each time
    const letterDiv = document.createElement('div');
    letterDiv.className = `letter-box ${letter}`;
    wordContainer.appendChild(letterDiv);
    }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  // Replace this with your code
  const letterButtonDiv = document.querySelector('#letter-buttons');
  for (const letter of ALPHABET) {
    //because of the loop, this is essentially a new button each time
    const letterButton = document.createElement('button');
    letterButton.textContent = letter;
    //Or:
    //letterButton.appendChild(document.createTextNode(letter));
    letterButtonDiv.appendChild(letterButton);
  }
};

const checkWin = word => {
  console.log(word);
  if(document.querySelector('#word-container').textContent === word){
    alert("You won!");
    resetGame();
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = buttonEl => {
  //you don't need to transform this into a jQuery element because no jQuery
  buttonEl.setAttribute('disabled', true);
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  // Replace this with your code
  const letterDiv = document.querySelector(`div.${letter}`);
  return letterDiv !== null;
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  // Replace this with your code
  const letterDivs = document.querySelectorAll(`div.${letter}`);
  for(const letterDiv of letterDivs){
    letterDiv.textContent = letter;
  }
  /*
  letterDivs.forEach((letterDiv) => {
    letterDiv.textContent = letter;
  });
  */
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  numWrong += 1;
  const sharkImage = document.querySelector('img');
  sharkImage.src = `/static/images/guess${numWrong}.png`;
  //Or:
  //sharkImg.setAttribute('src', `/static/images/guess${numWrong}.png`);
  if(numWrong === 5){
    const letterButtons = document.querySelectorAll('button');
    for(const letterButton of letterButtons){
      letterButton.disabled = true;
      //Or:
      //letterButton.setAttribute('disabled', true);
    }
    document.querySelector('#play-again').style.display = 'block';
  }
};

//  Reset game state. Called before restarting the game.
//

const removeChildNodes = parent => {
  //note, from here: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
  /*the while loop will run until the parent node has no more children
  So for example:
  <div>
    <button>a</button>
    <button>b</button>
    <button>c</button>
  </div>
  The div is the parent. The buttons are the children. 
  On the first time through the loop, the a button is the first child
  On the second time, it's the b button because the a button was removed
  On the third time, it's the c button, which is then removed
  Once it finds no more child nodes, it will stop
  (Link also has explanation of this)
  */
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
const resetGame = () => {
 // window.location = '/sharkwords';
 document.querySelector('#play-again').style.display = 'none';
 const wordContainer = document.querySelector('#word-container');
 const letterButtonsDiv = document.querySelector('#letter-buttons');
 removeChildNodes(wordContainer);
 removeChildNodes(letterButtonsDiv);
 numWrong = 0;
 const sharkImage = document.querySelector('img');
 sharkImage.src = `/static/images/guess${numWrong}.png`;
 startGame();
};

// This is like if __name__ == '__main__' in Python
//
function startGame() {
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      const clickedBtn = evt.target;
      disableLetterButton(clickedBtn);

      /*This is what was originally here:
      const letter = clickedBtn.innerHTML;
      I changed it because innerHTML can be 
      dangerous and should only be used when absolutely necessary.
      We only need the text here, so it's not necessary
      */
     /*
      Note: innerText is the visible text of an element
      textContent is all the text, including text that is inside 
      an element not currently displayed
     */
      const letter = clickedBtn.innerText; //or .textContent
      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter);
      } else {
        handleWrongGuess(letter);
      }
    });
  });

  document.querySelector('#play-again').addEventListener('click', () => {
    resetGame();
  });
}

startGame();