"use strict"

/**
 * This JavaScript file will be used to setup the game
 * @author Thiha Min Thein and Dmitriy Kim
 */

document.addEventListener("DOMContentLoaded", setup);

/**
 * This function setups the whole website. It calls every function needed to run the game from
 * all the different JS files. It also makes sure the game resets at the start in case the 
 * user plays the game again.
 */
function setup () {
    let formElements = document.querySelector('form').elements;
    enableForm(formElements);

    let button = document.querySelector('#submitGuessButton');
    let header = document.querySelector('h3');
    hideElements(button, header);    

    let gameTable = document.querySelector('#gameTable');           
    resetTable(gameTable);
                                            
    onGenerateTableEvent();     // generateTable.js 
    onCheatCodeEvent();         // cheatCode.js
    onTableClickEvent();       // tableClick.js
    onSubmitGuessEvent();       // submitGuess.js
    onClearScoreEvent();        // clearScore.js   

    let scoreTable = document.querySelector('#scoreTable');
    resetTable(scoreTable); 
    onSortTableEvent();
    let highScoreTable = document.querySelector('#scoreTable');
    initializeLocalStorage(highScoreTable, 1);   // localStorage.js 
}

/**
 * This function enables the form element when called.
 * @param {HTMLElement} formElements 
 */
function enableForm(formElements){
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = false;
    }
}

/**
 * This function hides the submit button and the header when called.
 * @param {HTMLElement} button 
 * @param {HTMLElement} header 
 */
function hideElements (button, header) {
    button.classList.add('hidden'); 
    header.classList.add('hidden');
}

/**
 * This function resets the table when called.
 * @param {HTMLElement} table 
 */
function resetTable (table) {
    table.textContent = undefined;
}


