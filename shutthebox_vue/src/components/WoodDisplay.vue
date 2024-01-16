<script>
export default{
    name: 'WoodDisplay',
    props: {
        score1: String,
        score2: String,
        playerTurn: String
    }
}
    
</script>

<template>
    <div class="textDisplay"> Player1: {{this.score1}} | Player2: {{ this.score2 }} | Player {{this.playerTurn }}`s turn</div>
</template>

<style>

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
    width: 20%;
    vertical-align: middle;
}


</style>