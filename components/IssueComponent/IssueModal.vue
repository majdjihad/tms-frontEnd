<script setup>
import { useToast } from "vue-toastification";
import { useProjectsStore } from "~/stores/projectsStore";
import { useBacklogStore } from "~/stores/backlogStore";
import { useBacklog } from "~/composables/useBacklog";
import TieredMenu from "primevue/tieredmenu";
import moment from "moment";

const backlogStore = useBacklogStore();
const projectsStore = useProjectsStore();
const { editIssue, issueType, createLabel, createIssue, addComment } =
  useBacklog();
// Define sprintName function
const openSprintNameMenu = ref(false);
const editSprintNameLoading = ref(false);
const sprintsName = computed(() => {
  return backlogStore?.sprintsProject?.filter(
    (sprint) => sprint?.name !== backlogStore?.issueInfoArray?.sprint?.name
  );
});
const isTagifyInitialized = ref(false); // Flag to track initialization
const inputLabels = document.querySelector("#labels");

watch(ref(backlogStore?.issueInfoArray), () => {
  if (!backlogStore?.issueInfoArray) {
    historyComponent.value = false;
    commentComponent.value = true;
  }
  if (!isTagifyInitialized.value) {
    new Tagify(inputLabels);
    isTagifyInitialized.value = true; // Set the flag to true after initialization
  }
});
// Define tagify labels
const SprintNameMenuToggle = () => {
  openSprintNameMenu.value = !openSprintNameMenu.value;
};
const closeSprintNameMenu = () => {
  openSprintNameMenu.value = false;
};
const moveIssueToAntherSprint = async (actionId) => {
  closeSprintNameMenu();
  editSprintNameLoading.value = true;
  try {
    await editIssue(
      projectsStore?.project?.project_identify,
      backlogStore?.issueInfoArray?.id,
      actionId
    );
    // await backlogStore?.getBacklogProject(projectsStore?.project?.project_identify);
  } catch (error) {
    showToast(error?.data?.message);
  }
  editSprintNameLoading.value = false;
};

// Define issue type function
const openIssueTypeMenu = ref(false);
const IssueTypeLoading = ref(false);
const editIssueTypeLoading = ref(false);
const typeIssueArray = ref([]);
const issueTypeMenuToggle = async () => {
  openIssueTypeMenu.value = !openIssueTypeMenu.value;
  if (openIssueTypeMenu.value) {
    if (!typeIssueArray.value.length) {
      IssueTypeLoading.value = true;
      try {
        const response = await issueType(
          projectsStore?.project?.project_identify,
          backlogStore?.issueInfoArray?.id
        );
        typeIssueArray.value = await response?.type;
      } catch (error) {
        showToast(error.data.message);
      }
      IssueTypeLoading.value = false;
    }
  }
};
const closeIssueTypeMenu = () => {
  openIssueTypeMenu.value = false;
};
const changeTypeIssue = async (actionId) => {
  closeIssueTypeMenu();
  editIssueTypeLoading.value = true;
  try {
    await editIssue(
      projectsStore?.project?.project_identify,
      backlogStore?.issueInfoArray?.id,
      actionId
    );
    await backlogStore?.getBacklogProject(
      projectsStore?.project?.project_identify
    );
  } catch (error) {
    showToast(error?.data?.message);
  }
  editIssueTypeLoading.value = false;
};

// define action descriptionAction menu
const descriptionActionMenuOpen = ref(false);
const descriptionItems = ref([
  {
    label: "Edit",
    icon: "fa-regular fa-pen-to-square",
    command: () => {
      openDescription.value = true;
    },
  },
  {
    label: "Delete",
    icon: "fa-regular fa-trash-can",
    command: () => {
      handleDeleteDescriptionAction();
    },
  },
]);

// define toggle action descriptionAction menu
const descriptionActionToggle = () => {
  descriptionActionMenuOpen.value = !descriptionActionMenuOpen.value;
};
const descriptionActionMenuClose = () => {
  descriptionActionMenuOpen.value = false;
};
// Define description function
const openDescription = ref(false);
const descriptionValue = ref(backlogStore?.issueInfoArray?.description);
const descriptionIssueLoader = ref(false);
// const toggleOpenDescription = () => {
//   descriptionActionMenuOpen.value = false
//   if (!descriptionValue.value) {
//     descriptionValue.value = backlogStore?.issueInfoArray?.description
//   }
//   openDescription.value = !openDescription.value;
// }
// Define assignee to function
const assigneeMenuOpen = ref(false);
const assigneeMenuLoading = ref(false);
const editAssigneeMenuLoading = ref(false);

const assigneeMenuToggle = () => {
  assigneeMenuOpen.value = !assigneeMenuOpen.value;
};

//define close assignee menu
const assigneeMenuClose = () => {
  assigneeMenuOpen.value = false;
};

// status menu functionality
const statusMenuOpen = ref(false);
const statusMenuLoading = ref(false);
const editStatusMenuLoading = ref(false);

const statusMenuToggle = async () => {
  statusMenuOpen.value = !statusMenuOpen.value;
};

//define close assignee menu
const statusMenuClose = () => {
  statusMenuOpen.value = false;
};

