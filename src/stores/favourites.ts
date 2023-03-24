import { ref } from "vue";
import { defineStore } from "pinia";
import type { Quote } from "@/interfaces/IQuote";

export const useFavouritesStore = defineStore("favourites", () => {
  const favs = ref(<Quote[]>[]);
  const isInFavs = ref(false);

  function addToFavourites(payload: Quote) {
    if (!isInFavs.value) {
      localStorage.setItem(
        "favourites",
        JSON.stringify([...getFavourites(), payload])
      );
      favs.value.push(payload);
      isInFavs.value = true;
    }
  }

  function getFavourites(): Quote[] {
    const localFavs = localStorage.getItem("favourites");

    if (localFavs) {
      favs.value = JSON.parse(localFavs);
      return JSON.parse(localFavs);
    }

    return favs.value;
  }

  function deleteFromFavourites(id: string) {
    favs.value = favs.value.filter((fav: Quote) => !(fav._id === id));
    localStorage.setItem("favourites", JSON.stringify(favs.value));
  }

  function isInFavourites(fav: Quote): void {
    if (fav._id) {
      isInFavs.value = Boolean(
        favs.value.find((quote: Quote) => {
          return quote._id === fav._id;
        })
      );
    }
  }

  return {
    favs,
    isInFavs,
    addToFavourites,
    getFavourites,
    deleteFromFavourites,
    isInFavourites,
  };
});
