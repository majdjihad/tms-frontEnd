<script setup>
import { useToast } from "vue-toastification";
import {useAuth} from "~/composables/useAuth";
import {useSubmit} from "~/composables/useSubmit";
definePageMeta({
  layout: "none",
  middleware: ['guest']
});

useHead({
  title: "Join",
});
const { join } = useAuth();
const toast = useToast();
const router = useRouter();
const errorMsg = reactive({
  errorEmail: null,
})
// === Validation === //
const formData = reactive({
  email: "",
});
function formHandle() {
  if (!formData.email) {
    errorMsg.errorEmail = 'Email is required'
    return
  }
  submit()
  errorMsg.errorEmail = null
}
const { submit, inProgress, validationErrors: errors, } = useSubmit(() => join(formData), {
  onSuccess: (response) => {
    // Handle the response
    router.push({
        path: '/welcome',
        query: {
          identify_number: response?.identify_number
        }
      });
  },
  onError: (error) => {
    console.log('error')
    showToast('error', error.data.message)
    if(error?.data?.code === 400) {
      return navigateTo('/login', {replace: true})
    }
  }
});
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
    rtl: false
  }
  if (statusCode === 'success') {
    toast.success(msg, {
      ...toastAttr
    });
  } else if (statusCode === 'error') {
    toast.error(msg, {
      ...toastAttr
    });
  }
}
</script>

<template>
  <div>
    <div class="vh-100 d-flex flex-column flex-root" id="kt_app_root">
      <div class="d-flex flex-column flex-lg-row flex-column-fluid">
        <div class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
          <div class="d-flex flex-center flex-column flex-lg-row-fluid">
            <div class="w-500px p-10 text-center">
              <nuxt-link to="/">
                <img alt="Taskat Logo" src="~/public/favicon.ico" class="h-90px mb-12">
              </nuxt-link>
              <form class="form w-100" @submit.prevent="formHandle">
                <div class="text-center mb-11">
                  <h1 class="text-dark fw-bolder mb-3">Join us</h1>
                  <div class="text-gray-500 fw-semibold fs-6">
                    Your Social Campaigns
                  </div>
                </div>
                <FormInput v-model:input="formData.email" type="text" placeholder="name@example.com" autocomplete="off"
                  labelText="Email" name="email" :formDataError="errorMsg.errorEmail" class="mb-7" />

                <div class="d-grid mb-10">
                  <button :disabled="inProgress" type="submit" id="kt_sign_in_submit" class="btn btn-primary">
                    <span v-if="!inProgress" class="indicator-label">Join</span>
                    <icon v-else name="svg-spinners:ring-resize" size="25"  class="indicator-label" />
                  </button>
                </div>
                <div class="text-gray-500 text-center fw-semibold fs-6">
                  Already have an account?
                  <nuxt-link to="/login" class="link-primary">Log In</nuxt-link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 h-1"
          style="background-image: url(../assets/media/misc/auth-bg.png);">
          <div class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
            <img class="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
              src="~/assets/media/illustrations/misc/join.png" alt="join photo" />
            <h1 class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7">Join</h1>
            <div class="d-none d-lg-block text-white fs-base text-center w-75">
              Join our community of achievers at Taskat! Discover a smarter way to manage tasks, enhance productivity,
              and collaborate seamlessly. Whether you're a professional or student, together we'll conquer goals and
              stay organized. Join now for a more efficient tomorrow.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>