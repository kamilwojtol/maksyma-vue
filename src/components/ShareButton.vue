<script setup lang="ts">
import Button from "./UI/Button.vue";

const props = defineProps({
  quote: {
    type: Object,
    required: true,
  },
});

function shareFavourite(quote: any) {
  if (navigator.share) {
    return navigator.share({
      title: "Maksyma",
      text: `${quote.content} ~${quote.author}`,
      url: "https://developer.mozilla.org",
    });
  }

  return navigator.clipboard.writeText(`"${quote.content}" ~ ${quote.author}`);
}
</script>

<template>
  <Button class="btn" @click="shareFavourite(props.quote)">
    <slot />
  </Button>
</template>
