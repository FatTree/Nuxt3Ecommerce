<script lang="ts" setup>
import type { cartProductModel } from '~/models/viewModel';
type Props = {
    cartProduct?: cartProductModel[] | null;
}

const props = withDefaults(defineProps<Props>(), {
    cartProduct: () => ([]),
});

const router = useRouter();

const goToPage = () => {
    router.push('/purchaseOrder');
};

const shoppingCartStore = useShoppingCartStore();

const {
    loadCart,
    removeFromCart
} = shoppingCartStore;

onMounted(() => {
    loadCart();
})

</script>
<template>
    <div>
        <h3>shopping cart</h3>
        <div>
            <div v-for="item in cartProduct" :key="item.id" class="flex">
                <img :src="item.thumbnail" 
                    alt=""
                    style="width: 100px; height: 100px;">
                <div>
                    <h5>{{ item.title }}</h5>
                    <p>{{ item.price }} cad X {{ item.quantity }}</p>
                </div>
                <button @click="removeFromCart(item.id)">delete</button>
            </div>
        </div>
        <button @click="goToPage">purchase order</button>
    </div>
</template>

<style>
.flex {
    display: flex;
}
</style>