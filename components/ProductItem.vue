<script lang="ts" setup>
import type { ProductDetailModel } from '~/models/apiModel';
import ButtonAddToCart from './ButtonAddToCart.vue';
import { productToCartFormatter } from '~/formatter'

type Props = {
    product: ProductDetailModel;
    category: string;
}

const props = withDefaults(defineProps<Props>(), {
    product: () => ({} as ProductDetailModel),
    category: '',
});

const shoppingCartStore = useShoppingCartStore();

const {
    findItemQuantity
} = shoppingCartStore;

const toProductDetail = async (id: string | number) => {
    await navigateTo(`/${props.category}/${id}`)
}

const parentValue: Ref<number> = ref(1);
const isDisabled = computed(() => {
    const inCartQuantity = Number(findItemQuantity(props.product.id));
    const stock = Number(props.product.stock);
    return inCartQuantity > stock || (parentValue.value + inCartQuantity) > stock;
});

const remain = computed( () => {
    const inCartQuantity = Number(findItemQuantity(props.product.id));
    const stock = Number(props.product.stock);
    
    return stock - inCartQuantity;
})

function updateParentValue(value: number) {
  parentValue.value = value; // 更新父元件的值
}
</script>
<template>
    <div>
        <p @click="toProductDetail(product.id)">{{ product.brand }} - {{ product.title }}</p>
        <img :src="product.thumbnail" alt="" @click="toProductDetail(product.id)">
        <p>{{ product.price }} cad</p>
        <p>{{ product.stock }} left</p>
        <p>rating: {{ product.rating }}</p>
        <p>{{ remain }}</p>
        <Amount :isDisabled="isDisabled" :max="remain" @inputValue="updateParentValue" />
        <ButtonAddToCart :isDisabled="isDisabled" :cartProduct="productToCartFormatter(product, parentValue)" />
    </div>
</template>