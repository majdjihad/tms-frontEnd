/**
 * Join (Registration) Page Component
 * Handles new user registration with:
 * - Form validation for name, email, and password
 * - Password strength requirements
 * - Terms and conditions acceptance
 * - Registration submission and error handling
 */
<script setup>
import { showToast } from "~/composables/useToast";
import { useAuth } from "~/composables/useAuth";
import { useSubmit } from "~/composables/useSubmit";
import { useRouter } from "vue-router";

// Configure page metadata and middleware
definePageMeta({
  layout: "none",
  middleware: ["guest"],
});

// Set page title
useHead({
  title: "Join",
});

// Initialize required composables and state
const { join } = useAuth();
const router = useRouter();
const inProgress = ref(false);

// Form data with reactive state
const formData = reactive({
  email: "",
});

// Validation error messages
const errorMsg = reactive({
  errorEmail: null,
});

// === Validation === //

//Validates email format using regex

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMsg.errorEmail = "Please enter a valid email address";
    return false;
  }
  errorMsg.errorEmail = null;
  return true;
};

/**
 * Handles form submission
 * Validates all inputs before making API call
 */
const formHandle = async () => {

  // Validate required fields
  if (!formData.email.trim() || !validateEmail(formData.email)) {
    return;
  }

  try {
    inProgress.value = true;
    const { submit, validationErrors: errors } = useSubmit(() => join(formData), {
      onSuccess: (response) => {
        // Handle the response
        router.push({
          path: "/welcome",
          query: {
            identify_number: response?.identify_number,
          },
        });
      },
      onError: (error) => {
        showToast("error", error.data.message);
        if (error?.data?.code === 400) {
          return navigateTo("/login", { replace: true });
        }
      },
    });
    await submit();
  } catch (error) {
    showToast("error", error.data?.message || "Registration failed");
  } finally {
    inProgress.value = false;
  }
};

</script>

<template>
  <div>
    <div class="vh-100 d-flex flex-column flex-root" id="kt_app_root">
      <div class="d-flex flex-column flex-lg-row flex-column-fluid">
        <div
          class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
        >
          <div class="d-flex flex-center flex-column flex-lg-row-fluid">
            <div class="w-400px p-10 border rounded-1 text-center shadow-sm">
              <nuxt-link to="/">
                <img
                alt="TaskSwift Logo"
                src="~/assets/media/logos/logo-dark.png"
                class="h-70px mb-12"
              />

              </nuxt-link>
              <form class="form w-100" @submit.prevent="formHandle">
                <div class="text-center mb-11">
                  <h1 class="text-dark fw-bolder mb-3">Welcome</h1>
                </div>
                <FormInput
                  v-model="formData.email"
                  type="text"
                  placeholder="name@example.com"
                  autocomplete="off"
                  labelText="Email"
                  name="email"
                  :formDataError="errorMsg.errorEmail"
                  class="mb-7"
                />

                <div class="d-grid mb-10">
                  <button
                    :disabled="inProgress"
                    type="submit"
                    id="kt_sign_in_submit"
                    class="btn btn-primary"
                  >
                    <span v-if="!inProgress" class="indicator-label">Join</span>
                    <icon
                      v-else
                      name="svg-spinners:ring-resize"
                      size="25"
                      class="indicator-label"
                    />
                  </button>
                </div>
                <div class="text-gray-500 text-center fw-semibold fs-6">
                  I have account?
                  <nuxt-link to="/login" class="link-primary">Log In</nuxt-link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          class="bg d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 h-1"
        >
          <div
            class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100"
          >
            <img
              class="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
              src="~/assets/media/illustrations/misc/join.png"
              alt="join photo"
            />
            <h1
              class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7"
            >
              Join
            </h1>
            <div class="d-none d-lg-block text-white fs-base text-center w-75">
              Join our community of achievers at TaskSwift! Discover a smarter way
              to manage tasks, enhance productivity, and collaborate seamlessly.
              Whether you're a professional or student, together we'll conquer
              goals and stay organized. Join now for a more efficient tomorrow.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-position-logo {
  position: absolute;
  left: 50px;
  top: 10px;
}
.bg {
  background-image: url(~/assets/media/misc/auth-bg.png)
}
</style>