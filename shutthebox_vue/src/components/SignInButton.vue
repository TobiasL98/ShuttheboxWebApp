<template>
    <div v-if="isAuthenticated">
      <div>Signed in</div>
    </div>
    <div v-else>
      <button @click="onClickSignIn">Sign In</button>
    </div>
</template>

<script setup>
  import { useLogto } from "@logto/vue";

  const { signIn, isAuthenticated } = useLogto();
  const onClickSignIn = () => signIn('http://localhost:8080/callback');
</script>

