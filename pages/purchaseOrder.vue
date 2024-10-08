<script setup lang="ts">
import auth from '~/middleware/auth';
import type { cartProductModel } from '~/models/viewModel';

const shoppingCartStore = useShoppingCartStore();
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
  parentValue.value = value; 
}

const isDetailOpen: Ref<boolean> = ref(false);

onMounted(() => {
  loadCart();
});

definePageMeta({
  middleware: [
    // auth
  ]
});
</script>

<template>
  <div class="purchaseOrder insideContainer">
    <h3 class="WIM">
      <NuxtLink class="WIM__link" to="/">index</NuxtLink>
      <label class="WIM__arrow">→</label>
      <NuxtLink class="WIM__link">Purchase Order</NuxtLink>
    </h3>
    <div class="purchaseOrder__content">
      <div class="purchaseOrder__content__left">
        <div v-for="product in cart" class="purchaseItem">
          <div class="purchaseItem__img">
            <img :src="product.thumbnail" alt="">
          </div>
          <div class="purchaseItem__content">
            <div class="purchaseItem__content__title">
              <p class="title">{{ product.title }}</p>
              <p class="price">{{ product.price }} cad</p>
            </div>
            <div class="purchaseItem__content__detail">
              <div class="amountGroup">
                <div class="amountHint">
                  <label v-if="product.stock - product.quantity === 0">
                    已達商品購買上限
                  </label>
                </div>
                <div class="amount">
                    <div @click="decreaseQuantity(product)" class="amount__symbol amount__add" :class="product.quantity <= 1 ? 'disabled' : ''">
                        <svgo-minus-solid />
                    </div>
                    <input class="amount__input" 
                      :value="product.quantity" 
                      :min="1"
                      @input="handleQuantityChange(product)" />
                    <div @click="increaseQuantity(product)" class="amount__symbol amount__decrease":class="product.quantity >= product.stock ? 'disabled' : ''">
                        <svgo-plus-solid />
                    </div>
                </div>
                
              </div>
              <p class="total">$ {{ (product.price * product.quantity).toFixed(2) }} cad</p>
            </div>
          </div>
          <div class="purchaseItem__delete" @click="removeFromCart(product.id)">
            <div class="customBtn">
              <svgo-trash-can-solid />
            </div>
          </div>
        </div>
      </div>
      <div class="purchaseOrder__content__right">
        <div class="totalItem">
          <div class="totalItem__content"  :class="isDetailOpen ? 'open' : ''">
            <h3 class="totalItem__content__title">
              Detail
            </h3>
            <div class="totalItem__content__item">
              <p class="itemGroup">
                <label class="itemGroup__label">商品數量: </label>
                {{ totalQuantity }}
              </p>
              <p class="itemGroup">
                <label class="itemGroup__label">商品金額: </label>
                {{ totalAmount }} cad
              </p>
            </div>
            <div class="totalItem__content__item">
              <p class="itemGroup">
                <label class="itemGroup__label">税: </label>
                {{ (totalAmount * 0.012).toFixed(2) }} (12%)
              </p>
            </div>
            <div class="totalItem__content__item">
              <p class="itemGroup">
                <label class="itemGroup__label">總金額: </label>
                {{ (totalAmount * 1.012).toFixed(2) }} cad
              </p>
            </div>
          </div>
          <div class="totalItem__bottom">
            <div class="bottomGroup">
              <div class="bottomGroup__icon" @click="isDetailOpen = !isDetailOpen" :class="isDetailOpen ? 'open' : ''">
                <svgo-angle-right-solid />
              </div>
              <p class="bottomGroup__item">
                總金額: <label>{{ (totalAmount * 1.012).toFixed(2) }} cad </label>
              </p>
            </div>
            <div class="customBtn">
              結帳
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.purchaseOrder {
  @include pad {
    height: 100vh;
    overflow: scroll;
  }
  &__content {
    display: flex;

    &__left {
      width: 70%;
      /* margin: 1em; */
      padding: 1em;
      display: grid;
      row-gap: 1em;
    }

    &__right {
      width: 30%;
      padding: 1em;
    }

    @include pad {
      display: block;

      &__left {
        width: auto;
        margin-bottom: 100px;
      }

      &__right {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0;
      }
    }
  }
}

.purchaseItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: $white;
  border-radius: .5em;
  box-shadow: 0px 0px 5px $white-hover;

  &__img {
    max-width: 10rem;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    display: flex;
    width: 65%;

    &__title {
      width: 50%;

      > .title {
        @include title-m;
      }

      > .price {
        @include label-m;
      }
    }

    &__detail {
      display: flex;
      gap: 1em;
      align-items: center;
    }
  }

  @include mobile {
    &__img {
      max-width: 5rem;
    }
    &__content {
      display: flex;

      &__title {
        width: 100%;
      }

      &__detail {
        display: block;
      }
    }
  }
}
.purchaseItem__content__detail {
  >.total {
    padding-top: .5em;
    @include label-m;
  }

  .amountGroup {
    > .amountHint {
      height: 1.5em;
      color: $warning;
      @include label-s;
    }
  
    .amount {
      display: flex;
      justify-content: space-between;
      padding: 1em;
      border-radius: 0.5em;
      border: 1px solid #7B1FC7;
      width: 6em;
      height: 1em;
      user-select: none;  /* 禁用選取 */
      -webkit-user-select: none;  /* 對於 Safari 和 Chrome */
      -moz-user-select: none;  /* 對於 Firefox */
      -ms-user-select: none;  /* 對於 Internet Explorer/Edge */
      @include label-l;
  
      &__symbol {
          cursor: pointer;
  
          &.disabled {
              color: $white-hover-active;
          }
      }
  
      &__input {
          padding: 0;
          border-radius: 0;
          border: none;
          all: unset;
          width: 2em;
          text-align: center;
      }
    }
  }
}

@keyframes example {
  0% {
    transform: scaleY(0);
    transform-origin: bottom;
    display: none;
  }
  20% {
    display: block;
  }
  30% {
    transform: scaleY(.5);
    transform-origin: bottom;
  }
  100% {
    transform: scaleY(1);
    transform-origin: bottom;
  }
}

.totalItem {
  background-color: $white;
  border-radius: .5em;
  padding: 1em;
  box-shadow: 0px 0px 5px $white-hover;
  position: fixed;
  width: 19em;

  @include pad {
    position: initial;
    width: auto;;
  }

  
  &__content {
    @include label-m;

    @include pad {
      display: none;
      
      &.open {
        animation: example .1s linear 0s 1 alternate;
        display: block; 
      }
    }
    
    &__title {
      text-align: center;
      border-bottom: 1px solid $violet-normal;
      padding-bottom: 1em;
      @include title-m;
    }

    &__item {
      padding: 1em 0;
      border-bottom: 1px solid $violet-normal;
    }

  }
  &__bottom {
    margin-top: 1em;

    > .bottomGroup {
      display: none;
    }

    @include pad {
      display: flex;
      justify-content: space-between;
      
      > .bottomGroup {
        display: flex;
        align-items: center;
      }
    }
  }
}

.bottomGroup {
  &__icon {
    border-radius: 50%;
    height: 2em;
    width: 2em;
    background-color: $white-hover;
    rotate: -90deg;
    margin-right: 1em;

    &.open {
      background: $white-hover-active;
      rotate: 90deg;
      transition: all .5s;
    }

    > svg {
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  }
  &__item {
    > label {
      @include title-m;
    }
  }
}

.itemGroup {
  display: flex;
  @include label-m;
  line-height: 2em;

  &__label {
    display: block;
    width: 30%;
    text-align: right;
    margin-right: 1.5em;
  }
}
</style>
