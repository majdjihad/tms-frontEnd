<template>
  <div
    v-if="isMobile"
    id="mobile-error-view"
    class="landing-hero-bg d-flex align-items-center justify-content-center"
  >
    <Error
      message="Taskat Softwatre Does Not Allowed for mobile devices"
      errType="mobile"
    />
  </div>
  <div v-else>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Configure global page title template
// If a page has a title, it will be displayed as "[title] - Taskat"
// If no title is provided, it will display just "Taskat"
useHead({
  titleTemplate: (title) => (title ? `${title} - Taskat` : "Taskat"),
});

// State to track if the device is mobile
const isMobile = ref(null);

/**
 * Check if the current screen width is mobile-sized (<=768px)
 * Updates isMobile state accordingly to show mobile error view
 */
const checkScreen = () => {
  if (window.innerWidth <= 768) {
    isMobile.value = true;
    return;
  }
  isMobile.value = false;
};

// Lifecycle hooks
onBeforeMount(() => {
  // Check screen size before mounting the app
  checkScreen();

  // Add window resize listener to handle screen size changes dynamically
  window.addEventListener("resize", checkScreen);
});
</script>

<style>
#mobile-error-view {
  padding: 0 15px;
  min-height: 100vh;
  min-width: 100%;
  background-image: url("./assets/media/auth/bg14.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.ghost {
  background-color: var(--bs-gray-200);
}
p {
  margin: 0px;
}
.ghost > div {
  visibility: hidden;
}
</style>