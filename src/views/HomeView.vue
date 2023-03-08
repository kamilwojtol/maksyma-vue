<script setup lang="ts">
import RandomQuote from "../components/RandomQuote.vue";
</script>

<template>
  <main>
    <RandomQuote />
  </main>
</template>

<style lang="scss">
main {
  height: calc(100vh - 51px);
  overflow-y: hidden;
  display: flex;
  justify-content: center;
}
</style>
