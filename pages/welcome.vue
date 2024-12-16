/**
 * Welcome page component displayed after user registration
 * Handles email verification and user onboarding process
 */
<script setup>
import { useToast } from "vue-toastification";
import { useAuth } from "~/composables/useAuth";

// Configure page metadata and middleware
definePageMeta({
  layout: "none",
  middleware: ["guest"],
});

// Initialize required composables and state
const route = useRoute();
const toast = useToast();
const { welcome } = useAuth();
const mixCountOfRequest = 3;
const inProgress = ref(false);
const data = reactive({
  email: null,
  countOfRequest: null,
});

// Fetch user data and initialize welcome process
onBeforeMount(async () => {
  try {
    inProgress.value = true;
    const response = await welcome({
      identify_number: route.query.identify_number,
    });
    data.email = response.data.email;
    data.countOfRequest = response.data.countOfRequest;
    inProgress.value = false;
  } catch (error) {
    console.log("error");
    navigateTo("/login", { replace: true });
    showToast("error", error.data.message);
    inProgress.value = false;
  }
});

// Display toast notifications with consistent styling
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
  <div class="page-background">
    <div
      class="d-flex flex-column vh-100 mh-100 justify-content-center mx-auto w-500 text-center"
    >
      <div
        v-if="!inProgress"
        class="d-flex flex-column mx-auto bg-white shadow box-sizing-border-box text-dark"
        style="width: 400px; padding: 25px 40px; border-radius: 3px"
      >
        <div
          class="d-flex flex-column align-items-center text-center custom-img"
        >
          <img src="~/assets/media/logos/logo-dark.png" width="200" />
          <div class="d-flex flex-column pt-24px align-items-center">
            <h5 class="fw-bold text-16 text-gray-700 line-height-20">
              Check your inbox to log in
            </h5>
          </div>
          <img
            src="~/assets/media/email/email.svg"
            style="height: 88px; margin: 8px 0px 16px"
          />
        </div>
        <div class="text-center info">
          <p class="mb-1">
            To complete setup and log in, click the verification link in the
            email we’ve sent to
          </p>
          <h6 class="mb-0">{{ data.email }}</h6>
        </div>
        <div class="resend-button mt-5">
          <button
            class="bg-transparent border-0 text-primary"
            @click="showToast('success', 'check Your email Box')"
          >
            Resend verification email
          </button>
        </div>
        <div class="pt-4 border-top border-gray-600 mt-4">
          <p>
            You have only
            <b class="text-primary">{{ mixCountOfRequest - 2 }}</b> attempts
            left to resend the email.
          </p>
        </div>
      </div>
      <div v-else>
        <icon name="svg-spinners:ring-resize" size="25" />
      </div>
    </div>
  </div>
</template>

<style>
/* Custom image styling for logo and email icon */
.custom-img img {
  margin: 8px 0px 16px;
}

/* Hover effect for resend button */
.resend-button button:hover {
  text-decoration: underline;
}
</style>