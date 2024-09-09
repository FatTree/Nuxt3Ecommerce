<script lang="ts" setup>
import type { ProductListModel, ProductDetailModel, CategoryNameListModel } from '~/models/apiModel';
import type { landingPageProdGroupModel } from '~/models/viewModel';

// import throttle from 'lodash.throttle';

const cateStore = useCategory();
const {
  cateNameList,
} = storeToRefs(cateStore);
const {
  getCateNameList
} = cateStore;


// carousel
const currentIndex: Ref<number> = ref(0);
const images = ref([
  'https://dummyjson.com/image/800x400/008080/ffffff?text=Hello+World+NO+1',
  'https://dummyjson.com/image/800x400/ff9b9b/ffffff?text=Hello+Athem+NO+2',
  'https://dummyjson.com/image/800x400/ffe1b2/ffffff?text=Hello+World+NO+3',
  'https://dummyjson.com/image/800x400/95e5da/ffffff?text=Hello+Athem+NO+4',
  'https://dummyjson.com/image/800x400/bfc2ff/ffffff?text=Hello+World+NO+5',
]);
// product highlight
const cateList: Ref<CategoryNameListModel> = ref([]);
const productGroupList: Ref<Array<landingPageProdGroupModel>> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const idx: Ref<number> = ref(0);
const isEnd: Ref<boolean> = ref(false);

// 設置定時器 ID
let intervalId: NodeJS.Timeout | null = null;

// 設置樣式，用於移動輪播內容
const carouselStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * 100}%)`,
    transition: 'transform 1s ease'
  };
});

// 切換圖片
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

// 設置定時器
const startCarousel = () => {
  intervalId = setInterval(nextSlide, 3000);
};

// 清除定時器
const stopCarousel = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
};


// ====== product ======
const loadMoreData = async () => {
  if (isLoading.value || isEnd.value) return;
  isLoading.value = true;
  const cateVal = cateList.value;

  try {
    const data: ProductListModel = await $fetch(`https://dummyjson.com/products/category/${cateVal[idx.value]}?limit=4`, { responseType: 'json' });
    const products = data.products;
    if (idx.value >= cateVal.length) {
      isEnd.value = true;
    } else {
      productGroupList.value = [...productGroupList.value, {categoryName: products[0].category, productList: products}]
      idx.value += 1;
    }
  } catch (err) {
    console.error('Failed to load data:', err);
  } finally {
    isLoading.value = false;
  }
};

useProdHL(loadMoreData);

onBeforeMount(async () => {
  startCarousel();
  await getCateNameList();
  cateList.value = cateNameList.value;
  await loadMoreData();
});

onUnmounted(() => {
  stopCarousel();

});
</script>

<template>
  <div class="container" ref="container">
    <div>
      <div class="carousel">
        <div class="carousel-wrapper">
          <div class="carousel-images" :style="carouselStyle">
            <img v-for="(image, index) in images" :key="index" :src="image" class="carousel-image" />
          </div>
        </div>
      </div>
    </div>
    
    <div v-for="list in productGroupList">
      <div>
        <h2>{{ list.categoryName }}</h2>
        <div class="flex">
          <ProductItem v-for="item in list.productList" :product="item" :category="list.categoryName" />
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      <h1>Loading...</h1> 
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}

.container {
  height: 100%;
}

.carousel {
  overflow: hidden;
  width: 800px;
  height: 400px; 
  position: relative;
}

.carousel-wrapper {
  display: flex;
}

.carousel-images {
  display: flex;
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
