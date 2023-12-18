<script>
export default{
    name: 'WoodDisplay',
    props: {
        txt: String
    }
}
    
</script>

<template>
    <div class="textDisplay"> {{ txt }}</div>
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
    width: 90%;
    vertical-align: middle;
}


</style>