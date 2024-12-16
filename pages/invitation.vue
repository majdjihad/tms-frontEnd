/**
 * Invitation Page Component
 * Handles project invitation acceptance flow:
 * - Validates invitation token
 * - Handles user registration/login
 * - Manages project access granting
 */
<script setup>
import moment from "moment";
import { useMember } from "~/composables/useMember";
import { useInvitationStore } from "~/stores/invitationStore";
import { useSubmit } from "~/composables/useSubmit";
import { useToast } from "vue-toastification";
import { useUser } from "~/composables/useAuth";

// Configure page metadata and middleware
definePageMeta({
  layout: "none",
  middleware: ["check-invitation-number"],
});

// Set page title
useHead({
  title: "Invitation",
});

// Initialize required composables and state
const { getInvitation } = useMember();
const toast = useToast();
const route = useRoute();
const invitationStore = useInvitationStore();
const invitationStatus = ref(null);

// Validate invitation token on component mount
onBeforeMount(async () => {
  const data = route.query;
  const statusCode = ref(null);
  const statusMsg = ref("");
  const token = ref(null);
  await getInvitation(data)
    .then((response) => {
      // Handle the response object here
      statusCode.value = response.code;
      statusMsg.value = response.message;
      invitationStore.invitationInfo = response.data;
    })
    .catch((error) => {
      // Handle error here
      statusCode.value = error.data.code;
      statusMsg.value = error.data.message;
      token.value = error.data.token;
      invitationStore.invitationInfo.invite_identify = data.invite_identify;
    });
  if ([1405, 1400, 2400, 1404].includes(statusCode.value)) {
    showToast("error", statusMsg.value);
    return navigateTo("/projects", { replace: true });
  } else if ([400].includes(statusCode.value)) {
    showToast("info", statusMsg.value);
    return navigateTo(`/complete-registration/?token=${token.value}`, {
      replace: true,
    });
  } else if ([200].includes(statusCode)) {
    showToast("success", statusMsg.value);
  }
});
useHead({
  title: "Invitation",
});
const { invitationAccept } = useMember();

const sendInvitationStatus = (status) => {
  invitationStatus.value = status;
  submit();
};

// Form submission handler
const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  () => {
    return invitationAccept({
      accept: invitationStatus.value,
      invite_identify: invitationStore?.invitationInfo?.invite_identify,
    });
  },
  {
    onSuccess: (response) => {
      // Handle the response
      return navigateTo("/projects", { replace: true });
    },
    onError: (error) => {
      showToast("error", error.data.message);
    },
  }
);

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
    <div class="d-flex flex-column flex-root vh-100" id="kt_app_root">
      <div class="d-flex flex-column flex-center flex-column-fluid">
        <div class="d-flex flex-column flex-center text-center p-10">
          <div class="card card-flush mb-10 w-md-650px">
            <div class="card-header pt-9">
              <div class="d-flex align-items-center">
                <div class="symbol symbol-50px me-5">
                  <img
                    src="../assets/media/avatars/project.png"
                    class=""
                    alt=""
                  />
                </div>
                <div class="flex-grow-1 text-start">
                  <div class="text-gray-800 fs-4 fw-bold">
                    {{ invitationStore?.invitationInfo?.project?.name }}
                  </div>
                  <div class="text-gray-400 fw-semibold d-block">
                    {{
                      moment(
                        invitationStore?.invitationInfo?.project?.created_at
                      ).format("lll")
                    }}
                  </div>
                </div>
              </div>
              <!--              <div class="card-toolbar">-->
              <!--                <div class="m-0">-->
              <!--                  <button class="btn btn-icon btn-color-gray-400 btn-active-color-primary me-n4">-->
              <!--                    <i class="ki-outline ki-information fs-1"></i>-->
              <!--                  </button>-->
              <!--                </div>-->
              <!--              </div>-->
            </div>
            <div class="card-body">
              <div
                class="fs-6 fw-normal text-gray-700 text-start border-bottom pb-6"
              >
                {{ invitationStore?.invitationInfo?.project?.description }}
              </div>
            </div>
            <div class="card-footer pt-0 mt-10">
              <div
                class="collapse show"
                id="kt_social_feeds_comments_2"
                style=""
              >
                <div class="d-flex align-center">
                  <div class="symbol symbol-45px me-5">
                    <img
                      src="../assets/media/avatars/blank.png"
                      :alt="invitationStore?.invitationInfo?.project?.name"
                      class="object-fit-cover"
                    />
                  </div>
                  <div class="d-flex flex-column flex-row-fluid">
                    <div
                      class="text-gray-800 fw-medium me-6 pt-1 fs-4 text-start"
                    >
                      {{ invitationStore?.invitationInfo?.user?.name }}
                    </div>
                    <span
                      class="text-gray-400 fs-7 fw-normal pt-1 text-start"
                      >{{ invitationStore?.invitationInfo?.user?.email }}</span
                    >
                  </div>
                </div>
                <div class="text-gray-800 pt-5 fs-4 text-start">
                  {{ invitationStore?.invitationInfo?.message }}
                </div>
              </div>
              <div class="mt-8 border-top pt-6">
                <button
                  :disabled="inProgress"
                  type="submit"
                  @click="sendInvitationStatus(false)"
                  id="kt_sign_in_submit"
                  class="btn btn-danger btn-flex btn-center cursor-pointer fw-normal fs-3"
                >
                  <icon
                    v-if="inProgress && invitationStatus === false"
                    name="svg-spinners:ring-resize"
                    size="25"
                  />
                  <span v-else>Reject</span>
                </button>
                <button
                  :disabled="inProgress"
                  type="submit"
                  @click="sendInvitationStatus(true)"
                  id="kt_sign_in_submit"
                  class="btn btn-primary btn-flex btn-center cursor-pointer fw-normal fs-3 ms-5"
                >
                  <icon
                    v-if="inProgress && invitationStatus === true"
                    name="svg-spinners:ring-resize"
                    size="25"
                  />
                  <span v-else>Accept</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>