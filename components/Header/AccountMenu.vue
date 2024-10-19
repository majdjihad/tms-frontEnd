<script setup>
import {useAuth, useUser} from "~/composables/useAuth";
import toast from "bootstrap/js/src/toast";

const props = defineProps(["isAccountMenu"]);
const user = useUser();

const { logout } = useAuth();
const inProgress = ref(false)
async function handleLogout() {
  inProgress.value = true
  await logout()
  inProgress.value = false
}
</script>

<template>
  <Transition name="accountMenu">
    <div v-if="isAccountMenu"
      class="menu-gray-800 menu-state-bg bg-light rounded-2 menu-state-color fw-semibold py-4 fs-6 w-275px position-absolute account-menu shadow"
      style="z-index: 1000 !important;">
      <div class="menu-item px-3">
        <div class="menu-content d-flex align-items-center px-3">
          <div class="symbol symbol-50px me-5">
            <img v-if="user?.url_photo" :alt="user?.name" :src="user?.url_photo" />
            <img v-else alt="Logo" src="../../assets/media/avatars/blank.png" />
          </div>
          <div class="d-flex flex-column">
            <div class="fw-bold d-flex align-items-center fs-5">{{ user?.name }}</div>
            <span class="fw-semibold text-muted fs-7">{{ user?.email }}</span>
          </div>
        </div>
      </div>
      <div class="separator my-2"></div>
      <div class="menu-item px-5">
        <div
          class="menu-item">
          <NuxtLink :to="`/profile/${user?.identify_number}`" class="menu-link px-5 rounded">My Profile</NuxtLink>
        </div>
        <button :disabled="inProgress" @click="handleLogout"
          class="btn btn-light btn-active-light-danger btn-flex btn-center btn-sm cursor-pointer w-100 justify-content-between">
          <span>Logout</span>
          <icon v-if="inProgress" name="svg-spinners:ring-resize" class="indicator-label" size="15"/>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.account-menu {
  padding-top: 20px;
  z-index: 99;
  top: 48px;
  right: 0;
}

.menu-item a {
  transition: all 0.3s ease;
}

.menu-item a:hover {
  background-color: #f5f5f5 !important;
}

.accountMenu-enter-active,
.accountMenu-leave-active {
  transition: all 0.3s ease;
}

.accountMenu-enter-from,
.accountMenu-leave-to {
  opacity: 0;
  top: 75px;
}
</style>