const diceOutputID = "dice-output";
const undoID = "undo";
const redoID = "redo";
const diceID = "dice";
const toGameID = "toGame";
const changeStylesID = "styles";
var sum = 0;
var numberOfMoves = 0;

function loadGame(){
    if(numberOfMoves===0){
    startGame();
    }else if(sum === 0){
        document.getElementById(diceOutputID).innerHTML = "No more moves, pleas throw the dice again."
        highlightButton(diceID);
    }else{
        unhighlightButton(diceID);
    }
    if(numberOfMoves===1) {
        unhideButton(undoID);
        unhideButton(redoID);
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
function unhighlightButton(buttonID){
    document.getElementById(buttonID).style.color = "black";
}
function hideButton(buttonID){
  document.getElementById(buttonID).style.display = "none";
}
function unhideButton(buttonID){
    document.getElementById(buttonID).style.display = "block";

}

function undo(){
    numberOfMoves -= 1;
    return $.ajax({
        method: "GET",
        url: "/api/raw/y",
        dataType: "json",
        success: function (response) {
            insertJSON(response)
        }
    });
}

function redo(){
    numberOfMoves += 1;
    return $.ajax({
        method: "GET",
        url: "/api/raw/z",
        dataType: "json",
        success: function (response) {
            insertJSON(response)
        }
    });
}

function newGame(){
    // missing functionality: needs to reset und reload the claps!
    numberOfMoves = 0;
    return $.ajax({
        method: "GET",
        url: "/api/raw/new",
        dataType: "json",
        success: function (response) {
            insertJSON(response)
        }
    });
}


function closeClap(index){
    if(index > sum){
        window.alert("Warning; illegal move!\n the value of the closing tab cannot be larger than the dice sum!");
      }
    numberOfMoves +=1;
    return $.ajax({
        method: "GET",
        url: "/api/raw/" + index,
        dataType: "json",
        success: function (response) {
            insertJSON(response)
        }
    });
    
}
function nextPlayer() {
    numberOfMoves +=1;
    return $.ajax({
            method: "GET",
            url: "/api/raw/next",
            dataType: "json",
            success: function (response) {
                insertJSON(response)
            }
        });
}

function throwDice() {
    if(sum > 0)
    {
        window.alert("please close claps first. you still have moves left");
    }
    numberOfMoves +=1;
    $.ajax({
        method: "GET",
        url: "/api/raw/w",
        dataType: "json",
        success: function (response) {
            insertJSON(response)
        }
    });
}
/**
 * Aktualisiert Elemente des SPielfeldes
 * @param {JSON} data - Die SPieldaten als JSON Object
 */
function insertJSON(data) {
    console.log(data)
    // update Dice
    sum = data.game.sum
    let wurf = data.game.wurf
    document.getElementById("dice-output").innerHTML = "Gewürfelt: " + wurf + " | Summe: " + sum
    // update Player
    document.getElementsByClassName("player")[0].innerHTML = "Player 1: " + data.game.players.score1
                                + " | Player 2: " + data.game.players.score2
                                + "| Player " + data.game.players.turn + "`s turn"
    // update Board
    for (let index = 1; index < 10; index++) {
        i = index - 1
        var isShut = data.game.board[i]
        if(isShut) {
            document.getElementsByClassName("not-shut-" + index)[0].innerHTML = "#"
            document.getElementsByClassName("not-shut-" + index)[0].classList.add("stone-shut");
            document.getElementsByClassName("not-shut-" + index)[0].classList.remove("stone-not-shut");
        } else {
            document.getElementsByClassName("not-shut-" + index)[0].innerHTML = index
            document.getElementsByClassName("not-shut-" + index)[0].classList.add("stone-not-shut");
            document.getElementsByClassName("not-shut-" + index)[0].classList.remove("stone-shut");
        }
    }
    loadGame();
}
/**
 * Erstellt aus der HTTP Connection eine Websocket Connection
 */
function connectWebSocket() {
    console.log("Connecting to Websocket");
    var websocket = new WebSocket("ws://localhost:9000/websocket");
    console.log("Connected to Websocket");

    websocket.onopen = function(event) {
        console.log("Trying to connect to Server");
        websocket.send("Trying to connect to Server");
    }

    websocket.onclose = function () {
        console.log('Connection Closed!');
        connectWebSocket()
    };

    websocket.onerror = function (error) {
        console.log('Error Occured: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            console.log('String message received: ' + e.data);
            insertJSON(JSON.parse(e.data))
        }
        else if (e.data instanceof ArrayBuffer) {
            console.log('ArrayBuffer received: ' + e.data);
        }
        else if (e.data instanceof Blob) {
            console.log('Blob received: ' + e.data);
        }
    };
}
$( document ).ready(function() {
    console.log("Document is ready");
    connectWebSocket()
});

// on start: don't show dice yet
// hide illegal functions
// show error, if move is illegal



