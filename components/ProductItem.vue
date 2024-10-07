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
    <div class="productItem">
        <h3 class="productItem__title" :title="product.brand + ' - ' +product.title" @click="toProductDetail(product.id)">{{ product.brand }} - {{ product.title }}</h3>
        <div class="productItem__rating">
            <RatingStars :rating="product.rating" /> 
            {{ product.rating }}
        </div>
        <img class="productItem__img" :src="product.thumbnail" alt="" @click="toProductDetail(product.id)">
        <div class="productItem__info">
            <p class="price">{{ product.price }} cad</p>
            <p class="left">{{ product.stock }} left</p>
        </div>
        <ButtonAddToCart :isDisabled="isDisabled" :cartProduct="productToCartFormatter(product, parentValue)" />
    </div>
</template>
<style scoped lang="scss">

.productItem {
    background-color: $white;
    border-radius: .5em;
    box-shadow: 0px 0px 15px $white-hover;
    padding: 1.5em;
    width: 15em;
    min-width: 8em;
    transition: all .5s;
    cursor: pointer;

    @include pad {
        padding: 1em;
        width: 19%;
    }

    @include mobile {
        padding: 1em;
        width: 12em;
        /* height: 22em; */
    }

    &:hover {
        box-shadow: 0px 0px 15px $white-hover-active;
    }

    &__title {
        margin-bottom: 1em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        white-space: normal; 
        height: 2.7em;
        @include title-s;
    }

    &__rating {
        display: flex;
        margin-bottom: 1em;
        gap: 1em;
    }

    &__img {
        object-fit: cover;
        margin-bottom: 1em;
        width: 100%;
        /* height: 10em; */
        
        @include mobile {
            width: 100%;
        }
    }

    &__info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1em;
        > .left {
            color: $white-hover-active;
        }
    }
}
</style>