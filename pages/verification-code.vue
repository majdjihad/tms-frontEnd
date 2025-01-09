/**
 * Verification Code Page Component
 * Handles email verification process with a time-based code entry system
 * Provides resend functionality and validation for the verification code
 */
<script setup>
import { showToast } from "~/composables/useToast";
import { useAuth } from "~/composables/useAuth";
import { useSubmit } from "~/composables/useSubmit";
import { useInvitationStore } from "~/stores/invitationStore";

// Configure page metadata and middleware
definePageMeta({
  layout: false,
  middleware: ["guest"],
});

// Initialize required composables and state
const { checkCode } = useAuth();
let invitationStore = useInvitationStore();
let errorMsg = reactive({
  errorEmail: null,
  errorPassword: null,
});
let code = ref(null);
const route = useRoute();
watch(code, async () => {
  if (code.value.length === 5) {
    await submit();
  }
});
const { submit, inProgress, validationErrors: errors } = useSubmit(
  async () => {
    await checkCode({
      code: code.value,
      identify_number: route?.query?.identify_number,
    });
  },
  {
    onSuccess: (response) => {
      // Handle the response
      console.log(response);
      return navigateTo(
        `/reset-password?token=${route?.query?.identify_number}`
      );
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
                src="~/public/favicon.ico"
                class="h-90px"
              />
            </nuxt-link>
            <img
              src="~/assets/media/logos/logo-dark.png"
              style="height: 88px; margin: 8px 0px 16px"
            />
            <img
              src="~/assets/media/email/email.svg"
              style="height: 88px; margin: 8px 0px 16px"
            />
            <h1 class="text-dark mb-3">Check Email</h1>
            <div class="text-gray-600 fw-semibold fs-3 my-6">
              Enter the verification code we sended you
            </div>
            <form class="form w-100" @submit.prevent="">
              <div
                v-if="!inProgress"
                class="d-flex justify-content-center align-items-center"
              >
                <InputOtp v-model="code" size="large" :length="5" />
              </div>
              <icon v-else name="svg-spinners:ring-resize" size="40" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  display: block !important;
}
.p-inputotp-input {
  width: 50px !important;
  height: 50px !important;
  background-color: white !important;
  font-size: 30px !important;
  color: black !important;
  border: none !important;
}
.left-position-logo {
  position: absolute;
  left: 50px;
  top: 10px;
}
</style>