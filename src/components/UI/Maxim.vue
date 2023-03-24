<script setup lang="ts">
import type { PropType } from "vue";
import type { Quote } from "@/interfaces/IQuote";
import { RouterLink } from "vue-router";

const props = defineProps({
  quote: Object as PropType<Quote>,
});
</script>

<template>
  <div v-if="props.quote" class="maxim">
    <div class="maxim-tags">
      <RouterLink
        class="maxim-tag"
        v-for="tag in props.quote.tags"
        :to="{ name: 'list', params: { item: tag } }"
        @click="$emit('reload')"
        >#{{ tag }}</RouterLink
      >
    </div>
    <h3 class="maxim-title">{{ props.quote.content }}</h3>
    <p class="maxim-subtitle">{{ props.quote.author }}</p>
  </div>
</template>

<style scoped lang="scss">
.maxim {
  display: flex;
  flex-direction: column;
  margin: 32px 20px;
}

.maxim-tag {
  color: $cl-black;
  margin: 0 6px;
}

.maxim-title {
  font-family: $font-primary;
  font-weight: 600;
  font-size: 24px;
  font-style: italic;
}

.maxim-subtitle {
  font-family: $font-primary;
  font-size: 16px;
}
</style>
