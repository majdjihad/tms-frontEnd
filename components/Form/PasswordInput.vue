<script setup>
const model = defineModel();
const props = defineProps([
  "name",
  "placeholder",
  "labelText",
  "formDataError",
  "focus",
]);

// convert props values to refs
const { name, placeholder, labelText } = toRefs(props);
const eye = ref("eye-outline");
const inputType = ref("password");
// === computed === //
const changeEyeStatus = () => {
  if (eye.value === "eye-outline") {
    inputType.value = "text";
    eye.value = "eye-off-outline";
  } else {
    inputType.value = "password";
    eye.value = "eye-outline";
  }
};
</script>

<template>
  <div class="form-floating mb-7">
    <input
      :type="inputType"
      class="form-control"
      :name="name"
      :placeholder="placeholder"
      v-model="model"
      :class="{ 'input-error': formDataError }"
    />
    <Icon
      :name="`mdi:${eye}`"
      @click="changeEyeStatus"
      :class="[formDataError ? 'top-35' : '']"
      size="20"
      class="icon-eye text-secondary cursor-pointer position-absolute end-0 top-50"
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
.top-35 {
  top: 35% !important;
}

.input-error {
  border-color: var(--bs-danger);
}
.icon-eye {
  transform: translate(-50%, -50%);
  z-index: 100;
}
cursor-pointer {
  cursor: pointer;
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