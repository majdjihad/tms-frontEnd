/**
 * Uses guest middleware to ensure only non-authenticated users can access
 */
<script setup>
import { useAuth } from "~/composables/useAuth";
import { useSubmit } from "~/composables/useSubmit";
import { showToast } from "~/composables/useToast";

// Page metadata configuration
definePageMeta({
  layout: "none",
  middleware: ["guest"],
});

// Set page title
useHead({
  title: "forget-password",
});

// Initialize authentication composable
const { forgetPassword } = useAuth();
const router = useRouter();

// Form validation state
const errorMsg = reactive({
  errorEmail: null,
});

// Form data state management
const formData = reactive({
  email: "",
});

/**
 * Handles form submission and validation
 * Validates email presence and triggers password reset process
 */
function formHandle() {
  if (!formData.email) {
    errorMsg.errorEmail = "Email is required";
    return;
  }
  submit();
  errorMsg.errorEmail = null;
}

// Initialize form submission handler with success and error callbacks
const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(() => forgetPassword(formData), {
  onSuccess: (response) => {
    // Redirect to verification code page with identify number
    return navigateTo(
      `/verification-code?identify_number=${response?.identify_number}`
    );
  },
  onError: (error) => {
    showToast("error", error.data.message);
  },
});
</script>

<template>
  <div>
    <div class="vh-100 d-flex flex-column flex-root" id="kt_app_root">
      <div class="d-flex flex-column flex-lg-row flex-column-fluid">
        <!-- Left column: Form section -->
        <div
          class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
        >
          <!-- Form content wrapper -->
          <div class="d-flex flex-center flex-column flex-lg-row-fluid">
            <!-- Form container with logo and inputs -->
            <div class="w-500px p-10 text-center">
              <nuxt-link to="/">
                <img
                  alt="TaskSwift Logo"
                  src="~/assets/media/logos/logo-dark.png"
                  class="h-70px mb-12"
                />
              </nuxt-link>
              <!-- Password reset form -->
              <form class="form w-100" @submit.prevent="formHandle">
                <div class="text-center mb-11">
                  <h1 class="text-dark fw-bolder mb-3">Forget Password ?</h1>
                  <div class="text-gray-500 fw-semibold fs-6">
                    Enter your email to reset your password.
                  </div>
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
                    <span v-if="!inProgress" class="indicator-label"
                      >send massage</span
                    >
                    <icon
                      v-else
                      name="svg-spinners:ring-resize"
                      size="25"
                      class="indicator-label"
                    />
                  </button>
                </div>
                <div class="text-gray-500 text-center fw-semibold fs-6">
                  I have an account?
                  <nuxt-link to="/login" class="link-primary">Log In</nuxt-link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Right column: Decorative section with background image -->
        <div
          class="bg d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 h-1"
        >
          <div
            class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100"
          >
            <img
              class="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
              src="~/assets/media/illustrations/misc/forget-password.png"
              alt="join photo"
            />
            <h1
              class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7"
            >
              Forget password
            </h1>
            <div class="d-none d-lg-block text-white fs-base text-center w-75">
              Join our community of achievers at TaskSwift! Discover a smarter
              way to manage tasks, enhance productivity, and collaborate
              seamlessly. Whether you're a professional or student, together
              we'll conquer goals and stay organized. Join now for a more
              efficient tomorrow.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-image: url(~/assets/media/misc/auth-bg.png);
}
</style>