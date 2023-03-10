<script setup lang="ts">
import { getQuotesListWithTag } from "@/services/MaximService";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Maxim from "../UI/Maxim.vue";

const route = useRoute();
const quotes = ref([]);

onMounted(async () => {
  const quotesWithParams = await getQuotesListWithTag(
    route.params.item.toString()
  );
  quotes.value = quotesWithParams.results;
});
</script>

<template>
  <div v-if="quotes">
    <Maxim v-for="quote in quotes" :quote="quote" />
  </div>
</template>

<style lang="scss" scoped></style>
