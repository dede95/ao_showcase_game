// Words for the game 
let items = [
    "KEYBOARD",
    "SUNFLOWER",
    "GUITAR",
    "MOUNTAIN",
    "PENCIL"
];

// DOM elements
const startButton = document.getElementById('start-btn');
const introToGameButton = document.getElementById('pregame-btn');
const tryAgainButton = document.getElementById('restart-btn');
const optionsContainer = document.getElementById('options-container');
const messageDisplay = document.getElementById('intro');
const messageDisplayGame = document.getElementById('game-text');
const messageDisplayGuess = document.getElementById('guess-status');
const heartsDisplay = document.getElementsByClassName('hearts');
const getHearts = [
    document.getElementById('heart1'), 
    document.getElementById('heart2'),
    document.getElementById('heart3')
];

let isTyping = false;
let typingSpeed = 30; // Set the desired typing speed (ms)

// Game vars 
let selectedWord = "CORN";
let itemOptions = [];
let round = 3;
let hearts = 3;


function type(text, i, t, oe, callback) {
    if (i === 0) {
        if (isTyping) return; // Prevent re-triggering if already typing
        isTyping = true; // Set the flag
        document.getElementById(oe).innerHTML = ""; // Clear output before typing starts
    }

    const output = document.getElementById(oe); // Where the text will appear
    output.innerHTML += text.charAt(i); // Append the next character

    
    if (i < text.length - 1) {
        // Continue typing the next character
        setTimeout(() => type(text, i + 1, typingSpeed, oe, callback), t);
    } else {
        isTyping = false; // Reset flag after typing completes
        if (typeof callback === 'function') callback(); // Call the callback if provided
    }
}


function startGame() {
    
    messageDisplay.textContent = "";
    // messageDisplay.style.visibility = "hidden"
    startButton.style.display = 'block';
    introToGameButton.style.display = 'none';
    if (heartsDisplay) {
        for (let x = 0; x < heartsDisplay.length; x++) {
            heartsDisplay[x].style.visibility = "hidden";
        }
      }

}

function introScreen() {
    // Landing page for the game
    const introText = `Some aliens have attacked Earth! 
    After they’ve looted the earth and zapped 99% of the population, they spared you for some reason. 🤔 
    They offer you a lift to their galaxy - however, they only want to take certain items based on a special rule.
    
    Can you offer an item to bring along with you?`;
    startButton.style.display = 'none';
    tryAgainButton.style.display = 'none';  // Hide Try Again button
    optionsContainer.style.display = 'none'; // Hide options (buttons)

    type(introText, 0, 100, "intro", () => {
        introToGameButton.style.display = 'block'; // Show the button when typing is complete
    });

}

function loadGame(){

    messageDisplay.textContent = "";
    // messageDisplayGame.textContent 
    const gameText = "'👽BleepBoopBlurghBahh👽 - We are taking a JACKET, APPLE, VASE, ANT and SUNGLASSES. If you don't want us to zap you 🔫, please bring us an item we will like...' Can you bring them a good item? "
    introToGameButton.style.display = 'none';
    // messageDisplay.textContent = ""
    // generate words, including correct word
    // livesDisplay.textContent = '❤️❤️❤️'
    // Hearts are visible again
    
    if (heartsDisplay) {
        for (let i = 0; i < getHearts.length; i++) {
            getHearts[i].style.visibility = "visible" ;
        }
      }
      type(gameText, 0, 100, "intro", () => {
        // introToGameButton.style.display = 'block'; // Show the button when typing is complete
        generateOption(selectedWord); 
        createButtons();
    });
    // Generate words, including the correct word
    
}

function generateOption(correctWord) {
    itemOptions = [correctWord];
    while (itemOptions.length < 6) {
        const randomWord = items[Math.floor(Math.random() * items.length)];
        if (!itemOptions.includes(randomWord)) {
            itemOptions.push(randomWord);
        }
    }
    itemOptions = shuffleArray(itemOptions);
    console.log(itemOptions)
}

// Function to shuffle an array randomly
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createButtons() {
    optionsContainer.innerHTML = ''; 
    itemOptions.forEach(option =>{
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkGuess(option));
        optionsContainer.appendChild(button);
    });
    optionsContainer.style.display = '' ; // Show the options after generating buttons
}

// Function to check if user answered correctly
function checkGuess (selectedOption) {
    if (selectedOption === selectedWord) {
        gameWin()
    } else {
        round -= 1; // reduce round
        hearts -= 1;
        console.log(round);

        // update hearts display 
        if (hearts >= 0) {
            getHearts[hearts].style.visibility = 'hidden';
        }

        messageDisplayGuess.textContent = `Wrong guess! Try again...`;
        messageDisplayGuess.style.color = "red"
        
        if (hearts === 0){
            gameOver();
            //maybe include try again screen after (with button) - resetGame()
        }
    }
}

function gameOver() {
    messageDisplayGuess.textContent = `Game over! Zap!`;
    // put button to try again and rmeove option buttons 
    // resetGame();
    optionsContainer.style.display = 'none';
    // optionsContainer.remove();
    tryAgainButton.style.display = 'block';
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(button => button.disabled = true); // Disable all buttons

}

function gameWin(){
    messageDisplayGuess.textContent = `Congrats! You can board with us 👽`;
    messageDisplayGuess.style.color = "green";
    tryAgainButton.style.display = 'block';
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(button => button.disabled = true);
}

function restartGame() {
    // Reset game variables 
    round = 3;
    hearts = 3;

    // Clear display messages
    messageDisplayGame.textContent = '';
    messageDisplayGuess.textContent = '';
    messageDisplayGuess.style.color = 'black';

    // Reset hearts display
    for (let i = 0; i < getHearts.length; i++) {
        getHearts[i].style.visibility = 'hidden'; // Hide all hearts initially
    }

    //Reset display elements 
    tryAgainButton.style.display = 'none';
    optionsContainer.style.display = 'none';

    // const getHearts = [
    //     document.getElementById('heart1'), 
    //     document.getElementById('heart2'),
    //     document.getElementById('heart3')
    // ];

    introScreen();

}

// Event listener to start intro screen
startButton.addEventListener('click', introScreen);

// Event listener to guess
introToGameButton.addEventListener('click', loadGame);

//Event listener to restart the game 
tryAgainButton.addEventListener('click', restartGame)

// Event listener to start the game
startGame();

