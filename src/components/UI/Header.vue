<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/favourite">Favourite</RouterLink>
    </nav>
  </header>
</template>

<style lang="scss">
header {
  margin-bottom: 12px;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

.link {
  font-family: $font-primary;
  text-transform: uppercase;
  color: $cl-black;
  font-size: 26px;
  text-decoration: none;
  margin-bottom: 3px;
  margin: 0 6px;

  &:hover {
    text-decoration: dotted;
  }

  &.router-link-active {
    text-decoration: underline;
  }
}
</style>
