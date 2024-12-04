// Value is initialized in: ~/plugins/auth.js
import { $larafetch } from "~/utils/$larafetch";
import { useProjectsStore } from "~/stores/projectsStore";

export const useUser = () => {
  return useState("user", () => undefined);
};

export const useAuth = () => {
  const user = useUser();
  const isLoggedIn = computed(() => !!user.value);

  async function refresh() {
    try {
      user.value = await fetchCurrentUser();
    } catch {
      user.value = null;
    }
  }

  async function login(credentials) {
    if (isLoggedIn.value) return;

    const response = await $larafetch("/login", {
      method: "post",
      body: credentials,
    });
    return [response, await refresh()];
  }

  async function checkToken(credentials) {
    const response = await $larafetch("/check-token", {
      method: "post",
      body: credentials,
    });
    return response;
  }
  async function welcome(credentials) {
    const response = await $larafetch("/welcome", {
      method: "post",
      body: credentials,
    });
    return response;
  }

  async function join(credentials) {
    const response = await $larafetch("/join", {
      method: "post",
      body: credentials,
    });
    return response;
  }
  async function forgetPassword(credentials) {
    const response = await $larafetch("/forget-password", {
      method: "post",
      body: credentials,
    });
    return response;
  }

  async function registerComplete(credentials) {
    const response = await $larafetch("/register-complete", {
      method: "post",
      body: credentials,
    });
    return [response, await refresh()];
  }

  async function logout() {
    if (!isLoggedIn.value) return;

    await $larafetch("/api/logout", { method: "post" });
    user.value = null;
    await navigateTo("/login", { replace: true });
  }

  // async function resendEmailVerification() {
  //     return await $larafetch("/email/verification-notification", {
  //         method: "post",
  //     });
  // }

  // async function forgotPassword(email) {
  //     return await $larafetch("/forgot-password", {
  //         method: "post",
  //         body: { email },
  //     });
  // }

  // async function resetPassword(credentials) {
  //     return await $larafetch("/reset-password", {
  //         method: "post",
  //         body: credentials,
  //     });
  // }

  return {
    user,
    checkToken,
    welcome,
    isLoggedIn,
    login,
    join,
    forgetPassword,
    registerComplete,
    logout,
  };
};

export const fetchCurrentUser = async () => {
  try {
    return await $larafetch("/api/user", {
      redirectIfNotAuthenticated: false,
    });
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
};
