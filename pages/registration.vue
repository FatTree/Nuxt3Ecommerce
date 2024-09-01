<script setup lang="ts">
const router = useRouter();

const { $auth, $createUserWithEmailAndPassword } = useNuxtApp();

const email: Ref<string> = ref('ecithome2024@test.com');
const password: Ref<string> = ref('aaaa123');
const status = ref({ message: '', type: '' });

const regis = async () => {
  console.log(`regis`);
  try {
    await $createUserWithEmailAndPassword($auth, email.value, password.value)
    status.value = { message: '註冊成功！', type: 'success' };
    useRouter().push('/');
  } catch (error) {
    console.log(error)
    status.value = { message: `${error.message}`, type: 'error' };
  }
};

definePageMeta({
    layout: false
});
</script>

<template>
  <div>
    <form @submit.prevent="regis">
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">註冊</button>
      <NuxtLink to="/login">已經是會員？</NuxtLink>
      <p>{{status.type}} {{status.message}}</p>
    </form>
  </div>
</template>

<style scoped>
</style>
