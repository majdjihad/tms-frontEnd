<script setup>
import { useAuth, useUser } from "~/composables/useAuth";

const props = defineProps(["isAccountMenu"]);
const user = useUser();

const { logout } = useAuth();
const inProgress = ref(false);
async function handleLogout() {
  await navigateTo("/login", { replace: true });
  inProgress.value = true;
  await logout();
  inProgress.value = false;
}
</script>

<template>
  <Transition name="accountMenu">
    <div
      v-if="isAccountMenu"
      class="menu-gray-800 menu-state-bg bg-light rounded-2 menu-state-color fw-semibold py-4 fs-6 w-275px position-absolute account-menu shadow"
      style="z-index: 1000 !important"
    >
      <div class="menu-item px-3">
        <div class="menu-content d-flex align-items-center px-3">
          <div class="symbol symbol-50px me-5">
            <img
              v-if="user?.url_photo"
              :alt="user?.name"
              :src="user?.url_photo"
            />
            <img v-else alt="Logo" src="../../assets/media/avatars/blank.png" />
          </div>
          <div class="d-flex flex-column">
            <div class="fw-bold d-flex align-items-center fs-5">
              {{ user?.name }}
            </div>
            <span class="fw-semibold text-muted fs-7">{{ user?.email }}</span>
          </div>
        </div>
      </div>
      <div class="separator my-2"></div>
      <div class="menu-item mx-2">
        <NuxtLink
          :to="`/profile/${user?.identify_number}`"
          class="w-100 btn btn-light mb-1 text-dark text-start"
        >
          <span>My Profile</span>
        </NuxtLink>
        <button
          v-if="!inProgress"
          @click="handleLogout"
          class="w-100 btn btn-active-light-danger text-start"
        >
          <i class="pi pi-sign-out"></i>
          <span>Logout</span>
        </button>
        <div class="w-100 text-center mx-2" v-else>
          <icon
            name="svg-spinners:ring-resize"
            class="indicator-label"
            size="19"
          />
        </div>
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