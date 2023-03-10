import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FavouriteView from "../views/FavouriteView.vue";
import ListViewVue from "@/views/ListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/favourite",
      name: "favourite",
      component: FavouriteView,
    },
    {
      path: "/list/:item",
      name: "list",
      component: ListViewVue,
    },
  ],
});

export default router;
