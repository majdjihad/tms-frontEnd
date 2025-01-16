// Import user state management composable
import { useUser } from "~/composables/useAuth";

//* Redirects to login page if user is not authenticated

export default defineNuxtRouteMiddleware(async () => {
  // If no user is logged in, redirect to login page
  const user = useUser();
  if (!user?.value) return navigateTo("/login", { replace: true });
});
