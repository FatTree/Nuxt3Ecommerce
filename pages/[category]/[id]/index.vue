<script setup lang="ts">
import type { ProductDetailModel } from '~/models/apiModel';
import { productToCartFormatter } from '~/formatter'

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

const amount: Ref<number> = ref(1);
const handleUpdatedData = (v: number) => {
    amount.value = v;
}

onMounted(async() => {
    await getProductDetail(id);
    detail.value = productDetail.value;
})
</script>

<template>
    <div class="productPage insideContainer">
        <h3 class="WIM">
            <NuxtLink class="WIM__link" to="/">index</NuxtLink>
            <label class="WIM__arrow">→</label>
            <NuxtLink class="WIM__link" :to="`/${category}`">{{ category }}</NuxtLink>
            <label class="WIM__arrow">→</label>
            <label class="WIM__now">{{ detail.title }}</label>
        </h3>
        <div class="productPage__top">
            <div class="img">
                <img :src="detail.thumbnail" alt="">
            </div>
            <div class="detail">
                <h3 class="detail__title">{{ detail.title }}</h3>
                <div class="detail__rate">
                    <RatingStars :rating="detail.rating" /> {{ detail.rating }}
                </div>
                <div class="detail__description">
                    {{ detail.description }}
                </div>
                <div class="detail__bottom">
                    <div class="detail__bottom__left">
                        <div class="top">
                            <div class="top__price">{{ detail.price }} cad</div>
                            <div class="top__left">{{ detail.stock }} left</div>

                        </div>
                        <Amount :max="detail.stock" @updateAmountValue="handleUpdatedData" />
                    </div>
                    <ButtonAddToCart class="detail__bottom__right" :cartProduct="productToCartFormatter(productDetail, amount)" />
                </div>
            </div>
        </div>
        <div class="productPage__bottom">
            <div class="reviews">
                <h3 class="reviews__title">Reviews</h3>
                <div class="reviewList">
                    <div class="review"v-for="rv in detail.reviews">
                        <div class="review__top">
                            <div class="review__top__item">
                                <div class="bighead"></div>
                                <div class="reviewContent">
                                    <p class="reviewerName">{{ rv.reviewerName }}</p>
                                    <RatingStars :rating="rv.rating" />
                                </div>
                            </div>
                            <p class="review__top__item reviewDate">{{ rv.date }}</p>
                        </div>
                        <p class="review__bottom reviewCommand">{{ rv.comment }}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.productPage {
    width: 60em;
    @include pad {
        margin: 0 3em;
    }
    @include mobile {
        margin: 0 1em;
    }
    
    &__top {
        display: flex;

        > .img {
            width: 40%;
        }

        >.detail {
            width: 60%;
        }

        @include pad {
            display: block;

            > .img {
                width: 100%;
            }

            >.detail {
                width: 100%;
                padding-top: 2em;
            }
        }
    }
    &__bottom {
        display: flex;

        @include pad {
            margin-top: 2em;
        }

        &::before {
            content: "";
            display: block;
            width: 50%;
            @include pad {
                display: none;
            }
        }

        > .reviews {
            width: 50%;
            @include pad {
                width: 100%;
            }
        }
    }
}

.productPage__top {
    > .img {
        display: flex;
        justify-content: center;

        > img {
            width: 20em;
        }
    }
    .detail {
        &__title {
            margin-bottom: .5em;
            @include title-m;
        }
        &__rate {
            display: flex;
            margin-bottom: 2em;
        }
        &__description {
            @include paragraph-m;
            margin-bottom: 1em;
        }

        &__bottom {
            display: flex;
            justify-content: end;

            &__left {
                > .top {
                    display: flex;
                    justify-content: space-between;
                    height: 20px;
                    @include label-m;
                    > .top__price {

                    }
                    > .top__left {
                        color: $white-hover-active;
                    }
                }
            }

            &__right {
                margin: 0 0 0 1em ;
            }
        }
    }
}

.productPage__bottom {
    
    > .reviews {
        display: block;
        padding: 1em;

        > .reviews__title {
            margin-bottom: 1em;
            @include title-s;
        }
        > .reviewList {
            > .review {
                padding: 1em 0;
            }
        }

    }
}

.review {
    padding-bottom: 1em;

    &__top {
        display: flex;
        justify-content: space-between;

        &__item {
            display: flex;

            > .bighead {
                width: 3em;
                height: 3em;
                border-radius: 50%;
                background-color: $violet-normal;
                margin-right: 1em;
            }
            > .reviewContent {

                > .reviewerName {
                    margin-bottom: .3em;
                    @include label-m;
                    @include fw-blod;
                }

            }
        }
        > .reviewDate {
            color: $white-hover-active;
            @include label-s;
        }
    }
    &__bottom.reviewCommand {
        margin-top: .5em;
        height: 3em;
        @include paragraph-m;
    }
}
</style>