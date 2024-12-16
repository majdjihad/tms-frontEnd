/**
 * @file create-project.vue
 * @description Project creation page that allows authenticated users to create new projects
 * Includes form validation, random key generation, and project data submission
 * Uses auth middleware to ensure only authenticated users can access
 */
<script setup>
import { useToast } from "vue-toastification";
import { useProjectsStore } from "~/stores/projectsStore";
import { useProjects } from "~/composables/useProjects";
import { useUser } from "~/composables/useAuth";
import { useSubmit } from "~/composables/useSubmit";

// Page metadata configuration
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Create Project",
});

// Initialize required composables and stores
const user = useUser();
const router = useRouter();
const projectsStore = useProjectsStore();
const { createProject } = useProjects();
const { keyProjects } = useProjects();
const toast = useToast();

// Form data and state management
const projectData = ref(null);
const projectsKeys = ref(null);
const data = reactive({
  title: "",
  description: "",
});

// Form validation error messages
const errorMsg = reactive({
  photo: null,
  errorName: null,
  errorDescription: null,
});

/**
 * Generates a random project key
 * Ensures uniqueness by checking against existing project keys
 * @returns {string} A unique project key of 3-5 uppercase letters
 */
function randomKey() {
  // Split the input into words
  const currentKey = ref("");
  const characters = ref("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const keyLength = ref(Math.floor(Math.random() * 3) + 3);
  for (let i = 1; i <= keyLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * characters.value.length);
    currentKey.value += characters.value.charAt(randomIndex);
  }
  if (
    !projectsKeys.value?.includes(currentKey.value) &&
    currentKey.value !== ""
  ) {
    return currentKey.value;
  } else {
    return randomKey();
  }
}

// Fetch existing project keys before component mount
onBeforeMount(async () => {
  const response = await keyProjects();
  projectsKeys.value = response?.key;
});

/**
 * Handles form submission and validation
 * Creates FormData object with project details and random key
 * Validates required fields before submission
 */
function formHandle() {
  !data.title
    ? (errorMsg.errorName = "Title is required")
    : !data.description
    ? (errorMsg.errorDescription = "Description is required")
    : "";
  projectData.value = new FormData(
    document.getElementById("createProjectForm")
  );
  projectData.value.append("user_id", user.value.id);
  projectData.value.append("key", randomKey());
  if (data.title && data.description) {
    errorMsg.errorName = null;
    errorMsg.errorDescription = null;
    submit();
    projectsStore.changeStatus = true;
  }
}

// Initialize form submission handler with success and error callbacks
const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(() => createProject(projectData.value), {
  onSuccess: (response) => {
    projectsStore.changeStatus = true;
    // Handle the response
    showToast("success", response.message);
    return navigateTo("/projects", { replace: true });
  },
  onError: (error) => {
    showToast("error", error);
  },
});

/**
 * Displays toast notifications for success/error messages
 * @param {string} statusCode - Type of toast ('success' or 'error')
 * @param {string} msg - Message to display
 */
function showToast(statusCode, msg) {
  const toastAttr = {
    position: "top-center",
    timeout: 5000,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: true,
    rtl: false,
  };

  if (statusCode === "success") {
    toast.success(msg, {
      ...toastAttr,
    });
  } else if (statusCode === "error") {
    toast.error(msg, {
      ...toastAttr,
    });
  }
}
</script>

<template>
  <div>
    <!-- Main container with full viewport height -->
    <div class="vh-100 d-flex flex-column flex-root" id="kt_app_root">
      <!-- Two-column layout container -->
      <div class="d-flex flex-column flex-lg-row flex-column-fluid">
        <!-- Left column: Project creation form -->
        <div
          class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
        >
          <div class="d-flex flex-center flex-column flex-lg-row-fluid">
            <div class="w-500px p-10">
              <!-- Project creation form with validation -->
              <form
                class="form w-100 text-center"
                @submit.prevent="formHandle"
                id="createProjectForm"
              >
                <div class="text-center mb-11">
                  <h1 class="text-dark fw-bolder mb-3">Create Project</h1>
                  <div class="text-gray-500 fw-semibold fs-6">
                    Create your first project
                  </div>
                </div>

                <!-- Project icon upload -->
                <FormAvatarInput from="project" name="icon" />

                <!-- Project details input fields -->
                <FormInput
                  type="text"
                  autocomplete="off"
                  labelText="Project Name"
                  name="name"
                  placeholder="Full Name"
                  v-model="data.title"
                  :formDataError="errorMsg.errorName"
                  class="mb-7"
                />

                <FormTextArea
                  name="description"
                  placeholder="Project Description..."
                  labelText="Project Description"
                  v-model="data.description"
                  :formDataError="errorMsg.errorDescription"
                  class="mb-7"
                />

                <!-- Submit button with loading state -->
                <div class="d-grid mb-10">
                  <button
                    :disabled="inProgress"
                    type="submit"
                    id="kt_sign_in_submit"
                    class="btn btn-primary btn-hover"
                  >
                    <span v-if="!inProgress" class="indicator-label"
                      >Create</span
                    >
                    <icon
                      v-else
                      name="svg-spinners:ring-resize"
                      class="indicator-label"
                      size="25"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Right column: Decorative section with logo -->
        <div
          class="bg d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 h-1"
        >
          <div
            class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100"
          >
            <NuxtLink to="/" class="mb-0 mb-lg-12">
              <img
                alt="Logo"
                src="~/assets/media/logos/logo-light.png"
                class="h-60px h-lg-75px"
              />
            </NuxtLink>

            <img
              class="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
              src="../assets/media/illustrations/misc/create-project.png"
              alt=""
            />
            <h1
              class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7"
            >
              Create Project
            </h1>
            <div class="d-none d-lg-block text-white fs-base text-center w-75">
              Doloremque in quam et at corrupti cupiditate quis quibusdam
              nemo,voluptates, voluptatum rem inventore? Nulla quia dolor eos
              reprehenderit atque ipsa ipsum!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-image: url(~/assets/media/misc/auth-bg.png)
}
</style>