// Define function handle change statuses or assignee issues
const changeIssue = async (actionId) => {
  historyComponent.value = false;
  commentComponent.value = true;
  Object.keys(actionId)[0] === "status_id"
    ? (editStatusMenuLoading.value = true)
    : Object.keys(actionId)[0] === "assign_to"
    ? (editAssigneeMenuLoading.value = true)
    : Object.keys(actionId)[0] === "estimated_at"
    ? (editEstimateTimeLoading.value = true)
    : false;
  if (Object.keys(actionId)[0] === "description") {
    if (descriptionValue.value === backlogStore?.issueInfoArray?.description) {
      return;
    } else {
      descriptionIssueLoader.value = true;
    }
  }
  if (Object.keys(actionId)[0] === "estimated_at") {
    if (isNaN(dayTime.value) || dayTime.value >= 31) {
      showToast("error", "please ensure in the value of the day is below 30");
      return;
    } else if (isNaN(hourTime.value) || hourTime.value >= 25) {
      showToast("error", "please ensure in the value of the hour is below 24");
      return;
    } else if (isNaN(minuteTime.value) || minuteTime.value >= 61) {
      showToast(
        "error",
        "please ensure in the value of the minutes is below 60"
      );
      return;
    } else {
      editEstimateTimeLoading.value = true;
    }
  }
  assigneeMenuClose();
  statusMenuClose();
  try {
    await editIssue(
      projectsStore?.project?.project_identify,
      backlogStore?.issueInfoArray?.id,
      actionId
    );
    await backlogStore?.getBacklogProject(
      projectsStore?.project?.project_identify
    );
    await backlogStore?.getIssueInfo(
      projectsStore?.project?.project_identify,
      backlogStore?.issueInfoArray?.id
    );
  } catch (error) {
    showToast("error", error?.data?.message);
  }
  openDescription.value = false;
  openEstimateTime.value = false;
  Object.keys(actionId)[0] === "status_id"
    ? (editStatusMenuLoading.value = false)
    : Object.keys(actionId)[0] === "assign_to"
    ? (editAssigneeMenuLoading.value = false)
    : Object.keys(actionId)[0] === "description"
    ? (descriptionIssueLoader.value = false)
    : Object.keys(actionId)[0] === "estimated_at"
    ? (editEstimateTimeLoading.value = false)
    : false;
};

// Define Estimate Time function
const dayTime = ref(backlogStore?.issueInfoArray?.estimated_at[0]);
const hourTime = ref(backlogStore?.issueInfoArray?.estimated_at[1]);
const minuteTime = ref(backlogStore?.issueInfoArray?.estimated_at[2]);
const openEstimateTime = ref(false);
const editEstimateTimeLoading = ref(false);

// Define label Names function
const labelNames = ref([]);
const openAddLabels = ref(false);
const editLabelsLoading = ref(false);

function onChange(e) {
  // outputs a String
  const labelsNum = ref(JSON.parse(e.target.tagifyValue).length);
  if (
    !labelNames?.value?.includes(
      `${
        JSON.parse(e.target.tagifyValue)[labelsNum.value - 1].value
      }`.toLowerCase()
    )
  ) {
    labelNames.value?.push(
      `${
        JSON.parse(e.target.tagifyValue)[labelsNum.value - 1].value
      }`.toLowerCase()
    );
  }
}

const createNewLabel = async () => {
  editLabelsLoading.value = true;
  try {
    const response = await createLabel(
      projectsStore?.project?.project_identify,
      backlogStore?.issueInfoArray?.id,
      { label: `${labelNames.value}` }
    );
    await backlogStore?.getBacklogProject(
      projectsStore?.project?.project_identify
    );
    await backlogStore?.getIssueInfo(
      projectsStore?.project?.project_identify,
      backlogStore?.issueInfoArray?.id
    );
    showToast("success", response?.message);
  } catch (error) {
    showToast("error", error?.data?.message);
  }
  editLabelsLoading.value = false;
  openAddLabels.value = false;
};

// define time type variables
const relativeTimeStatus = ref(true);
const changeTimeType = (dateString) => {
  const dateTime = moment(dateString);
  if (relativeTimeStatus.value) {
    return dateTime.fromNow();
  } else {
    return dateTime.calendar();
  }
};

// Define create sub issue
const openCreateSubIssueInput = ref(false);
const inputFocus = ref(null);
const defaultTypeIssue = ref("story");
const createIssueInput = ref("");
const createSubIssueLoading = ref(false);
const subIssueData = reactive({
  parent_id: null,
  sprint_id: null,
  title: null,
  type: null,
});
const errorMsg = reactive({
  errorSubIssueMsg: null,
});
const openCreateIssueInput = () => {
  openCreateSubIssueInput.value = true;
  setTimeout(() => {
    inputFocus.value.querySelector("input").focus();
  }, 0);
};

const createSubIssue = async () => {
  if (!createIssueInput.value?.trim()) {
    errorMsg.errorSubIssueMsg = "sub Issue title is required";
    return;
  } else if (createIssueInput.value?.trim().length <= 2) {
    errorMsg.errorSubIssueMsg =
      "sub Issue title must be more than 2 characters";
    return;
  }
  historyComponent.value = false;
  commentComponent.value = true;
  backlogStore.issueHistoryArray = null;
  errorMsg.errorSubIssueMsg = null;
  subIssueData.sprint_id = backlogStore?.issueInfoArray?.sprint_id;
  subIssueData.parent_id = backlogStore?.issueInfoArray?.id;
  subIssueData.title = createIssueInput.value;
  subIssueData.type = defaultTypeIssue.value;
  createSubIssueLoading.value = true;
  try {
    await createIssue(projectsStore?.project?.project_identify, subIssueData);
    await backlogStore?.getIssueInfo(
      projectsStore?.project?.project_identify,
      backlogStore?.issueInfoArray?.id
    );
  } catch (error) {
    await showToast("error", error.data.message);
  }
  createIssueInput.value = "";
  createSubIssueLoading.value = false;
};
const closeCreateSubIssueInput = () => (openCreateSubIssueInput.value = false);
const openTypeIssueMenu = ref(false);

