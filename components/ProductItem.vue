<script lang="ts" setup>
import type { ProductDetailModel } from '~/models/apiModel';

type Props = {
    productList: Array<ProductDetailModel>;
    category: string;
}

const props = withDefaults(defineProps<Props>(), {
    productList: () => ([]),
    category: '',
});

const toProductDetail = async (id: string | number) => {
    await navigateTo(`/${props.category}/${id}`)
}

</script>
<template>
    <div v-for="prod in productList" :key="prod.id" @click="toProductDetail(prod.id)">
        <p>{{ prod.brand }} - {{ prod.title }}</p>
        <img :src="prod.thumbnail" alt="">
        <p>{{ prod.price }} cad</p>
        <p>{{ prod.stock }} left</p>
        <p>rating: {{ prod.rating }}</p>
        <button>add to cart</button>
    </div>
</template>