import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavouritesStore = defineStore('favourites', () => {
  const favs = ref(<string[]>[])

  function addToFavourites(payload: any) {
    if (favs.value) {
      favs.value.push(payload);
      console.log(favs.value);
    }
  }

  return { favs, addToFavourites }
})
