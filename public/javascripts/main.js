const diceOutputID = "dice-output";
const undoID = "undo";
const redoID = "redo";
const diceID = "dice";
const toGameID = "toGame";
const changeStylesID = "styles";


function loadGame(numberOfMoves, sum){
  if(numberOfMoves===0){
    startGame();
  }else if(sum === 0){
    document.getElementById(diceOutputID).innerHTML = "No more moves, pleas throw the dice again."
    highlightButton(diceID)
  }
  hideButton(toGameID);
  hideButton(changeStylesID);
}

function startGame(){
    sayHello();
    hideButton(undoID);
    hideButton(redoID);
    highlightButton(diceID);
}
function sayHello(){
  document.getElementById(diceOutputID).innerHTML = ("Welcome! To start, please throw the dice.") ;
  // highlight the dice button in the first move!
}

function highlightButton(buttonID){
  document.getElementById(buttonID).style.color = "red";

}
function hideButton(buttonID){
  document.getElementById(buttonID).style.display = "none";

}

function closeClap(index, sum){
    if(index > sum){
      window.alert("Warning; illegal move!\n the value of the closing tab cannot be larger than the dice sum!");
    }
}


function throwDice(sum){
  if(sum > 0)
  {
    window.alert("please close claps first. you still have moves left");
  }
}

// on start: don't show dice yet
// hide illegal functions
// show error, if move is illegal



