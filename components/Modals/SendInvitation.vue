<script setup>
import { useUser } from "~/composables/useAuth";
import { useProjectsStore } from "~/stores/projectsStore";
import { useSubmit } from "~/composables/useSubmit";
import { useMember } from "~/composables/useMember"
import { useToast } from "vue-toastification";

const roleOptions = ref(["Admin"]);
const user = useUser()
const toast = useToast()
const projectsStore = useProjectsStore()
const { addMember } = useMember()
const closeBtn = ref(null)
const formData = reactive({
  user_id: "",
  email: "",
  message: "",
  role_id: 2,
  project_identify: "",
});
const errorMsg = reactive({
  errorEmail: '',
  errorMessage: '',
})
function formHandle() {
  !formData.email ? errorMsg.errorEmail = 'Email is required' : !formData.message ? errorMsg.errorMessage = 'Message is required' : '';
  if (formData.email && formData.message) {
    formData.user_id = user?.value?.id
    formData.project_identify = projectsStore?.project?.project_identify
    submit();
  }
}
const { submit, inProgress, validationErrors: errors, } = useSubmit(() => {
  return addMember(projectsStore?.project?.project_identify, formData)
}, {
  onSuccess: (response) => {
    // Handle the response
    if (closeBtn.value) {
      closeBtn.value.click()
      formData.email = null
      formData.message = null
    }
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
  <div class="modal fade" id="kt_modal_invite_friends" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog mw-650px">
      <div class="modal-content">
        <div class="modal-header pb-0 border-0 justify-content-end">
          <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
              id="closeModal"
              ref="closeBtn"
          >
            <i class="ki-outline ki-cross fs-1"></i>
          </div>
        </div>
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
          <div class="text-center mb-13">
            <h1 class="mb-3">Invite new Member</h1>
            <div class="text-muted fw-semibold fs-5">
              You can invite a new team member by
              <span class="fw-bold text-primary"> email address</span>.
            </div>
          </div>
          <form @submit.prevent="formHandle" class="mb-10">
            <FormInput type="text" autocomplete="off" labelText="User Email" name="user_email" placeholder="User Email"
                    v-model:input="formData.email" :formDataError="errorMsg.errorEmail"/>

            <FormTextArea name="invitation_message" placeholder="Invitation Message" labelText="Invitation Message"
                          v-model:input="formData.message" :formDataError="errorMsg.errorMessage"/>

            <SelectMenu :options="roleOptions"/>

            <button :disabled="inProgress" class="btn btn-primary w-100 mt-5">
              <span v-if="!inProgress" class="indicator-label mr-3">Invite</span>
              <icon v-else name="svg-spinners:ring-resize" size="25" />
            </button>
          </form>
          <div class="separator d-flex flex-center mb-8">
            <span class="text-uppercase bg-body fs-7 fw-semibold text-muted px-3"><Icon name="bi:envelope-plus" size="18"/></span>
          </div>
          <div class="mb-10">
            <div class="fs-6 fw-semibold mb-2 team-list">Team Members</div>
            <div class="mh-200px scroll-y me-n7 pe-7">
              <InviteTeamMember v-for="(member, index) in projectsStore?.project?.team_members" :key="index" :member="member" :index="index"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
/* width */
.team-list::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.team-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
.team-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
.team-list::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>