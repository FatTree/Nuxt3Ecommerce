<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import type { ProductDetailModel } from '~/models/apiModel';
import throttle from 'lodash.throttle';

// router
const route = useRoute();
const category: string = route.params.category as string;

// store
const productStore = useProduct();
const {
  someProductList,
  isSomeProductLoading,
  allProductsList,
  isAllProductLoading,
} = storeToRefs(productStore);
const {
  getSomeProductList,
  getAllCateProductList,
} = productStore;

// ref
const productList: Ref<ProductDetailModel[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const isEnd: Ref<boolean> = ref(false);
const filteredList: Ref<ProductDetailModel[]> = ref([]);
const brand: Ref<string[]> = ref([]);
const isFilterDropdownOpen: Ref<boolean> = ref(false);
const selectedBrandName: Ref<string> = ref('Search Brand...');
const selectedTitle: Ref<string> = ref('');

let isFiltered = false;
const total: Ref<number> = ref(0);
const loaded: Ref<number> = ref(0);
const limit: Ref<number> = ref(4);

const totalLength: Ref<number> = ref(0);

// ====== product ======
// 'https://dummyjson.com/products?limit=10&skip=10&select=title,price
const loadMoreData = async () => {
  if (isLoading.value || isEnd.value) return;
  isLoading.value = true;
  let pList: ProductDetailModel[] = [];

  try {
    if ( isFiltered ) {
      let i = loaded.value+limit.value;
      if (i > total.value) {
        i = total.value;
      }
      pList = filteredList.value.slice(loaded.value, i)

    } else {
      if (total.value === 0 && loaded.value === 0) {
        total.value = totalLength.value;
      }
      await getSomeProductList(limit.value, loaded.value, category);
      pList = someProductList.value.products
    }

    if (loaded.value !== 0 && loaded.value >= total.value) {
      isEnd.value = true;
    } else {
      productList.value = [...productList.value, ...pList];
      if (loaded.value + limit.value > total.value) {
        loaded.value = total.value;
      } else {
        loaded.value += limit.value;
      }
    }
  } catch (err) {
    console.error('Failed to load data:', err);
  } finally {
    isLoading.value = false;
  }
};

useProdHL(loadMoreData);

// filter
const isRotate: Ref<boolean> = ref(false);

const switchFilterDropDown = () => {
  isFilterDropdownOpen.value = !isFilterDropdownOpen.value;
}

const basicFilterAction = (result: ProductDetailModel[]) => {
  filteredList.value = result;
  isEnd.value = false;
  productList.value = filteredList.value.slice(0, limit.value);
  isFiltered = true;
  
  total.value = result.length;
  loaded.value = limit.value;
}
const setSelectedBrandName = (val: string) => {
  isFilterDropdownOpen.value = false;
  
  if(val.trim() !== '') {
    selectedBrandName.value = val;
    let result: ProductDetailModel[] = allProductsList.value.products;
    result = result.filter( item => item.brand === selectedBrandName.value)
    basicFilterAction(result);
  }
}

let throt_fun = throttle( async () => {
    const titleVal = selectedTitle.value;
    if(titleVal.trim() !== '') {
      let result: ProductDetailModel[] = allProductsList.value.products;
      result = result.filter(item => item.title.toLowerCase().includes(selectedTitle.value.toLowerCase()))
      basicFilterAction(result);
    }
}, 1000);

watch(selectedTitle, () => {
  if (selectedTitle.value.length < 3) return;
  throt_fun();
})
const searchProducts = () => {
  let result: ProductDetailModel[] = allProductsList.value.products;
  // const brandVal = selectedBrand.value;
  const titleVal = selectedTitle.value;
  // if(brandVal.trim() !== '') {
  //   result = result.filter( item => item.brand === selectedBrand.value)
  // }
  if(titleVal.trim() !== '') {
    result = result.filter(item => item.title.toLowerCase().includes(selectedTitle.value.toLowerCase()))
  }

  isEnd.value = false;
  filteredList.value = result;
  productList.value = filteredList.value.slice(0, limit.value);
  isFiltered = true;
  
  total.value = result.length;
  loaded.value = limit.value;
  return result;
}

const getAll = async () => {
  loaded.value = 0;
  productList.value = [];
  await getAllCateProductList(category);
  
  const brandArr: string[] = allProductsList.value.products.map((e: ProductDetailModel) => e.brand);
  brand.value = [...new Set(brandArr)];
  totalLength.value = allProductsList.value.total;
  total.value = totalLength.value;
  loaded.value += limit.value;
  isFiltered = false;
  isEnd.value = false;
}

onMounted(async () => {
  await getAll();
  await loadMoreData();
})

</script>

<template>
  <div class="insideContainer">
    <div class="banner">
      <img src="https://dummyjson.com/image/1200x150/008080/ffffff?text=Category+Banner" alt="" />
    </div>
    <h3 class="WIM">
      <NuxtLink class="WIM__link" to="/">index</NuxtLink>
      <label class="WIM__arrow">→</label>
      <NuxtLink class="WIM__link">{{ category }}</NuxtLink>
    </h3>
    <div class="content">
      <div class="filter">
        <h3 class="filter__title"  @click="isRotate=!isRotate">
          <div class="filter__title__item">
            <svgo-filter-solid />
            Filter
          </div>
          <div class="filter__title__item padItem" :class="isRotate ? 'collapse' : ''">
            <svgo-angle-right-solid />
          </div>
        </h3>
        <div class="filter__content" :class="isRotate ? 'collapse' : ''">
          <div class="select" @click.stop="switchFilterDropDown">
            <div class="selected">
              <label for="">{{ selectedBrandName }}</label>
              <svgo-angle-right-solid class="selectArrow" />
            </div>
            <div class="options" v-show="isFilterDropdownOpen">
              <p class="options__option" 
                v-for="b in brand" 
                :value="b" 
                :key="b"
                @click.stop="setSelectedBrandName(b)">
                {{ b }}
              </p>
            </div>
          </div>
          <input class="text" type="text" v-model="selectedTitle" placeholder="product name">
          <!-- <button @click="searchProducts">search</button> -->
          <!-- <button @click="getAll">get all</button><br> -->
        </div>
      </div>
      <div class="filterOverlay" @click="isRotate=!isRotate" :class="isRotate ? 'collapse' : ''"></div>
      <div class="product">
        <h3 class="product__title">{{ category }}</h3>
        <div class="product__list">
          <ProductItem v-for="item in productList" :product="item" :category="category" />
        </div>
        <h3 v-if="isLoading">
          loading...
        </h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss"coped>
@mixin inputBasic {
  border: 1px solid $violet-normal;
  border-radius: .5em;
  padding: 1em;
  background-color: $white;
  margin-bottom: 1em;
}

.banner {
  width: 100%;
  height: 150px;
  overflow: hidden;
  display: flex;
  justify-content: center;

  > img {
    object-fit: contain;
  }
}

.content {
  display: flex;

  @include pad {
    display: block;
  }
}

.product {
  @include pad {
    padding: 1.5em;
    width: calc(100% - 3em);
  }

  @include mobile {
    padding: 1em;
    width: calc(100% - 2em);
  }

  &__title {
    margin-bottom: 1em;
    @include title-m;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1em;

    &::after {
      content: "";
      flex: auto;
    }

    > .productItem {
      @include mobile {
        min-width: none;
        width: 38%;
      }
    }
  }
}

@keyframes fade {
  0% { opacity: 0 }
  100% { opacity: 1 }
}

.filter {
  padding: 1.5em;
  border-radius: .5em;
  background-color: $white;
  width: 15em;
  height: 10em;
  margin-right: 1em;
  position: relative;
  z-index: 200;

  @include pad {
    width: calc(100% - 3em);
    height: auto;
    border-radius: 0;
  }

  @include mobile {
    padding: 1em;
    width: calc(100% - 2em);
  }
  
  &__title {
    margin-bottom: 1em;

    @include pad{
      display: flex;
      justify-content: space-between;
      position: relative;
    }

    &__item {
      &.padItem {
        display: none;

        @include mobile {
          display: block;

          &.collapse {
            rotate: 90deg;
            transition: rotate .5s;
          }
        }
      }
    }
  }

  &__content {
    @include pad {
      display: flex;
      justify-content: space-between;
    }
    
    @include mobile {
      display: none;
      position: absolute;
      background-color: $white;
      padding: 1em;
      position: absolute;
      left: 0;
      right: 0;
      opacity: 0;
      
      &.collapse {
        display: block;
        opacity: 1;
        animation: fade .3s;
      }
    }

    > .select, .text {
      width: calc(100% - 2em);
      @include inputBasic;
      @include pad {
        width: 45%;
        margin-bottom: 0;
      }
      @include mobile {
        width: -webkit-fill-available;
        margin-bottom: 1em;
      }
    }
    > .select {
      position: relative;
      @include label-m;
      > .selected {
        display: flex;
        justify-content: space-between;

        > .selectArrow {
          rotate: 90deg;
          width: 1em;
          height: 1em;
        }
      }

      
      > .options {
        @include inputBasic;
        padding: 0;
        position: absolute;
        top: 3.2em;
        left: 0;
        right: 0;

        .options__option {
          padding: 1em;
          cursor: default;

          &:hover {
            transition: background-color .5s;
            background-color: $violet-light-hover;
          }
        }

      }
    }
  }

  &__select {
    position: relative;
    @include label-m;

    > .selected {
      display: flex;
      justify-content: space-between;

      > .selectArrow {
        rotate: 90deg;
        width: 1em;
        height: 1em;
      }
    }
    
    > .options {
      @include inputBasic;
      padding: 0;
      position: absolute;
      top: 3.2em;
      left: 0;
      right: 0;

      .options__option {
        padding: 1em;
        cursor: default;

        &:hover {
          transition: background-color .5s;
          background-color: $violet-light-hover;
        }
      }

    }
  }  
  &__input {
    width: calc(100% - 2em);
    @include inputBasic;
  }
}

.filterOverlay {
  display: none;

  @include pad {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 150;
    background-color: $overlay;
    opacity: 0;
    &.collapse {
      transition: opacity .5s;
      opacity: 1;
      display: block;
    }
  }
}
</style>
