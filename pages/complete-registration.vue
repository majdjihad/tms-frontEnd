<script setup>
import { useToast } from "vue-toastification";
import { useAuth } from "~/composables/useAuth";
import { useSubmit } from "~/composables/useSubmit";
import { useInvitationStore } from "~/stores/invitationStore";

definePageMeta({
  layout: "none",
});

useHead({
  title: "Complete Registration",
});
const { checkToken } = useAuth();
const { registerComplete } = useAuth();
const toast = useToast();
const userData = ref(null);
const route = useRoute();
const invitationStore = useInvitationStore();
const data = reactive({
  photo: null,
  identify_number: null,
  name: "",
  password: "",
  password_confirmation: "",
});
const errorMsg = reactive({
  errorName: null,
  errorPassword: null,
  errorConfirmPassword: null,
});
onBeforeMount(async () => {
  try {
    const response = await checkToken({ token: route.query.token });
    data.identify_number = response.identify_number;
    return response;
  } catch (error) {
    console.log(error?.data?.message);
    return navigateTo("/join", { replace: true });
    showToast("error", error?.data?.message);
  }
});

function formHandle() {
  !data.name
    ? (errorMsg.errorName = "UserName is required")
    : !data.password
    ? (errorMsg.errorPassword = "Password is required")
    : !data.password_confirmation
    ? (errorMsg.errorConfirmPassword = "Confirm Password is required")
    : data.password !== data.confirmPassword
    ? (errorMsg.errorConfirmPassword =
        "Confirm password doesn't match the password")
    : "";
  userData.value = new FormData(document.getElementById("completeForm"));
  userData.value?.append("identify_number", data.identify_number);
  if (
    data.password === data.password_confirmation &&
    data.name &&
    data.password
  ) {
    errorMsg.errorName = null;
    errorMsg.errorPassword = null;
    errorMsg.errorConfirmPassword = null;
    submit();
  }
}

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  () => {
    return registerComplete(userData.value);
  },
  {
    onSuccess: (response) => {
      // Handle the response
      if (invitationStore?.invitationInfo?.invite_identify) {
        return navigateTo(
          `/invitation?invite_identify=${invitationStore?.invitationInfo?.invite_identify}`,
          { replace: true }
        );
        invitationStore.invitationInfo.invite_identify = null;
      } else {
        return navigateTo("/projects", { replace: true });
      }
      showToast("success", response[0].message);
    },
    onError: (error) => {
      // Handle error
      if (error.data.code === 400) {
        return navigateTo("/login", { replace: true });
      }
      showToast("error", error.data.message);
    },
  }
);

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
                  <h1 class="text-dark fw-bolder mb-3">
                    Complete registration
                  </h1>
                  <div class="text-gray-500 fw-semibold fs-6">
                    Your Social Campaigns
                  </div>
                </div>
                <FormAvatarInput from="user" name="photo" />

                <!-- Start Input Fields -->
                <FormInput
                  type="text"
                  autocomplete="off"
                  labelText="Full Name"
                  name="name"
                  placeholder="Full Name"
                  v-model="data.name"
                  :formDataError="errorMsg.errorName"
                  class="mb-7"
                />

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
                  :formDataError="errorMsg.errorConfirmPassword"
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
                      >Complete registration</span
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
          class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 h-1"
          style="background-image: url('../assets/media/misc/auth-bg.png')"
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
              src="../assets/media/illustrations/misc/complete.png"
              alt=""
            />
            <h1
              class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7"
            >
              Complete Registration
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