const typeIssueMenuToggle = () => {
  openTypeIssueMenu.value = !openTypeIssueMenu.value;
};

const closeTypeIssueMenu = () => {
  openTypeIssueMenu.value = false;
};
const changeTypeSubIssue = (type) => {
  closeTypeIssueMenu();
  defaultTypeIssue.value = type;
};
// define add comment function
const commentComponent = ref(true);
const openAddComment = ref(false);
const newComment = ref(null);
const openAddCommentLoader = ref(false);
const toggleOpenAddComment = () => {
  openAddComment.value = !openAddComment.value;
};
const addCommentHandle = async () => {
  openAddCommentLoader.value = true;
  try {
    await addComment(
      projectsStore?.project?.project_identify,
      backlogStore?.issueInfoArray?.id,
      {
        content: newComment.value,
        mentionList: [],
      }
    );
    await backlogStore?.getIssueComments(
      projectsStore?.project?.project_identify,
      backlogStore?.issueInfoArray?.id
    );
  } catch (error) {
    showToast("error", error?.data?.message);
  }
  openAddCommentLoader.value = false;
  openAddComment.value = false;
  newComment.value = "";
};
// define history issue function
const historyComponent = ref(false);
const getIssueHistory = async () => {
  commentComponent.value = false;
  historyComponent.value = true;
  if (!backlogStore?.issueHistoryArray[0]) {
    await backlogStore?.getIssueHistory(
      projectsStore?.project?.project_identify,
      backlogStore?.issueInfoArray?.id,
      2
    );
  }
};
// define background color by user id
const getColor = (index) => {
  const colorList = ["dc3545", "d63384", "fd7e14", "ffc107", "20c997"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};

// Define toggle arrow function
const arrowIcon = ref("ep:arrow-up-bold");
const toggleArrowDetalis = () => {
  arrowIcon.value === "ep:arrow-up-bold"
    ? (arrowIcon.value = "ep:arrow-down-bold")
    : (arrowIcon.value = "ep:arrow-up-bold");
};

// Define toast function
const toast = useToast();

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

computed(() => {
  if (!backlogStore?.issueInfoArray) {
    historyComponent.value = false;
  }
});
</script>

<template>
  <div
    class="modal fade"
    id="kt_modal_issue_info"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog m-0 position-absolute end-0 h-100">
      <skeletonMainIssue
        v-if="!backlogStore?.issueInfoArray || !backlogStore?.issueCommentArray"
        class="fs-3 text-center"
      />
      <div v-else class="modal-content w-650px position-absolute end-0 h-100">
        <div
          class="modal-header pb-6 border-bottom border-3 justify-content-between"
        >
          <div class="d-flex align-items-center">
            <div class="position-relative">
              <div class="py-1 px-3 fw-bold fs-3 text-nowrap cursor-pointer">
                <div v-if="editSprintNameLoading">
                  <Icon
                    name="svg-spinners:180-ring-with-bg"
                    class="p-2"
                    size="30"
                  />
                </div>
                <div v-else>
                  <div
                    class="fw-semibold p-1 rounded-1 hover-bg-light"
                    v-click-outside="closeSprintNameMenu"
                    @click="SprintNameMenuToggle"
                  >
                    <span v-if="backlogStore?.issueInfoArray?.sprint?.name">{{
                      backlogStore?.issueInfoArray?.sprint?.name
                    }}</span>
                    <span v-else>Backlog</span>
                    <Icon
                      v-if="openSprintNameMenu"
                      name="ic:outline-keyboard-arrow-up"
                      size="25"
                      class="m-0 fw-normal"
                    />
                    <Icon
                      v-else
                      name="ic:outline-keyboard-arrow-down"
                      size="25"
                      class="m-0 fw-normal"
                    />
                  </div>
                </div>
              </div>
              <Transition name="statusesMenu">
                <div
                  v-if="openSprintNameMenu"
                  class="statusesMenuWrapper position-absolute bg-white border border-1 gap-2 rounded-1 overflow-y-auto z-1"
                  style="min-width: 130px !important"
                >
                  <div
                    v-if="backlogStore?.issueInfoArray?.sprint?.name"
                    class="hover-bg-light"
                  >
                    <div
                      class="py-1 px-3 rounded-1 fs-5 truncate cursor-pointer"
                      style="max-width: 150px"
                      @click="moveIssueToAntherSprint({ sprint_id: null })"
                    >
                      Backlog
                    </div>
                  </div>
                  <div
                    v-for="(sprint, index) in sprintsName"
                    :key="index"
                    class="hover-bg-light"
                  >
                    <div
                      v-if="
                        sprint !== backlogStore?.issueInfoArray?.sprint?.name
                      "
                      class="py-1 px-3 rounded-1 fs-5 truncate cursor-pointer"
                      style="max-width: 150px"
                      @click="
                        moveIssueToAntherSprint({ sprint_id: sprint?.id })
                      "
                    >
                      {{ sprint?.name }}
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
            <span class="fs-1 fw-semibold">/</span>
            <div class="position-relative">
              <div class="py-1 px-3 fw-bold fs-3 text-nowrap cursor-pointer">
                <div v-if="editIssueTypeLoading">
                  <Icon
                    name="svg-spinners:180-ring-with-bg"
                    class="p-2"
                    size="30"
                  />
                </div>
                <div v-else>
                  <div
                    class="fw-semibold p-1 rounded-1 hover-bg-light"
                    v-click-outside="closeIssueTypeMenu"
                    @click="issueTypeMenuToggle"
                  >
                    <img
                      v-if="backlogStore?.issueInfoArray?.type === 'task'"
                      alt="task"
                      src="~/assets/media/issue/type/task.svg"
                    />
                    <img
                      v-else-if="backlogStore?.issueInfoArray?.type === 'story'"
                      alt="story"
                      src="~/assets/media/issue/type/story.svg"
                    />
                    <img
                      v-else-if="backlogStore?.issueInfoArray?.type === 'bug'"
                      alt="bug"
                      src="~/assets/media/issue/type/bug.svg"
                    />
                    {{ backlogStore?.issueInfoArray?.type }}
                    <Icon
                      v-if="openIssueTypeMenu"
                      name="ic:outline-keyboard-arrow-up"
                      size="25"
                      class="m-0"
                    />
                    <Icon
                      v-else
                      name="ic:outline-keyboard-arrow-down"
                      size="25"
                      class="m-0"
                    />
                  </div>
                </div>
              </div>
              <Transition name="statusesMenu">
                <div
                  v-if="openIssueTypeMenu"
                  class="statusesMenuWrapper position-absolute bg-white border border-1 rounded-1 overflow-y-auto z-1"
                  style="
                    min-width: 110px !important;
                    width: max-content !important;
                    right: 0;
                  "
                >
                  <div v-if="IssueTypeLoading" class="text-center">
                    <Icon
                      name="svg-spinners:180-ring-with-bg"
                      class="p-2"
                      size="30"
                    />
                  </div>
                  <div
                    v-else
                    v-for="(type, index) in typeIssueArray"
                    :key="index"
                  >
                    <div
                      v-if="backlogStore?.issueInfoArray?.type !== type"
                      class="p-1 hover-bg-light cursor-pointer"
                    >
                      <div
                        class="fs-7 d-flex justify-content-start"
                        style="max-width: 150px"
                        @click="changeTypeIssue({ type: type })"
                      >
                        <img
                          v-if="type === 'task'"
                          class="py-1 px-1 rounded-1 me-1"
                          alt="task"
                          src="~/assets/media/issue/type/task.svg"
                        />
                        <img
                          v-else-if="type === 'story'"
                          class="py-1 px-1 rounded-1 me-1"
                          alt="story"
                          src="~/assets/media/issue/type/story.svg"
                        />
                        <img
                          v-if="type === 'bug'"
                          class="py-1 px-1 rounded-1 me-1"
                          alt="bug"
                          src="~/assets/media/issue/type/bug.svg"
                        />
                        <span class="fs-6 text-capitalize">{{ type }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
            id="closeEditProjectModal"
            ref="closeBtn"
          >
            <i class="ki-outline ki-cross fs-1"></i>
          </div>
        </div>
        <div class="modal-body overflow-auto ms-5 pt-0 pb-15">
          <div class="text-start mt-5">
            <h1 class="my-6 text-capitalize text-gray-800">
              {{ backlogStore?.issueInfoArray?.title }}
            </h1>
            <div>
              <p class="btn btn-success fs-7 py-2 px-3 me-3">
                <i class="fa-solid fa-paperclip"></i>
                <span>Attach files</span>
              </p>
              <p
                @click="openCreateIssueInput"
                @click.stop
                id="createIssueWrapper"
                ref="inputFocus"
                class="btn btn-primary fs-7 py-2 px-3"
              >
                <i class="fa-solid fa-code-merge"></i>
                <span>Create sub issue</span>
              </p>
            </div>
          </div>
          <div class="description">
            <div class="d-flex justify-content-between align-items-center">
              <h1 class="fs-4 my-6 text-capitalize">description</h1>
              <div class="position-relative">
                <div
                  class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap"
                >
                  <div
                    v-click-outside="descriptionActionMenuClose"
                    @click="descriptionActionToggle"
                    class="btn btn-light p-1 rounded d-flex justify-content-center align-items-center overflow-hidden"
                  >
                    <i
                      class="ki-solid ki-dots-horizontal p-0 fs-1 cursor-pointer fs-2x"
                    ></i>
                  </div>
                </div>
                <div
                  v-if="descriptionActionMenuOpen"
                  class="statusesMenuWrapper z-1 position-absolute end-0 w-auto"
                >
                  <TieredMenu :model="descriptionItems" />
                </div>
              </div>
            </div>
            <p
              v-if="!openDescription"
              class="description-content p-3 fs-5 fw-normal bg-light border border-2 rounded-1"
              v-html="
                backlogStore?.issueInfoArray?.description || 'add a description'
              "
            ></p>
            <div class="" v-if="openDescription">
              <div>
                <Editor v-model="backlogStore.issueInfoArray.description" editorStyle="height: 230px" />
                <div class="d-flex justify-content-end my-3">
                  <p
                    disabled="descriptionIssueLoader"
                    @click="
                      changeIssue({
                        description: backlogStore?.issueInfoArray?.description,
                      })
                    "
                    class="btn btn-sm btn-light-primary mx-2"
                  >
                    <span v-if="!descriptionIssueLoader">save</span>
                    <Icon
                      v-else
                      name="svg-spinners:180-ring-with-bg"
                      size="25"
                    />
                  </p>
                  <p
                    @click="openDescription = false"
                    class="btn btn-sm btn-light-danger mx-2"
                  >
                    cansel
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 position-relative border border-1 rounded-1">
            <div
              class="d-flex justify-content-between align-items-center border-bottom border cursor-pointer p-4"
              @click="toggleArrowDetalis"
              data-bs-toggle="collapse"
              data-bs-target="#collapseIssue"
              aria-expanded="true"
              aria-controls="collapseIssue"
            >
              <h1 class="fs-4 m-0 text-capitalize">Details</h1>
              <icon
                :name="arrowIcon"
                color="black"
                class="cursor-pointer text-gray-400 ms-2 p-1"
                size="20"
              />
            </div>
            <div class="card-body p-0 pb-6 collapse show" id="collapseIssue">
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <p class="fs-5 fw-semibold text-dark">Assignee To</p>
                <div
                  class="position-relative w-350px border border-1 cursor-pointer rounded-1"
                >
                  <div class="text-center p-3" v-if="editAssigneeMenuLoading">
                    <Icon name="svg-spinners:180-ring-with-bg" size="20" />
                  </div>
                  <div
                    v-else
                    class="fw-bold fs-8 text-uppercase text-nowrap d-flex align-items-center hover-bg-light p-1"
                    v-click-outside="assigneeMenuClose"
                    @click="assigneeMenuToggle"
                  >
                    <div
                      class="w-100 d-flex justify-content-start align-items-center hover-bg-light p-2"
                    >
                      <div
                        class="d-flex justify-content-between align-items-center"
                        v-if="backlogStore?.issueInfoArray?.assign_to"
                      >
                        <div
                          class="symbol symbol-circle symbol-30px overflow-hidden"
                        >
                          <img
                            v-if="
                              backlogStore?.issueInfoArray?.team_member?.user
                                ?.photo
                            "
                            :src="
                              backlogStore?.issueInfoArray?.team_member?.user
                                ?.url_photo
                            "
                            :alt="
                              backlogStore?.issueInfoArray?.team_member?.user
                                ?.name
                            "
                            class="w-30px h-30px"
                          />
                          <span
                            v-else
                            class="symbol-label text-inverse-warning fs-2 fw-bold"
                            :style="{
                              backgroundColor: getColor(
                                backlogStore?.issueInfoArray?.team_member?.user
                                  ?.id
                              ),
                            }"
                            >{{
                              backlogStore?.issueInfoArray?.team_member?.user
                                ?.name
                                ? backlogStore?.issueInfoArray?.team_member?.user?.name[0].toUpperCase()
                                : "-"
                            }}</span
                          >
                        </div>
                        <span class="ms-2 fs-6 text-capitalize fw-normal">{{
                          backlogStore?.issueInfoArray?.team_member?.user?.name
                        }}</span>
                      </div>
                      <div v-else>
                        <div
                          class="unAssignee w-100 d-flex justify-content-start align-items-center"
                          v-if="!backlogStore?.issueInfoArray?.assign_to"
                        >
                          <div
                            class="symbol symbol-circle symbol-30px overflow-hidden"
                          >
                            <img
                              src="~/assets/media/avatars/blank.png"
                              alt="Unassigned"
                              class="w-30px h-30px"
                            />
                          </div>
                          <span class="ms-2 fs-6 text-capitalize fw-normal"
                            >unassignee</span
                          >
                        </div>
                      </div>
                    </div>
                    <Icon
                      v-if="assigneeMenuOpen"
                      name="ic:outline-keyboard-arrow-up"
                      size="25"
                      class="text-gray-400 m-0"
                    />
                    <Icon
                      v-else
                      name="ic:outline-keyboard-arrow-down"
                      size="25"
                      class="text-gray-400 m-0"
                    />
                  </div>
                  <Transition name="statusesMenu">
                    <div
                      v-if="assigneeMenuOpen"
                      class="w-100 statusesMenuWrapper position-absolute bg-white shadow p-0 d-flex flex-column gap-2 rounded-1 overflow-y-auto z-1"
                      style="
                        min-width: 100% !important;
                        width: max-content !important;
                        max-height: 138px !important;
                        gap: 0 !important;
                      "
                    >
                      <div v-if="assigneeMenuLoading" class="text-center">
                        Loading...
                        <Icon name="svg-spinners:180-ring-with-bg" size="16" />
                      </div>
                      <div
                        @click="changeIssue({ assign_to: null })"
                        class="unAssignee w-100 d-flex justify-content-start align-items-center hover-bg-light p-3 border-bottom"
                        v-if="backlogStore?.issueInfoArray?.assign_to"
                      >
                        <div
                          class="symbol symbol-circle symbol-30px overflow-hidden"
                        >
                          <img
                            src="~/assets/media/avatars/blank.png"
                            alt="Unassigned"
                            class="w-30px h-30px"
                          />
                        </div>
                        <span class="m-0 ms-3 fw-normal text-capitalize"
                          >unassignee</span
                        >
                      </div>
                      <div
                        v-for="(
                          member, index
                        ) in projectsStore?.project?.team_members?.filter(
                          (m) => m?.invite_status === 'accept'
                        )"
                        :key="index"
                        @click="changeIssue({ assign_to: member?.id })"
                      >
                        <div
                          class="w-100 d-flex justify-content-start align-items-center hover-bg-light p-3 border-bottom"
                          v-if="
                            backlogStore?.issueInfoArray?.assign_to !==
                            member?.id
                          "
                        >
                          <div
                            class="symbol symbol-circle symbol-30px overflow-hidden"
                          >
                            <img
                              v-if="member?.user?.photo"
                              :src="member?.user?.url_photo"
                              :alt="member?.user?.name"
                              class="w-30px h-30px"
                            />
                            <span
                              v-else
                              class="symbol-label text-inverse-warning fs-2"
                              :style="{
                                backgroundColor: getColor(member?.user?.id),
                              }"
                              >{{
                                member?.user?.name
                                  ? member?.user?.name[0].toUpperCase()
                                  : "-"
                              }}</span
                            >
                          </div>
                          <span class="ms-2 fs-5">{{
                            member?.user?.name
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <p class="fs-6 fw-semibold">Status</p>
                <div
                  class="position-relative w-350px border border-1 cursor-pointer rounded-1"
                >
                  <div class="text-center p-3" v-if="editStatusMenuLoading">
                    <Icon name="svg-spinners:180-ring-with-bg" size="20" />
                  </div>
                  <div
                    v-else
                    class="fw-bold fs-9 text-uppercase text-nowrap d-flex align-items-center hover-bg-light p-1"
                    v-click-outside="statusMenuClose"
                    @click="statusMenuToggle"
                  >
                    <div
                      class="w-100 d-flex justify-content-start align-items-center hover-bg-light p-2"
                    >
                      <span class="fw-normal fs-7">{{
                        backlogStore?.issueInfoArray?.status?.name
                      }}</span>
                    </div>
                    <Icon
                      v-if="statusMenuOpen"
                      name="ic:outline-keyboard-arrow-up"
                      size="25"
                      class="text-gray-400 m-0"
                    />
                    <Icon
                      v-else
                      name="ic:outline-keyboard-arrow-down"
                      size="25"
                      class="text-gray-400 m-0"
                    />
                  </div>
                  <Transition name="statusesMenu">
                    <div
                      v-if="statusMenuOpen"
                      class="w-100 statusesMenuWrapper position-absolute bg-white shadow p-0 d-flex flex-column gap-2 rounded-1 overflow-y-auto z-1"
                      style="
                        min-width: 100% !important;
                        width: max-content !important;
                        max-height: 138px !important;
                        gap: 0 !important;
                      "
                    >
                      <div v-if="statusMenuLoading" class="text-center">
                        Loading...
                        <Icon name="svg-spinners:180-ring-with-bg" size="16" />
                      </div>
                      <div
                        v-else
                        v-for="(status, index) in backlogStore.statusesArray"
                        :key="index"
                      >
                        <div
                          class="w-100 fw-normal fs-7 p-3 hover-bg-light border-bottom"
                          v-if="
                            status?.name !==
                            backlogStore?.issueInfoArray?.status?.name
                          "
                          @click="changeIssue({ status_id: status?.id })"
                        >
                          {{ status?.name }}
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <p class="fs-6 fw-semibold">Estimate Time</p>
                <div class="position-relative w-350px cursor-pointer">
                  <div
                    v-if="!openEstimateTime"
                    class="p-4 d-flex justify-content-start align-items-center border border-1 rounded-1"
                  >
                    <div
                      class="d-flex align-items-center gap-2"
                      @click="openEstimateTime = !openEstimateTime"
                    >
                      <span class="badge fs-7 badge-light-dark"
                        >{{
                          backlogStore?.issueInfoArray?.estimated_at[0]
                        }}
                        d</span
                      >
                      <span class="badge fs-7 badge-light-primary"
                        >{{ backlogStore?.issueInfoArray?.estimated_at[1] }} h
                      </span>
                      <span class="badge fs-7 badge-light-warning"
                        >{{ backlogStore?.issueInfoArray?.estimated_at[2] }} m
                      </span>
                    </div>
                  </div>
                  <form
                    v-else
                    @submit.prevent="
                      changeIssue({
                        estimated_at: [dayTime, hourTime, minuteTime],
                      })
                    "
                  >
                    <div class="d-flex">
                      <div class="input-group">
                        <span class="input-group-text" id="basic-addon1"
                          >D</span
                        >
                        <input
                          type="text"
                          class="form-control placeholder-sm p-0 ps-1"
                          v-model="dayTime"
                          placeholder="day"
                          aria-label="day"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                      <div class="input-group">
                        <span class="input-group-text" id="basic-addon1"
                          >H</span
                        >
                        <input
                          type="text"
                          class="form-control placeholder-sm p-0 ps-1"
                          v-model="hourTime"
                          placeholder="hour"
                          aria-label="hour"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                      <div class="input-group">
                        <span class="input-group-text" id="basic-addon1"
                          >M</span
                        >
                        <input
                          type="text"
                          class="form-control placeholder-sm p-0 ps-1"
                          v-model="minuteTime"
                          placeholder="minutes"
                          aria-label="minutes"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                    <div class="d-flex justify-content-end mt-3">
                      <button
                        :disabled="editEstimateTimeLoading"
                        class="btn btn-sm btn-light-primary mx-1"
                      >
                        <span v-if="!editEstimateTimeLoading">save</span>
                        <Icon
                          v-else
                          name="svg-spinners:180-ring-with-bg"
                          class="p-1"
                          size="22"
                        />
                      </button>
                      <p
                        @click="openEstimateTime = false"
                        class="btn btn-sm btn-light-danger mx-1"
                      >
                        cansel
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <p class="fs-6 fw-semibold">Labels</p>
                <div class="position-relative w-350px createIssueWrapper">
                  <div
                    class="d-flex justify-content-start align-items-center"
                    @click="openAddLabels = true"
                  >
                    <input
                      class="form-control"
                      :value="backlogStore?.issueInfoArray?.labelNames"
                      id="labels"
                      placeholder="Enter labels"
                      type="text"
                      @change="onChange"
                      autocomplete="off"
                    />
                  </div>
                  <div
                    v-if="openAddLabels"
                    class="d-flex justify-content-end mt-3"
                  >
                    <button
                      :disabled="editLabelsLoading"
                      @click="createNewLabel"
                      class="btn btn-sm btn-light-primary mx-2"
                    >
                      <span v-if="!editLabelsLoading">save</span>
                      <Icon
                        v-else
                        name="svg-spinners:180-ring-with-bg"
                        class="p-2"
                        size="30"
                      />
                    </button>
                    <p
                      @click="openAddLabels = false"
                      class="btn btn-sm btn-light-danger"
                    >
                      cansel
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <p class="fs-6 fw-semibold">Reporter</p>
                <div
                  class="position-relative w-350px border border-1 rounded-1"
                >
                  <div
                    class="d-flex justify-content-start align-items-center p-3"
                  >
                    <div
                      class="symbol symbol-circle symbol-30px overflow-hidden"
                    >
                      <img
                        v-if="backlogStore?.issueInfoArray?.user?.photo"
                        :src="backlogStore?.issueInfoArray?.user?.url_photo"
                        :alt="backlogStore?.issueInfoArray?.user?.name"
                        class="w-30px h-30px"
                      />
                      <span
                        v-else
                        class="symbol-label text-inverse-warning fs-1 w-30px h-30px rounded-circle"
                        :style="{
                          backgroundColor: getColor(
                            backlogStore?.issueInfoArray?.user?.id
                          ),
                        }"
                        >{{
                          backlogStore?.issueInfoArray?.user?.name
                            ? backlogStore?.issueInfoArray?.user?.name[0].toUpperCase()
                            : "-"
                        }}</span
                      >
                    </div>
                    <span class="ms-3 fs-4 fw-semibold text-capitalize">{{
                      backlogStore?.issueInfoArray?.user?.name
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="position-relative mt-4">
                <div class="border-top border-1 fw-semibold p-3">
                  <div>
                    <p class="fs-6 p-1">
                      Created Issue
                      <span
                        @click="relativeTimeStatus = !relativeTimeStatus"
                        class="fs-6 text-hover-warning cursor-pointer"
                        >{{
                          changeTimeType(
                            backlogStore?.issueInfoArray?.created_at
                          )
                        }}</span
                      >
                    </p>
                    <p class="fs-6 p-1">
                      Updated Issue
                      <span
                        @click="relativeTimeStatus = !relativeTimeStatus"
                        class="fs-6 text-hover-warning cursor-pointer"
                      >
                        {{
                          changeTimeType(
                            moment(backlogStore?.issueInfoArray?.updated_at)
                          )
                        }}</span
                      >
                    </p>
                  </div>
                </div>
                <span
                  class="date-icon w-100 h-0 text-center position-absolute top-0"
                >
                  <i class="fa-solid fa-calendar-days p-2 bg-white fs-4"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="my-4">
            <h1 class="fs-4 my-6 text-capitalize">sub issues</h1>
            <div class="border border-1 rounded-1">
              <div
                v-for="(subIssue, index) in backlogStore?.issueInfoArray
                  ?.sub_issues"
                :key="index"
              >
                <IssueComponentSubIssueCard :subIssue="subIssue" />
              </div>
              <div v-if="createSubIssueLoading">
                <IssueComponentSubIssueCard
                  :subIssue="subIssueData"
                  :progress="true"
                />
              </div>
              <div
                @click.stop
                id="createIssueWrapper"
                ref="inputFocus"
                class="createIssue cursor-pointer rounded-bottom py-2 hover-bg-light"
              >
                <div
                  v-if="openCreateSubIssueInput"
                  v-click-outside="closeCreateSubIssueInput"
                  class="d-flex align-items-center px-5 py-2"
                >
                  <div class="position-relative">
                    <div
                      class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap"
                    >
                      <div
                        v-click-outside="closeTypeIssueMenu"
                        @click="typeIssueMenuToggle"
                      >
                        <img
                          v-if="defaultTypeIssue === 'task'"
                          src="~/assets/media/issue/type/task.svg"
                          alt="task"
                        />
                        <img
                          v-else-if="defaultTypeIssue === 'story'"
                          src="~/assets/media/issue/type/story.svg"
                          alt="story"
                        />
                        <img
                          v-else-if="defaultTypeIssue === 'bug'"
                          src="~/assets/media/issue/type/bug.svg"
                          alt="bug"
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
                          v-if="defaultTypeIssue !== 'task'"
                          class="p-1 hover-bg-light"
                        >
                          <div
                            class="fs-7 d-flex justify-content-start"
                            style="max-width: 150px"
                            @click="changeTypeSubIssue('task')"
                          >
                            <img
                              class="py-1 px-1 rounded-1 me-1"
                              src="~/assets/media/issue/type/task.svg"
                              alt="task"
                            />
                            <span class="fs-6">task</span>
                          </div>
                        </div>
                        <div
                          v-if="defaultTypeIssue !== 'story'"
                          class="p-1 hover-bg-light"
                        >
                          <div
                            class="fs-7 d-flex justify-content-start"
                            style="max-width: 150px"
                            @click="changeTypeSubIssue('story')"
                          >
                            <img
                              class="py-1 px-1 rounded-1 me-1"
                              src="~/assets/media/issue/type/story.svg"
                              alt="story"
                            />
                            <span class="fs-6">story</span>
                          </div>
                        </div>
                        <div
                          v-if="defaultTypeIssue !== 'bug'"
                          class="p-1 hover-bg-light"
                        >
                          <div
                            class="fs-7 d-flex justify-content-start"
                            style="max-width: 150px"
                            @click="changeTypeSubIssue('bug')"
                          >
                            <img
                              class="py-1 px-1 rounded-1 me-1"
                              src="~/assets/media/issue/type/bug.svg"
                              alt="bug"
                            />
                            <span class="fs-6">bug</span>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>
                  <FormInput
                    class="w-100 m-0"
                    @keyup.enter="createSubIssue"
                    type="text"
                    autocomplete="off"
                    labelText="Sub Issue Title:"
                    name="title"
                    placeholder="Sub Issue Title"
                    v-model="createIssueInput"
                    :formDataError="errorMsg.errorSubIssueMsg"
                    :focus="true"
                  />
                </div>
                <span
                  @click="openCreateIssueInput"
                  v-if="!openCreateSubIssueInput"
                  id="createIssueTopButton"
                  class="d-flex align-items-center py-3 px-8"
                  ><i class="ki-outline ki-plus fs-2 me-1"></i>Create Sub
                  Issue</span
                >
              </div>
            </div>
          </div>
          <div class="my-4">
            <h1 class="fs-4 my-6">Activity</h1>
            <ul class="p-0 d-flex list-unstyled">
              <li
                class="fs-5 me-5 py-3 m-0 cursor-pointer"
                :class="{
                  'border-bottom border-3 border-success': commentComponent,
                }"
                @click="
                  commentComponent = true;
                  historyComponent = false;
                "
              >
                Comments
              </li>
              <li
                class="fs-5 me-5 py-3 m-0 cursor-pointer"
                :class="{
                  'border-bottom border-3 border-success': historyComponent,
                }"
                @click="getIssueHistory"
              >
                History
              </li>
            </ul>
            <div v-if="commentComponent === true">
              <div
                :class="{ 'align-items-center': !openAddComment }"
                class="row mb-4"
              >
                <div class="col-1 overflow-hidden cursor-pointer">
                  <img
                    v-if="backlogStore?.issueInfoArray?.user?.photo"
                    :src="backlogStore?.issueInfoArray?.user?.url_photo"
                    :alt="backlogStore?.issueInfoArray?.user?.name"
                    class="w-35px h-35px rounded-circle"
                  />
                  <span
                    v-else
                    class="symbol-label text-inverse-warning fs-1 d-flex justify-content-center align-items-center w-30px h-30px rounded-circle"
                    :style="{
                      backgroundColor: getColor(
                        backlogStore?.issueInfoArray?.user?.id
                      ),
                    }"
                    >{{
                      backlogStore?.issueInfoArray?.user?.name
                        ? backlogStore?.issueInfoArray?.user?.name[0].toUpperCase()
                        : "-"
                    }}</span
                  >
                </div>
                <div class="col-11 ps-0">
                  <p
                    v-if="!openAddComment"
                    @click="toggleOpenAddComment"
                    class="p-3 fs-5 fw-normal text-gray-400 hover-bg-light cursor-pointer border border-2 rounded-1"
                  >
                    add a comment...
                  </p>
                  <div class="card border-0" v-if="openAddComment">
                    <form @submit.prevent="addCommentHandle">
                      <Editor v-model="newComment" editorStyle="height: 320px"/>
                      <div class="d-flex justify-content-end mt-3">
                        <button
                          :disabled="openAddCommentLoader"
                          type="submit"
                          class="btn btn-sm btn-light-primary mx-1"
                        >
                          <span v-if="!openAddCommentLoader">Add Comment</span>
                          <Icon
                            v-else
                            name="svg-spinners:180-ring-with-bg"
                            class="p-2"
                            size="25"
                          />
                        </button>
                        <p
                          @click="openAddComment = false"
                          class="btn btn btn-sm btn-light-danger mx-1"
                        >
                          Cansel
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div v-if="backlogStore?.issueCommentArray?.length">
                <div
                  v-for="(comment, index) in backlogStore?.issueCommentArray"
                  :key="index"
                >
                  <IssueComponentIssueComment :comment="comment" />
                </div>
              </div>
            </div>
            <div v-if="historyComponent === true">
              <div v-if="!backlogStore?.issueHistoryArray">
                <SkeletonHistoryCard
                  v-for="(skeletonHistory, index) in 7"
                  :key="index"
                />
              </div>
              <div v-else>
                <issueComponentIssueHistory
                  v-for="(history, index) in backlogStore?.issueHistoryArray"
                  :key="index"
                  :history="history"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.date-icon {
  top: -10px !important;
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