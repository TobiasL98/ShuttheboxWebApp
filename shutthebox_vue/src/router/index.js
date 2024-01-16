import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue"
import About from "../views/AboutPage.vue"
import Game from "../views/GamePage.vue"
import LandingPage from "../views/LandingPage.vue"
import CallbackPage from "../views/CallbackPage.vue"
const Test ={template: '<div> <h1> Test </h> </div>'}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LandingPage
    },
    {
      path: "/vuejs-pwa",
      component: LandingPage
    },
    {
      path: "/home",
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
    {
      path: '/callback',
      name: 'callback',
      component: CallbackPage,
    },
  ],
});

export default router;