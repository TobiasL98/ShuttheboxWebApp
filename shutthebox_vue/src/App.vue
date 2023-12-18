<template>
  <div class="app">
  <MyNavbar/>
  <RouterView/>
  <div class="footer col-12">
      <div class="row">
          <div class="col-4">
              <a href="https://de.wikipedia.org/wiki/Shut_the_Box"> ShutTheBox Wiki </a>
          </div>
          <div class="col-8">Authors: Sahrah Tiefert, Jannis Liebscher</div>
      </div>
  </div>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MyNavbar from './components/MyNavbar.vue';
import { RouterView } from 'vue-router';
export default {
  name: 'App',
  components: {
    MyNavbar,
    RouterView
}
}
</script>

<style>
.app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-image:url("/src/assets/wood_button.png");
  background-repeat: repeat;
}
</style>
