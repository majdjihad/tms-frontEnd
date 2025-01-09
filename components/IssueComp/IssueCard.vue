<script setup>
import { useBacklog } from "~/composables/useBacklog";
import { useSubmit } from "~/composables/useSubmit";
import { useBacklogStore } from "~/stores/backlogStore";
import { useProjectsStore } from "~/stores/projectsStore";
import TieredMenu from "primevue/tieredmenu";
import { showToast } from "~/composables/useToast";

const props = defineProps(["issue", "progress", "input", "sprint"]);
const { moveIssue, deleteIssue, editIssue, editPriority } = useBacklog();
const projectsStore = useProjectsStore();
const backlogStore = useBacklogStore();
const model = defineModel();

// define background color by user id
const getColor = (index) => {
  const colorList = ["4A90E2", "9013FE", "F5A623", "D0021B", "F8E71C"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};

const handleDeleteIssue = () => {
  Swal.fire({
    html: `Are you sure you want to delete <strong><div class="truncate lh-lg" >${props?.issue?.title}</div></strong>`,
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
      props?.issue?.id
    );
  },
  {
    onSuccess: async () => {
      await backlogStore?.getBacklogProject(
        projectsStore?.project?.project_identify
      );
    },
    onError: (error) => {
      showToast("error", error.data.message);
    },
  }
);

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

// Define function handle change statuses or assignee issues
const changeIssue = async (actionId) => {
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
      props?.issue?.id,
      actionId
    );
    await backlogStore?.getBacklogProject(
      projectsStore?.project?.project_identify
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

// define action issue menu
const issueMenuOpen = ref(false);
const isMoveItemClicked = ref(false);
const items = ref([
  {
    label: "Preview",
    icon: "fa-regular fa-eye",
    command: () => {
      document.querySelector(".issue-title").click();
    },
  },
  {
    label: "Copy",
    icon: "fa-regular fa-copy",
  },
  {
    label: "move",
    icon: "fa-solid fa-arrows-up-down",
    command: () => {
      isMoveItemClicked.value = true;
    },
    items: [
      {
        label: "Backlog",
        items: [
          {
            label: "Top",
            command: async () => {
              await moveIssue(
                projectsStore?.project?.project_identify,
                props?.issue?.id,
                {
                  sprint_id: null,
                  position: 1,
                  order: 0,
                }
              );
              await backlogStore?.getBacklogProject(
                projectsStore?.project?.project_identify
              );
            },
          },
          {
            label: "Bottom",
            command: async () => {
              await moveIssue(
                projectsStore?.project?.project_identify,
                props?.issue?.id,
                {
                  sprint_id: null,
                  position: 0,
                  order: 0,
                }
              );
              await backlogStore?.getBacklogProject(
                projectsStore?.project?.project_identify
              );
            },
          },
        ],
      },
      ...(backlogStore?.sprintsProject || []).map((sprint) => ({
        label: sprint?.name,
        command: async () => {
          await moveIssue(
            projectsStore?.project?.project_identify,
            props?.issue?.id,
            {
              sprint_id: sprint?.id,
              position: 0,
              order: 0,
            }
          );
          await backlogStore?.getBacklogProject(
            projectsStore?.project?.project_identify
          );
        },
      })),
    ],
  },
  {
    label: "Delete",
    icon: "fa-regular fa-trash-can",
    command: () => {
      handleDeleteIssue();
    },
  },
]);

// define toggle action Issue menu
const issueMenuToggle = async () => {
  issueMenuOpen.value = !issueMenuOpen.value;
};

// define close action Issue menu
const closeIssueMenu = (event) => {
  if (!isMoveItemClicked.value) {
    issueMenuOpen.value = false;
  }
  isMoveItemClicked.value = false;
};

// priorities menu functionality
const prioritiesOpen = ref(false);
const EditPriorityLoading = ref(false);

const PrioritiesMenuToggle = async () => {
  prioritiesOpen.value = !prioritiesOpen.value;
};

// Define function handle change Priority issues
const changePriority = async (priorityObj) => {
  closePrioritiesMenu();
  EditPriorityLoading.value = true;
  try {
    await editPriority(
      projectsStore?.project?.project_identify,
      props?.issue?.id,
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
    <div
      v-if="!progress"
      :class="{ 'issue-border': model?.includes(issue?.id) }"
      class="issue-container row justify-content-between px-8 m-0 border-bottom position-relative"
    >
      <div
        class="row col-8 col-md-6 justify-content-around align-items-center form-check-sm cursor-pointer"
      >
        <div
          class="form-check col-1 w-auto p-0 py-3 ms-5 d-flex justify-content-end align-items-end"
        >
          <input
            class="form-check-input"
            type="checkbox"
            v-model="model"
            :value="issue?.id"
          />
        </div>
        <div
          class="issue-title col-11 h-100 d-flex align-items-center py-3"
        >
          <img
            v-if="issue?.type === 'task'"
            src="../../assets/media/issue/type/task.svg"
            class="me-2"
            alt="task"
          />
          <img
            v-else-if="issue?.type === 'story'"
            src="../../assets/media/issue/type/story.svg"
            class="me-2"
            alt="story"
          />
          <img
            v-else-if="issue?.type === 'bug'"
            src="../../assets/media/issue/type/bug.svg"
            class="me-2"
            alt="bug"
          />
          <span class="text-gray-600 me-2 truncate text-nowrap fs-8">{{
            issue?.key
          }}</span>
          <span class="text-gray-800 me-2 truncate text-nowrap fs-6">{{
            issue?.title
          }}</span>
        </div>
      </div>
      <div
        class="issue-info py-3 col-auto row justify-content-end align-items-center"
      >
        <div class="position-relative col-auto">
          <div
            class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap cursor-pointer"
            :class="
              issue?.status?.name === 'TO DO'
                ? 'bg-light-active'
                : issue?.status?.name === 'DONE'
                ? 'bg-light-primary text-primary'
                : 'bg-light-success text-success'
            "
            v-click-outside="closeStatuses"
            @click="statusesToggle"
          >
            <div v-if="EditStatusLoading">
              <Icon name="svg-spinners:180-ring-with-bg" size="20" />
            </div>
            <div v-else class="d-flex align-center">
              <span>{{ issue?.status?.name }}</span>
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
              class="statusesMenuWrapper position-absolute bg-white shadow p-1 d-flex flex-column gap-2 rounded-1 overflow-y-auto z-1"
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
                class="cursor-pointer"
              >
                <div
                  v-if="status?.name !== issue?.status?.name"
                  class="py-1 px-3 rounded-1 text-uppercase fs-7 truncate"
                  style="max-width: 150px"
                  @click="changeIssue({ status_id: status?.id })"
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
        <div class="position-relative col-auto">
          <div
            class="d-flex justify-content-center align-items-center py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap cursor-pointer"
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
              <div v-if="issue?.assign_to">
                <img
                  v-if="issue?.team_member?.user?.photo"
                  :src="issue?.team_member?.user?.url_photo"
                  :alt="issue?.team_member?.user?.name"
                  class="w-35px h-35px"
                />
                <span
                  v-else
                  class="symbol-label text-inverse-warning fs-2 hover-bg-light"
                  :style="{
                    backgroundColor: getColor(issue?.team_member?.user?.id),
                  }"
                  >{{
                    issue?.team_member?.user?.name
                      ? issue?.team_member?.user?.name[0].toUpperCase()
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
                @click="changeIssue({ assign_to: null })"
                class="unAssignee w-100 d-flex justify-content-start align-items-center hover-bg-light cursor-pointer p-2 border-bottom"
                v-if="issue?.assign_to"
              >
                <div class="symbol symbol-circle symbol-30px overflow-hidden">
                  <img
                    src="../../assets/media/avatars/blank.png"
                    alt="Unassigned"
                    class="w-30px h-30px"
                  />
                </div>
                <span class="ms-3 fs-5">unassignee</span>
              </div>
              <div
                v-for="(
                  member, index
                ) in projectsStore?.project?.team_members?.filter(
                  (memeber) => memeber?.invite_status === 'accept'
                )"
                :key="index"
                @click="changeIssue({ assign_to: member?.id })"
              >
                <div
                  class="w-100 d-flex justify-content-start align-items-center hover-bg-light cursor-pointer p-2 border-bottom"
                  v-if="issue?.assign_to != member?.id"
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
                      class="symbol-label text-inverse-warning fs-2"
                      :style="{ backgroundColor: getColor(member?.user?.id) }"
                      >{{
                        member?.user?.name
                          ? member?.user?.name[0].toUpperCase()
                          : "-"
                      }}</span
                    >
                  </div>
                  <h4 class="m-0 ms-2 fs-5 fw-normal">
                    {{ member?.user?.name }}
                  </h4>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <div class="position-relative col-auto">
          <div
            class="py-1 px-3 rounded-1 fw-bold fs-8 text-nowrap cursor-pointer"
          >
            <div v-if="EditPriorityLoading">
              <Icon
                name="svg-spinners:180-ring-with-bg"
                class="p-2"
                size="30"
              />
            </div>
            <div
              v-else
              v-click-outside="closePrioritiesMenu"
              @click="PrioritiesMenuToggle"
            >
              <div
                v-if="issue?.priority === 'Highest'"
                class="p-2 rounded hover-bg-white"
              >
                <icon
                  name="mingcute:arrows-up-line"
                  class="text-danger fs-2"
                  aria-haspopup="true"
                  aria-controls="overlay_tmenu"
                />
              </div>
              <div
                v-if="issue?.priority === 'High'"
                class="p-2 rounded hover-bg-white"
              >
                <icon
                  name="material-symbols:keyboard-arrow-up-rounded"
                  class="text-danger fs-2"
                  aria-haspopup="true"
                  aria-controls="overlay_tmenu"
                />
              </div>
              <div
                v-if="issue?.priority === 'Medium'"
                class="p-2 rounded hover-bg-white"
              >
                <icon
                  name="iconamoon:sign-equal-fill"
                  class="text-warning fs-2"
                  aria-haspopup="true"
                  aria-controls="overlay_tmenu"
                />
              </div>
              <div
                v-if="issue?.priority === 'Low'"
                class="p-2 rounded hover-bg-white"
              >
                <icon
                  name="material-symbols:keyboard-arrow-down-rounded"
                  class="text-success fs-2"
                  aria-haspopup="true"
                  aria-controls="overlay_tmenu"
                />
              </div>
              <div
                v-if="issue?.priority === 'Lowest'"
                class="p-2 rounded hover-bg-white"
              >
                <icon
                  name="mingcute:arrows-down-line"
                  class="text-success fs-2"
                  aria-haspopup="true"
                  aria-controls="overlay_tmenu"
                />
              </div>
            </div>
          </div>
          <Transition name="statusesMenu">
            <div
              v-if="prioritiesOpen"
              class="statusesMenuWrapper position-absolute bg-white shadow p-0 d-flex flex-column gap-2 rounded-1 overflow-y-auto z-1"
              style="
                min-width: 130px !important;
                width: max-content !important;
                gap: 0 !important;
              "
            >
              <div v-if="assigneeLoading" class="text-center">
                Loading...
                <Icon name="svg-spinners:180-ring-with-bg" size="16" />
              </div>
              <div
                v-if="issue?.priority !== 'Highest'"
                @click="changePriority({ priority: 'Highest' })"
                class="d-flex justify-content-start align-items-center hover-bg-light p-2 my-2 ms-2 border-start border-3 border-danger cursor-pointer"
              >
                <icon
                  v-if="issue?.priority !== 'Highest'"
                  name="mingcute:arrows-up-line"
                  class="text-danger fs-2 me-2"
                />
                <span>Highest</span>
              </div>
              <div
                v-if="issue?.priority !== 'High'"
                @click="changePriority({ priority: 'High' })"
                class="d-flex justify-content-start align-items-center hover-bg-light p-2 my-2 ms-2 border-start border-3 border-danger cursor-pointer"
              >
                <icon
                  name="material-symbols:keyboard-arrow-up-rounded"
                  class="text-danger fs-2 me-2"
                />
                <span>High</span>
              </div>
              <div
                v-if="issue?.priority !== 'Medium'"
                @click="changePriority({ priority: 'Medium' })"
                class="d-flex justify-content-start align-items-center hover-bg-light p-2 my-2 ms-2 border-start border-3 border-warning cursor-pointer"
              >
                <icon
                  name="iconamoon:sign-equal-fill"
                  class="text-warning fs-2 me-2"
                />
                <span>Medium</span>
              </div>
              <div
                v-if="issue?.priority !== 'Low'"
                @click="changePriority({ priority: 'Low' })"
                class="d-flex justify-content-start align-items-center hover-bg-light p-2 my-2 ms-2 border-start border-3 border-success cursor-pointer"
              >
                <icon
                  v-if="issue?.priority !== 'Low'"
                  name="material-symbols:keyboard-arrow-down-rounded"
                  class="text-success fs-2 me-2"
                />
                <span>Low</span>
              </div>
              <div
                v-if="issue?.priority !== 'Lowest'"
                @click="changePriority({ priority: 'Lowest' })"
                class="d-flex justify-content-start align-items-center hover-bg-light p-2 my-2 ms-2 border-start border-3 border-success cursor-pointer"
              >
                <icon
                  v-if="issue?.priority !== 'Lowest'"
                  name="mingcute:arrows-down-line"
                  class="text-success fs-2 me-2"
                />
                <span>Lowest</span>
              </div>
            </div>
          </Transition>
        </div>
        <div class="position-relative col-auto">
          <div
            class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap"
          >
            <div
              v-click-outside="closeIssueMenu"
              @click="issueMenuToggle"
              class="hover-bg-white p-2 rounded d-flex justify-content-center align-items-center overflow-hidden"
            >
              <i
                class="ki-solid ki-dots-horizontal fs-1 cursor-pointer fs-2x"
              ></i>
            </div>
          </div>
          <Transition name="statusesMenu">
            <div
              v-if="issueMenuOpen"
              class="statusesMenuWrapper z-1 position-absolute end-0 w-125px"
            >
              <TieredMenu v-if="issueMenuOpen" :model="items" />
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <div
      v-else
      class="d-flex justify-content-between align-items-center py-3"
      style="padding: 0 140px"
    >
      <span class="text-gray-800 me-2 truncate text-nowrap fs-6">{{
        issue?.title
      }}</span>
      <icon
        name="svg-spinners:ring-resize"
        class="text-gray-600 me-3 p-2"
        size="30"
      />
    </div>
</template>

<style scoped>
.issue-border {
  border-left: #0a6aa1 2px solid !important;
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

.issue-container:hover .form-check-input {
  display: inline;
}

.form-check-input:checked {
  display: inline;
}

.issue-container::-webkit-scrollbar {
  height: 2px;
  background-color: transparent;
}

.issue-container::-webkit-scrollbar-thumb {
  background-color: var(--bs-text-gray-200);
  border-radius: 2px;
}

.issue-container:hover {
  background-color: var(--bs-gray-100);
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
</style>