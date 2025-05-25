<script setup>
import moment from "moment";
import { useBacklog } from "~/composables/useBacklog";
import { useSubmit } from "~/composables/useSubmit";
import { useBacklogStore } from "~/stores/backlogStore";
import { useProjectsStore } from "~/stores/projectsStore";
import { showToast } from "~/composables/useToast";
import TieredMenu from "primevue/tieredmenu";
import Draggable from "vuedraggable";

const props = defineProps(["sprint", "selectedIssue", "canManage"]);
const creating = ref(false);
const backlogStore = useBacklogStore();
const projectsStore = useProjectsStore();
const arrowIcon = ref("ep:arrow-up-bold");
const createIssueInput = ref("");
const createProgress = ref(false);
const route = useRoute();
const {
  deleteSprint,
  createIssue,
  moveIssue,
  moveMultipleIssue,
  deleteMultipleIssues,
  editMultipleIssue,
} = useBacklog();
const inputFocus = ref(null);
const selectedIssue = ref([]);
const selectAllBtn = () => {
  selectedIssue.value = [];
  props?.sprint?.issues?.forEach((issue) => {
    selectedIssue.value.push(issue?.id);
  });
  selectedIssue.value.length = props?.sprint?.issues?.length;
};

const clearAllBtn = () => {
  selectedIssue.value = [];
};

const errorMsg = reactive({
  errorTitle: null,
});

const typeIssue = ref("task");

const data = reactive({
  title: null,
  sprint_id: null,
});
const createIssueToSprint = async () => {
  if (!createIssueInput.value?.trim()) {
    errorMsg.errorTitle = "Issue title is required";
    return;
  } else if (createIssueInput.value?.trim().length <= 2) {
    errorMsg.errorTitle = "Issue title must be more than 2 characters";
    return;
  }
  errorMsg.errorTitle = null;
  data.title = createIssueInput.value;
  data.sprint_id = props?.sprint?.id;
  data.type = typeIssue.value;
  await submit();
};

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  async () => {
    createIssueInput.value = null;
    return await createIssue(route.params.id, data);
  },
  {
    onSuccess: async (response) => {
      // Handle the response
      createProgress.value = true;
      await backlogStore?.getBacklogProject(route.params.id);
      createProgress.value = false;
    },
    onError: (error) => {
      showToast("error", error.data.message);
    },
  }
);

// Define type Issue Menu
const openTypeIssueMenu = ref(false);

const typeIssueMenuToggle = () => {
  openTypeIssueMenu.value = !openTypeIssueMenu.value;
};

const changeTypeIssue = (type) => {
  openTypeIssueMenu.value = false;
  typeIssue.value = type;
};
//issue action menu functionality
// const toggleIssueActionVisible = () => {
//   issuesActionMenu.value = !issuesActionMenu.value;
// };

// const closeIssueActionMenu = () => {
//   issuesActionMenu.value = false;
// };

//issue action menu functionality
const sprintActionMenu = ref();

const sprintActionItems = ref([
  {
    label: "Edit sprint",
    icon: "pi pi-fw pi-pencil",
    command: () => {
      openEditSprintModal();
    },
  },
  {
    label: "Delete sprint",
    icon: "pi pi-fw pi-calendar-minus",
    command: () => {
      handleDeleteSprint();
    },
  },
]);

const seletedActionItems = ref([
  {
    label: "Select All",
    icon: "pi pi-fw pi-pencil",
    command: () => {
      selectAllBtn();
    },
  },
  {
    label: "Clear All",
    icon: "pi pi-fw pi-calendar-minus",
    command: () => {
      clearAllBtn();
    },
  },
]);
const toggleSprintMenu = (event) => {
  sprintActionMenu.value.toggle(event);
};
const selectedMenu = ref();

const selectedMenuToggle = (event) => {
  selectedMenu.value.toggle(event);
};

const openEditSprintModal = () => {
  $("#kt_modal_edit_Sprint").modal("show");
};

