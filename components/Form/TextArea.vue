<script setup>
// define model to conent compoment with page that import
const model = defineModel();
// define props
const props = defineProps([
  "name",
  "placeholder",
  "labelText",
  "formDataError",
]);

</script>

<template>
  <div class="form-floating mb-7">
    <textarea
      :name="name"
      :placeholder="placeholder"
      class="form-control h-100px"
      :class="{ 'input-error': formDataError }"
      v-model="model"
    ></textarea>
    <label for="floatingInput" :class="{ 'text-danger': formDataError }">{{
      labelText
    }}</label>
    <div v-if="formDataError" class="w-100 text-start mt-1">
      <span class="form-data-error">{{
        typeof formDataError == "string" ? formDataError : formDataError[0]
      }}</span>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>