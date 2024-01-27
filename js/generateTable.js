"use strict"

let domColors = [];    // Contains array of strings represented as rgb(x, y, z) 
let arrayOfHighestColors = [] // Contains array of strings represented as highest color of rgb. Example: "Red", "Blue", "Blue" ...

/**
 * This function will create a table when the generated table is clicked. 
 * It will then call the necessary functions to create the table and assign
 * the colours based on the difficulties.
 */
function onGenerateTableEvent (){
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let formElements = document.querySelector('form').elements;
        disableForm(formElements);

        let button = document.querySelector('#submitGuessButton');
        let header = document.querySelector('h3');
        unhideElements(button, header);

        const gameTable = document.querySelector('#gameTable');
        let size = document.querySelector('#boardSize').value;
        createTable(gameTable, size);

        let difficulty = Number(document.querySelector('#difficulty').value);
        let difference = convertDifficulty(difficulty);
        const tds = document.querySelectorAll('.gameTableCell');    // All tds in the game table have a class gameTableCell 
        calculateColor(tds, difference);
        assignColor(tds);

        let generateTableButton = document.querySelector('#generateTableButton');
        let color = document.querySelector('#color').value;
        changeButtonColor(generateTableButton, color);
        let targetNumber = document.querySelectorAll('.' + color).length;
        let h3 = document.querySelector('h3');
        addHeaderContent(color, targetNumber, h3, 0);
    })
}

/**
 * @param {HTMLElement} formElements get all the elements in the form
 * Disables the gameSetup when the button "Generate" is clicked.
 */

function disableForm(formElements){
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
    }
}

/**
 * @param {HTMLElement} button submit button
 * @param {HTMLElement3} header h3 elements
 * This function unhides the submit button and the h3 element.
 */
function unhideElements (button, header) {
    button.classList.remove('hidden');
    header.classList.remove('hidden');
} //Why is the hideElements in setup but this one is in here?

/**
 * @param {HTMLElement} table gets the table
 * @param {Number} size the number the user wants the table size to be
 * 
 * Creates a table depending on user input size.
 */
function createTable(table, size){ 
    resetTable(table);   // setup.js
    for (let i = 0; i< size; i++) {
        let newTr = document.createElement('tr');
        table.appendChild(newTr);        
        for(let i = 0; i < size; i++){
            let newTd = document.createElement('td');
            newTd.classList.add('gameTableCell');
            table.appendChild(newTd);
        }
    }
  }

/**
 * This functions calculates the difference depending on the difficulty.
 * @returns the difference between the rgb values depending on the difficulty
 */
function convertDifficulty(){ 
    let difficulty = Number(document.querySelector('#difficulty').value);
    let difference = 0;
    switch (difficulty){
      case 0: difference = 255;
      break;
      case 1: difference = 80;
      break;
      case 2: difference = 40;
      break;
      case 3: difference = 10;
      break;
    }
    return difference;
}

/**
 * This function first initializes the domColors variable and arrayOfHighestColors,
 * so that everytime the game is started, the colours wont be the same. After, the function
 * calculates the rgb values randomly using the Math class. Next,the strongest colour is added
 * to domCOlors, arrayofHighestColors and finally adds that color as a class to the td.
 * @param {tds} tds variable with all tds.
 * @param {Number} difference the difference between the colour.
 */
function calculateColor(tds, difference){   
    domColors = [];
    arrayOfHighestColors = []; 
        for(let i = 0; i < tds.length; i++) {
            let red = Math.floor(Math.random() * 255);
            let green = randomBetween(red, difference);
            let blue = randomBetween(red, difference);
            let color = "rgb(" + red + ", " + green + ", " + blue + ")";

            domColors.push(color);
            arrayOfHighestColors.push(findHighest(red, green, blue));
            tds[i].classList.add(findHighest(red, green, blue));
        } 
}

/**
 * This function uses the global variable domColors[], and assign a color
 * to every depending depending on the position.
 * @param {HTMLElement} tds all the tds from the table
 */
function assignColor (tds) {
    for(let i = 0; i < tds.length; i++) {
        tds[i].style.backgroundColor = domColors[i];
    } 
}

/**
 * This function returns a number depending on the parameters.
 * @param {Number} initial 
 * @param {Number} difference 
 * @returns 
 */
function randomBetween (initial, difference) {
    let randomValue = (initial - difference) + Math.floor(Math.random() * (initial + difference - (initial-difference)));
    randomValue = checkWithinBounds(randomValue);
    return randomValue;
}


/**
 * This function uses the number taken as a parameter and checks whether it is
 * within bounds or not. If not, it will simply give it a value that is the closest
 * to being bound.
 * @param {Number} number rgb value
 * @returns the number that's within bounds.
 */
function checkWithinBounds (number){
    if (number > 255){
        number = 255;
    }
    else if (number < 0){
        number = 0;
    }
    return number;
}

/**
 * This function takes the rgb values of a color, and returns the color that is the
 * most dominant.
 * @param {Number} red the r in rgb
 * @param {Number} green the g in rgb
 * @param {Number} blue the b in rgb
 * @returns most dominant color.
 */
function findHighest (red, green, blue) {
    let color = "";
    if (red >= green && red >= blue){
        color = "Red";
    }
    else if (green >= red && green >= blue){
        color = "Green"
    }
    else{
        color = "Blue"
    }
    return color;
}

/**
 * This function will simply change the button "Generate" color change 
 * depending what the color the user chose for the game.
 * @param {HTMLElement} table the table element
 * @param {String} color the color the user input
 */
function changeButtonColor (table, color) {
    table.style.color = color;
}

/**
 * This function takes as parameters variables necessary to edit the h3 element.
 * Depending on the color, the targetNumber, and the selected amount of TDs, it 
 * will variate. 
 * @param {String} color the color the user searching
 * @param {Number} targetNumber the number of tiles the user needs to find
 * @param {HTMLElement} h3 the h3 element that will be edited
 * @param {Number} selectedCount the number of tds selected
 */
function addHeaderContent(color, targetNumber, h3, selectedCount){
    h3.textContent = "Searching for " + color + " tiles! Your target is " + targetNumber + " tiles! You have " + selectedCount + " selected!";
 }

