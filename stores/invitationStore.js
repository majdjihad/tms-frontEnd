import { defineStore } from "pinia";

export const useInvitationStore = defineStore("useInvitationStore", () => {
  // decler all invitation variables
  let invitationInfo = reactive({});
  return {
    invitationInfo,
  };
});
