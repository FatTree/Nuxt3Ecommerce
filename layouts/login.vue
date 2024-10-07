<script setup lang="ts">
</script>

<template>
    <div class="login container">
        <div class="login__head">
            <div class="login__head__container">
                <h3>ECom</h3>
            </div>
        </div>
        <div class="login__content">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
.login {
    width: 100vw;
    height: 100vh;
    background-color: $white-hover;

    &__head {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        background-color: $violet-normal;
        color: $yellow-normal;
        display: flex;
        justify-content: center;

        &__container {
        @include basicRwdInsideContainer;
            > h3 {
                @include title-l;
                padding: 1em;
            }
        }
    }

    &__content {
        border: 1px solid;
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;

        &__bottom {
            > .el {
                display: block;
                height: 1em;
                text-align: center;
                margin-top: 1em;
            }

            > .errormsg {
                color: $warning;
            }
        }

        > .insideContainer {
            width: 18em;

            > .title {
                text-align: center;
                margin-bottom: 1em;
                @include title-m;
            }
            > input {
                display: block;
                width: calc(100% - 1em);
                margin-bottom: 1em;
            }
        }
    }
}
/* .insideContainer {
    width: 18em;

    > .title {
        text-align: center;
        margin-bottom: 1em;
        @include title-m;
    }
    > input {
        display: block;
        width: calc(100% - 1em);
        padding: .5em;
        border-radius: .5em;
        border-color: $violet-normal;
        margin-bottom: 1em;
    }
} */
</style>

