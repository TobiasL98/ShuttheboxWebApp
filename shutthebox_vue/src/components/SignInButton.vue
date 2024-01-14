<template>
    <div v-if="isAuthenticated">
      <div>Signed in</div>
      <button @click="continueToHome">Continue</button>
    </div>
    <div v-else>
      <button @click="onClickSignIn">Sign In</button>
    </div>
</template>

<script setup>
  import { useLogto } from "@logto/vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const { signIn, isAuthenticated } = useLogto();
  const onClickSignIn = () => signIn('http://localhost:8080/callback');
  const continueToHome = () => router.push("/home");
</script>

