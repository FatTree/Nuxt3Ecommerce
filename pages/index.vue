<script lang="ts" setup>
import type { ProductListModel, ProductDetailModel, CategoryNameListModel } from '~/models/apiModel';
import type { landingPageProdGroupModel } from '~/models/viewModel';
const router = useRouter();

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
  'https://dummyjson.com/image/1200x400/008080/ffffff?text=Hello+World+NO+1',
  'https://dummyjson.com/image/1200x400/ff9b9b/ffffff?text=Hello+Athem+NO+2',
  'https://dummyjson.com/image/1200x400/ffe1b2/ffffff?text=Hello+World+NO+3',
  'https://dummyjson.com/image/1200x400/95e5da/ffffff?text=Hello+Athem+NO+4',
  'https://dummyjson.com/image/1200x400/bfc2ff/ffffff?text=Hello+World+NO+5',
]);
// product highlight
const cateList: Ref<CategoryNameListModel> = ref([]);
const productGroupList: Ref<Array<landingPageProdGroupModel>> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const idx: Ref<number> = ref(0);
const isEnd: Ref<boolean> = ref(false);
const wrapper: Ref<HTMLDivElement | null> = ref(null);
const wpWidth: Ref<number> = ref(0);



onMounted(() => {
  if(wrapper.value) {
    console.log(wrapper.value);
    wpWidth.value = wrapper.value.clientWidth;
    console.log(wpWidth.value);
    
  }
  
})

// 設置定時器 ID
let intervalId: NodeJS.Timeout | null = null;

// 設置樣式，用於移動輪播內容
const carouselStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * (100/images.value.length)}%)`,
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
const goCategory = (cateName: string) => {
  router.push(`/${cateName}`);
}

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
  <div class="insideContainer" ref="container">
    <div class="top">
      <div class="carousel">
        <div class="carousel__wrapper" ref="wrapper">
          <div class="carousel__wrapper__images" :style="carouselStyle">
            <div class="mask" v-for="(image, index) in images">
              <img :key="index" :src="image" class="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div v-for="list in productGroupList">
        <div class="category">
          <h2 class="category__title" @click="goCategory(`${list.categoryName}`)">
            {{ list.categoryName }}
            <svgo-angle-right-solid />
          </h2>
          <div class="category__products">
            <ProductItem v-for="item in list.productList" :product="item" :category="list.categoryName" />
          </div>
        </div>
      </div>
      <div v-if="isLoading">
        <h1>Loading...</h1> 
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.top {
  display: flex;
  justify-content: center;

  .carousel {
    overflow: hidden;
    position: relative;
    height: 400px;

    @include mobile {
      height: 300px;
    }
    
    &__wrapper {
      display: flex;

      &__images {
        display: flex;

        > .mask {      
          width: calc(100vw - 5em);
          height: 400px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;

          @include mobile {
            width: 100vw;
            height: 300px;
          }
        }
      }
    }
  }
}

.bottom {
  .category {
    margin: 1em;
    
    &__title {
      cursor: pointer;
      @include title-m;

      &:hover {
        color: $violet-normal;
      }
    }
    &__products {
      display: flex;
      overflow: scroll;
      padding: 1em;
  
      > .productItem {
        width: calc(25% - 3.8em);
  
        &:not(:first-child) {
          margin-left: 1em;
        }
      }
    }
  }
}
</style>
