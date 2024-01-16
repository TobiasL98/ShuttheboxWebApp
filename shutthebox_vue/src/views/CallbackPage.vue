<!-- CallbackPage.vue-->

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = useHandleSignInCallback(async () => {
        await router.push('/home');
});
</script>

<template>
    <p v-if="!isLoading">Redirecting...</p>
    <div v-if="isLoading">
      <SignInButton />
    </div>
</template>

<script>
import { useHandleSignInCallback } from '@logto/vue';
import SignInButton from '../components/SignInButton.vue';
export default {
  components: {
    SignInButton
  },
};
</script>