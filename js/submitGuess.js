"use strict"

/**
 * 
 */
function onSubmitGuessEvent() {
    let button = document.querySelector('#submitGuessButton');
    button.addEventListener('click', function(){
        let selectedTds = document.querySelectorAll('.selected');
        let correctGuesses = calculateCorrectGuesses(selectedTds);

        let totalGuesses = selectedTds.length;
        let gameBoardSize = document.querySelector('#boardSize').value;
        let difficulty = Number(document.querySelector('#difficulty').value);
        let playerScore = getScore(correctGuesses, totalGuesses, gameBoardSize, difficulty);
        let playerName = document.querySelector('#name').value;

        let isUserWin = displayUserResult();
        if (isUserWin === true){
            addToLocalStorage(playerName, playerScore);
        }

        // setup.js
        let formElements = document.querySelector('form').elements;
        enableForm(formElements);
        const generateTableButton = document.querySelector('#generateTableButton');
        resetButtonColor(generateTableButton);
        let button = document.querySelector('#submitGuessButton');
        let header = document.querySelector('h3');
        hideElements(button, header);
        let gameTable = document.querySelector('#gameTable');
        resetTable(gameTable);
        let scoreTable = document.querySelector('#scoreTable');
        resetTable(scoreTable);
        // localStorage.js
        let highScoreTable = document.querySelector('#scoreTable');
        initializeLocalStorage(highScoreTable, 1);
    });
}

/**
 * This function calculates how many correct guesses the user got based on 
 * the number of selected TDs.
 * @param {HTMLElement} selectedTds 
 * @returns a number of correct guesses the user got.
 */
function calculateCorrectGuesses (selectedTds) {
    let color = document.querySelector('#color').value;
    let correctGuesses = 0; 
        for (let i = 0; i < selectedTds.length; ++i){
            if (selectedTds[i].classList.contains(color)){
                ++correctGuesses;
            }
        }
    return correctGuesses;
}

/**
 * This function returnd the score the user gets depending on how they
 * performed in the game. This score is influenced by the number of selected
 * tds, the number of correct ones, the board size and the difficulty.
 * @param {Number} numCorrect number of correct tds selected
 * @param {Number} numSelected number of tds selected in total
 * @param {Number} boardSize interger value of the board size
 * @param {Number} difficulty interger value of the difficulty
 * @returns the score the user gets based on their performance
 */
function getScore(numCorrect, numSelected, boardSize, difficulty) {
    const percent = ( 2 * numCorrect - numSelected ) / (boardSize * boardSize);
    return Math.floor(percent * 100 * boardSize * (difficulty + 1));
}

/**
 * This function resets the button color to its original color.
 * @param {HTMLElement} button the "generate" button
 */
function resetButtonColor (button) {
    let color = "black";
    button.style.color = color;
}

/**
 * This function sends an alert to the user if they pass or not.
 * @returns a boolean whether the user passes or not.
 */
function displayUserResult(){
    let isPassing = true;
    let selectedTds = document.querySelectorAll('.selected');
    let correctGuesses = calculateCorrectGuesses(selectedTds);
    let totalCorrectAnswers = findTargetNumber();
    let pourcentage = Math.round((correctGuesses / totalCorrectAnswers * 100));

    if (selectedTds.length > totalCorrectAnswers){
        alert("You selected more tiles than needed! Unfortunately you failed...");
        isPassing = false;
    }
    else if(pourcentage > 60){
        alert("Good job on passing, you have scored " + pourcentage + "%! You will be added to the High Scores!!!");
    } else {
        alert("Unfortunately you failed with a " + pourcentage + "%. You won't be added to the High Scores. To pass, score at least 60%.");
        isPassing = false;
    }
    return isPassing;
}