<script setup lang="ts">
import auth from '~/middleware/auth';
import type { cartProductModel } from '~/models/viewModel';

const shoppingCartStore = useShoppingCartStore();
/**
 * cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalQuantity,
        totalAmount,
        loadCart,
        findItemQuantity
 */
const { 
  cart,
  totalQuantity,
  totalAmount,
} = storeToRefs(shoppingCartStore)
const {
  removeFromCart,
  loadCart,
  updateQuantity
} = shoppingCartStore;


// 增加數量
const increaseQuantity = (prod: cartProductModel) => {
  const newQuantity = prod.quantity + 1;
  if (newQuantity <= prod.stock) {
    updateQuantity(prod.id, newQuantity);
  }
};

// 減少數量
const decreaseQuantity = (prod: cartProductModel) => {
  const newQuantity = prod.quantity - 1;
  if (newQuantity >= 1) {
    updateQuantity(prod.id, newQuantity);
  }
};

// 處理直接修改 input 的數量
const handleQuantityChange = (prod: cartProductModel) => {
  const newQuantity = Math.min(Math.max(prod.quantity, 1), prod.stock); // 確保數量在 1 和庫存之間
  updateQuantity(prod.id, newQuantity);
};


const parentValue: Ref<number> = ref(1);

function updateParentValue(value: number) {
  parentValue.value = value; // 更新父元件的值
}

onMounted(() => {
  loadCart();
});

definePageMeta({
  middleware: [
    auth
  ]
});
</script>

<template>
  <div class="flex">
    <div>
      <div v-for="product in cart" class="flex">
        <img :src="product.thumbnail" alt="">
        <div>
          <p>{{ product.title }}</p>
          <p>{{ product.price }} cad</p>
        </div>
        <div>
          <p v-if="product.stock - product.quantity === 0">已達商品購買上限</p>
          <div >
            <button @click="decreaseQuantity(product)" :disabled="product.quantity <= 1">-</button>
            <input
              type="number"
              v-model.number="product.quantity"
              @input="handleQuantityChange(product)"
              :min="1"
              :max="product.stock"
            />
            <button @click="increaseQuantity(product)" :disabled="product.quantity >= product.stock">+</button>
          </div>
        </div>
        <p>$ {{ (product.price * product.quantity).toFixed(2) }} cad</p>
        <button @click="removeFromCart(product.id)">delete</button>
      </div>
    </div>
    <div>
      <h3>Detail</h3>
      <p>商品總數: {{ totalQuantity }}</p>
      <p>商品金額: {{ totalAmount }} cad</p>
      <p>税: {{ (totalAmount * 0.012).toFixed(2) }} (12%)</p>
      <p>總金額: {{ (totalAmount * 1.012).toFixed(2) }} cad</p>
      <button>結帳</button>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}
</style>
