<script setup lang="ts">
import { ref } from "vue";
import { useFavouritesStore } from "@/stores/favourites";

const favourites = ref(<any>[]);

const favStore: any = useFavouritesStore();
refreshFavourites();

function deleteFavourite(id: string) {
  favStore.deleteFromFavourites(id);
  refreshFavourites();
}

function refreshFavourites() {
  favourites.value = favStore.getFavourites();
}
</script>

<template>
  <div class="favourite-list" v-if="favourites.length">
    <div
      class="favourite-item"
      v-for="favourite in favourites"
      :key="favourite._id"
    >
      <h3 class="favourite-text">{{ favourite.content }}</h3>
      <p class="favourite-item">{{ favourite.author }}</p>
      <button @click="deleteFavourite(favourite._id)">
        Delete from Favourites
      </button>
    </div>
  </div>
  <div v-else>You don't have any favourites :(</div>
</template>
