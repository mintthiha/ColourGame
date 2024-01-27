"use strist"

/**
 * This function purpose is to allow the user to enable cheat mode. This mode
 * is enabled when Shift and C is pressed at the same time. This was achievable
 * using event liseners that detects the keydown and keyup events.
 */
function onCheatCodeEvent(){
    let shiftKey = false;
        let C = false;
        let counter = 0;
    window.addEventListener('keydown', (event) => {
        if(event.key === 'Shift'){
            shiftKey = true;
        }
        if (event.key === 'C'){
            C = true;
        }

        if(shiftKey && C){
            let tds = document.querySelectorAll('.gameTableCell');
            for (let i = 0; i < tds.length; i++) {
                if (counter % 2 === 0) {
                    tds[i].textContent = domColors[i] + " " + arrayOfHighestColors[i];
                }
                else{
                    tds[i].textContent = "";
                }
            }
            ++counter;
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.key === 'Shift'){
            shiftKey = false;
            C = false;
        }
    });
}
