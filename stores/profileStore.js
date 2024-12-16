import { defineStore } from "pinia";
import { useProfile } from "~/composables/useProfile";

export const useProfileStore = defineStore("useProfile", () => {
  // declear all profile variables
  const profileInfo = ref(null);

  // get profile info
  async function getProfileInfo(userIdentify) {
    const { getProfile } = useProfile();
    try {
      const response = await getProfile(userIdentify);
      profileInfo.value = response;
      return response;
    } catch (error) {
      // showError;
      console.log(error)
      return navigateTo("/projects");
    }
  }
  return {
    profileInfo,
    getProfileInfo,
  };
});
