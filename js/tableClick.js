"use strict"

/**
 * This function holds an event listener that will call the 
 * checkIfSelected function, and updates everytime the h3
 * header.
 */
function onTableClickEvent () {
    let table = document.querySelector('#gameTable');
    table.addEventListener('click', (event) => {
        let h3 = document.querySelector('h3');
        let color = document.querySelector('#color').value;
        if (event.target.tagName == 'TD'){
            let selectedCell = event.target;
            checkIfSelected(selectedCell);
            let targetNumber = findTargetNumber();
            addHeaderContent(color, targetNumber, h3, document.querySelectorAll('.selected').length);    // generateTable.js
        }
    })
}

/**
 * This function checks whether a td is selected or not. If it has the selected class,
 * it will remove it. If it doesnt, it will add.
 * @param {HTMLElement} cell the td element that is selected/unselected.
 */
function checkIfSelected(cell) {
    if (cell.classList.contains('selected')){
        cell.classList.remove('selected');
    } else {
        cell.classList.add('selected');
    }
}

/**
 * This function calculate the number of tiles the user need to select 
 * in order to win.
 * @returns the number of tiles the user needs to guess to win.
 */
function findTargetNumber(){
    let color = document.querySelector('#color').value;
    let tds = document.querySelectorAll('td');
    let targetNumber = 0;
    for(let i = 0; i < tds.length; i++){
        if(tds[i].classList.contains(color)){
            targetNumber++;
        }
    }

    return targetNumber;
}