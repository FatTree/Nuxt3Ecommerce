<script setup lang="ts">
// stores
const testStore = useTest();
// const { locale, setLocale, availableLocales } = useI18n();
const {
  testCallApi
} = testStore;
const {
  fetchData
} = storeToRefs(testStore);
onMounted(async () => {
  // await testCallApi();
  // console.log(`fetchData`, fetchData);
  // throw createError({
  //   statusCode: 500,
  //   statusMessage: '500 error'
  // })
  // console.log(`availableLocales`, availableLocales);
  // console.log(`locale`, locale.value);
});

// // 當前選擇的語言
// const selectedLang = ref(locale.value)

// // 切換語言的方法
// const switchLan = (event: Event) => {
//   if(event.target) {

//     const newLanguage = event.target.value;
//     locale.value = newLanguage;
//   }
// };
</script>

<template>
  <div>
    Page: index
    <!-- <select v-model="selectedLang" @change="switchLan($event)">
      <option v-for="lc in availableLocales" :value="lc">{{ lc }}</option>
    </select> -->
    <!-- <button @click="setLocale('en')">en</button>
    <button @click="setLocale('ch')">ch</button> -->
    {{ $t('category') }}
  </div>
</template>

<style scoped>
</style>
