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
    <div class="dropdown cart">
        <h3 class="title">shopping cart</h3>
        <div class="dropdown__options">
            <div v-for="item in cartProduct" :key="item.id" class="option">
                <img :src="item.thumbnail" 
                    class="option__img">
                <div class="option__content">
                    <h5 class="title">{{ item.title }}</h5>
                    <p class="content">{{ item.price }} cad X {{ item.quantity }}</p>
                </div>
                <svgo-trash-can-solid class="btn" @click="removeFromCart(item.id)" />
            </div>
        </div>
        <div class="customBtn" @click="goToPage"> Purchase Order</div>
    </div>
</template>

<style lang="scss" scoped>
.dropdown.cart {
    padding: 1em;

    > .dropdown__options > .option {
        cursor: default;
        > .btn {
            padding-top: 1em;
            color: $white-hover;
            cursor: pointer;
        }

        &:hover {
            background-color: $white;
        }
    }


    > .customBtn {
        margin-top: 1em;
    }
}

.dropdown {
    > .title {
        color: $violet-normal;
        text-align: left;
        padding: .5em 1em;
        @include title-m;
    }
}

.option {
    width: 350px;
    max-width: 350px;
    display: flex;
    justify-content: space-between;
    text-align: left;
    

    &__img {
        width: 100px;
        height: 100px;
    }

    &__content {
        width: 12em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: $black;

        > .title {
            @include title-s;
        }
        > .content {
            @include paragraph-m;
        }
    }
}
</style>