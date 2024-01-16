
<script>
import $ from 'jquery'
let id = 1;
export default {
    name: 'clapRow',
    data(){ 
        return{
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
            closedClaps: '#',
            diceSum: 7,
        }
    },
    methods:{
        closeClap(clapId){
            /*
            if(clapId > diceSum){
                window.alert("Warning; illegal move!\n the value of the closing tab cannot be larger than the dice sum!");
                return;
            } */
            // send data to server
            // this.sendAjaxReq(clapId)
            this.claps[clapId - 1].isClosed = true;
            $.ajax({
                method: "GET",
                url: "/api/raw/"+clapId,
                dataType: "json",
                success: function (data) {
                    for(let idx = 0; idx < 9; idx++){
                        this.claps[idx].isClosed = data.game.board[idx];
                    }
                    this.diceSum = data.game.wurf;

                }
            }

            )

            console.log("closed clap " + clapId)
        }
    }
}
</script>

<template>
    <div class="clapsRow" v-for="clap in claps" :key="clap.number">
        <a v-if="clap.isClosed" class="clap col-4 col-sm" > # </a>
        <a v-else v-on:click="closeClap(clap.number)" class="clap col-4 col-sm"> {{ clap.number }}</a>
    </div>
</template>

<style>
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