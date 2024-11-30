import { useUser } from "~/composables/useAuth";
import { useToast } from "vue-toastification";
import { useMember } from "~/composables/useMember";
import { useInvitationStore } from "~/stores/invitationStore";

export default defineNuxtRouteMiddleware(async (context) => {
  const data = context.query;
  const user = useUser();
  const statusCode = ref(null);
  const statusMsg = ref("");
  const invitationInfo = ref(null);
  const toast = useToast();
  const invitationStore = useInvitationStore();
  const { getInvitation } = useMember();
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

  function showToast(toastType, msg) {
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

    if (toastType === "info") {
      toast.info(msg, {
        ...toastAttr,
      });
    } else if (toastType === "error") {
      toast.error(msg, {
        ...toastAttr,
      });
    }
  }
});
