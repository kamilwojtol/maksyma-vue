<script setup lang="ts">
import { onMounted, ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import Maxim from "./Maxim.vue";
import { getRandomQuote } from "../services/MaximService";
import Button from "./UI/Button.vue";
import ShareButton from "./ShareButton.vue";
import { useFavouritesStore } from "../stores/favourites";
import useSwipe from "../composables/useSwipe";

const favourites = useFavouritesStore();

const randomQuote = ref(<any>[]);
const quoteHistory = ref(<any>[]);
const carousel = ref(<any>[]);
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
    favourites.isInFavourites(randomQuote.value);
  }
};

onMounted(async () => {
  await refreshQuote();
  useSwipe(carousel.value);
  favourites.isInFavourites(randomQuote.value);
});
</script>

<template>
  <div ref="carousel" v-if="randomQuote" class="random-quote">
    <Carousel :items-to-show="1">
      <Slide class="maxim-slide" v-for="slide in quoteHistory" :key="slide">
        <Maxim :quote="randomQuote" />
        <!-- <Button @click="prevQuote" :disabled="activeQuote === 1">
          Previous Quote
        </Button> -->
        <div class="maxim-btn-panel">
          <Button
            :disabled="favourites.isInFavs"
            @click="favourites.addToFavourites(randomQuote)"
          >
            Add to Favourites
          </Button>
          <ShareButton :quote="randomQuote"> Share </ShareButton>
        </div>
        <!-- <Button @click="nextQuote">Next Quote</Button> -->
      </Slide>
    </Carousel>
  </div>
</template>

<style lang="scss">
.maxim-slide {
  display: flex;
  flex-direction: column;
}

.maxim-btn-panel {
  display: flex;
  flex-direction: row;
}
</style>
