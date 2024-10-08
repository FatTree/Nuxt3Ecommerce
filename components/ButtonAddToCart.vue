<script lang="ts" setup>
import type { cartProductModel } from '~/models/viewModel';
import { useShoppingCartStore } from '~/stores/useShoppingCartStore';

type Props = {
    cartProduct: cartProductModel;
    isDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    cartProduct: () => ({}) as cartProductModel,
    isDisabled: false,
});

const shoppingCartStore = useShoppingCartStore();

const { 
    addToCart
} = shoppingCartStore;

const isAdding: Ref<boolean> = ref(false);

const addCartAction = (cartProduct: cartProductModel) => {
    addToCart(cartProduct);
    isAdding.value = true;
    setTimeout(() => {
        isAdding.value = false;
    }, 1000);
}

</script>
<template>
    <div class="buttonAddToCart">
        <div class="buttonAddToCart__warning">
            <label v-if="isDisabled">已達到購買上限</label>
        </div>
        <div class="customBtn buttonAddToCart__btn" :disabled="isDisabled" @click.stop="addCartAction(cartProduct)">
            <label v-show="!isAdding" class="customBtn__text">add to cart</label>
            <!-- <div class="customBtn__animate loader"></div> -->
            <div v-show="isAdding" class="customBtn__animate" :class="isAdding ? 'loader' : ''"></div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes zoomout {
    0% { 
        scale: 0;
    }
    90% { 
        opacity: 1;
        scale: 1; 
    }
    100% {
        opacity: 0;
    }
}

.buttonAddToCart {
    &__warning {
        color: $warning;
        height: 20px;
        @include label-s;
    }

    &__btn {
        min-width: 6em;
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
}

.loader {
    border: 4px solid $yellow-normal; /* Light grey */
    border-top: 4px solid $violet-normal; /* Blue */
    border-radius: 50%;
    width: 1em;
    height: 1em;
    animation: spin 1s linear;
    position: relative;
    

    &::after {
        position: absolute;
        top: -7.5em;
        left: -7.5em;
        border-radius: 50%;
        background-color: rgba($yellow-normal-active, .5);
        content: "";
        display: block;
        width: 16em;
        height: 16em;
        animation: zoomout 1s;
    }
}
</style>