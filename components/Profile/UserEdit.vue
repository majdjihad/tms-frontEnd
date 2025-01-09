<script setup>
import { useSubmit } from "~/composables/useSubmit";
import { useProfileStore } from "~/stores/profileStore";
import { useProfile } from "~/composables/useProfile";
import { showToast } from "~/composables/useToast";

const userData = ref(null);
const profileStore = useProfileStore();
const { editProfile } = useProfile();

const errorMsg = reactive({
  errorName: null,
  errorJobTitle: null,
  errorLocation: null,
  errorSkills: null,
});

const data = reactive({
  photo: profileStore?.profileInfo?.user?.url_photo,
  name: profileStore?.profileInfo?.user?.name,
  jobTitle: profileStore?.profileInfo?.user?.job_title,
  location: profileStore?.profileInfo?.user?.location,
  phone: profileStore?.profileInfo?.user?.phone,
  skills: profileStore?.profileInfo?.user?.skills,
});

const handleEditProfile = () => {
  if (!data.name) {
    errorMsg.errorName = "UserName is required";
    return;
  }
  // Create FormData from the form
  userData.value = new FormData(document.getElementById("editData"));
  userData.value?.append("phone", data.phone);
  // Initialize an empty array for skills
  data.skills = [];
  userData.value;
  // Get the 'skills' value from FormData
  const skillsRaw = userData.value?.get("skills");
  if (skillsRaw) {
    try {
      // Parse the JSON string and extract skills
      const parsedSkills = JSON.parse(skillsRaw);
      parsedSkills.forEach((skill) => {
        data.skills.push(skill.value);
      });
    } catch (error) {
      console.error("Failed to parse skills JSON:", error);
      return;
    }
  }

  // Replace the old 'skills' value in FormData
  userData.value?.delete("skills");
  userData.value?.append("skills", JSON.stringify(data.skills));
  // Submit the form
  submit();
};

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  async () => {
    return await editProfile(
      profileStore?.profileInfo?.user?.identify_number,
      userData.value
    );
  },
  {
    onSuccess: async (response) => {
      // Handle the response
      await profileStore?.getProfileInfo(
        profileStore?.profileInfo?.user?.identify_number
      );
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

onMounted(() => {
  const inputSkills = document.querySelector("#skills");
  new Tagify(inputSkills);
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
      <form class="form" @submit.prevent id="editData">
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
                  class="w-100 p-4 form-control"
                  id="basic"
                  name="phone"
                  v-model="data.phone"
                  mask="999-999-9999"
                  placeholder="999-999-9999"
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
            class="me-2 btn btn-light-primary"
            id="kt_account_profile_details_submit"
          >
            <span v-if="!inProgress" @click="handleEditProfile">Save Edit</span>
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
.p-inputtext {
  background-color: white;
  color: black;
  border: #DBDFE9 solid 1px
}
</style>