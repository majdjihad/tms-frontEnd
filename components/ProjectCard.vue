<script setup>
import moment from "moment";
import {useProjects} from "~/composables/useProjects";
import {useProjectsStore} from "~/stores/projectsStore";
import {useToast} from "vue-toastification";

const props = defineProps(["project"]);
const getColor = (index) => {
  const colorList = ["dc3545", "d63384", "fd7e14", "ffc107", "20c997"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};
const projectsStore = useProjectsStore()
const {favoriteProject, projects} = useProjects()
const toast = useToast()
const inProgress = ref(false)

async function favorite(projectId) {
  inProgress.value = true
  try {
    const response = await favoriteProject(projectId)
    await projectsStore?.getAllProjects()
    inProgress.value = false
  } catch (error) {
    showToast('error', error.data.message)
  }
}

function showToast(statusCode, msg) {
  const toastAttr = {
    position: "top-center",
    timeout: 5000,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: false,
  }

  if (statusCode === 'success') {
    toast.success(msg, {
      ...toastAttr
    });
  } else if (statusCode === 'error') {
    toast.error(msg, {
      ...toastAttr
    });
  }
}
</script>
<template>
  <div class="col-md-6 col-xl-4">
    <div class="card shadow-sm">
      <div class="card-header border-0 px-7 pt-7">
        <div class="card-title m-0">

          <NuxtLink :to="`/projects/${project?.project_identify}/backlog`" class="symbol symbol-50px w-50px bg-light">
            <img src="../assets/media/avatars/project.png" alt="image" class="w-100 object-cover"/>
          </NuxtLink>
        </div>
        <div class="card-toolbar">
          <button :disabled="inProgress" class="project-fav border-0 badge fw-bold me-auto px-4 py-3 badge-light-danger cursor-pointer"
                @click="favorite(project?.project_identify); project.is_favorite = !project?.is_favorite">
            <span v-if="!inProgress">
              <Icon v-if="project?.is_favorite" name="material-symbols:favorite" size="22"/>
              <Icon v-else name="material-symbols:favorite-outline" size="22"/>
            </span>
            <span v-else>
              <icon name="svg-spinners:ring-resize" size="22" />
            </span>
          </button>
        </div>
      </div>
      <div class="card-body p-7">
        <NuxtLink :to="`/projects/${project?.project_identify}/backlog`" class="project-name fs-3 fw-bold text-dark">
          {{ project?.name }}
          <Icon name="ci:external-link" size="20"/>
        </NuxtLink>
        <p class="text-gray-400 fw-semibold fs-5 mt-1 mb-7 truncate">{{ project?.description }}</p>
        <div class="d-flex flex-wrap mb-5">
          <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
            <div class="fs-6 text-gray-800 fw-bold">{{ moment(project?.created_at).format("ll") }}</div>
            <div class="fw-semibold text-gray-400">Create Date</div>
          </div>
          <div class="border border-gray-300 border-dashed rounded min-w-90px py-3 px-4 mb-3">
            <div class="fs-5 text-gray-800 fw-bold text-center">25</div>
            <div class="fw-semibold text-gray-400">Opened Issues</div>
          </div>
        </div>
        <div class="separator d-flex flex-center mb-8">
        <span class="text-uppercase bg-body fs-7 fw-semibold text-muted px-3"><Icon name="ri:team-line"
                                                                                    size="18"/></span>
        </div>
        <div v-if="project?.team_members?.length > 0" class="symbol-group symbol-hover flex-nowrap me-5">
          <div v-for="(member, index) in project?.team_members">
            <div v-if="index <= 7 && member.invite_status === 'accept'"
                 class="symbol symbol-35px fs-2 symbol-circle cursor-pointer">
              <img v-if="member?.user?.photo" alt="Pic" :src="member?.user?.url_photo"/>
              <span v-else class="symbol-label text-inverse-warning text-uppercase"
                    :style="{ backgroundColor: getColor(index) }">{{
                  member?.user?.name ? member?.user?.name[0] : '-'
                }}</span>
            </div>
          </div>
        </div>
        <div v-else class="alert bg-light-danger d-flex align-items-center w-100">
          <Icon name="fluent:people-error-16-regular" size="24" class="text-danger me-4"/>

          <div class="w-100 d-flex align-items-center">
            <h5 class="fw-semibold p-0 m-0">No Team Found.</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.project-name {
  transition: all 0.3s ease;
}

.project-name:hover {
  color: var(--bs-primary) !important;
}
</style>