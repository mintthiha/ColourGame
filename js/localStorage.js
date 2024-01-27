"use strict"

/**
 * This function holds an event listener that will activate whenever the highScore
 * header is clicked. It will flip the order.
 */
function onSortTableEvent(){
    let h4 = document.querySelector('h4');
    let counter = 0;
    h4.addEventListener('click', () => {
        let highScoreTable = document.querySelector('#scoreTable');
        resetTable(highScoreTable);
        initializeLocalStorage(highScoreTable, counter);
        if(counter === 0){
            counter = 1;
        } else {
            counter = 0;
        }
    });
}

/** 
 * This function adds to the local storage the name and score of the user whenever
 * it is called.
 * @param {String} name 
 * @param {Number} score 
 */
function addToLocalStorage(name, score){
    score = Number(score);
    if (localStorage.getItem(name) === null) {
        localStorage.setItem(name, JSON.stringify(score));
    } 
    else{
        updateLocalStorage(name, Number(score));
    }
}

/**
 * This function will update the score if the same name is sent to the database, if not, it
 * will be sent as a new player in the local storage.
 * @param {String} name 
 * @param {Number} score 
 */
function updateLocalStorage (name, score) {
    localStorage.setItem(name, JSON.stringify(Number(localStorage.getItem(name)) + score));
}

/**
 * This function will initialize the highScore table depending on the code (so
 * inverted or not), and what is in the local storage. It will also slice the array
 * of players so that will will only display 5.
 * @param {HTMLElement} table the highscore table
 * @param {Number} code the code, 0 or 1, that determines whether the highscore table is
 * inverted or not.
 */
function initializeLocalStorage(table, code){
    let namesArray = convertNamesToArray();
    let scoresArray = convertScoresToArray();
    let sortedList = sortingObjArray(namesArray, scoresArray);

    if (code === 1) {
        sortedList.sort((a,b) => {return b.score - a.score});
    }
    
    let slicedSortedList = sortedList.slice(0, 5);

    slicedSortedList.forEach(function(player) {
        addToHighScores(table, player.name, player.score);
    });
}

/**
 * This function adds to the highscore the player name and score.
 * @param {HTMLElement} table 
 * @param {String} name 
 * @param {Number} score 
 */
function addToHighScores(table, name, score){
    let tr = document.createElement('tr');
    tr.classList.add('scoreRow');
    let nameTd = document.createElement('td');
    nameTd.textContent = name;
    let scoreTd = document.createElement('td');
    scoreTd.textContent = score;
    
    tr.appendChild(nameTd);
    tr.appendChild(scoreTd);
    table.appendChild(tr);
}

/**
 * This function gets all names from the local storage (keys), and puts them all into
 * a single array that will be returned.
 * @returns Array of names
 */
function convertNamesToArray () {
    let namesArray = [];
    for(let i = 0; i < localStorage.length; i++){
        namesArray[i] = localStorage.key(i);
    }
    return namesArray;
}

/**
 * This function gets all the scores from the local storage (values), and puts them
 * all into a single array that will be returned.
 * @returns Array of scores
 */
function convertScoresToArray () {
    let scoresArray = [];
    for(let i = 0; i < localStorage.length; i++){
        let names = localStorage.key(i);
        scoresArray[i] = Number(localStorage.getItem (names));
    }
    return scoresArray;
}

/**
 * This function returns a sorted object list containing all the players with
 * their scores. Its sorted by the score.
 * @param {HTMLElement} namesArray 
 * @param {HTMLElement} scoresArray 
 * @returns the sorted list of objects, containing all the players.
 */
function sortingObjArray(namesArray, scoresArray){
    let list = [];
    for (let index = 0; index < namesArray.length; index++) {

        let player = {
            name : namesArray[index],
            score : scoresArray[index]
        };
        list.push(player);
    }
    let sortedList = list.sort((a,b) => { return a.score - b.score});
    return sortedList;
}