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
            <div class="emptyOption" v-if="cartProduct?.length === 0">
                購物車尚未有任何品項
            </div>
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
    height: auto;
    max-height: none;
    @include pad {
        
    }

    > .title {
        color: $violet-normal;
        text-align: left;
        padding: .5em 0;
        @include title-m;
    }

    > .dropdown__options {
        max-height: 69vh;
        overflow-y: scroll;
        @include pad {
            max-height: 72vh;
        }

        > .emptyOption {
            color: $white-hover-active;
            @include label-m;
        }

        > .option {
            width: 350px;
            display: flex;
            justify-content: space-between;
            text-align: left;
            cursor: default;
    
            @include pad {
                width: calc(100vw - 2em);
            }
    
            &:hover {
                background-color: $white;
            }
    
            > .btn {
                padding-top: 1em;
                color: $white-hover;
                cursor: pointer;
            }
        }
    }


    > .customBtn {
        margin-top: 1em;
    }
}

.option {
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

        @include pad {
            flex-grow: 3;
        }

        > .title {
            @include title-s;
        }
        > .content {
            @include paragraph-m;
        }
    }
}
</style>