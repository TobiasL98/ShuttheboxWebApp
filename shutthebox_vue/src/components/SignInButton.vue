<template>
    <div v-if="isAuthenticated">
      <div>Signed in</div>
      <button @click="continueToHome">Continue</button>
    </div>
    <div v-else>
      <button class="woodButton" @click="onClickSignIn">Sign In</button>
    </div>
</template>

<!-- SignInButton.vue-->
<script setup>
  import { useLogto } from "@logto/vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const { signIn, isAuthenticated } = useLogto();
  const onClickSignIn = () => signIn('http://localhost:8080/callback');
  const continueToHome = () => router.push("/home");
</script>

<style>
.woodButton{
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
.woodButton:hover {
    opacity: 0.7;
    cursor: pointer;
}
</style>
