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
import { showToast } from "~/composables/useToast";

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

</script>

<template>
  <div class="page-background">
    <div class="d-flex flex-column flex-root vh-100" id="kt_app_root">
      <div class="d-flex flex-column flex-center flex-column-fluid">
        <div class="d-flex flex-column flex-center text-center p-10">
          <nuxtLink to="/">
            <img
              src="~/assets/media/logos/logo-light.png"
              class="h-75px"
              alt="logo"
            />
          </nuxtLink>
          <div class="card card-flush mb-10 w-md-650px">
            <div class="card-header pt-9">
              <h1 class="fw-light mb-3 text-dark">invation massage:</h1>
              <div class="d-flex align-items-center">
                <div class="symbol symbol-50px me-5">
                  <img
                    src="~/assets/media/avatars/project.png"
                    class=""
                    alt="project-logo"
                  />
                </div>
                <div class="flex-grow-1 text-start">
                  <div class="text-gray-800 fs-4">
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
            </div>
            <div class="card-body">
              <div
                class="fs-5 fw-normal text-gray-700 text-start border-bottom pb-6"
              >
                {{ invitationStore?.invitationInfo?.project?.description }}
              </div>
            </div>
            <div class="card-footer pt-0">
              <div
                class="collapse show"
                id="kt_social_feeds_comments_2"
              >
                <div class="d-flex align-center">
                  <div class="symbol symbol-45px me-5">
                    <img
                      src="~/assets/media/avatars/blank.png"
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
              <div class="mt-8 pt-3 border-top text-end">
                <button
                  :disabled="inProgress"
                  type="submit"
                  @click="sendInvitationStatus(0)"
                  id="kt_sign_in_submit"
                  class="btn btn-light-danger btn-sm"
                >
                  <icon
                    v-if="inProgress && invitationStatus === false"
                    name="svg-spinners:ring-resize"
                    size="16"
                  />
                  <span v-else class="fs-4">reject</span>
                </button>
                <button
                  :disabled="inProgress"
                  type="submit"
                  @click="sendInvitationStatus(1)"
                  id="kt_sign_in_submit"
                  class="btn btn-sm btn-light-success ms-2"
                >
                  <icon
                    v-if="inProgress && invitationStatus === true"
                    name="svg-spinners:ring-resize"
                    size="25"
                  />
                  <span v-else class="fs-4">accept</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>