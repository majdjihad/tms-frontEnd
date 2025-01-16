<script setup>
import { useProjectsStore } from "~/stores/projectsStore";

const projectsStore = useProjectsStore();
const activeTab = ref("all");

const changeTab = (tabName) => (activeTab.value = tabName);
</script>

<template>
  <div>
    <div class="tabs-wrraper w-100 h-80px">
      <div
        class="app-container container-xxl h-100 mb-2 d-flex align-items-end justify-content-between"
      >
        <ul class="nav nav-tabs">
          <li @click="changeTab('all')" class="nav-item cursor-pointer fs-4">
            <div class="nav-link" :class="{ active: activeTab === 'all' }">
              All
              <span
                class="projects-count"
                v-if="projectsStore?.allProjects?.length > 0"
                >({{ projectsStore?.allProjects?.length }})</span
              >
            </div>
          </li>
          <li
            @click="changeTab('favorite')"
            class="nav-item cursor-pointer fs-4"
          >
            <div class="nav-link" :class="{ active: activeTab === 'favorite' }">
              Favorite
              <span
                class="projects-count"
                v-if="projectsStore?.allFavoriteProjects?.length > 0"
                >({{ projectsStore?.allFavoriteProjects?.length }})</span
              >
            </div>
          </li>
          <li
            @click="changeTab('myProjects')"
            class="nav-item cursor-pointer fs-4"
          >
            <div
              class="nav-link"
              :class="{ active: activeTab === 'myProjects' }"
            >
              My Projects
              <span
                class="projects-count"
                v-if="projectsStore?.allProjects?.length > 0"
                >({{ projectsStore?.allProjects?.length }})</span
              >
            </div>
          </li>
        </ul>
        <NuxtLink to="/create-project" class="btn btn-flex btn-primary mb-7"
          ><i class="ki-outline ki-plus fs-3"></i>Create Project</NuxtLink
        >
      </div>
    </div>
    <div class="app-container container-xxl">
      <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
        <div class="d-flex flex-column flex-column-fluid">
          <div id="kt_app_content" class="app-content flex-column-fluid">
            <div class="row" v-if="projectsStore?.changeStatus">
              <SkeletonProjectCard v-for="index in 12" :key="index" />
            </div>
            <div v-else>
              <div
                v-if="
                  projectsStore?.allProjects?.length ||
                  projectsStore?.allInviteProjects?.length
                "
              >
                <div class="row" v-if="activeTab === 'all'">
                  <ProjectCompProjectCard
                    v-for="(project, index) in projectsStore?.allProjects"
                    :key="index"
                    :project="project"
                    class="mb-10"
                  />
                  <ProjectCompProjectCard
                    v-for="(project, index) in projectsStore?.allInviteProjects"
                    :key="index"
                    :project="project"
                    class="mb-10"
                  />
                </div>
                <div class="row" v-else-if="activeTab === 'favorite'">
                  <div v-if="projectsStore?.allFavoriteProjects.length > 0">
                    <ProjectCompProjectCard
                      v-for="(
                        project, index
                      ) in projectsStore?.allFavoriteProjects"
                      :key="index"
                      :project="project"
                      class="mb-10"
                    />
                  </div>
                  <div
                    v-else
                    class="d-flex justify-content-center algin-items-center"
                    style="height: 385px"
                  >
                    <p class="d-flex align-items-center fs-1 text-muted">
                      No Favorite Projects
                    </p>
                  </div>
                </div>
                <div class="row" v-else-if="activeTab === 'myProjects'">
                  <div v-if="projectsStore?.allProjects.length > 0">
                    <ProjectCompProjectCard
                      v-for="(project, index) in projectsStore?.allProjects"
                      :key="index"
                      :project="project"
                      class="mb-10"
                    />
                  </div>
                  <div
                    v-else
                    class="d-flex justify-content-center algin-items-center"
                    style="height: 385px"
                  >
                    <p class="d-flex align-items-center fs-1 text-muted">
                      No Have any Projects
                    </p>
                  </div>
                </div>
              </div>
              <div v-else class="d-flex flex-center flex-column">
                <div class="text-center">
                  <img
                    src="~/assets/media/illustrations/misc/no-projects.svg"
                    alt="no projects"
                    class="img-no-projects"
                  />
                </div>
                <div class="text-center mt-5">
                  <h2 class="fs-1 text-gray-700 mb-8 text-capitalize">
                    You don't have any projects yet!
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs-wrraper {
  background-color: var(--bs-app-header-base-bg-color);
}

.tabs-wrraper .nav {
  border: none;
}

.tabs-wrraper .nav-link {
  padding: 10px 16px;
}

.img-no-projects {
  max-width: 50%;
  height: auto;
}

.tabs-wrraper .nav-link,
.tabs-wrraper .nav-link span {
  border: none;
  font-weight: 500;
  position: relative;
  color: var(--bs-light) !important;
  transition: all 0.3s ease;
}

.tabs-wrraper .nav-link:hover,
.tabs-wrraper .nav-link:hover span {
  color: var(--bs-primary) !important;
  font-weight: 500;
}

.tabs-wrraper .nav-link.active,
.tabs-wrraper .nav-link.active span {
  color: var(--bs-primary) !important;
}

.tabs-wrraper .nav-link.active {
  background: var(--bs-app-bg-color);
}
</style>