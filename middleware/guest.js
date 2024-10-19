import {useUser} from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  if (user.value) return navigateTo(`/projects/${user?.value?.project_identify}/backlog`, { replace: true });
});
