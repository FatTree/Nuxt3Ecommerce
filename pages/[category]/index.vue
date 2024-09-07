<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import type { ProductDetailModel } from '~/models/apiModel';

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

const selectedBrand: Ref<string> = ref('');
const selectedTitle: Ref<string> = ref('');

let isFiltered = false;
const total: Ref<number> = ref(0);
const loaded: Ref<number> = ref(0);
const limit: Ref<number> = ref(2);

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
const searchProducts = () => {
  let result: ProductDetailModel[] = allProductsList.value.products;
  const brandVal = selectedBrand.value;
  const titleVal = selectedTitle.value;
  if(brandVal.trim() !== '') {
    result = result.filter( item => item.brand === selectedBrand.value)
  }
  if(titleVal.trim() !== '') {
    result = result.filter(item => item.title.toLowerCase().includes(selectedTitle.value.toLowerCase()))
    console.log(`result`, result);
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
})

</script>

<template>
  <div>
    <img src="https://dummyjson.com/image/800x400/008080/ffffff?text=Hello+World+NO+1" alt="" />
    <p>
      category: {{ category }}
    </p>
    <div class="content">
      <div>
        <h3>Search</h3>
        brand: <select v-model="selectedBrand">
          <option v-for="b in brand" :value="b" :key="b">
            {{ b }}
          </option>
        </select> <br>
        product name: <input type="text" v-model="selectedTitle"> <br>
        <button @click="searchProducts">search</button>
        <button @click="getAll">get all</button><br>
      </div>
      <div>
        <h3>product list</h3>
        <h2>{{ category }}</h2>
        <div class="flex" style="max-width: 1000px;flex-wrap: wrap;">
          <ProductItem :productList="productList" :category="category" />
        </div>
        <h3 v-if="isLoading">
          loading...
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
}
.flex {
  display: flex;
}
</style>
