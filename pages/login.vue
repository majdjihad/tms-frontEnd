<script setup>
// Import required dependencies
import { showToast } from "~/composables/useToast";
import { useAuth } from "~/composables/useAuth";
import { useSubmit } from "~/composables/useSubmit";
import { useInvitationStore } from "~/stores/invitationStore";

// Configure page metadata - disable default layout and require guest middleware
definePageMeta({
  layout: false,
  middleware: ["guest"],
});

// Set page title
useHead({
  title: "Login",
});

// Initialize authentication composable
const { login } = useAuth();

// Initialize invitation store
let invitationStore = useInvitationStore();

// Form validation error messages
let errorMsg = reactive({
  errorEmail: null,
  errorPassword: null,
});

// Form data state
let formData = reactive({
  email: "",
  password: "",
});

// Handle form submission validation
function formHandle() {
  // Check for required fields
  !formData.email
    ? (errorMsg.errorEmail = "Email is required")
    : !formData.password
    ? (errorMsg.errorPassword = "Password is required")
    : "";
  if (formData.email && formData.password) {
    submit();
  }
}

// Initialize form submission handler with success and error callbacks
const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  () => {
    return login(formData);
  },
  {
    onSuccess: (response) => {
      // Check if user has pending invitation and redirect accordingly
      if (invitationStore?.invitationInfo?.invite_identify) {
        return navigateTo(
          `/invitation?invite_identify=${invitationStore?.invitationInfo?.invite_identify}`,
          { replace: true }
        );
      } else {
        return navigateTo("/projects", { replace: true });
      }
    },
    onError: (error) => {
      showToast("error", error.data.message);
    },
  }
);

</script>

<template>
  <div>
    <div
      class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
      id="kt_app_root"
    >
      <div
        class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 m-auto"
      >
        <div class="d-flex flex-center flex-column flex-lg-row-fluid">
          <div class="w-400px p-10 border rounded-1 text-center shadow-sm">
            <nuxt-link to="/" class="left-position-logo">
              <img
                alt="TaskSwift Logo"
                src="~/assets/media/logos/logo-dark.png"
                class="h-70px"
              />
            </nuxt-link>
            <form class="form w-100" @submit.prevent="formHandle">
              <div class="text-center mb-11">
                <h1 class="text-dark fw-bolder display-6 mb-3">welcome back</h1>
                <div class="text-gray-500 fw-semibold fs-3 fw-bold">Log in</div>
              </div>

              <FormInput
                v-model="formData.email"
                type="text"
                placeholder="test@test.com"
                autocomplete="off"
                labelText="Email"
                name="email"
                :formDataError="errorMsg.errorEmail"
                class="my-7"
              />

              <FormPasswordInput
                v-model="formData.password"
                placeholder="password"
                labelText="Password"
                name="password"
                :formDataError="errorMsg.errorPassword"
                class="mt-7"
              />
              <div
                class="d-flex flex-stack flex-wrap gap-3 fs-base fw-light mb-8"
              >
                <!--begin::Link-->
                <div></div>
                <nuxt-link to="/forget-password" class="link-primary"
                  >Forgot Password ?</nuxt-link
                >
                <!--end::Link-->
              </div>
              <div class="d-grid my-10">
                <button
                  :disabled="inProgress"
                  type="submit"
                  id="kt_sign_in_submit"
                  class="btn btn-primary btn-hover"
                >
                  <span v-if="!inProgress" class="indicator-label">Log in</span>
                  <icon v-else name="svg-spinners:ring-resize" size="25" />
                </button>
              </div>
              <div class="text-gray-500 text-center fw-semibold fs-6">
                Not a Member yet?
                <nuxt-link to="/join" class="link-primary">Join us</nuxt-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  display: block !important;
}
.left-position-logo {
  position: absolute;
  left: 50px;
  top: 10px;
}
</style>