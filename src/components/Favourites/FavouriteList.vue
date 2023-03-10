<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useFavouritesStore } from "@/stores/favourites";
import Button from "../UI/Button.vue";
import ShareButton from "../UI/ShareButton.vue";
import Maxim from "../UI/Maxim.vue";

const favourites = ref<any>([]);

const favStore: any = useFavouritesStore();
const searchQuery = ref<string>("");

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

const filterFavs = computed(() => {
  if (searchQuery.value.length > 3) {
    const filteredArray = favourites.value.filter((fav: any) => {
      return (
        fav.author.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        fav.content.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
    favourites.value = filteredArray;
  } else {
    refreshFavourites();
  }
});
</script>

<template>
  <div class="favourite-list">
    <h3 class="title">My favourite quotes</h3>
    <input type="text" v-model="searchQuery" :keydown="filterFavs" />
    <div
      class="favourite-item"
      v-for="favourite in favourites"
      :key="favourite._id"
    >
      <Maxim class="maxim" :quote="favourite" />
      <Button @click="deleteFavourite(favourite._id)"> Delete </Button>
      <ShareButton :quote="favourite"> Share </ShareButton>
    </div>
  </div>
  <!-- <div class="title title-error" v-else>
    You don't have any favourite quotes, add one in Home page 😊
  </div> -->
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

.favourite-item {
  font-family: $font-primary;
  font-size: 16px;
  margin: 16px 0;

  .maxim {
    margin: 20px 0;
  }
}

button.btn {
  margin-left: 0;
}
</style>
