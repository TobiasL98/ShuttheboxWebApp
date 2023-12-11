const diceOutputID = "dice-output";
const undoID = "undo";
const redoID = "redo";
const diceID = "dice";
const toGameID = "toGame";
const changeStylesID = "styles";
let id = 1;


/*
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
*/


// @param {JSON} data 
const app = Vue.createApp({
    data(){
        return{
           dice: 'not thrown yet',
           players: 'player1: 0, player2: 0',
           diceSum: 0,
           numOfMoves: 0,
           websocket: new WebSocket("ws://localhost:9000/websocket"),
           claps: [
            {number: id++, isClosed: false},
            {number: id++, isClosed: false},
            {number: id++, isClosed: false},
            {number: id++, isClosed: false},
            {number: id++, isClosed: false},
            {number: id++, isClosed: false},
            {number: id++, isClosed: false},
            {number: id++, isClosed: false},
            {number: id++, isClosed: false}
           ],
        }
    },
    methods:{
        connectWebSocket() {
            this.websocket.onopen = function(event) {
                console.log("Trying to connect to Server");
                app.websocket.send("Trying to connect to Server");
            }
        
            this.websocket.onclose = function () {
                console.log('Connection Closed!');
                connectWebSocket()
            };
        
            this.websocket.onerror = function (error) {
                console.log('Error Occured: ' + error);
            };
        
            this.websocket.onmessage = function (e) {
                if (typeof e.data === "string") {
                    console.log('String message received: ' + e.data)
                }
                else if (e.data instanceof ArrayBuffer) {
                    console.log('ArrayBuffer received: ' + e.data);
                }
                else if (e.data instanceof Blob) {
                    console.log('Blob received: ' + e.data);
                }
            };
        },
        sendAjaxReq(operation){
            $.ajax({
                method: "GET",
                url: "/api/raw/"+operation,
                dataType: "json",
                success: function (data) {
                    for(let idx = 0; idx < 9; idx++){
                        app.claps[idx].isClosed = data.game.board[idx];
                    }
                    app.players = "Player 1: " + data.game.players.score1
                        + " | Player 2: " + data.game.players.score2
                        + "| Player " + data.game.players.turn + "`s turn";
                    app.diceSum = data.game.sum;
                    app.dice = data.game.wurf;
                }
            })
        },
        closeClap(clapId) {
            if(clapId > this.diceSum){
                window.alert("Warning; illegal move!\n the value of the closing tab cannot be larger than the dice sum!");
                return;
            }
            // send data to server
            this.sendAjaxReq(clapId)
            console.log("closed clap")
            console.log(clapId)
            this.claps[clapId-1].isClosed = true;
            console.log(this.claps[clapId-1].isClosed) 
            this.diceSum -= clapId;
            this.numOfMoves++
        },
        throwDice() {
            this.sendAjaxReq("w")
            this.numOfMoves++
            console.log("threw dice")
        },
        undo() {
            this.numOfMoves -= 1;
            console.log("undo")
        },
        redo() {
            this.numOfMoves += 1;
            console.log("redo")
        },
        nextPlayer() {
            this.numOfMoves +=1;
            console.log("changed player")            
        },
        newGame() {
            this.sendAjaxReq("new")
            this.diceSum = 0;
            this.dice = 'not thrown yet'
            this.numOfMoves = 0;
            this.claps[0].isClosed = false;
            console.log(this.claps.lenght)
            for(let i = 0; i < 9; i++){
                this.claps[i].isClosed = false;
                console.log("opening clap " + (i+1));
            }
            console.log("started new game")
        },
        nextPlayer(){
            this.sendAjaxReq("next")
        }
    },
    created(){
        this.connectWebSocket();
        console.log("created vue");
    },
    update(){

    }
}).mount('#app')