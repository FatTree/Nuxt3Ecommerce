<script setup lang="ts">
const email: Ref<string> = ref('ecithome2024@test.com');
const password: Ref<string> = ref('aaaa123');
const status = ref({ message: '', type: '' });
const { $auth, $signInWithEmailAndPassword } = useNuxtApp();

const router = useRouter();
const route = useRoute();

const login = async () => {
  console.log(`login`);
  const excludedPages = ['login', 'registration']; 
  const previousPage = document.referrer;
  try {
    await $signInWithEmailAndPassword($auth, email.value, password.value);
    status.value = { message: '登入成功！', type: 'success' };
    
    if (route.name && previousPage && !excludedPages.includes(route.name.toString())) {
      router.back();  // 返回上一頁
    } else {
      router.push('/');  // 如果上一頁在排除列表中，重定向到首頁或其他指定頁面
    }
  } catch (error) {
    status.value = { message: '登入失敗！請檢查您的憑證。', type: 'error' };
  }
};

definePageMeta({
    layout: 'login'
});
</script>

<template>
  <div class="insideContainer">
    <h1 class="title">登入</h1>
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <div class="customBtn-md" @click.prevent="login">Login</div>
    <div class="login__content__bottom">
      <NuxtLink class="hint el" to="/registration">還不是會員？</NuxtLink>
      <p class="errormsg el">{{status.type}} {{status.message}}</p>
    </div>
  </div>
</template>

