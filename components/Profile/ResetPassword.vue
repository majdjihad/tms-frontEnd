<script setup>
import {useSubmit} from "~/composables/useSubmit";
import {useProfileStore} from "~/stores/profileStore";
import {useProfile} from "~/composables/useProfile";
import {useToast} from "vue-toastification";
import { showToast } from "~/composables/useToast";

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
              <FormPasswordInput v-model="data.old_password" placeholder="password" autocomplete="off" name="oldPassword"
                                 labelText="Password" :formDataError="errorMsg.errorOldPassword"/>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column mb-6">
          <label class="col-lg-4 col-form-label required fw-semibold fs-6">new password</label>
          <div class="col-lg-8">
            <div class="col-lg-6 fv-row">
              <FormPasswordInput v-model="data.password" placeholder="new password" autocomplete="off" name="newPassword"
                                 labelText="new Password" :formDataError="errorMsg.errorPassword"/>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column mb-6">
          <label class="col-lg-4 col-form-label required fw-semibold fs-6">confirm password</label>
          <div class="col-lg-8">
            <div class="col-lg-6 fv-row">
              <FormPasswordInput v-model="data.password_confirmation" placeholder="confirm password" name="confirmPassword"
                                 autocomplete="off"
                                 labelText="confirm Password"
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