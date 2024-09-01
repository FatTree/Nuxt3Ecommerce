<script setup lang="ts">
const router = useRouter();

const email: Ref<string> = ref('ecithome2024@test.com');
const password: Ref<string> = ref('aaaa123');
const status = ref({ message: '', type: '' });
const { $auth, $signInWithEmailAndPassword } = useNuxtApp();

const login = async () => {
  console.log(`login`);
  try {
    await $signInWithEmailAndPassword($auth, email.value, password.value);
    status.value = { message: '登入成功！', type: 'success' };
    // 使用 useRouter 導航
    useRouter().push('/'); // 登入後重定向到首頁
  } catch (error) {
    status.value = { message: '登入失敗！請檢查您的憑證。', type: 'error' };
  }
};

definePageMeta({
    layout: false
});
</script>

<template>
  <div>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Login</button>
      <NuxtLink to="/registration">還不是會員？</NuxtLink>
      <p>{{status.type}} {{status.message}}</p>
    </form>
  </div>
</template>

<style scoped>
</style>
