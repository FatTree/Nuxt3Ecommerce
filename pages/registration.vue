<script setup lang="ts">
const router = useRouter();

const { $auth, $createUserWithEmailAndPassword } = useNuxtApp();

const email: Ref<string> = ref('ecithome2024@test.com');
const password: Ref<string> = ref('aaaa123');
const status = ref({ message: '', type: '' });

const regis = async () => {
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
  layout: 'login'
});
</script>
<template>
  <div class="insideContainer">
    <h1 class="title">註冊</h1>
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <div class="customBtn-md" @click.prevent="regis">註冊</div>
    <div class="login__content__bottom">
      <NuxtLink class="hint el" to="/login">已經是會員？</NuxtLink>
      <p class="errormsg el">{{status.type}} {{status.message}}</p>
    </div>
  </div>
</template>

