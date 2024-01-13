<template>
    <button class="signOutButton col-xs-12 col-sm col-md-12" @click="onClickSignOut">
      <href>
        Logout
      </href>
    </button>
</template>

<script setup>
  import { useLogto } from "@logto/vue";

  const { signOut } = useLogto();
  const onClickSignOut = () => signOut('https://prolific-dev.com');
</script>

<script>
export default {
  name: 'SignOutButton',

};
</script>

<style>
.signOutButton{
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
.signOutButton:hover {
    opacity: 0.7;
    cursor: pointer;
}
.a{
    text-decoration: none;
    color: black;
}
.a:active{
    text-decoration: none;
    color: black;

}
</style>