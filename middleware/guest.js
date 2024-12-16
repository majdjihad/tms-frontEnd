// Import user state management composable
import { useUser } from "~/composables/useAuth";

// Redirects authenticated users to projects page

export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  // If user is already logged in, redirect to projects page
  if (user.value)
    return navigateTo(`/projects`, {
      replace: true,
    });
});
