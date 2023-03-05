import { ref } from "vue";
import { defineStore } from "pinia";

export const useFavouritesStore = defineStore("favourites", () => {
  const favs = ref(<string[]>[]);

  function addToFavourites(payload: any) {
    if (favs.value) {
      localStorage.setItem(
        "favourites",
        JSON.stringify([...getFavourites(), payload])
      );
      favs.value.push(payload);
    }
  }

  function getFavourites(): string[] {
    const localFavs = localStorage.getItem("favourites");

    if (localFavs) {
      favs.value = JSON.parse(localFavs);
      return JSON.parse(localFavs);
    }

    return favs.value;
  }

  function deleteFromFavourites(id: string) {
    favs.value = favs.value.filter((fav: any) => !(fav._id === id));
    localStorage.setItem("favourites", JSON.stringify(favs.value));
  }

  function isInFavourites(randomQuote: any): boolean {
    if (randomQuote._id && favs.value.length) {
      return Boolean(
        favs.value.find((quote: any) => {
          quote._id == randomQuote._id;
        })
      );
    }

    return false;
  }

  return {
    favs,
    addToFavourites,
    getFavourites,
    deleteFromFavourites,
    isInFavourites,
  };
});
