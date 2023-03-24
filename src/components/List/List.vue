<script setup lang="ts">
import { getQuotesListWithTag } from "@/services/MaximService";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Maxim from "../UI/Maxim.vue";

const route = useRoute();

const quotes = ref();

const refreshPage = async (): Promise<void> => {
  const quotesWithParams = await getQuotesListWithTag(
    route.params.item.toString()
  );
  quotes.value = await quotesWithParams.results;
};

onMounted(async () => {
  await refreshPage();
});
</script>

<template>
  <div v-if="quotes">
    <Maxim v-for="quote in quotes" :quote="quote" />
  </div>
</template>

<style lang="scss" scoped></style>
