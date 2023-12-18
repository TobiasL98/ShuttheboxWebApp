import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue"
import About from "../views/AboutPage.vue"
import Game from "../views/GamePage.vue"
const Test ={template: '<div> <h1> Test </h> </div>'}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/about",
      component: About
    },
    {
      path: "/game",
      component: Game
    },
    {
      path: "/test",
      component: Test
    },
  ],
});

export default router;