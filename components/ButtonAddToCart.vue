<script lang="ts" setup>
import type { cartProductModel } from '~/models/viewModel';
import { useShoppingCartStore } from '~/stores/useShoppingCartStore';

type Props = {
    cartProduct: cartProductModel;
    isDisabled: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    cartProduct: () => ({}) as cartProductModel,
    isDisabled: false,
});

const shoppingCartStore = useShoppingCartStore();

const { 
    addToCart
} = shoppingCartStore;
</script>
<template>
    <div class="customBtn" :disabled="isDisabled" @click.stop="addToCart(cartProduct)">
        add to cart
    </div>
</template>