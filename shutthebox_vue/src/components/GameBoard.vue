<script>
import $ from 'jquery';
import DiceDisplay from '@/components/DiceDisplay.vue'
import WoodButtons from '@/components/WoodButtons.vue'
import WoodDisplay from '@/components/WoodDisplay.vue'
import SignOutButton from '@/components/SignOutButton.vue';
let id = 1;

export default{
    components: {
        DiceDisplay,
        WoodButtons,
        WoodDisplay,
        SignOutButton
    },
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
            this.updateDice(jsonData);
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
        undo() {
            this.numOfMoves -= 1;
            this.sendAjaxReq("y")
            console.log("undo")
        },
        redo() {
            this.numOfMoves += 1;
            this.sendAjaxReq("z")
            console.log("redo")
        },
        nextPlayer() {
            this.sendAjaxReq("next")
            this.numOfMoves +=1;
            for(let i = 0; i < 9; i++){
                this.claps[i].isClosed = false;
                console.log("opening clap " + (i+1));
            }
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
            
            $.get("http://localhost:9000/api/raw/" + operation, (data) => {
                data = $.parseJSON(data);
                this.score1 = data.game.players.score1;
                this.score2 =  data.game.players.score2;
                this.currPlayer = data.game.players.turn;
                this.diceSum = data.game.sum;
                this.dice = data.game.wurf; 
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
        <WoodDisplay :score1="this.score1" :score2="this.score2" :playerTurn="this.currPlayer"/>
        <div class="gameDisplay" >
            <div class="clapsRow" v-for="clap in claps" :key="clap.number">
                <a v-if="clap.isClosed" class="clap col-4 col-sm" > # </a>
                <a v-else v-on:click="closeClap(clap.number)" class="clap col-4 col-sm"> {{ clap.number }}</a>
            </div>
        </div>
        <DiceDisplay :dice="this.dice" :diceSum="this.diceSum" />
        <div>
            <WoodButtons txt="Throw Dice" v-on:click="throwDice()"/>
            <WoodButtons txt="Undo" v-on:click="undo()"/>
            <WoodButtons txt="Redo" v-on:click="redo()"/>
            <WoodButtons txt="Next Player" v-on:click="nextPlayer()"/>
            <WoodButtons txt="New Game" v-on:click="newGame()"/>
        </div>
        <div class="signOut">
            <SignOutButton/>
        </div>
    </div>
</template>

<style>
 .signOut {
    padding-top: 30px;   
 }
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
</style>