// Define handle multiple delete issue function
const handleDeleteSprint = () => {
  Swal.fire({
    html: `Are you sure you want to delete <strong><div class="truncate lh-lg" >${props?.sprint?.name}</div></strong>`,
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
  const { submit } = useSubmit(
    async () => {
      return await deleteSprint(route.params.id, props?.sprint?.id, {
        issue_sprint_id: null,
      });
    },
    {
      onError: (error) => {
        showToast("error", error.data.message);
      },
    }
  );
};

// Define handle multiple delete issue function
const handleMultipleDeleteIssue = () => {
  Swal.fire({
    html: `Are you sure you want to delete <strong><div class="truncate lh-lg" >${selectedIssue?.value?.length} issues</div></strong>`,
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
      selectedIssue.value = [];
    },
  });
  const { submit } = useSubmit(
    async () => {
      return await deleteMultipleIssues(route.params.id, {
        issues_id: selectedIssue.value,
      });
    },
    {
      onError: (error) => {
        showToast("error", error.data.message);
      },
    }
  );
};

// Define a function for handle multiple delete issue
const statusSelected = ref(null);
const assigneeSelected = ref(null);

// define watch statusSelected
watch(statusSelected, () => {
  statusSelected.value
    ? handleMultipleEditStatus("status_id", statusSelected?.value?.id)
    : false;
});

// define watch assigneeSelected
watch(assigneeSelected, () => {
  assigneeSelected.value
    ? handleMultipleEditStatus("assign_to", assigneeSelected?.value?.id)
    : false;
});

// Define handle multiple edit status function
const handleMultipleEditStatus = (keyParam, valueParam) => {
  Swal.fire({
    html: `Are you sure you want to change the status for <strong><div class="truncate lh-lg" >${selectedIssue?.value?.length} issues</div></strong>`,
    icon: "info",
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: "Yes, update!",
    cancelButtonText: "No, cancel",
    showLoaderOnConfirm: true,
    customClass: {
      confirmButton: "btn fw-bold btn-success",
      cancelButton: "btn fw-bold btn-active-light-primary",
    },
    preConfirm: async () => {
      await submit();
      selectedIssue.value = [];
    },
  });

  const { submit } = useSubmit(
    async () => {
      const data = reactive({ issues_id: selectedIssue.value });
      data[keyParam] = valueParam;
      return await editMultipleIssue(route.params.id, data);
    },
    {
      onError: (error) => {
        showToast("error", error.data.message);
      },
    }
  );
};

// Define toggle arrow function
const toggleArrow = () => {
  arrowIcon.value === "ep:arrow-up-bold"
    ? (arrowIcon.value = "ep:arrow-down-bold")
    : (arrowIcon.value = "ep:arrow-up-bold");
};

// scroll to create issue input when click on create issue button at the top of the sprint
const scrollToCreate = () => {
  setTimeout(() => {
    inputFocus.value.querySelector("input").focus();
  }, 0);
};

// handle move issue
const emits = defineEmits(["update:selectedIssue"]);

const dragStart = () => {
  emits("update:selectedIssue", selectedIssue.value);
};
const dragEnd = (e) => {
  if (selectedIssue.value?.includes(e?.item?._underlying_vm_?.id)) {
    selectedIssue.value = [];
  }
};

const handleMoveIssue = async (e) => {
  if (e.added) {
    if (props.selectedIssue?.length) {
      if (props?.selectedIssue?.includes(e?.added?.element?.id)) {
        await moveMultipleIssue(route.params.id, {
          issues_id: props.selectedIssue,
          sprint_id: props.sprint.id,
          order: e?.added?.newIndex + 1,
        });
        await backlogStore?.getBacklogProject(route.params.id);
      } else {
        await moveIssue(route.params.id, e?.added?.element.id, {
          sprint_id: props.sprint.id,
          order: e?.added?.newIndex + 1,
        });
      }
    } else {
      await moveIssue(route.params.id, e?.added?.element.id, {
        sprint_id: props.sprint.id,
        order: e?.added?.newIndex + 1,
      });
    }
  } else if (!e.removed) {
    await moveIssue(route.params.id, e?.moved?.element.id, {
      sprint_id: null,
      order: e?.moved?.newIndex + 1,
    });
  }
};
</script>

<template>
  <div>
    <div class="app-content">
      <div class="card">
        <div class="card-header py-4">
          <div class="card-title d-flex flex-column">
            <div class="d-flex align-items-center position-relative mb-2">
              <div
                class="d-flex justify-content-between align-items-center cursor-pointer me-3"
                @click="toggleArrow"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapseSprint${sprint?.id}`"
                aria-expanded="true"
                :aria-controls="`collapseSprint${sprint?.id}`"
              >
                <h2 class="me-3">{{ sprint?.name }}</h2>
                <icon
                  :name="arrowIcon"
                  color="black"
                  class="cursor-pointer fw-bold ms-2 p-1"
                  size="25"
                />
              </div>

              <span
                v-if="sprint?.issues.length > 0"
                class="fs-6 fw-normal badge badge-light-success text-success px-3"
                >{{ sprint?.issues.length }} issues</span
              >
            </div>
            <div class="fs-7 text-gray-600 fw-normal">
              <span>{{
                sprint?.start_date
                  ? moment(sprint.start_date).format("ll")
                  : moment(sprint?.created_at).format("ll")
              }}</span>
              -
              <span>{{
                sprint?.end_date ? moment(sprint.end_date).format("ll") : 'forever'
              }}</span>
            </div>
            <p
              v-if="sprint?.goal"
              class="fs-6 m-0 mt-2 text-gray-600 fw-normal truncate"
              style="max-width: 700px"
            >
              {{ sprint?.goal }}
            </p>
          </div>
          <div class="card-toolbar" v-if="canManage">
            <div
              class="d-flex justify-content-end gap-4"
              data-kt-customer-table-toolbar="base"
            >
              <button
                @click="scrollToCreate"
                id="createIssueTopButton"
                type="button"
                class="btn btn-light-primary btn-sm"
              >
                <i class="ki-outline ki-plus fs-2"></i>Create Issue
              </button>
              <div class="position-relative symbol">
                <div
                  class="btn btn-sm btn-icon btn-bg-light"
                  @click="toggleSprintMenu"
                  aria-haspopup="true"
                  aria-controls="sprintAction_tmenu"
                >
                  <i class="ki-solid ki-dots-horizontal fs-2x"></i>
                </div>
                <TieredMenu
                  ref="sprintActionMenu"
                  id="sprintAction_tmenu"
                  :model="sprintActionItems"
                  popup
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="card-body p-0 collapse show"
          :id="`collapseSprint${sprint?.id}`"
        >
          <div>
            <div
              v-if="selectedIssue.length > 0"
              class="sprint-action d-flex align-items-center justify-content-between py-2 px-6 border border-dashed border-success"
            >
              <div
                class="d-flex justify-content-between align-items-center gap-2"
              >
                <div class="position-relative symbol">
                  <div
                    @click="selectedMenuToggle"
                    class="btn btn-sm btn-icon btn-bg-light"
                    aria-haspopup="true"
                    aria-controls="selectedMenu_tmenu"
                  >
                    <i class="ki-solid ki-dots-horizontal fs-2x"></i>
                  </div>
                  <TieredMenu
                    ref="selectedMenu"
                    id="selectedMenu_tmenu"
                    :model="seletedActionItems"
                    popup
                  />
                </div>
                <p class="m-0 fw-bold">{{ selectedIssue.length }} Selected</p>
              </div>
              <div
                class="d-flex justify-content-between align-items-center gap-2"
              >
                <FormVSelect
                  class="mx-3"
                  selectTitle="Change issue status"
                  v-model="statusSelected"
                  :list="backlogStore?.statusesArray"
                  type="statusMenu"
                />
                <FormVSelect
                  class="mx-3"
                  selectTitle="Change issue assignee"
                  v-model="assigneeSelected"
                  :list="projectsStore?.project?.team_members"
                  type="assigneeMenu"
                />
              </div>
              <div
                class="btn btn-light btn-active-light-danger btn-flex btn-center btn-sm cursor-pointer"
                @click="handleMultipleDeleteIssue"
              >
                <i class="ki-duotone ki-trash fs-5">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
                <span style="line-height: 15px">Delete</span>
              </div>
            </div>
            <div v-if="canManage">
              <Draggable
                v-model="sprint.issues"
                @start="dragStart"
                @end="dragEnd"
                group="issues"
                @change="handleMoveIssue"
                ghost-class="ghost"
                itemKey="id"
              >
                <template #item="{ element: issue }">
                  <IssueCompIssueCard
                    v-model="selectedIssue"
                    :issue="issue"
                    :can-edite="canManage"
                  />
                </template>
              </Draggable>
            </div>
            <div v-else>
              <IssueCompIssueCard
                v-for="i in sprint.issues"
                :key="i?.id"
                v-model="selectedIssue"
                :issue="i"
                :can-edite="canManage"
              />
            </div>
            <div v-if="inProgress || createProgress">
              <IssueCompIssueCard :issue="data" :progress="true" />
            </div>
            <div
              v-show="
                !sprint?.issues?.length > 0 && !inProgress && !createProgress
              "
              class="alert msg-empty bg-light-active border-2 border-dashed px-5 py-10 text-center"
            >
              <div class="d-flex flex-column text-center">
                <h4 class="fw-semibold p-0 m-0">No issues in this sprint.</h4>
              </div>
            </div>
            <div
              v-if="canManage"
              @click.stop
              id="createIssueWrapper"
              ref="inputFocus"
              @click="creating = true"
              v-click-outside="
                () => {
                  creating = false;
                }
              "
              class="createIssue hover-bg-light py-3 px-6 cursor-pointer rounded-bottom"
            >
              <div v-if="creating" class="d-flex align-items-center">
                <div class="position-relative">
                  <div
                    class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap"
                  >
                    <div
                      @click="openTypeIssueMenu = !openTypeIssueMenu"
                      v-click-outside="
                        () => {
                          openTypeIssueMenu = false;
                        }
                      "
                    >
                      <img
                        v-if="typeIssue === 'task'"
                        alt="task"
                        src="~/assets/media/issue/type/task.svg"
                      />
                      <img
                        v-else-if="typeIssue === 'story'"
                        alt="story"
                        src="~/assets/media/issue/type/story.svg"
                      />
                      <img
                        v-else-if="typeIssue === 'bug'"
                        alt="bug"
                        src="~/assets/media/issue/type/bug.svg"
                      />
                      <Icon
                        v-if="openTypeIssueMenu"
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
                      v-if="openTypeIssueMenu"
                      class="statusesMenuWrapper position-absolute bg-white shadow d-flex flex-column gap-2 rounded-1 overflow-y-auto z-1"
                      style="
                        min-width: 70px !important;
                        width: max-content !important;
                      "
                    >
                      <div
                        v-if="typeIssue !== 'task'"
                        class="p-1 hover-bg-light"
                      >
                        <div
                          class="fs-7 d-flex justify-content-start"
                          style="max-width: 150px"
                          @click="changeTypeIssue('task')"
                        >
                          <img
                            class="py-1 px-1 rounded-1 me-1"
                            alt="task"
                            src="~/assets/media/issue/type/task.svg"
                          />
                          <span class="fs-6">task</span>
                        </div>
                      </div>
                      <div
                        v-if="typeIssue !== 'story'"
                        class="p-1 hover-bg-light"
                      >
                        <div
                          class="fs-7 d-flex justify-content-start"
                          style="max-width: 150px"
                          @click="changeTypeIssue('story')"
                        >
                          <img
                            class="py-1 px-1 rounded-1 me-1"
                            alt="story"
                            src="~/assets/media/issue/type/story.svg"
                          />
                          <span class="fs-6">story</span>
                        </div>
                      </div>
                      <div
                        v-if="typeIssue !== 'bug'"
                        class="p-1 hover-bg-light"
                      >
                        <div
                          class="fs-7 d-flex justify-content-start"
                          style="max-width: 150px"
                          @click="changeTypeIssue('bug')"
                        >
                          <img
                            class="py-1 px-1 rounded-1 me-1"
                            alt="bug"
                            src="~/assets/media/issue/type/bug.svg"
                          />
                          <span class="fs-6">bug</span>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
                <FormInput
                  class="w-90 m-0"
                  @keyup.enter="createIssueToSprint"
                  type="text"
                  autocomplete="off"
                  labelText="Issue Title:"
                  :name="`issueTitleFor${sprint.id}sprint`"
                  placeholder="Issue Title"
                  v-model="createIssueInput"
                  :formDataError="errorMsg.errorTitle"
                  :focus="true"
                />
              </div>
              <span
                @click="scrollToCreate"
                id="createIssueTopButton"
                class="d-flex align-items-center py-2"
                ><i class="ki-outline ki-plus fs-2 me-1"></i>Create Issue</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <modalsEditSprint :sprint="props?.sprint" />
  </div>
</template>

<style scoped>
.createIssue {
  transition: all 0.3s ease;
}

/*.issueDetails-enter-active,
.issueDetails-leave-active {
  transition: all 0.3s ease;
}

.issueDetails-enter-from,
.issueDetails-leave-to {
  right: -100% !important;
}

.sprint-action-menu {
  left: -50%;
}

.form-floating {
  width: 90%;
  margin-bottom: 0 !important;
}*/
</style>