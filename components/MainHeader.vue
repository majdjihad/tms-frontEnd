<script setup>
import { useUser } from "~/composables/useAuth";
const isAccountMenu = ref(false);
const isNotificationsMenu = ref(false);
const isProjectMenu = ref(false);
const user = useUser();
const route = useRoute();
</script>

<template>
  <div class="d-flex flex-column flex-root app-root">
    <div class="app-page flex-column flex-column-fluid">
      <div
        class="app-header"
      >
        <div
          class="app-container container-xxl d-flex align-items-stretch justify-content-between"
        >
          <div
            class="d-flex align-items-center h-100"
          >
            <NuxtLink to="/projects" class="me-11">
              <img
                alt="Logo"
                src="~/assets/media/logos/logo-light.png"
                class="logo-sticky h-20px h-lg-55px h-sm-40px"
              />
            </NuxtLink>
            <div
              class="d-flex align-items-stretch h-100"
            >
              <div
                class="menu menu-rounded menu-active-bg menu-state-primary menu-column menu-row  menu-icon-gray-500 menu-bullet-gray-500 align-items-stretch fw-semibold px-0 my-0"
              >
                <div
                  class="header-menu-item me-0 me-2 position-relative"
                  @mouseenter="isProjectMenu = true"
                  @mouseleave="isProjectMenu = false"
                >
                  <span class="menu-link">
                    <span class="menu-title me-1 fw-bold">Projects</span>
                    <span
                      ><Icon name="ic:outline-keyboard-arrow-down" size="22"
                    /></span>
                  </span>
                  <ProjectCompProjectsMenu :isProjectMenu="isProjectMenu" />
                </div>
                <NuxtLink v-if="user?.project_identify"
                  :class="{
                    'active-link': user?.project_identify === route.params.id,
                  }"
                  :to="`/projects/${user?.project_identify}/board`"
                  class="header-menu-item ms-4 position-relative h-100"
                >
                  <span class="menu-title me-1 fw-bold">my project</span>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div
            class="d-flex align-items-stretch justify-content-end flex-grow-1 position-relative"
          >
            <div class="app-navbar flex-shrink-0">
              <div class="position-relative d-flex justify-content-center algin-items-center">
                <Icon
                  name="fa-regular:bell"
                  class="text-light cursor-pointer h1 m-auto me-9"
                  @click="isNotificationsMenu = !isNotificationsMenu"
                  v-click-outside="
                    () => {
                      isNotificationsMenu = false;
                    }
                  "
                />
              </div>
              <div class="app-navbar-item ms-5 position-relative">
                <div
                  class="symbol symbol-35px symbol-md-40px position-relative rounded-pill shadow"
                  @click="isAccountMenu = !isAccountMenu"
                  v-click-outside="
                    () => {
                      isAccountMenu = false;
                    }
                  "
                >
                  <img
                    v-if="user?.url_photo"
                    class="symbol symbol-25px symbol-md-30px symbol-circle cursor-pointer"
                    :src="user?.url_photo"
                    :alt="user?.name"
                  />
                  <img
                    v-else
                    class="symbol symbol-35px symbol-md-45px cursor-pointer"
                    src="../assets/media/avatars/blank.png"
                    :alt="user?.name"
                  />
                  <AccountMenu :isAccountMenu="isAccountMenu" />
                </div>
              </div>
            </div>
            <NotificationsMenu :isNotificationsMenu="isNotificationsMenu" />
          </div>
        </div>
      </div>
    </div>
    <ModalsSendInvitation />
  </div>
</template>

<style scoped>
.menu-item .menu-link span {
  transition: all 0.3s ease !important;
}
.header-menu-item {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: white;
  cursor: pointer;
}
.header-menu-item:hover {
  color: #2de276;
  border-bottom: #2de276 4px solid;
  border-radius: 2px;
}
.active-link {
  color: #2de276;
  border-bottom: #2de276 4px solid;
  border-radius: 2px;
}
</style>