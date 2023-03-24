<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import Header from "./components/UI/Header.vue";

const route = useRoute();
</script>

<template>
  <Header />
  <RouterView :key="route.fullPath" />
</template>
