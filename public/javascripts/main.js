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
    return $.ajax({
        method: "GET",
        url: "/api/raw/" + index,
        dataType: "json",
        success: function (response) {
            data = response;
            console.log(data)
            i = index - 1
            var isShut = data.game.board[i]
            console.log("Index: " + index)
            console.log("Ist geschlossen: " + isShut)
            var sum = data.game.sum
            var wurf = data.game.wurf
            document.getElementById("dice-output").innerHTML = "Gewürfelt: " + wurf + " | Summe: " + sum
            if(isShut) {
                console.log("Versuche klappe zu schließen")
                document.getElementsByClassName("not-shut-" + index)[0].innerHTML = "#"
                document.getElementsByClassName("not-shut-" + index)[0].classList.add("stone-shut");
                document.getElementsByClassName("not-shut-" + index)[0].classList.remove("stone-not-shut");
            } else {
                console.log("Klappe ist zu, mache nichts")
                }
        }
    });
    if(index > sum){
      window.alert("Warning; illegal move!\n the value of the closing tab cannot be larger than the dice sum!");
    }
}
function nextPlayer() {
    return $.ajax({
            method: "GET",
            url: "/api/raw/next",
            dataType: "json",
            success: function (response) {
                data = response;
                console.log(data)
                var sum = data.game.sum
                var wurf = data.game.wurf
                console.log("Würfel")
                document.getElementById("dice-output").innerHTML = "Gewürfelt: " + wurf + " | Summe: " + sum
                console.log("Player")
                document.getElementsByClassName("player")[0].innerHTML = "Player 1: " + data.game.players.score1
                                            + " | Player 2: " + data.game.players.score2
                                            + "| Player " + data.game.players.turn + "`s turn"
                for (let index = 1; index < 10; index++) {
                console.log("Klap: " + index)
                    i = index - 1
                    var isShut = data.game.board[i]
                    console.log("Index: " + index)
                    console.log("Ist geschlossen: " + isShut)
                    if(isShut) {
                        console.log("Versuche klappe zu schließen")
                        document.getElementsByClassName("not-shut-" + index)[0].innerHTML = "#"
                        document.getElementsByClassName("not-shut-" + index)[0].classList.add("stone-shut");
                        document.getElementsByClassName("not-shut-" + index)[0].classList.remove("stone-not-shut");
                    } else {
                        console.log("Versuche klappe zu öffnen")
                        document.getElementsByClassName("not-shut-" + index)[0].innerHTML = index
                        document.getElementsByClassName("not-shut-" + index)[0].classList.add("stone-not-shut");
                        document.getElementsByClassName("not-shut-" + index)[0].classList.remove("stone-shut");
                    }
                }
            }
        });
}

function throwDice(sum) {
    return $.ajax({
            method: "GET",
            url: "/api/raw/w",
            dataType: "json",
            success: function (response) {
                data = response;
                console.log(data)
                var sum = data.game.sum
                var wurf = data.game.wurf
                document.getElementById("dice-output").innerHTML = "Gewürfelt: " + wurf + " | Summe: " + sum
            }
        });
  if(sum > 0)
  {
    window.alert("please close claps first. you still have moves left");
  }
}

// on start: don't show dice yet
// hide illegal functions
// show error, if move is illegal



