<script setup>
// define model to conent compoment with page that import
const model = defineModel();

// define props
const props = defineProps([
  "type",
  "name",
  "placeholder",
  "labelText",
  "autocomplete",
  "formDataError",
  "focus",
]);
</script>

<template>
  <div class="form-floating">
    <input
      id="floatingInput"
      :type="type"
      class="form-control"
      :name="name"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      v-model="model"
      :class="{ 'input-error': formDataError }"
    />
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

<style>
.form-data-error {
  color: var(--bs-danger);
  margin-left: 10px;
}

.input-error {
  border-color: var(--bs-danger);
}
#show-hide-pass {
  width: 50px;
  height: 50px;
  top: 0;
  right: 0;
  color: #cecece;
}

#show-hide-pass i {
  transition: all 0.3s ease;
}

#show-hide-pass:hover i {
  color: var(--bs-primary);
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

input.input-number-custom {
  padding: 6px;
  height: 30px !important;
  border-radius: 5px !important;
}
</style>
