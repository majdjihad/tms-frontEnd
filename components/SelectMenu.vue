<script setup>
const props = defineProps(["options", "disabled"]);
</script>

<template>
  <select
    class="form-select form-select-sm"
    aria-label="Default select example"
    :disabled="disabled"
  >
    <option
      value="option"
      class="btn text-start p-4"
      v-for="(option, index) in options"
      :key="index"
    >
      {{ option }}
    </option>
  </select>
</template>

<style scoped>
</style>