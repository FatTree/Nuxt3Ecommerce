<script setup lang="ts">
const { locale, locales, setLocale, availableLocales } = useI18n();
const { $auth, $signOut } = useNuxtApp();

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
  isOverlay.value = false;
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
  isOverlay.value = true;
}


const clickOverlay = () => {
  isOverlay.value = false;
  isLanOpen.value = false;
  isCateOpen.value = false;
  isCartOpen.value = false;
  isMBMenu.value = false;
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
  clickOverlay();
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

const logout = async () => {
  isOverlay.value = false;
  try {
    await $signOut($auth);
    router.push('/'); // 成功登入後重定向到儀表板頁面
  } catch (err) {
    console.log(err);
  }
};

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
  <div class="nav">
    <div class="content desktop">
      <div class="content__item">
        <nuxt-link to="/">
          <label class="logo">
            E.Com(desktop)
          </label>
        </nuxt-link>
        <div class="category content__item__btn">
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
      <div class="content__item">
        <nuxt-link to="/member" class="content__item__btn">
          <svgo-user-solid class="btn" />
        </nuxt-link>
        <div class="shoppingCart content__item__btn">
          <svgo-cart-shopping-solid class="btn" @click="openShoppingCart" />
          <shopping-cart v-show="isCartOpen" :cartProduct="cart" />
        </div>
        <div class="language content__item__btn">
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
    <div class="content pad">
      <div class="content__item">
        <nuxt-link to="/">
          <label class="logo">
            E.Com
          </label>
        </nuxt-link>
      </div>
      <div class="content__item">
        <div class="shoppingCart content__item__btn">
          <svgo-cart-shopping-solid class="btn" @click="openShoppingCart" />
          <shopping-cart v-show="isCartOpen" :cartProduct="cart" />
        </div>
        <div class="menu content__item__btn" @click="openMenu">
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
              <li @click="logout">log out</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay" @click="clickOverlay" v-show="isOverlay"></div>
  </div>
</template>

<style lang="scss" scoped>
.content.desktop {
  display: flex;
  @include pad {
    display: none;
  }
}

.content.pad {
  display: none;
  @include pad {
    display: flex;
  }
}

.nav {
  background: $violet-normal;
  color: $white;
  height: 50px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;

  a {
    text-decoration: none;
  }
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include basicRwdInsideContainer;

  &__item {
    display: flex;
    align-items: center;
    height: 100%;

    /* > div, a {
      height: 100%;
      min-width: 3em;
      text-align: center;
    } */
    &__btn {
      height: 100%;
      min-width: 3em;
      text-align: center;

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: .2em;
        background-color: $violet-light-hover;
        position: relative;
        bottom: 5px;
        left: calc(50% - 1.5em);
        transform: scale(0, 1);
        transition: transform .5s;
      }
      
      &:hover {
        background-color: $violet-normal-hover;
        &:after {
          width: 100%;
          display: block;
          transform: scale(1, 1);
        }
      }
    }

    .btn {
      @include label-l;
      color: $white;
      cursor: pointer;
    }

    .logo {
      color: $yellow-normal;
      cursor: pointer;
      @include title-l;
      @include pad {
        padding-left: .5em;
      }
    }

    .category {
      cursor: pointer;
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
    
    .menu {
      color: $black;

      > .menuList {
        background-color: $white;
        position: fixed;
        left: 0;
        right: 0;
        max-height: calc(100vh - 50px);
        overflow-y: scroll;
        box-shadow: 0 0 1em $white-hover-active;
        z-index: 100;
    
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
  }
}

.shoppingCart {
  @include dropdown(.5em, 1em);
}

.nuxt-icon {
  height: 100%;
}
</style>
