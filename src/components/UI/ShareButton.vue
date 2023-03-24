<script setup lang="ts">
import Button from "./Button.vue";
import type { Quote } from "@/interfaces/IQuote";
import type { PropType } from "vue";

const props = defineProps({
  quote: {
    type: Object as PropType<Quote>,
    required: true,
  },
});

function shareFavourite(quote: Quote) {
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
