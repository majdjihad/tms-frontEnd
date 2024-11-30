<script setup>
import { useSubmit } from "~/composables/useSubmit";
import { useProfileStore } from "~/stores/profileStore";
import { useProfile } from "~/composables/useProfile";
import { useToast } from "vue-toastification";

const user = useUser();
const userData = ref(null);
const toast = useToast();
const profileStore = useProfileStore();
const { editProfile } = useProfile();

const errorMsg = reactive({
  errorName: null,
  errorEmail: null,
  errorJobTitle: null,
  errorLocation: null,
  errorSkills: null,
});

const data = reactive({
  photo: profileStore?.profileInfo?.user?.url_photo,
  name: profileStore?.profileInfo?.user?.name,
  email: profileStore?.profileInfo?.user?.email,
  jobTitle: profileStore?.profileInfo?.user?.job_title,
  location: profileStore?.profileInfo?.user?.location,
  phone: profileStore?.profileInfo?.user?.phone,
  skills: profileStore?.profileInfo?.user?.skills,
});

const handleEditProfile = () => {
  if (!data.name) {
    errorMsg.errorName = "UserName is required";
    return;
  } else if (!data.email) {
    errorMsg.errorEmail = "Email is required";
    return;
  }
  userData.value = new FormData(document.getElementById("editData"));
  data.skills = [];
  // JSON.parse(userData.value?.getAll('skills')).forEach((skill) => {
  //   data.skills?.push(skill.value)
  // })
  // userData.value?.delete('skills')
  // userData.value?.append('skills', JSON.stringify(data.skills))
  submit();
};

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  () => {
    return editProfile(
      profileStore?.profileInfo?.user?.identify_number,
      userData.value
    );
  },
  {
    onSuccess: (response) => {
      // Handle the response
      profileStore.changeStatus = true;
      document.querySelector(".overview").click();
      showToast("success", response.message);
    },
    onError: (error) => {
      showToast("error", error.data.message);
    },
  }
);
const goToOverview = () => {
  document.querySelector(".overview").click();
};
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

onMounted(() => {
  const inputSkills = document.querySelector("#skills");
  // new Tagify(inputSkills);
});
</script>

<template>
  <div class="card mb-5 mb-xl-10">
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Edit Profile</h3>
      </div>
    </div>
    <div id="kt_account_settings_profile_details" class="collapse show">
      <form class="form" @submit.prevent="handleEditProfile" id="editData">
        <div class="card-body border-top p-9">
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-semibold fs-6"
              >Avatar</label
            >
            <FormAvatarInput
              class="col-lg-8"
              name="photo"
              :currentImage="profileStore?.profileInfo?.user?.url_photo"
            />
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
              >Full Name</label
            >
            <div class="col-lg-8">
              <div class="col-lg-6 fv-row">
                <FormInput
                  type="text"
                  v-model="data.name"
                  name="name"
                  :formDataError="errorMsg.errorName"
                  labelText="fullName"
                  placeholder="fullName"
                />
              </div>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
              >Email</label
            >
            <div class="col-lg-8">
              <div class="col-lg-6 fv-row">
                <FormInput
                  type="text"
                  v-model="data.email"
                  name="email"
                  :formDataError="errorMsg.errorEmail"
                  labelText="email"
                  placeholder="Enter Email"
                />
              </div>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
              >Job Title</label
            >
            <div class="col-lg-8">
              <div class="col-lg-6 fv-row">
                <FormInput
                  type="text"
                  v-model="data.jobTitle"
                  name="job_title"
                  labelText="job Title"
                  :formDataError="errorMsg.errorJobTitle"
                  placeholder="Job Title"
                />
              </div>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
              >location</label
            >
            <div class="col-lg-8">
              <div class="col-lg-6 fv-row">
                <FormInput
                  type="text"
                  v-model="data.location"
                  autocomplete="off"
                  name="location"
                  labelText="location"
                  :formDataError="errorMsg.errorLocation"
                  placeholder="location"
                />
              </div>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
              >skills</label
            >
            <div class="col-lg-8">
              <div class="col-lg-6 fv-row">
                <input
                  class="form-control"
                  v-model="data.skills"
                  name="skills"
                  placeholder="Enter skills"
                  autocomplete="off"
                  type="text"
                  id="skills"
                />
              </div>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-semibold fs-6">
              <span class="required">Contact Phone</span>
              <span
                class="ms-1"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              >
                <i class="ki-outline ki-information-5 text-gray-500 fs-6"></i>
              </span>
            </label>
            <div class="col-lg-8">
              <div class="col-lg-6 fv-row">
                <InputMask
                  id="basic"
                  v-model="data.phone"
                  mask="999-999-9999"
                  placeholder="000_000_0000"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <p
            :disabled="inProgress"
            @click="goToOverview"
            class="btn btn-light btn-active-color-gray-500 me-2"
          >
            <span>Discard</span>
          </p>
          <button
            type="submit"
            :disabled="inProgress"
            class="me-2"
            :class="
              data.photo === profileStore?.profileInfo?.user?.url_photo &&
              data.name === profileStore?.profileInfo?.user?.name &&
              data.email === profileStore?.profileInfo?.user?.email &&
              data.jobTitle === profileStore?.profileInfo?.user?.job_title &&
              data.location === profileStore?.profileInfo?.user?.location &&
              data.phone === profileStore?.profileInfo?.user?.phone &&
              data.skills === profileStore?.profileInfo?.user?.skills
                ? 'btn btn-light btn-active-color-gray-500 disabled'
                : 'btn btn-light-primary'
            "
            id="kt_account_profile_details_submit"
          >
            <span v-if="!inProgress">Save Edit</span>
            <icon
              v-else
              class="mx-6"
              name="svg-spinners:ring-resize"
              size="17"
            />
          </button>
        </div>
        <!--end::Actions-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
</template>

<style lang="scss" scoped>
</style>