"use strict"

/**
 * The purpose of this function is to add an event listener to the clear button, 
 * which will run when the button is clicked. It will clear the highscore table.
 */
function onClearScoreEvent () {
    const clearButton = document.querySelector('#clearButton');
    clearButton.addEventListener('click', function(){
        localStorage.clear();
        let highScoreTable = document.querySelector('#scoreTable');
        highScoreTable.textContent = undefined; 
    });   
}

