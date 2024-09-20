<script setup lang="ts">
const { locale, locales, setLocale, availableLocales } = useI18n();

const categoryStore = useCategory();
const shoppingCartStore = useShoppingCartStore();

const {
  getCateProdList
} = categoryStore;

const {
  categoryList
} = storeToRefs(categoryStore);

const {
    cart, 
} = storeToRefs(shoppingCartStore);

const router = useRouter();
const aaa: Ref<HTMLDivElement | undefined> = ref();

// i18n
const switchLan = (lan: string) => {
  locale.value = lan;
  isLanOpen.value = false;
};

// category
const isCateOpen: Ref<boolean> = ref(false);
const openCate = () => {
  isOverlay.value = true;
  isCateOpen.value = !isCateOpen.value;
  isCartOpen.value = false;
  isLanOpen.value = false;
}

const isCartOpen: Ref<boolean> = ref(false);
const isLanOpen: Ref<boolean> = ref(false);
const isOverlay: Ref<boolean> = ref(false);
const isMBMenu: Ref<boolean> = ref(false);

const openMenu = () => {
  isMBMenu.value = !isMBMenu.value;
}

const clickOverlay = () => {
  isOverlay.value = false;
  isLanOpen.value = false;
  isCateOpen.value = false;
  isCartOpen.value = false;
}

const openShoppingCart = () => {
  isCartOpen.value = !isCartOpen.value;
  isLanOpen.value = false;
  isCateOpen.value = false
  isOverlay.value = true;
}

const openLan = () => {
  isLanOpen.value = !isLanOpen.value;
  isCateOpen.value = false;
  isCartOpen.value = false;
  isOverlay.value = true;
}

const clickCateItem = (cate: string) => {
  isCateOpen.value = false;
  isCartOpen.value = false;
  isLanOpen.value = false;
  isOverlay.value = true;
  router.push(`/${cate}`);
};


const scrollableDiv: Ref<HTMLDivElement | undefined> = ref();
let scrollInterval: NodeJS.Timeout | null;

const scrollDiv = () => {
  if (scrollInterval) return;
  scrollInterval = setInterval(() => {
    if(scrollableDiv.value) {
      scrollableDiv.value.scrollTop += 10;
    }
  }, 500);
}

const stopScrolling = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
}

onBeforeMount(async () => {
  await getCateProdList();
});

onUnmounted(() => {
  if (scrollInterval !== null) {
    clearInterval(scrollInterval);
  }
})
</script>

