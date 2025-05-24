<script setup>
const props = defineProps(["isNotificationsMenu"]);
</script>
<template>
  <Transition name="menu-transition" v-if="isNotificationsMenu">
    <div
      class="notification-menu menu-state-bg bg-gray-100 rounded-2 menu-state-color d-flex justify-content-center align-items-center rounded-2 menu-state-color fw-semibold py-4 fs-6 w-275px h-150px shadow"
    >
      <div class="menu-item text-gray-800 d-flex align-items-center">
        <div
          class="alert d-flex flex-column align-items-center flex-sm-row w-100"
        >
          <div class="d-flex flex-column w-100">
            <h6 class="fw-semibold text-gray-500">
              You don't have any notifications project.
            </h6>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.notification-menu {
  position: absolute;
  right: 0;
  bottom: -137px;
  z-index: 10;
}
</style>