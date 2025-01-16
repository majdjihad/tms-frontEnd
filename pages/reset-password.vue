/**
 * Reset Password Page Component
 * Handles the password reset flow including:
 * - Email submission for reset link
 * - Password reset form validation
 * - New password confirmation
 */
<script setup>
import { showToast } from "~/composables/useToast";
import { useAuth } from "~/composables/useAuth";
import { useSubmit } from "~/composables/useSubmit";

// Configure page metadata and middleware
definePageMeta({
  layout: "none",
});

// Set page title
useHead({
  title: "Complete Registration",
});

// Initialize required composables and state
const { checkToken, resetPassword } = useAuth();
const data = reactive({
  identify_number: "592b6c1a-2d02-4cc0-ac93-157ed28f7c27",
  password: "",
  password_confirmation: "",
});
const errorMsg = reactive({
  errorPassword: null,
  errorConfirm_Password: null,
});

// Password validation rules
const passwordRules = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
};

// Validates password against security requirements

const validatePassword = (password) => {
  if (password.length < passwordRules.minLength) {
    errorMsg.errorPassword = `Password must be at least ${passwordRules.minLength} characters`;
    return false;
  }
  if (passwordRules.requireUppercase && !/[A-Z]/.test(password)) {
    errorMsg.errorPassword =
      "Password must contain at least one uppercase letter";
    return false;
  }
  if (passwordRules.requireLowercase && !/[a-z]/.test(password)) {
    errorMsg.errorPassword =
      "Password must contain at least one lowercase letter";
    return false;
  }
  if (passwordRules.requireNumber && !/\d/.test(password)) {
    errorMsg.errorPassword = "Password must contain at least one number";
    return false;
  }
  if (
    passwordRules.requireSpecial &&
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    errorMsg.errorPassword =
      "Password must contain at least one special character";
    return false;
  }
  errorMsg.errorPassword = null;
  return true;
};

// onMounted(async () => {
//   try {
//     const response = await checkToken({ token: route.query.token });
//     data.token = response.identify_number;
//     return response;
//   } catch (error) {
//     showToast("error", error?.data?.message);
//     return navigateTo("/join", { replace: true });
//   }
// });

/**
 * Handles form submission for password reset
 * Validates input and calls API endpoint
 */
const formHandle = async () => {
  // Reset previous errors
  Object.keys(errorMsg).forEach((key) => (errorMsg[key] = null));

  // Validate password
  if (!validatePassword(data.password)) {
    return;
  }

  // Validate password confirmation
  if (data.password !== data.password_confirmation) {
    errorMsg.errorConfirm_Password = "confirm password not same Password";
    return;
  }

  const { submit, inProgress } = useSubmit(
    () => {
      resetPassword(data);
    },
    {
      onSuccess: () => {
        // Handle the response
        return navigateTo("/login", { replace: true });
      },
      onError: (error) => {
        // Handle error
        showToast("error", error.data.message);
        if (error.data.code === 400) {
          return navigateTo("/login", { replace: true });
        }
      },
    }
  );

  try {
    await submit();
  } catch (error) {
    showToast("error", error.data?.message || "Failed to reset password");
  }
};
</script>

<template>
  <div>
    <div class="vh-100 d-flex flex-column flex-root" id="kt_app_root">
      <div
        class="d-flex flex-column flex-lg-row flex-column-fluid position-relative"
      >
        <div
          class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
        >
          <div class="d-flex flex-center flex-column flex-lg-row-fluid">
            <div class="w-500px p-10">
              <form
                class="form w-100 text-center"
                @submit.prevent="formHandle"
                id="completeForm"
              >
                <div class="text-center mb-11">
                  <h1 class="text-dark fw-bolder mb-3">Reset Password</h1>
                  <div class="text-gray-500 fw-semibold fs-6">
                    Your Social Campaigns
                  </div>
                </div>
                <FormPasswordInput
                  placeholder="Password"
                  autocomplete="off"
                  labelText="Password"
                  name="password"
                  v-model="data.password"
                  :formDataError="errorMsg.errorPassword"
                  class="mb-7"
                />

                <FormPasswordInput
                  placeholder="Confirm Password"
                  autocomplete="off"
                  labelText="Confirm Password"
                  name="password_confirmation"
                  v-model="data.password_confirmation"
                  :formDataError="errorMsg.errorConfirm_Password"
                  class="mb-7"
                />
                <!-- End Input Fields -->

                <div class="d-grid mb-10">
                  <button
                    :disabled="inProgress"
                    type="submit"
                    id="kt_sign_in_submit"
                    class="btn btn-primary btn-hover"
                  >
                    <span v-if="!inProgress" class="indicator-label"
                      >Reset password</span
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
              src="~/assets/media/illustrations/misc/reset-password.png"
              alt=""
            />
            <h1
              class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7"
            >
              Reset Password
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
  background-image: url(~/assets/media/misc/auth-bg.png);
}
</style>