<template>
  <div class="desktop">
    <div class="navbar">
      <div class="overlay" v-show="isOverlay" @click="clickOverlay"></div>
      <div class="navbar__item">
        <nuxt-link to="/">
          <label class="logo">
            E.Com(desktop)
          </label>
        </nuxt-link>
        <div class="category">
          <svgo-list-solid class="btn" @click="openCate"/>
          <div class="dropdown" v-show="isCateOpen">
            <ul class="dropdown__options" ref="scrollableDiv">
              <li class="option" v-for="item in categoryList" :key="item.slug" @click="clickCateItem(item.slug)">
                {{ item.name}}
              </li>
            </ul>
            <div class="cateBtm" @mouseover.stop="scrollDiv" @mouseleave="stopScrolling">
              <svgo-caret-right-solid class="cateBtm__arrow" />
            </div>
          </div>
        </div>
      </div>
      <div class="navbar__item">
        <nuxt-link to="/member">
          <svgo-user-solid class="btn" />
        </nuxt-link>
        <div class="shoppingCart">
          <svgo-cart-shopping-solid class="btn" @click="openShoppingCart" />
          <shopping-cart v-show="isCartOpen" :cartProduct="cart" />
        </div>
        <div class="language">
          <svgo-language-solid class="btn" @click="openLan" />
          <div class="dropdown" v-show="isLanOpen">
            <div class="dropdown__options">
              <div v-for="lc in availableLocales" class="option" @click="switchLan(lc)" >
                {{ lc }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pad">
    <div class="navbar">
      <div class="overlay" v-show="isOverlay" @click="clickOverlay"></div>
      <div class="navbar__item">
        <nuxt-link to="/">
          <label class="logo">
            E.Com
          </label>
        </nuxt-link>
      </div>
      <div class="navbar__item">
        <div class="shoppingCart">
          <svgo-cart-shopping-solid class="btn" @click="openShoppingCart" />
          <shopping-cart v-show="isCartOpen" :cartProduct="cart" />
        </div>
        <div class="menu" @click="openMenu">
          <svgo-bars-solid class="btn" />
          <div class="menuList mobile" v-show="isMBMenu">
            <ul class="dropdown__options" ref="scrollableDiv">
              <li class="option" @click.stop="openCate">
                <div class="item">
                  <svgo-list-solid class="btn" />
                  Category
                </div>
                <svgo-angle-right-solid class="right" :class="isCateOpen ? 'down' : ''" />
              </li>
              <div class="optionside" v-show="isCateOpen">
                <ul class="optionside__options" ref="scrollableDiv">
                  <li class="option" v-for="item in categoryList" :key="item.slug" @click.stop="clickCateItem(item.slug)">
                    {{ item.name}}
                  </li>
                </ul>
              </div>
              <li class="option" @click.stop="openLan">
                <div class="item">
                  <svgo-language-solid class="btn" />
                  Language
                </div>
                <svgo-angle-right-solid class="right" :class="isLanOpen ? 'down' : ''" />
              </li>
              <div class="optionside" v-show="isLanOpen">
                <div class="optionside__options">
                  <div v-for="lc in availableLocales" class="option" @click.stop="switchLan(lc)" >
                    {{ lc }}
                  </div>
                </div>
              </div>
              <nuxt-link to="/member" class="option">
                <div class="item">
                  <svgo-user-solid class="btn" />
                  Member
                </div>
              </nuxt-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@media (min-width: 1101px) {
  .desktop {
    display: block;
  }
  .pad {
    display: none;
  }
}

@media (max-width: 1100px) {
  .desktop {
    display: none;
  }
  .pad {
    display: block;
  }
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background-color: rgba(0,0,0,.2); */
}

.navbar {
  background: $violet-normal;
  color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  position: fixed;
  left: 0;
  right: 0;

  a {
    text-decoration: none;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 100%;

    > div, a {
      height: 100%;
      min-width: 3em;
      text-align: center;
    }

    .btn {
      @include label-l;
      color: $white;
      cursor: pointer;
    }
  }
}

@mixin dropdown ($right: .5em, $after: 1em) {
  position: relative;

  > .dropdown {
    text-align: left;
    color: $black;
    position: absolute;
    top: 4em;
    right: $right;
    width: max-content;
    border-radius: .5em;
    padding: .3em 0;
    box-shadow: 0 0 1em $white-hover-active;
    z-index: 100;
    background-color: $white;
    max-height: 90vh;

    &::after {
      content: '';
      position: absolute;
      top: -0.4em;
      right: $after;
      rotate: 45deg;
      display: block;
      background-color: $white;
      width: .8em;
      height: .8em;
      z-index: 0;
    }

    >.dropdown__options {
      position: relative;
      z-index: 1;
      max-height: 85vh;
      overflow-y: scroll;

      > .option {
        color: $violet-normal;
        @include label-m;
        padding: 1em 1.5em;
        cursor: pointer;

        &:hover {
          transition: background-color .5s;
          background-color: $violet-light-hover;
        }
      }
    }
  }
}
.desktop {
  .category {
    @include dropdown(-2em, 3em);
  
    > .dropdown > .cateBtm {
      height: 1em;
      text-align: center;
  
      &:hover {
        transition: background-color .5s;
        background-color: $violet-light-hover;
      }
  
      > .cateBtm__arrow {
        rotate: 90deg;
        color: $violet-normal;
      }
    }
  }
  
  .language {
    @include dropdown(.5em, 1em);
  }
  
  .shoppingCart {
    @include dropdown(.5em, 1em);
  }
}

.menu {
  color: $black;
  > .menuList {
    background-color: $white;
    border: 1px solid #000;
    position: fixed;
    left: 0;
    right: 0;
    max-height: calc(100vh - 50px);
    overflow-y: scroll;

    > .dropdown__options {
      > .option {
        padding: 1em 2em;
        text-align: left;
        color: $violet-normal;
        display: flex;
        justify-content: space-between;
        @include title-s;

        &:active {
          background-color: $violet-light-active;
        }

        > .item {
          > .btn {
            color: $violet-normal;
            padding-right: 1em;
          }
        }

        .right {
          rotate: 0deg;
        }
        .right.down {
          rotate: 90deg;
          transition: rotate .5s;
        }
      }
      > .optionside {
        text-align-last: left;
        > .optionside__options {
          > .option {
            padding: 1em 5em;
            &:active {
              background-color: $violet-light-active;
            }
          }
        }
      }
    }
  }

}

.logo {
  color: $yellow-normal;
  @include title-l;
  
}

.category {
  cursor: pointer;
}

.nuxt-icon {
  height: 100%;
}
</style>
