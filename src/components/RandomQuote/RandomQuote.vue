<script setup lang="ts">
import { onMounted, ref } from "vue";
import Maxim from "../UI/Maxim.vue";
import { getRandomQuote } from "../../services/MaximService";
import Button from "../UI/Button.vue";
import ShareButton from "../UI/ShareButton.vue";
import { useFavouritesStore } from "../../stores/favourites";
import Loader from "../UI/Loader.vue";

const favourites = useFavouritesStore();

const randomQuote = ref(<any>[]);
const quoteHistory = ref(<any>[]);
const activeQuote = ref(0);
const isLoading = ref(true);

const refreshQuote = async () => {
  const quote = await getRandomQuote();
  quoteHistory.value.push(quote);
  activeQuote.value++;

  randomQuote.value = quote;
};

const prevQuote = (): void => {
  if (activeQuote.value > 1) {
    activeQuote.value--;
    randomQuote.value = quoteHistory.value[activeQuote.value - 1];
    favourites.isInFavourites(randomQuote.value);
  }
};

const nextQuote = async () => {
  if (quoteHistory.value.length > activeQuote.value) {
    randomQuote.value = quoteHistory.value[activeQuote.value];
    activeQuote.value++;
    favourites.isInFavourites(randomQuote.value);
  } else {
    isLoading.value = true;
    await refreshQuote();
    isLoading.value = false;
    favourites.isInFavourites(randomQuote.value);
  }
};

onMounted(async () => {
  isLoading.value = false;
  await refreshQuote();
  isLoading.value = false;
  favourites.isInFavourites(randomQuote.value);
});
</script>

<template>
  <div v-if="!isLoading" class="random-quote">
    <Maxim class="maxim-quote" :quote="randomQuote" />
    <div class="maxim-btn-panel">
      <Button @click="prevQuote" :disabled="activeQuote === 1">
        Previous
      </Button>
      <Button
        :disabled="favourites.isInFavs"
        @click="favourites.addToFavourites(randomQuote)"
      >
        Add to Favourites
      </Button>
      <ShareButton :quote="randomQuote"> Share </ShareButton>
      <Button @click="nextQuote">Next</Button>
    </div>
  </div>
  <Loader class="loader" v-else></Loader>
</template>

<style lang="scss">
.maxim-quote {
  margin-bottom: 24px;
  align-items: center;
}

.maxim-btn-panel {
  margin-top: 24px;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  bottom: 8px;

  @media (min-width: 768px) {
    left: calc(50% - 227px);
  }
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
</style>
