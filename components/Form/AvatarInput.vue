<script setup>
// props
const props = defineProps(["from", "formDataError", "currentImage"]);
// === data === //
const previewImage = ref(props.currentImage);
const imageError = ref(false);
const imageErrorMessage = ref("image can't be more than 5mb");

// === methods === //
const handleImageChange = (event) => {
  // get uploaded files
  const files = event.target.files;
  // check if there is files and length more than 0
  if (files && files.length > 0) {
    // show the selected image in the image box
    let reader = new FileReader();
    reader.addEventListener("load", (e) => {
      previewImage.value = e.target.result;
    });
    reader.readAsDataURL(files[0]);
  }
};

// ===== computed ===== //
const defaultImage = computed(() => props.from == "user" ? "~/assets/media/avatars/blank-project.png" : "~/assets/media/avatars/blank-project.png");
</script>

<template>
  <div class="mb-7">
    <div
        class="image-input image-input-outline image-input-empty"
        :class="{'border border-danger border-2 ': imageError || formDataError}"
        data-kt-image-input="true"
        style="background-position: center !important; background-repeat: no-repeat !important; object-fit: cover !important;"
        :style="{ backgroundImage: previewImage ? `url('${previewImage}')` : `url('${defaultImage}')` }"
    >
      <div
          class="image-input-wrapper w-125px h-125px"
          style="background-position: center !important; background-repeat: no-repeat !important; object-fit: cover !important;"
          :style="{ backgroundImage: `url('${previewImage ? previewImage : currentImage }')` }"
      ></div>
      <label
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-kt-image-input-action="change"
          data-bs-toggle="tooltip"
          aria-label="Change avatar"
          data-bs-original-title="Change avatar"
          data-kt-initialized="1"
      >
        <i class="ki-outline ki-pencil fs-7"></i>
        <input
            type="file"
            name="photo"
            accept=".png, .jpg, .jpeg"
            @change="handleImageChange"
        />
      </label>
    </div>
    <div v-if="from == 'project'">Project Icon</div>
    <div v-else>Profile Photo</div>
    <div v-if="imageError || formDataError" class="w-100 mt-1">
      <span class="form-data-error">{{ imageErrorMessage }}</span>
      <span class="form-data-error">{{ formDataError }}</span>
    </div>
  </div>
</template>