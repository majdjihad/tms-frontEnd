<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      class="form-control text-end fs-5 rounded-1"
      :class="{ 'is-invalid': !!error }"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      :maxlength="maxlength"
      :disabled="disabled"
      :dir="dir"
    />
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: String,
  modelValue: [String, Number],
  error: String,
  type: { type: String, default: "text" },
  id: {
    type: String,
    default: () => `in-${Math.random().toString(36).slice(2)}`,
  },
  autocomplete: String,
  inputmode: String,
  maxlength: Number,
  disabled: Boolean,
  dir: { type: String, default: "auto" },
});
defineEmits(["update:modelValue"]);
</script>
<style scoped>
.form-control::placeholder,
.form-select::placeholder {
  color: #a5acb9;
  opacity: 1;
  font-weight: 400;
  font-size: 14px;
}
</style>