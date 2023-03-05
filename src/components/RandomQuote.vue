<script setup lang="ts">
import { onMounted, ref } from "vue";
import Maxim from "./Maxim.vue";
import { getRandomQuote } from "../services/MaximService";
import Button from "./UI/Button.vue";
import { useFavouritesStore } from "../stores/favourites";

const favourites = useFavouritesStore();

const randomQuote = ref(<any>[]);
const quoteHistory = ref(<any>[]);
let activeQuote = ref(0);

const refreshQuote = async () => {
  const quote = await getRandomQuote();
  quoteHistory.value.push(quote);
  activeQuote.value++;

  randomQuote.value = quote;
};

const prevQuote = () => {
  if (activeQuote.value > 1) {
    activeQuote.value--;
    randomQuote.value = quoteHistory.value[activeQuote.value - 1];
  }
};

const nextQuote = async () => {
  if (quoteHistory.value.length > activeQuote.value) {
    randomQuote.value = quoteHistory.value[activeQuote.value];
    activeQuote.value++;
  } else {
    await refreshQuote();
  }
};

onMounted(async () => {
  await refreshQuote();
});
</script>

<template>
  <div v-if="randomQuote" class="random-quote">
    <p>Yours quote is:</p>
    <Maxim :quote="randomQuote" />
    <Button @click="prevQuote" :disabled="activeQuote === 1">
      Previous Quote
    </Button>
    <Button
      :disabled="favourites.isInFavourites(randomQuote)"
      @click="favourites.addToFavourites(randomQuote)"
    >
      Add to Favourites
    </Button>
    <Button @click="nextQuote">Next Quote</Button>
  </div>
</template>
