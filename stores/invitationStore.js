import {defineStore} from "pinia";

export const useInvitationStore = defineStore('useInvitationStore', () => {
    const invitationInfo = reactive({})
    return {
        invitationInfo,
    }
})