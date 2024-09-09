<script lang="ts" setup>
type Props = {
    max: number;
    isDisabled: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    max: 1,
    isDisabled: false,
});
const emit = defineEmits(['inputValue']);

function emitValue(event: Event) {
    const tg = event.target as HTMLInputElement
    emit('inputValue', Number(tg.value));
}

</script>
<template>
    <div>
        <input @click.stop="" type="number" @input="emitValue" min="0" :max="max">
    </div>
</template>