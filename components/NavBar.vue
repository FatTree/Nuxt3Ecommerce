<script setup lang="ts">
const { locale, locales, setLocale, availableLocales } = useI18n();

const categoryStore = useCategory();
const {
  getCateProdList
} = categoryStore;

const {
  categoryList
} = storeToRefs(categoryStore);

// i18n
const selectedLang = ref(locale.value)
const switchLan = (event: Event) => {
  console.log('selectedLang',selectedLang.value)
  if(event.target) {
    const newLanguage = event.target.value;
    locale.value = newLanguage;
  }
};

// category
const isOpen: Ref<boolean> = ref(false);
const switchCate = () => {
  isOpen.value = !isOpen.value;
}

onBeforeMount(async () => {
  await getCateProdList();
})
</script>

<template>
  <div class="navbar">
    <nuxt-link to="/">E.Com</nuxt-link>
    <div class="category">
      <label @click="switchCate"><svgo-list-solid /></label>
      <ul :class="isOpen?'':'none'">
        <li v-for="item in categoryList" :key="item.slug">
          {{ item.name}}
        </li>
      </ul>

    </div>
    <nuxt-link to="/member"><svgo-user-solid /></nuxt-link>
    <div>
      <label><svgo-cart-shopping-solid /></label>
    </div>
    <div>
      <svgo-language-solid />
      <select v-model="selectedLang" @change="switchLan($event)">
        <option v-for="lc in availableLocales" :value="lc">{{ lc }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  border: 1px solid black;
  display: flex;
}

.category {
  cursor: pointer;
}

.none {
  display: none;
}
</style>
