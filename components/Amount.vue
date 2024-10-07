<script lang="ts" setup>
type Props = {
    max?: number;
    defaultAmount?: number;
    isDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    max: 5,
    defaultAmount: 1,
    isDisabled: false,
});

const emit = defineEmits(['updateAmountValue']);

const amount: Ref<number> = ref(1);
const isAdd = computed(() => (amount.value === props.max))
const isMinus = computed(() => (amount.value === 1));

watch(amount, () => {
    if(amount.value > props.max) {
        amount.value = props.max;
    } else if (amount.value < 1 || typeof amount.value !== 'number') {
        amount.value = 1;
    } else {
        return;
    }
});

const emitValue = () => {
    emit('updateAmountValue', Number(amount.value));
}



const increaseAmount = () => {
    if (isAdd.value) {
        return;
    } else {
        amount.value += 1;
        emitValue();
    }
}

const decreaseAmount = () => {
    if (isMinus.value) {
        return;
    } else {
        amount.value -= 1;
        emitValue();
    }
}

onMounted(() => {
    amount.value = props.defaultAmount;
})

</script>
<template>
    <div class="amount">
        <div @click="decreaseAmount" class="amount__symbol amount__add" :class="isMinus ? 'disabled' : ''">
            <svgo-minus-solid />
        </div>
        <input class="amount__input" v-model="amount" />
        <div @click="increaseAmount" class="amount__symbol amount__decrease":class="isAdd ? 'disabled' : ''">
            <svgo-plus-solid />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.amount {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    border-radius: 0.5em;
    border: 1px solid #7B1FC7;
    width: 6em;
    user-select: none;  /* 禁用選取 */
    -webkit-user-select: none;  /* 對於 Safari 和 Chrome */
    -moz-user-select: none;  /* 對於 Firefox */
    -ms-user-select: none;  /* 對於 Internet Explorer/Edge */
    @include label-l;

    &__symbol {
        cursor: pointer;

        &.disabled {
            color: $white-hover-active;
        }
    }

    &__add {

    }
    &__input {
        padding: 0;
        border-radius: 0;
        border: none;
        all: unset;
        width: 1em;
    }
    &__decrease {

    }
}

.amount {
    
}
</style>