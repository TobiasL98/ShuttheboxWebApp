<script>
import $ from 'jquery'
let id = 1;

// let game = Vue.create

export default{
    data(){
        return{
            dice: "noch nicht gewürfelt",
            diceSum: 0,
            score1: 0,
            score2: 0,
            currPlayer: 2,
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
            numOfMoves: 0,
            webSocket:  new WebSocket("ws://localhost:9000/websocket")
        }
    },
    methods:{
        connectWebSocket() {
            this.websocket.onopen = function(event) {
                console.log("Trying to connect to Server");
                console.log(event);
            }
            this.websocket.onclose = function () {
                console.log('Connection Closed!');
                this.connectWebSocket()
            };
        
            this.websocket.onerror = function (error) {
                console.log('Error Occured: ' + error);
            };
        
            this.websocket.onmessage = function (e) {
                if (typeof e.data === "string") {
                    console.log('String message received: ' + e.data)
                    this.updateGame(JSON.parse(e.data))
                }
                else if (e.data instanceof ArrayBuffer) {
                    console.log('ArrayBuffer received: ' + e.data);
                }
                else if (e.data instanceof Blob) {
                    console.log('Blob received: ' + e.data);
                }


            };
        },
        updateGame(jsonData){
            console.log("updateing Data with: " + jsonData)
            this.score1 = jsonData.game.players.score1;
            this.score2 = jsonData.game.players.score2;
            this.updateDice;
            for(let idx = 0; idx < 9; idx++){
                        this.claps[idx].isClosed = jsonData.game.board[idx];
                    }
        },
        updateDice(jsonData){
            this.dice = jsonData.game.wurf;
            this.diceSum = jsonData.game.sum;
        },
        closeClap(clapId){
            if(clapId > this.diceSum){
                window.alert("Warning; illegal move!\n the value of the closing tab cannot be larger than the dice sum!");
                return;
            }
            // send data to server
            this.diceSum -= clapId;
            this.sendAjaxReq(clapId)
            this.claps[clapId - 1].isClosed = true;
            console.log("closed clap " + clapId)
        },
        throwDice() {
            this.sendAjaxReq("w")
            this.numOfMoves++
            console.log("threw dice")
        },
        /*
        throwDice(){
            // this.sendAjaxReq("w")
            console.log("threw dice")
            $.get("http://localhost:9000/api/raw/w", function(data){
                console.log("send dice requ");
                console.log(data);
                data = $.parseJSON(data);
                console.log(data);
                console.log("Updating Dice:");
                game.updateDice(data);
            })
        },
        */
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
        sendAjaxReq(operation){
            console.log("starting ajax")
            
            $.get("http://localhost:9000/api/raw/"+operation, function(data){
                data = $.parseJSON(data);
                this.score1 = data.game.players.score1;
                this.score2 =  data.game.players.score2;
                this.currPlayer = data.game.players.turn;
                this.diceSum = data.game.sum;
                this.dice = data.game.wurf; 
                console.log("DEBUG 1");
                console.log(data);
                console.log("DEBUG 2");
                console.log(this.dice);
                console.log(this.diceSum);
                console.log("DEBUG 3");
            })
        },
    },
    created(){
        console.log("created GameBoard")
        console.log(this.diceSum)
    },

}
</script>

<template>
    <div class="gameBoard" id="board">
        <div class="textDisplay"> Player1: {{this.score1}} | Player2: {{ this.score2 }} | Player {{this.currPlayer }}`s turn</div>
        <div class="gameDisplay" >
            <div class="clapsRow" v-for="clap in claps" :key="clap.number">
            <a v-if="clap.isClosed" class="clap col-4 col-sm" > # </a>
            <a v-else v-on:click="closeClap(clap.number)" class="clap col-4 col-sm"> {{ clap.number }}</a>
            </div>
            <div class="textDisplay"> Gewürfelt: {{ this.dice }} | Summe: {{ this.diceSum }}</div>
        </div>
        <div class="gameButtons">
            <a class="woodButton col-12 col-sm-2" v-on:click="throwDice()"> throwDice </a>
            <a class="woodButton col-12 col-sm-2" v-on:click="undo()"> undo </a>
            <a class="woodButton col-12 col-sm-2" v-on:click="redo()"> redo </a>
            <a class="woodButton col-12 col-sm-2" v-on:click="nextPlayer()"> next Player </a>
            <a class="woodButton col-12 col-sm-2" v-on:click="newGame()"> new Game </a>
        </div>
    </div>
</template>

<style>
 .gameBoard {
    color: black;
    background-image:url("/src/assets/filz_green.png");
    background-repeat: repeat;
    padding: 2%;
    height: auto;
    border-style: ridge;
    border-width: thick;
    border-color: black;
 }
 .button_dice{
    display: inline-block;
    text-align: center;
    width: 100px;
    border-style: ridge;
    border-width: thick;
    border-color: #e9d3b2;
    background-color: #e9d3b2;
    padding: 10px;
    background-image:url("/src/assets/retina_wood.png");
    background-color: white;
    background-repeat: repeat;
 }
 .textDisplay{
    display: inline-block;
    text-align: center;
    border-style: ridge;
    border-width: thick;
    border-color: #e9d3b2;
    background-color: #e9d3b2;
    padding: 10px;
    margin: 2%;
    background-image:url("/src/assets/retina_wood.png");
    background-repeat: repeat;
    height: auto;
    width: 90%;
    vertical-align: middle;
}
.clapsRow{
        display: inline-block;

    }
.clap {
        display: inline-block;
        text-align: center;
        width: 100px;
        border-style: ridge;
        border-width: thick;
        border-color: #BA8C63;
        padding: 10px;
        background-color: #BA8C63;
        background-image:url("/src/assets/wood_button.png");
        background-repeat: repeat;
    }
.clap:hover{
    cursor: pointer;
    opacity: 0.7;
}
.woodButton{
    display: inline-block;
    text-align: center;
    width: 100px;
    border-style: ridge;
    border-width: thick;
    border-color: #e9d3b2;
    background-color: #e9d3b2;
    padding: 10px;
    background-image:url("/src/assets/retina_wood.png");
    background-color: white;
    background-repeat: repeat;
}
.woodButton:hover {
    opacity: 0.7;
    cursor: pointer;
}


</style>