<script lang="ts" setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <button :disabled="props.disabled" class="btn">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button.btn {
  font-family: $font-primary;
  border: 2px solid $cl-primary;
  border-radius: 2px;
  background-color: $cl-primary;
  color: $cl-black;
  margin: 6px;
}
</style>
