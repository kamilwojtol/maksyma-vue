import { ref } from "vue";
import { defineStore } from "pinia";

export const useFavouritesStore = defineStore("favourites", () => {
  const favs = ref(<string[]>[]);

  function addToFavourites(payload: any) {
    if (favs.value) {
      favs.value.push(payload);
    }
  }

  function getFavourites() {
    return favs.value;
  }

  function deleteFromFavourites(id: string) {
    favs.value = favs.value.filter((fav: any) => !(fav._id === id));
  }

  return { favs, addToFavourites, getFavourites, deleteFromFavourites };
});
