<script setup lang="ts">
import type { PropType } from 'vue';
import { useFavouritesStore } from '../stores/favourites';

const favourites = useFavouritesStore();

const props = defineProps({
  quote: Object as PropType<any>
})
</script>

<template>
  <div v-if="props.quote" class="maxim">
    <h3 class="maxim-title">{{ props.quote?.content }}</h3>
    <p class="maxim-subtitle">{{ props.quote?.author }}</p>
  </div>
  <button @click="favourites.addToFavourites(props.quote)">Add to Favourites</button>
</template>

