<script setup lang="ts"></script>

<template>
  <div class="layout">
    Layout: layout
    <svgo-user-solid />
    {{ $t('category') }}
    <navBar />
    <slot />
  </div>
</template>

<style scoped></style>
