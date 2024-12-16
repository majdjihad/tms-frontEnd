<script setup>
import { useProjectsStore } from "~/stores/projectsStore";
import { useProjects } from "~/composables/useProjects";
const getColor = (index) => {
  const colorList = ["4A90E2", "9013FE", "F5A623", "D0021B", "F8E71C"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};
const route = useRoute();
const projectsStore = useProjectsStore();
const projectId = ref(route?.params?.id);
const countMemberShow = ref(1);

if (projectsStore?.project === null) {
  projectsStore?.getProject(projectId.value);
} else {
  projectsStore?.getProject(projectId.value);
}
const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const closeMenu = () => (isMenuOpen.value = false);
watch(isMenuOpen, () => {
  if (isMenuOpen.value) {
    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", closeMenu);
  }
});

const handleOutsideClick = (e) => {
  if (document.getElementById("projectActionsButton").contains(e.target)) {
    return;
  }

  if (!document.getElementById("projectActionsMenu").contains(e.target)) {
    isMenuOpen.value = false;
    document.removeEventListener("click", handleOutsideClick);
  }
};

onMounted(() => document.addEventListener("click", handleOutsideClick));

const { archiveProject } = useProjects();
const { submit, inProgress } = useSubmit(
  async () => {
    return await archiveProject(projectsStore?.project?.project_identify);
  },
  {
    onSuccess: async () => {
      await backlogStore?.getBacklogProject(
        projectsStore?.project?.project_identify
      );
    },
    onError: async (error) => {
      console.log(error.data.massage);
    },
  }
);

const handleArchiveProject = () => {
  Swal.fire({
    html: `Are you sure you want to Archive <strong><div class="truncate lh-lg" >${projectsStore?.project?.name}<span>(${projectsStore?.project?.key})</span</div></strong>`,
    icon: "warning",
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: "Yes, remove!",
    cancelButtonText: "No, cancel",
    showLoaderOnConfirm: true,
    customClass: {
      confirmButton: "btn fw-bold btn-danger",
      cancelButton: "btn fw-bold btn-active-light-primary",
    },
    preConfirm: async () => {
      await submit();
    },
  });
};
</script>

<template>
  <div>
    <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
      <div id="kt_app_toolbar" class="app-toolbar">
        <div
          id="kt_app_toolbar_container"
          class="app-container container-xxl d-flex align-items-start"
        >
          <div class="d-flex flex-column flex-row-fluid">
            <div
              class="page-title d-flex align-items-center me-3 mb-4 pt-9 pt-lg-17 mb-lg-15"
            >
              <div
                v-if="projectsStore?.project"
                class="btn btn-icon h-65px w-65px me-6 overflow-hidden"
              >
                <img
                  alt="Logo"
                  src="~/assets/media/avatars/project.png"
                  class="w-100"
                />
              </div>
              <div v-else class="btn btn-icon h-65px w-65px skeleton me-6">
                <span class="w-100 skeleton bg-light"></span>
              </div>
              <div
                class="page-heading d-flex text-white fw-bolder fs-2 flex-column justify-content-center my-0 position-relative"
              >
                <div class="d-flex align-items-center gap-2">
                  <span v-if="projectsStore?.project?.name"
                    >{{ projectsStore?.project?.name }} ({{
                      projectsStore?.project?.key
                    }})</span
                  >
                  <span
                    v-else
                    class="d-block rounded skeleton"
                    style="height: 20px; width: 100px !important"
                  ></span>
                  <div class="position-relative">
                    <span
                      v-if="projectsStore?.project"
                      id="projectActionsButton"
                      class="edit-icon text-gray-400 cursor-pointer"
                      @click.prevent="toggleMenu"
                    >
                      <i class="pi pi-ellipsis-v" style="font-size: 16px"> </i>
                    </span>
                    <Transition name="projectActionsMenu">
                      <div
                        v-show="isMenuOpen"
                        id="projectActionsMenu"
                        class="projectActionsMenu menu-gray-800 menu-state-bg-light-primary fw-semibold bg-light rounded shadow position-absolute p-1"
                      >
                        <div class="menu-item px-3">
                          <div class="menu-content fs-6 text-dark">
                            Project Actions
                          </div>
                        </div>
                        <div class="separator opacity-75"></div>
                        <div class="menu-item p-0 mb-1">
                          <span
                            class="btn btn-sm btn-light rounded fs-6 w-100 ps-1"
                            data-bs-toggle="modal"
                            data-bs-target="#kt_modal_edit_project"
                          >
                            <i class="pi pi-pencil" style="font-size: 1rem"></i>
                            Edit Project</span
                          >
                        </div>
                        <div class="menu-item" @click="handleArchiveProject">
                          <span
                            class="btn btn-sm btn-light-danger rounded fs-6 w-100 ps-1 mb-3"
                          >
                            <i class="pi pi-inbox" style="font-size: 1rem"></i>
                            Archive Project</span
                          >
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
                <span class="page-desc fs-6 fw-bold pt-4">
                  <span
                    v-if="projectsStore?.project?.description"
                    class="fs-6 truncate"
                    style="max-width: 550px"
                    >{{ projectsStore?.project?.description }}</span
                  >
                  <span
                    v-else
                    class="d-block rounded skeleton"
                    style="height: 20px; width: 150px !important"
                  ></span>
                </span>
              </div>
            </div>
            <div
              class="d-flex justify-content-between flex-wrap gap-4 gap-lg-10"
            >
              <div
                class="app-toolbar-menu menu menu-rounded menu-gray-800 menu-state-bg flex-wrap fs-5 fw-semibold"
              >
                <div class="menu-item pb-xl-8 pb-4 mt-5 mt-lg-0">
                  <NuxtLink
                    :to="`/projects/${projectsStore?.project?.project_identify}/backlog`"
                    class="menu-link"
                    :class="{ active: route.name === 'projects-id-backlog' }"
                  >
                    <span class="menu-title">Backlog</span>
                  </NuxtLink>
                </div>
                <div class="menu-item pb-xl-8 pb-4 mt-5 mt-lg-0">
                  <NuxtLink
                    :to="`/projects/${projectsStore?.project?.project_identify}/team`"
                    class="menu-link"
                    :class="{ active: route.name === 'projects-id-team' }"
                  >
                    <span class="menu-title">Team</span>
                  </NuxtLink>
                </div>
                <div class="menu-item pb-xl-8 pb-4 mt-5 mt-lg-0">
                  <NuxtLink
                    :to="`/projects/${projectsStore?.project?.project_identify}/history`"
                    class="menu-link"
                    :class="{ active: route.name === 'projects-id-history' }"
                  >
                    <span class="menu-title">History</span>
                  </NuxtLink>
                </div>
              </div>
              <div
                class="d-flex flex-align-items flex-wrap gap-3 gap-xl-0 mb-7 mt-n1"
              >
                <div class="symbol-group symbol-hover flex-nowrap me-5">
                  <div
                    class="d-flex"
                    v-if="projectsStore?.project?.team_members"
                  >
                    <div
                      v-for="(member, index) in projectsStore?.project
                        ?.team_members"
                      :key="index"
                      v-tooltip.top="{ value: member?.user?.name }"
                    >
                      <NuxtLink
                        :to="`/profile/${member?.user?.identify_number}`"
                        v-if="
                          index + 1 <= countMemberShow &&
                          member.invite_status === 'accept'
                        "
                        class="symbol symbol-35px fs-2 symbol-circle cursor-pointer"
                      >
                        <img
                          v-if="member?.user?.photo"
                          alt="Pic"
                          :src="member?.user?.url_photo"
                        />
                        <span
                          v-else
                          class="symbol-label fs-1 text-light"
                          :style="{
                            backgroundColor: getColor(member?.user?.id),
                          }"
                          >{{
                            member?.user?.name
                              ? member?.user?.name[0].toUpperCase()
                              : "-"
                          }}</span
                        >
                      </NuxtLink>
                    </div>
                    <div
                      class="symbol symbol-35px symbol-circle cursor-pointer"
                      v-if="
                        projectsStore?.project?.team_members.reduce(
                          (count, member) =>
                            member.invite_status === 'accept'
                              ? count + 1
                              : count,
                          0
                        ) > countMemberShow
                      "
                    >
                      <span
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_view_users"
                        class="symbol-label text-inverse-warning fw-bold bg-dark text-white fs-3"
                        >+{{
                          projectsStore?.project?.team_members.reduce(
                            (count, member) =>
                              member.invite_status === "accept"
                                ? count + 1
                                : count,
                            0
                          ) - countMemberShow
                        }}</span
                      >
                    </div>
                  </div>
                  <div v-else class="d-flex">
                    <div
                      v-for="m in 4"
                      :key="m"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <div
                        class="symbol symbol-circle symbol-35px overflow-hidden"
                      >
                        <span class="symbol-label skeleton"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center flex-shrink-0">
                  <div
                    class="d-flex justify-content-end"
                    data-kt-user-table-toolbar="base"
                  >
                    <button
                      type="button"
                      class="d-flex align-items-center justify-content-center gap-2 btn btn-light ms-2"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_create_issue"
                    >
                      Create Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalsEditProject />
    <ModalsCreateIssue />
    <ModalsMemebersList />
  </div>
</template>

<style scoped>
.edit-icon i {
  transition: all 0.1s ease-in-out;
}

.edit-icon:hover i {
  color: var(--bs-light) !important;
}

.edit-input input {
  background: transparent;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  color: var(--bs-light);
  font-family: inherit;
}

.projectActionsMenu {
  min-width: 170px;
  z-index: 900;
  opacity: 1;
}
</style>