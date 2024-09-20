<script lang="ts" setup>
type Props = {
    rating: number;
}

const props = withDefaults(defineProps<Props>(), {
    rating: 0,
});

const rate = computed( () => (props.rating/5)*100 + '%')

</script>
<template>
    <div class="ratingStars"></div>
</template>
<style scoped lang="scss">
.ratingStars {
    position: relative;
    width: 5.5em;
    height: 1em;

    &::before {
        content: '★★★★★';
        font-size: 1em;
        letter-spacing: .1em;
        background: linear-gradient(90deg, #FFDD00 v-bind(rate), $white-hover-active v-bind(rate));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        white-space: nowrap;
    }
}

</style>