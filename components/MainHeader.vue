<script setup>
import {useUser} from "~/composables/useAuth";

const isAccountMenu = ref(false);
const isProjectMenu = ref(false);
const user = useUser();
</script>

<template>
  <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
    <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
      <div id="kt_app_header" class="app-header" data-kt-sticky="true"
           data-kt-sticky-activate="{default: false, lg: true}" data-kt-sticky-name="app-header-sticky"
           data-kt-sticky-offset="{default: false, lg: '300px'}">
        <div class="app-container container-xxl d-flex align-items-stretch justify-content-between"
             id="kt_app_header_container">
          <div class="d-flex align-items-center d-lg-none ms-n2 me-2" title="Show sidebar menu">
            <div class="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_header_menu_toggle">
              <i class="ki-outline ki-abstract-14 fs-2 text-white"></i>
            </div>
          </div>
          <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15">
            <NuxtLink to="/projects">
              <img alt="Logo" src="~/assets/media/logos/logo-light.png" class="logo-sticky h-20px h-lg-40px h-sm-40px"/>
            </NuxtLink>
          </div>
          <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
            <div class="app-header-menu app-header-mobile-drawer align-items-stretch">
              <div
                  class="menu menu-rounded menu-active-bg menu-state-primary menu-column menu-lg-row menu-title-gray-700 menu-icon-gray-500 menu-arrow-gray-500 menu-bullet-gray-500 my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
                  id="kt_app_header_menu" data-kt-menu="true">
                <div class="here menu-item menu-here-bg menu-lg-down-accordion me-0 me-lg-2 position-relative"
                     @mouseenter="isProjectMenu = true" @mouseleave="isProjectMenu = false">
                  <span class="menu-link">
                    <span class="menu-title me-1 fw-bold">Projects</span>
                    <span><Icon name="ic:outline-keyboard-arrow-down" size="22"/></span>
                  </span>
                  <HeaderProjectsMenu :isProjectMenu="isProjectMenu"/>
                </div>
              </div>
            </div>
            <div class="app-navbar flex-shrink-0">
              <div class="app-navbar-item ms-5 position-relative">
                <div
                    class="symbol symbol-35px symbol-md-45px position-relative rounded-pill shadow"
                    @mouseenter="isAccountMenu = true" @mouseleave="isAccountMenu = false">
                  <img v-if="user?.url_photo" class="symbol symbol-35px symbol-md-45px cursor-pointer" :src="user?.url_photo" :alt="user?.name"/>
                  <img v-else class="symbol symbol-35px symbol-md-45px cursor-pointer" src="../assets/media/avatars/blank.png" :alt="user?.name"/>
                  <HeaderAccountMenu :isAccountMenu="isAccountMenu"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalsSendInvitation/>
</template>

<style scoped>
.menu-item .menu-link span {
  transition: all 0.3s ease !important;
}
</style>