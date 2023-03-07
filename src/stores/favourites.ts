import { ref } from "vue";
import { defineStore } from "pinia";

export const useFavouritesStore = defineStore("favourites", () => {
  const favs = ref(<string[]>[]);
  const isInFavs = ref(false);

  function addToFavourites(payload: any) {
    if (!isInFavs.value) {
      localStorage.setItem(
        "favourites",
        JSON.stringify([...getFavourites(), payload])
      );
      favs.value.push(payload);
      isInFavs.value = true;
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

  function isInFavourites(fav: any): void {
    if (fav._id && favs.value.length) {
      isInFavs.value = Boolean(
        favs.value.find((quote: any) => {
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
