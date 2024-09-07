<script setup lang="ts">
import type { ProductDetailModel } from '~/models/apiModel';

const route = useRoute()
// router
const category: string = route.params.category as string;
const id: string = route.params.id as string;

// store
const productStore = useProduct();
const {
    productDetail
} = storeToRefs(productStore);
const {
    getProductDetail
} = productStore;

const detail: Ref<ProductDetailModel> = ref({} as ProductDetailModel)


onMounted(async() => {
    await getProductDetail(id);
    detail.value = productDetail.value;
    console.log(detail.value)
})
</script>

<template>
    <div>
        <div class="flex">
            <img :src="detail.thumbnail" alt="">
            <div>
                <h3>{{ detail.title }}</h3>
                <p>rate: {{ detail.rating }}</p>
                <div>
                    {{ detail.description }}
                </div>
                <p>{{ detail.price }} cad</p>
                <button>add to cart</button>
            </div>
        </div>
        <div>
            <h3>reviews</h3>
            <div>
                <div v-for="rv in detail.reviews">
                    <p>{{ rv.rating }}</p>
                    <p>{{ rv.date }}</p>
                    <p>{{ rv.reviewerName }}</p>
                    <p>{{ rv.comment }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flex {
    display: flex;
}
</style>