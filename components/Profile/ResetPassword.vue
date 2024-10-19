<script setup>
import {useSubmit} from "~/composables/useSubmit";
import {useProfileStore} from "~/stores/profileStore";
import {useProfile} from "~/composables/useProfile";
import {useToast} from "vue-toastification";

const user = useUser()
const toast = useToast()
const profileStore = useProfileStore()
const {resetPassword} = useProfile()

const errorMsg = reactive({
  errorOldPassword: null,
  errorPassword: null,
  errorConfirmPassword: null
})

const data = reactive({
  old_password: null,
  password: null,
  password_confirmation: null
})

const handleChangePassword = () => {
  if (!data.old_password) {
    errorMsg.errorOldPassword = 'old Password is required'
    return;
  } else if (!data.password) {
    errorMsg.errorPassword = 'new Password is required'
    return;
  } else if (data.password !== data.password_confirmation) {
    errorMsg.errorConfirmPassword = 'Confirm password doesn\'t match the password'
    return;
  }
  submit();
}

const {submit, inProgress, validationErrors: errors,} = useSubmit(() => {
  return resetPassword(profileStore?.profileInfo?.user?.identify_number, data)
}, {
  onSuccess: (response) => {
    // Handle the response
    document.querySelector('.overview').click()
    showToast('success', response.message)
  },
  onError: (error) => {
    showToast('error', error.data.message)
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
  <div class="card mb-5 mb-xl-10">
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse"
         data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Change Password</h3>
      </div>
    </div>
    <div id="kt_account_settings_profile_details" class="collapse show">
      <div class="card-body border-top p-9">
        <div class="d-flex flex-column mb-6">
          <label class="col-lg-4 col-form-label required fw-semibold fs-6">Current Password</label>
          <div class="col-lg-8">
            <div class="col-lg-6 fv-row">
              <FormPasswordInput v-model:input="data.old_password" placeholder="password" autocomplete="off"
                                 labelText="Password" name="password" :formDataError="errorMsg.errorOldPassword"/>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column mb-6">
          <label class="col-lg-4 col-form-label required fw-semibold fs-6">new password</label>
          <div class="col-lg-8">
            <div class="col-lg-6 fv-row">
              <FormPasswordInput v-model:input="data.password" placeholder="new password" autocomplete="off"
                                 labelText="new Password" name="newPassword" :formDataError="errorMsg.errorPassword"/>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column mb-6">
          <label class="col-lg-4 col-form-label required fw-semibold fs-6">confirm password</label>
          <div class="col-lg-8">
            <div class="col-lg-6 fv-row">
              <FormPasswordInput v-model:input="data.password_confirmation" placeholder="confirm password"
                                 autocomplete="off"
                                 labelText="confirm Password" name="confirmPassword"
                                 :formDataError="errorMsg.errorConfirmPassword"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-end py-6 px-9">
      <button :disabled="inProgress" @click="handleChangePassword" class="btn btn-light-primary"
              id="kt_account_profile_details_submit">
        <span v-if="!inProgress">Change password</span>
        <icon v-else class="mx-6" name="svg-spinners:ring-resize" size="17"/>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>