<script setup>
import { useBacklog } from "~/composables/useBacklog";
import { useSubmit } from "~/composables/useSubmit";
import { useBacklogStore } from "~/stores/backlogStore";
import { useProjectsStore } from "~/stores/projectsStore";
import { useToast } from "vue-toastification";
import TieredMenu from "primevue/tieredmenu";

const props = defineProps(["subIssue", "progress"]);
const { deleteIssue, editIssue, editPriority } = useBacklog();
const projectsStore = useProjectsStore();
const backlogStore = useBacklogStore();
const toast = useToast();

// define background color by user id
const getColor = (index) => {
  const colorList = ["4A90E2", "9013FE", "F5A623", "D0021B", "F8E71C"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};

const handleDeleteSubIssue = () => {
  Swal.fire({
    html: `Are you sure you want to delete <strong><div class="truncate lh-lg" >${props?.subIssue?.title}</div></strong>`,
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

const { submit } = useSubmit(
  async () => {
    return await deleteIssue(
      projectsStore?.project?.project_identify,
      props?.subIssue?.id
    );
  },
  {
    onSuccess: async (response) => {
      await backlogStore?.getIssueInfo(
        projectsStore?.project?.project_identify,
        props?.subIssue?.parent_id
      );
    },
    onError: (error) => {
      showToast("error", error.data.message);
    },
  }
);

function showToast(statusCode, msg) {
  const toastAttr = {
    position: "bottom-right",
    timeout: 5000,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: true,
    rtl: false,
  };
  if (statusCode === "success") {
    toast.success(msg, {
      ...toastAttr,
    });
  } else if (statusCode === "error") {
    toast.error(msg, {
      ...toastAttr,
    });
  }
}

// get subIssue description
const getInfoSubIssue = async () => {
  document.getElementById("kt_modal_issue_info").click();
  backlogStore.subIssueInfoArray = null;
  backlogStore.subIssueCommentArray = null;
  await backlogStore?.getIssueInfo(
    projectsStore?.project?.project_identify,
    props?.subIssue?.parent_id
  );
  await backlogStore?.getIssueComments(
    projectsStore?.project?.project_identify,
    props?.subIssue?.id
  );
};

// statuses menu functionality
const statusesOpen = ref(false);
const statusesLoading = ref(false);
const EditStatusLoading = ref(false);

const statusesToggle = async () => {
  if (!statusesOpen.value) {
    statusesOpen.value = true;
    if (!backlogStore?.statusesArray && !statusesLoading.value) {
      statusesLoading.value = true;
      const response = await backlogStore?.getStatusProject(
        projectsStore?.project?.project_identify
      );
      backlogStore.statusesArray = await response?.statuses;
      statusesLoading.value = false;
    }
  } else {
    statusesOpen.value = !statusesOpen.value;
  }
};

//define close statuses menu
const closeStatuses = () => {
  statusesOpen.value = false;
};

// assignee menu functionality
const assigneeOpen = ref(false);
const assigneeLoading = ref(false);
const EditAssigneeLoading = ref(false);

const assigneeToggle = async () => {
  assigneeOpen.value = !assigneeOpen.value;
};

//define close assignee menu
const closeAssignee = () => {
  assigneeOpen.value = false;
};

// Define function handle change statuses or assignee subIssues
const changesubIssue = async (actionId) => {
  closeStatuses();
  closeAssignee();
  Object.keys(actionId)[0] === "status_id"
    ? (EditStatusLoading.value = true)
    : Object.keys(actionId)[0] === "assign_to"
    ? (EditAssigneeLoading.value = true)
    : false;
  try {
    await editIssue(
      projectsStore?.project?.project_identify,
      props?.subIssue?.id,
      actionId
    );
    await backlogStore?.getIssueInfo(
      projectsStore?.project?.project_identify,
      props?.subIssue?.parent_id
    );
  } catch (error) {
    showToast(error?.data?.message);
  }
  Object.keys(actionId)[0] === "status_id"
    ? (EditStatusLoading.value = false)
    : Object.keys(actionId)[0] === "assign_to"
    ? (EditAssigneeLoading.value = false)
    : false;
};

// define action subIssue menu
const subIssueMenuOpen = ref(false);
const isMoveItemClicked = ref(false);
const items = ref([
  {
    label: "Delete",
    icon: "fa-regular fa-trash-can",
    command: () => {
      handleDeleteSubIssue();
    },
  },
]);

// define toggle action subIssue menu
const subIssueMenuToggle = async () => {
  subIssueMenuOpen.value = !subIssueMenuOpen.value;
};

// define close action subIssue menu
const closeSubIssueMenu = (event) => {
  if (!isMoveItemClicked.value) {
    subIssueMenuOpen.value = false;
  }
  isMoveItemClicked.value = false;
};

// priorities menu functionality
const prioritiesOpen = ref(false);
const EditPriorityLoading = ref(false);

const PrioritiesMenuToggle = async () => {
  prioritiesOpen.value = !prioritiesOpen.value;
};

// Define function handle change Priority subIssues
const changePriority = async (priorityObj) => {
  closePrioritiesMenu();
  EditPriorityLoading.value = true;
  try {
    await editPriority(
      projectsStore?.project?.project_identify,
      props?.subIssue?.id,
      priorityObj
    );
    await backlogStore?.getBacklogProject(
      projectsStore?.project?.project_identify
    );
  } catch (error) {
    showToast(error?.data?.message);
  }
  EditPriorityLoading.value = false;
};

// define close action Priority menu
const closePrioritiesMenu = () => {
  prioritiesOpen.value = false;
};
</script>

<template>
  <div>
    <div
      class="subIssue-container d-flex align-items-center justify-content-between cursor-pointer py-2 px-8 border-bottom position-relative"
    >
      <div
        data-bs-toggle="modal"
        @click="getInfoSubIssue"
      >
        <!-- data-bs-target="#kt_modal_subIssue_info" -->
        <img
          v-if="subIssue?.type === 'task'"
          src="~/assets/media/issue/type/task.svg"
          class="me-2"
          alt="task"
        />
        <img
          v-else-if="subIssue?.type === 'story'"
          src="~/assets/media/issue/type/story.svg"
          class="me-2"
          alt="story"
        />
        <img
          v-else-if="subIssue?.type === 'bug'"
          src="~/assets/media/issue/type/bug.svg"
          class="me-2"
          alt="bug"
        />
        <span class="text-gray-600 me-2 truncate text-nowrap fs-8">{{
          subIssue?.key
        }}</span>
        <span class="text-gray-800 me-2 truncate text-nowrap fs-6">{{
          subIssue?.title
        }}</span>
      </div>
      <div
        v-if="!progress"
        class="subIssue-info d-flex align-items-center justify-content-between"
      >
        <div class="position-relative">
          <div
            class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap"
            :class="
              subIssue?.status?.name === 'TO DO'
                ? 'bg-light-active'
                : subIssue?.status?.name === 'DONE'
                ? 'bg-light-primary text-primary'
                : 'bg-light-success text-success'
            "
          >
            <div v-if="EditStatusLoading">
              <Icon name="svg-spinners:180-ring-with-bg" size="20" />
            </div>
            <div v-else v-click-outside="closeStatuses" @click="statusesToggle">
              {{ subIssue?.status?.name }}
              <Icon
                v-if="statusesOpen"
                name="ic:outline-keyboard-arrow-up"
                size="17"
                class="m-0"
              />
              <Icon
                v-else
                name="ic:outline-keyboard-arrow-down"
                size="17"
                class="m-0"
              />
            </div>
          </div>
          <Transition name="statusesMenu">
            <div
              v-if="statusesOpen"
              class="statusesMenuWrapper position-absolute bg-white shadow p-3 d-flex flex-column gap-2 rounded-1 overflow-y-auto z-1"
              style="
                min-width: 130px !important;
                width: max-content !important;
                max-height: 138px !important;
                right: 0;
              "
            >
              <div v-if="statusesLoading" class="text-center">
                Loading...
                <Icon name="svg-spinners:180-ring-with-bg" size="16" />
              </div>
              <div
                v-else
                v-for="(status, index) in backlogStore.statusesArray"
                :key="index"
                class="hover-bg-light"
              >
                <div
                  v-if="status?.name !== subIssue?.status?.name"
                  class="py-1 px-3 rounded-1 text-uppercase fs-7 truncate"
                  style="max-width: 150px"
                  @click="changesubIssue({ status_id: status?.id })"
                  :class="
                    status?.name === 'TO DO'
                      ? 'bg-light-active'
                      : status?.name === 'DONE'
                      ? 'bg-light-primary text-primary'
                      : 'bg-light-success text-success'
                  "
                >
                  {{ status?.name }}
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <div class="position-relative">
          <div
            class="d-flex justify-content-center align-items-center py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap"
          >
            <div v-if="EditAssigneeLoading">
              <Icon
                name="svg-spinners:180-ring-with-bg"
                class="p-2"
                size="30"
              />
            </div>
            <div
              v-else
              v-click-outside="closeAssignee"
              @click="assigneeToggle"
              class="symbol symbol-circle symbol-30px overflow-hidden"
            >
              <div v-if="subIssue?.assign_to">
                <img
                  v-if="subIssue?.team_member?.user?.photo"
                  :src="subIssue?.team_member?.user?.url_photo"
                  :alt="subIssue?.team_member?.user?.name"
                  class="w-35px h-35px"
                />
                <span
                  v-else
                  class="symbol-label text-inverse-warning fw-bold fs-3"
                  :style="{
                    backgroundColor: getColor(subIssue?.team_member?.user?.id),
                  }"
                  >{{
                    subIssue?.team_member?.user?.name
                      ? subIssue?.team_member?.user?.name[0].toUpperCase()
                      : "-"
                  }}</span
                >
              </div>
              <div v-else>
                <img
                  src="~/assets/media/avatars/blank.png"
                  alt="Unassigned"
                  class="w-35px h-35px"
                />
              </div>
            </div>
          </div>
          <Transition name="statusesMenu">
            <div
              v-if="assigneeOpen"
              class="statusesMenuWrapper position-absolute bg-white shadow p-0 d-flex flex-column gap-2 rounded-1 overflow-y-auto z-1"
              style="
                min-width: 130px !important;
                width: max-content !important;
                max-height: 138px !important;
                gap: 0 !important;
              "
            >
              <div v-if="assigneeLoading" class="text-center">
                Loading...
                <Icon name="svg-spinners:180-ring-with-bg" size="16" />
              </div>
              <div
                @click="changesubIssue({ assign_to: null })"
                class="unAssignee w-100 d-flex justify-content-start align-items-center hover-bg-light p-2 border-bottom"
                v-if="subIssue?.assign_to"
              >
                <div class="symbol symbol-circle symbol-30px overflow-hidden">
                  <img
                    src="~/assets/media/avatars/blank.png"
                    alt="Unassigned"
                    class="w-30px h-30px"
                  />
                </div>
                <span class="ms-3">unassignee</span>
              </div>
              <div
                v-for="(
                  member, index
                ) in projectsStore?.project?.team_members?.filter(
                  (memeber) => memeber?.invite_status === 'accept'
                )"
                :key="index"
                @click="changesubIssue({ assign_to: member?.id })"
              >
                <div
                  class="w-100 d-flex justify-content-start align-items-center hover-bg-light p-2 border-bottom"
                  v-if="subIssue?.assign_to != member?.id"
                >
                  <div class="symbol symbol-circle symbol-30px overflow-hidden">
                    <img
                      v-if="member?.user?.photo"
                      :src="member?.user?.url_photo"
                      :alt="member?.user?.name"
                      class="w-30px h-30px"
                    />
                    <span
                      v-else
                      class="symbol-label text-inverse-warning fs-3 fw-bold"
                      :style="{ backgroundColor: getColor(member?.user?.id) }"
                      >{{
                        member?.user?.name
                          ? member?.user?.name[0].toUpperCase()
                          : "-"
                      }}</span
                    >
                  </div>
                  <span class="ms-3">{{ member?.user?.name }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <div class="position-relative">
          <div
            class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap"
          >
            <div v-if="false">
              <Icon name="svg-spinners:180-ring-with-bg" size="30" />
            </div>
            <div
              v-else
              v-click-outside="closeSubIssueMenu"
              @click="subIssueMenuToggle"
              class="hover-bg-white p-2 rounded d-flex justify-content-center align-items-center overflow-hidden"
            >
              <i
                class="ki-solid ki-dots-horizontal fs-1 cursor-pointer fs-2x"
              ></i>
            </div>
          </div>
          <Transition name="statusesMenu">
            <div
              v-if="subIssueMenuOpen"
              class="statusesMenuWrapper z-1 position-absolute end-0 w-125px"
            >
              <TieredMenu v-if="subIssueMenuOpen" :model="items" />
            </div>
          </Transition>
        </div>
      </div>
      <icon
        v-else
        name="svg-spinners:ring-resize"
        class="text-gray-600 me-3 p-1"
        size="25"
      />
    </div>
    <IssueComponentSubIssueModal />
  </div>
</template>

<style scoped>
.subIssue-border {
  border-left: #0a6aa1 3px solid !important;
}

.form-check-input {
  width: 1.1rem !important;
  height: 1.1rem !important;
  border-radius: 3px !important;
  box-shadow: none;
  display: none;
}

.form-check-input:focus {
  box-shadow: none;
}

.subIssue-container:hover .form-check-input {
  display: inline;
}

.form-check-input:checked {
  display: inline;
}

.subIssue-container::-webkit-scrollbar {
  height: 2px;
  background-color: transparent;
}

.subIssue-container::-webkit-scrollbar-thumb {
  background-color: var(--bs-text-gray-200);
  border-radius: 2px;
}

.subIssue-container:hover {
  background-color: var(--bs-gray-100);
}

.subIssue-title {
  max-width: 550px !important;
}

.statusesMenuWrapper {
  transition: all 0.3s ease;
  top: 115%;
}

.statusesMenu-enter-active,
.statusesMenu-leave-active {
  top: 115%;
  opacity: 1;
  transition: all 0.3s ease;
}

.statusesMenu-enter-from,
.statusesMenu-leave-to {
  top: 130%;
  opacity: 0;
}

@media screen and (max-width: 1400px) {
  .subIssue-title {
    max-width: 520px !important;
  }
}

@media screen and (max-width: 1200px) {
  .subIssue-title {
    max-width: 400px !important;
  }
}

@media screen and (max-width: 600px) {
  .subIssue-info {
    gap: 15px;
  }

  .subIssue-title {
    max-width: 250px !important;
  }
}
</style>