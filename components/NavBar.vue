<script setup lang="ts">
const { locale, locales, setLocale, availableLocales } = useI18n();

const categoryStore = useCategory();
const shoppingCartStore = useShoppingCartStore();

const {
  getCateProdList
} = categoryStore;

const {
  categoryList
} = storeToRefs(categoryStore);

const {
    cart, 
} = storeToRefs(shoppingCartStore);

const router = useRouter();

const goToPage = (cate: string) => {
    router.push(`/${cate}`);
};

// i18n
const selectedLang = ref(locale.value)
const switchLan = (event: Event) => {
  const tg = event.target as HTMLInputElement
  const newLanguage = tg.value;
  locale.value = newLanguage;
};

// category
const isOpen: Ref<boolean> = ref(false);
const switchCate = () => {
  isOpen.value = !isOpen.value;
}

const isCartOpen: Ref<boolean> = ref(false);

const openShoppingCart = () => {
  isCartOpen.value = !isCartOpen.value;
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
        <li v-for="item in categoryList" :key="item.slug" @click="goToPage(item.slug)">
          {{ item.name}}
        </li>
      </ul>

    </div>
    <nuxt-link to="/member"><svgo-user-solid /></nuxt-link>
    <div>
      <label @click="openShoppingCart"><svgo-cart-shopping-solid /></label>
      <shopping-cart v-show="isCartOpen" :cartProduct="cart" />
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
