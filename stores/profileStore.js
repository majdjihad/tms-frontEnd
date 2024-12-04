import { defineStore } from "pinia";
import { useProfile } from "~/composables/useProfile";

export const useProfileStore = defineStore("useProfile", () => {
  const profileInfo = ref(null);
  async function getProfileInfo(userIdentify) {
    const { getProfile } = useProfile();
    try {
      const response = await getProfile(userIdentify);
      profileInfo.value = response;
      return response;
    } catch (error) {
      // showError;
      console.log()
      return navigateTo("/projects");
    }
  }
  return {
    profileInfo,
    getProfileInfo,
  };
});
