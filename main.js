let goatNum = '';
let ramNum = '';
const winner = document.getElementById("winner");
const winnerVisible = document.querySelector("winner");
const goatList = document.getElementById("goat-list");
const ramList = document.getElementById("ram-list");
const nextMove = document.querySelector("p");
const guesses = document.querySelectorAll("h3");
const horizontalLine = document.querySelector("hr");
const error = document.querySelector("h4");
const resetBtn = document.getElementById("reset");
const goatValue = document.getElementById("goatValue");
const ramValue = document.getElementById("ramValue");

function createNums(event) {
    event.preventDefault();
    if(event.target.id == "goat-form"){
        if(goatValue.value.length == 4){
            let unique = goatValue.value;
            let set = new Set(unique);
            if(set.size == 4){
                goatNum = goatValue.value;
                goatValue.value = '';
                firstTurn();
            }else{
                error.style.opacity = "1";
                error.style.transition = "0.2s";
                setTimeout(function(){
                    error.style.opacity = "0";
                    error.style.transition = "0.6s";
                }, 1000);
            }
            goatValue.setAttribute("readonly", '');
        }
    }
    else{
        if(ramValue.value.length == 4){
            let unique = ramValue.value;
            let set = new Set(unique);
            if(set.size == 4){
                ramNum = ramValue.value;
                ramValue.value = '';
                firstTurn();
            }else{
                error.style.opacity = "1";
                error.style.transition = "0.2s";
                setTimeout(function(){
                    error.style.opacity = "0";
                    error.style.transition = "0.6s";
                }, 1000);
            }
            ramValue.setAttribute("readonly", '');
        }
    }
}

function firstTurn() {
    if(goatNum != ''){
        if(ramNum != ''){
            nextMove.style.opacity = "1";
            guesses[0].style.opacity = "1";
            guesses[1].style.opacity = "1";
            horizontalLine.style.opacity = "1";
        }
    }
}

function move(event) {
    event.preventDefault();
    if(goatNum != ''){
        if(ramNum != ''){
            if(numValue.value.length == 4){
                let unique = numValue.value;
                let set = new Set(unique);
                if(set.size == 4){
                    if(nextMove.textContent == "Goat go first!" || nextMove.textContent == "Goat's turn" ){
                        let goat = 0;
                        let ram = 0;
                        let guessGoatNum = numValue.value;
                        for(let i = 0; i <= guessGoatNum.length - 1; i = i + 1){
                            if(guessGoatNum[i] == ramNum[i]){
                                ram = ram + 1;
                            }else if(ramNum.includes(guessGoatNum[i])){
                                goat = goat + 1;
                            }
                        }
                        numValue.value = '';
                        nextMove.textContent = "Ram's turn";
                        let li = document.createElement("li");
                        li.textContent = guessGoatNum + ' ' + '(' + ram.toString() + 'r' + ' ' + goat.toString() + 'g' + ')';
                        goatList.appendChild(li);
                        let lengthOfGuesses = goatList.getElementsByTagName('li').length;
                        if(ram == 4 && lengthOfGuesses <= 1){
                            nextMove.textContent = "GOAT WON! But ram has a chance :)"
                            resetBtn.style.opacity = "1";
                        }
                        else if (ram == 4){
                            nextMove.textContent = "GOAT WON!";
                            resetBtn.style.opacity = "1";
                            numValue.setAttribute('readonly','');
                        }
                    }
                    else if(nextMove.textContent == "GOAT WON! But ram has a chance :)"){
                        let goat = 0;
                        let ram = 0;
                        let guessRamNum = numValue.value;
                        for(let i = 0; i <= guessRamNum.length - 1; i = i + 1){
                            if(guessRamNum[i] == goatNum[i]){
                                ram = ram + 1;
                            }else if(goatNum.includes(guessRamNum[i])){
                                goat = goat + 1;
                            }
                        }
                        numValue.value = '';
                        let li = document.createElement("li");
                        li.textContent = guessRamNum + ' ' + '(' + ram.toString() + 'r' + ' ' + goat.toString() + 'g' + ')' ;
                        ramList.appendChild(li);
                        if(ram == 4){
                            nextMove.textContent = "We have two winners!";
                            resetBtn.style.opacity = "1";
                            numValue.setAttribute('readonly','');
                        }
                    }
                    else{
                        let goat = 0;
                        let ram = 0;
                        let guessRamNum = numValue.value;
                        for(let i = 0; i <= guessRamNum.length - 1; i = i + 1){
                            if(guessRamNum[i] == goatNum[i]){
                                ram = ram + 1;
                            }else if(goatNum.includes(guessRamNum[i])){
                                goat = goat + 1;
                            }
                        }
                        numValue.value = '';
                        nextMove.textContent = "Goat's turn";
                        let li = document.createElement("li");
                        li.textContent = guessRamNum + ' ' + '(' + ram.toString() + 'r' + ' ' + goat.toString() + 'g' + ')' ;
                        ramList.appendChild(li);
                        if(ram == 4){
                            nextMove.textContent = "RAM WON!";
                            resetBtn.style.opacity = "1";
                            numValue.setAttribute('readonly','');
                        }
                    }
                }else{
                    error.style.opacity = "1";
                    error.style.transition = "0.2s";
                    setTimeout(function(){
                        error.style.opacity = "0";
                        error.style.transition = "0.6s";
                    }, 1000);
                }
            }
        }
    }
}

function resetGame () {
    goatNum = '';
    ramNum = '';
    goatList.innerHTML = "";
    ramList.innerHTML = "";
    guesses[0].style.opacity = "0";
    guesses[1].style.opacity = "0";
    horizontalLine.style.opacity = "0";
    resetBtn.style.opacity = "0";
    nextMove.textContent = "Goat go first!";
    nextMove.style.opacity = "0";
    numValue.removeAttribute('readonly');
    goatValue.removeAttribute('readonly');
    ramValue.removeAttribute('readonly');
}

resetBtn.addEventListener('click', resetGame);