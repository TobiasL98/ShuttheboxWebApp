<script>
    export default{
        name: "DiceDisplay",
        props: {
            dice: String,
            diceSum: String,
        },
        watch: {
            dice()
        }
    }
</script>

<template>
    <div class="diceRow" id="dice-output">
        Gewürfelt: {{dice}} | Summe: {{diceSum}}
    </div>
</template>

<style>
    .diceRow{
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
        width: 100%;
        vertical-align: middle;
    }

</style>