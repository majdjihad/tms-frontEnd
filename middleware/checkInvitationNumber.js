// Import required dependencies
import { useToast } from "vue-toastification";
import { useMember } from "~/composables/useMember";
import { useInvitationStore } from "~/stores/invitationStore";

export default defineNuxtRouteMiddleware(async (context) => {
  // Extract query parameters from route
  const data = context.query;
  
  // Initialize reactive state variables
  let statusCode = ref();
  let statusMsg = ref();
  const toast = useToast();
  let invitationStore = useInvitationStore();
  const { getInvitation } = useMember();
  let token = ref();

  // Fetch and validate invitation data
  await getInvitation(data)
    .then((response) => {
      // Store successful response data
      statusCode.value = response.code;
      statusMsg.value = response.message;
      invitationStore.invitationInfo = response.data;
    })
    .catch((error) => {
      // Handle error cases and store error information
      statusCode.value = error.data.code;
      statusMsg.value = error.data.message;
      token.value = error.data.token;
      invitationStore.invitationInfo.invite_identify = data.invite_identify;
    });

  // Handle different invitation status codes
  if ([1405, 1400, 2400, 1404].includes(statusCode.value)) {
    // Invalid or expired invitation - redirect to projects
    showToast("error", statusMsg.value);
    return navigateTo("/projects", { replace: true });
  } else if ([400].includes(statusCode.value)) {
    // Registration required - redirect to registration completion
    showToast("info", statusMsg.value);
    return navigateTo(`/complete-registration/?token=${token.value}`, {
      replace: true,
    });
  } else if ([200].includes(statusCode.value)) {
    // Valid invitation
    showToast("success", statusMsg.value);
  }

  function showToast(toastType, msg) {
    // Configure toast notification attributes
    const toastAttr = reactive({
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
    });

    // Display appropriate toast type
    if (toastType === "info") {
      toast.info(msg, toastAttr);
    } else if (toastType === "error") {
      toast.error(msg, toastAttr);
    }
  }
});
