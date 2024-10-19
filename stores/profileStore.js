import {defineStore} from "pinia";
import {useProfile} from "~/composables/useProfile";

export const useProfileStore = defineStore('useProfile', () => {
    const profileInfo= ref(null)
    const changeStatus = ref(true);
    async function  getProfileInfo(userIdentify) {
        const { getProfile } = useProfile()
        try {
            const response = await getProfile(userIdentify);
            profileInfo.value = response
            changeStatus.value = false
            return response
        } catch(error) {
            console.log(error);
        }
    }
    return {
        profileInfo,
        changeStatus,
        getProfileInfo,
    }
})