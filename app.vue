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
// if the page have title put it and add "- Taskat", if not
useHead({
  titleTemplate: (title) => (title ? `${title} - Taskat` : "Taskat"),
});

const isMobile = ref(null);

// ====== methods ====== //
// check if the window size is less than 768 to stop the app
const checkScreen = () => {
  if (window.innerWidth <= 768) {
    isMobile.value = true;
    return;
  }

  isMobile.value = false;
};

// ====== hooks ====== //
onBeforeMount(() => {
  // check screen size before mount the app
  checkScreen();

  // check screen size on resize app window
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