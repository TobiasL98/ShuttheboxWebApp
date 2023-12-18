<script>
import WoodButtons from './WoodButtons.vue';
export default{
    name: "MyNavbar",
    components:{
        WoodButtons
    }

}
</script>

<template>
    <div class="menu col-sm-12 col-md-3">
        <div class="row">
            <WoodButtons txt="Home" link="/" />
            <WoodButtons txt="About" link="/about" />
            <WoodButtons txt="Play Game" link="/game" />
        </div>
    </div>
</template>


<style>

.menu {
    min-width:  576px;
    max-height: 100px;
    orientation: centered;
}
.row {
    margin-bottom: 10px;
    min-width: 768px;
    margin-right: 10px;
    height: 100%;

    background-color: rgba(168, 125, 50, 0.7);
    border: 2px;
    border-radius: 25px;
    padding-top: 1%;
    padding-bottom: 1%;
}
.btn {
    background-color: #e3d09a;
    border-style: ridge;
    border-width: thick;
    border-color: #e3d09a;
    max-height: 50px;
}


</style>