<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFavouritesStore } from "@/stores/favourites";
import Button from "./UI/Button.vue";
import ShareButton from "./ShareButton.vue";

const favourites = ref(<any>[]);

const favStore: any = useFavouritesStore();

onMounted(() => {
  refreshFavourites();
});

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
    <h3 class="title">My favourite quotes</h3>
    <div
      class="favourite-item"
      v-for="favourite in favourites"
      :key="favourite._id"
    >
      <h3 class="favourite-text">{{ favourite.content }}</h3>
      <p class="favourite-author">{{ favourite.author }}</p>
      <Button @click="deleteFavourite(favourite._id)"> Delete </Button>
      <ShareButton :quote="favourite"> Share </ShareButton>
    </div>
  </div>
  <div class="title title-error" v-else>
    You don't have any favourite quotes, add one in Home page 😊
  </div>
</template>

<style lang="scss" scoped>
.favourite-list {
  display: flex;
  flex-direction: column;
  margin: 0 16px;

  @media (min-width: 768px) {
    max-width: 600px;
    margin: 0 auto;
  }
}

.title {
  font-family: $font-primary;
  font-size: 32px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;

  &-error {
    margin: 32px 0;
  }
}

.favourite-text {
  font-family: $font-primary;
  font-weight: 600;
  font-size: 24px;
  font-style: italic;
}

.favourite-item {
  font-family: $font-primary;
  font-size: 16px;
  margin: 16px 0;
}

.favourite-author {
  margin: 8px 0;
}

button.btn {
  margin-left: 0;
}
</style>
