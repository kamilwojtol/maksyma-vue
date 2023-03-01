<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  quote: Object as PropType<any>,
});
</script>

<template>
  <div v-if="props.quote" class="maxim">
    <h3 class="maxim-title">{{ props.quote?.content }}</h3>
    <p class="maxim-subtitle">{{ props.quote?.author }}</p>
  </div>
</template>

<style scoped lang="scss">
.maxim-title {
  font-family: $font-primary;
  font-weight: 600;
  font-size: 48px;
  font-style: italic;
}

.maxim-subtitle {
  font-family: $font-primary;
  font-size: 24px;
}
</style>
