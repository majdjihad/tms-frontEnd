<script setup>
import { useProjectsStore } from "~/stores/projectsStore";

const projectsStore = useProjectsStore();
const props = defineProps(["isProjectMenu"]);

projectsStore?.changeStatus ? projectsStore?.getAllProjects() : false;
</script>

<template>
  <Transition name="projectsMenu">
    <div
      v-if="isProjectMenu"
      class="bg-light rounded-2 shadow position-absolute p-0 w-100 w-lg-300px projects-menu"
      style="z-index: 1000 !important"
    >
      <div class="menu-state-bg overflow-hidden">
        <div class="row">
          <div class="p-6">
            <div>
              <div
                v-if="projectsStore?.changeStatus"
                class="menu-item p-0 mb-3"
              >
                <div class="menu-link">
                  <div
                    class="d-flex flex-center rounded w-40px h-40px me-3 overflow-hidden rounded-1"
                  >
                    <img
                      src="~/assets/media/avatars/project.png"
                      class="w-100 d-block"
                      alt=""
                    />
                  </div>
                  <div class="d-flex flex-column">
                    <span
                      class="d-block mb-2 rounded h-15px w-50px skeleton"
                    ></span>
                    <span
                      class="d-block rounded h-15px w-100px skeleton"
                    ></span>
                  </div>
                </div>
              </div>
              <div
                v-if="
                  projectsStore?.allProjects?.length ||
                  projectsStore?.allInviteProjects?.length
                "
                class="mb-3"
                style="max-height: 190px"
              >
                <div
                  v-for="(project, index) in projectsStore.allProjects"
                  :key="index"
                  class="menu-item p-0 mb-3"
                >
                  <NuxtLink
                    :to="`/projects/${project?.project_identify}`"
                    class="menu-link"
                  >
                    <span
                      class="d-flex flex-center rounded w-40px h-40px me-3 overflow-hidden rounded-1"
                    >
                      <img
                        src="~/assets/media/avatars/project.png"
                        class="w-100 d-block"
                        alt=""
                      />
                    </span>
                    <span class="d-flex flex-column">
                      <span
                        v-if="project?.name"
                        class="fs-6 fw-bold text-gray-800"
                        id="project-name"
                        >{{ project?.name }}</span
                      >
                      <span
                        v-else
                        class="d-block mb-2 rounded skeleton"
                        style="height: 15px; width: 100px !important"
                      ></span>
                      <span
                        v-if="project?.description"
                        class="fs-7 fw-semibold text-muted truncate"
                        style="max-width: 220px"
                        >{{ project?.description }}</span
                      >
                      <span
                        v-else
                        class="d-block rounded skeleton"
                        style="height: 15px; width: 150px !important"
                      ></span>
                    </span>
                  </NuxtLink>
                </div>
                <div
                  v-for="(project, index) in projectsStore.allInviteProjects"
                  :key="index"
                  class="menu-item p-0 mb-3"
                >
                  <NuxtLink :to="`/projects/${project?.id}`" class="menu-link">
                    <span
                      class="d-flex flex-center rounded w-40px h-40px me-3 overflow-hidden rounded-1"
                    >
                      <img
                        src="~/assets/media/avatars/project.png"
                        class="w-100 d-block"
                        alt=""
                      />
                    </span>
                    <span class="d-flex flex-column">
                      <span
                        v-if="project?.name"
                        class="fs-6 fw-bold text-gray-800"
                        id="project-name"
                        >{{ project?.name }}</span
                      >
                      <span
                        v-else
                        class="d-block mb-2 rounded skeleton"
                        style="height: 15px; width: 100px !important"
                      ></span>
                      <span
                        v-if="project?.description"
                        class="fs-7 fw-semibold text-muted truncate"
                        style="max-width: 220px"
                        >{{ project?.description }}</span
                      >
                      <span
                        v-else
                        class="d-block rounded skeleton"
                        style="height: 15px; width: 150px !important"
                      ></span>
                    </span>
                  </NuxtLink>
                </div>
              </div>
              <div
                v-else-if="!projectsStore?.changeStatus"
                class="menu-item text-gray-800 d-flex align-items-center"
              >
                <div
                  class="alert bg-light-info d-flex flex-column align-items-center flex-sm-row w-100"
                >
                  <!--                  <i class="ki-duotone ki-notification-bing fs-2hx text-primary me-4"><span-->
                  <!--                      class="path1"></span><span class="path2"></span><span class="path3"></span></i>-->

                  <div class="d-flex flex-column w-100">
                    <h6 class="fw-semibold">You don't have any project.</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <NuxtLink
              v-if="projectsStore.allProjects !== null"
              to="/projects"
              class="links d-flex flex-stack flex-wrap flex-lg-nowrap px-5 py-3 text-gray-800 rounded-1"
            >
              View All Projects
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.projects-menu {
  top: 90px;
  left: 0;
}

.projects-menu .links:hover {
  background-color: #f5f5f5;
}

.projectsMenu-enter-active,
.projectsMenu-leave-active {
  transition: all 0.3s ease;
}

.projectsMenu-enter-from,
.projectsMenu-leave-to {
  opacity: 0;
  top: 110px;
}

.menu-item .menu-link.active #project-name {
  color: var(--bs-primary) !important;
}

.menu-item .menu-link.active {
  background-color: #f5f5f5 !important;
}

.menu-item a {
  transition: all 0.3s ease;
}

.menu-item a:hover {
  background-color: #f5f5f5 !important;
}
</style>