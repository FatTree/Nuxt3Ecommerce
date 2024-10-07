<script setup lang="ts"></script>

<template>
  <div class="layout">
    <navBar />
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  margin: 0 auto;
  /* height: calc(100vh - 50px); */
  padding-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
