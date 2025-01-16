/**
 * Welcome page component displayed after user registration
 * Handles email verification and user onboarding process
 */
<script setup>
import { showToast } from "~/composables/useToast";
import { useAuth } from "~/composables/useAuth";

// Configure page metadata and middleware
definePageMeta({
  layout: "none",
  middleware: ["guest"],
});

// Initialize required composables and state
const route = useRoute();
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
    showToast("error", error.data.message);
    setTimeout(() => {
      navigateTo("/login", { replace: true });
    },2000)
    inProgress.value = false;
  }
});

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