<script setup>
import { useBacklogStore } from "~/stores/backlogStore";
import { useProjectsStore } from "~/stores/projectsStore";
import { useSubmit } from "~/composables/useSubmit";
import Draggable from "vuedraggable";

const { createIssue, moveIssueForStatus, editStatus, deleteStatus } =
  useBacklog();
const props = defineProps(["status", "createStatusProgress"]);
const backlogStore = useBacklogStore();
const projectsStore = useProjectsStore();

// get issue by status
const issuesByStatus = ref(
  backlogStore.allIssues.filter((issue) => issue.status.id === props.status.id)
);
watch(backlogStore, () => {
  issuesByStatus.value = backlogStore.allIssues.filter(
    (issue) => issue.status.id === props.status.id
  );
});
// declear status action
const statusActionMenu = ref();
const toggleStatusMenu = (event) => {
  statusActionMenu.value.toggle(event);
};
const statusActionItems = ref([
  {
    label: "Edit",
    icon: "pi pi-fw pi-pencil",
    command: () => {
      scrollToEditeStatus();
    },
  },
  {
    label: "Delete",
    icon: "pi pi-fw pi-trash",
    command: () => {
      handleDeleteStatus();
    },
  },
]);

// Edite status
let showEditStatus = ref(false);
let editIssueInput = ref(props.status.name);
let statusErrorMsg = reactive({
  errorTitle: null,
});
let dataNewStatus = reactive({
  name: null,
  max: 0,
});
const scrollToEditeStatus = () => {
  showEditStatus.value = true;
  setTimeout(() => {
    document.querySelector(".editStatus input").focus();
  }, 0);
};

// handle Edit Status
let editStatusProgress = ref(false);

const handleEditStatus = async () => {
  if (!editIssueInput.value.trim()) {
    statusErrorMsg.errorTitle = "status title is required";
    return;
  } else if (editIssueInput.value.trim().length <= 2) {
    statusErrorMsg.errorTitle = "status title must be more than 2 characters";
    return;
  } else if (editIssueInput.value.trim() == props.status.name) {
    statusErrorMsg.errorTitle = "status title is same current title";
    return;
  }
  dataNewStatus.name = editIssueInput.value;
  dataNewStatus.max = 100;
  try {
    editStatusProgress.value = true;
    await editStatus(
      projectsStore?.project?.project_identify,
      props?.status?.id,
      dataNewStatus
    );
    await backlogStore?.getBacklogProject(
      projectsStore?.project?.project_identify
    );
  } catch (error) {
    showToast("error", error.data.message);
  } finally {
    editStatusProgress.value = false;
    showEditStatus.value = false;
  }
};

// handle detete status
const handleDeleteStatus = async () => {
  await Swal.fire({
    html: `Are you sure you want to delete <strong><div class="truncate lh-lg" >${props.status.name} Status</div></strong>`,
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
    return await deleteStatus(
      projectsStore?.project?.project_identify,
      props?.status?.id,
      { issues_status_id: props?.status?.id }
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

// create issue input
let creatingIssue = ref(false);
let createIssueInput = ref("");
let inputIsuseFocus = useTemplateRef("inputIsuseFocus");
let typeIssue = ref("task");
let issueErrorMsg = reactive({
  errorTitle: null,
});

const scrollToCreateIssue = () => {
  creatingIssue.value = true;
  setTimeout(() => {
    inputIsuseFocus.value.querySelector("input").focus();
  }, 0);
};

// Define type Issue Menu
const openTypeIssueMenu = ref(false);

const typeIssueMenuToggle = () => {
  openTypeIssueMenu.value = !openTypeIssueMenu.value;
};

const changeTypeIssue = (type) => {
  typeIssue.value = type;
  openTypeIssueMenu.value = false;
};

const newIssueData = reactive({
  title: null,
  sprint_id: null,
  type: null,
  status_id: props.status.id,
});

// chack issue input and create new issue
let createIssueProgress = ref(false);
const handelCreateIssue = async () => {
  if (!createIssueInput.value?.trim()) {
    issueErrorMsg.errorTitle = "Issue title is required";
    return;
  } else if (createIssueInput.value?.trim().length <= 2) {
    issueErrorMsg.errorTitle = "Issue title must be more than 2 characters";
    return;
  }
  issueErrorMsg.errorTitle = null;
  newIssueData.title = createIssueInput.value;
  newIssueData.type = typeIssue.value;
  creatingIssue.value = false;
  try {
    createIssueProgress.value = true;
    await createIssue(projectsStore?.project?.project_identify, newIssueData);
    await backlogStore?.getBacklogProject(
      projectsStore?.project?.project_identify
    );
  } catch (error) {
    showToast("error", error.data.message);
  } finally {
    createIssueProgress.value = false;
    createIssueInput.value = null;
  }
};

// handle move issue
const handleMoveIssue = async (e) => {
  if (e.added) {
    console.log(props.status);
    await moveIssueForStatus(
      projectsStore?.project?.project_identify,
      e?.added?.element.id,
      {
        order_by_status: e?.added?.newIndex + 1,
        status_id: props.status.id,
      }
    );
  } else if (!e.removed) {
    console.log(props.status);
    await moveIssueForStatus(
      projectsStore?.project?.project_identify,
      e?.moved?.element.id,
      {
        order_by_status: e?.moved?.newIndex + 1,
        status_id: props.status.id,
      }
    );
  }
};
</script>
<template>
  <div>
    <div
      v-if="!props.createStatusProgress"
      class="w-300px p-1 bg-light-active rounded-1 mt-6 mx-3"
    >
      <div
        v-if="showEditStatus"
        v-click-outside="() => (showEditStatus = false)"
        class="editStatus position-relative rounded-bottom"
      >
        <div class="py-3 bg-gray-300">
          <FormInput
            class="w-95 m-0"
            type="text"
            autocomplete="off"
            labelText="status Title:"
            name="`titleFor${props.status.id}status`"
            placeholder="status Title"
            v-model="editIssueInput"
            @keyup.enter="handleEditStatus"
            :formDataError="statusErrorMsg.errorTitle"
            :focus="true"
          />
          <div class="d-flex justify-content-end mt-1">
            <span v-if="!editStatusProgress" @click="handleEditStatus"
              ><i class="pi pi-check btn btn-sm btn-success"></i
            ></span>
            <Icon
              v-else
              name="svg-spinners:180-ring-with-bg"
              class="p-1"
              size="22"
            />
            <i
              @click="showEditStatus = false"
              class="btn btn-sm btn-light mx-1 pi pi-times"
            ></i>
          </div>
        </div>
      </div>
      <div
        v-else
        class="status-head d-flex justify-content-between align-items-center"
      >
        <span class="fs-4 p-3 text-gray-700">{{ props.status.name }}</span>
        <i
          @click="toggleStatusMenu"
          class="edit-status ki-solid ki-dots-horizontal w-auto h-auto p-1 fs-2x btn btn-sm btn-icon btn-bg-light"
          aria-haspopup="true"
          aria-controls="statusAction_tmenu"
        ></i>
        <TieredMenu
          ref="statusActionMenu"
          id="statusAction_tmenu"
          :model="statusActionItems"
          popup
        />
      </div>
      <div v-if="issuesByStatus.length == 0">
        <p class="fs-4 text-center py-4 text-gray-600">
          No issues in this Status.
        </p>
      </div>
      <div v-else>
        <Draggable
          v-model="issuesByStatus"
          group="issues"
          @change="handleMoveIssue"
          ghost-class="ghost"
          itemKey="id"
        >
          <template #item="{ element: issue }">
            <BoardCompIssueCard :issue="issue" />
          </template>
        </Draggable>
      </div>
      <div v-if="createIssueProgress" class="disabled">
        <BoardCompIssueCard
          :issue="newIssueData"
          :createIssueProgress="true"
        />
      </div>
      <div
        @click.stop
        @click="creatingIssue = true"
        class="createIssue rounded-bottom"
      >
        <div
          v-if="creatingIssue"
          v-click-outside="() => (creatingIssue = false)"
          ref="inputIsuseFocus"
          class="d-flex align-items-center py-3 bg-gray-300"
        >
          <div class="position-relative">
            <div
              class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap cursor-pointer"
            >
              <div
                v-click-outside="() => (openTypeIssueMenu = false)"
                @click="typeIssueMenuToggle"
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
                class="statusesMenuWrapper position-absolute bg-white shadow d-flex flex-column rounded-1 overflow-y-auto z-1"
                style="
                  min-width: 70px !important;
                  width: max-content !important;
                "
              >
                <div
                  v-if="typeIssue !== 'task'"
                  class="p-1 hover-bg-light cursor-pointer"
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
                  class="p-1 hover-bg-light cursor-pointer"
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
                  class="p-1 hover-bg-light cursor-pointer"
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
            class="w-95 m-0"
            type="text"
            autocomplete="off"
            labelText="Issue Title:"
            :name="`IssueTitleFor${props.status.id}status`"
            placeholder="Issue Title"
            v-model="createIssueInput"
            @keyup.enter="handelCreateIssue"
            :formDataError="issueErrorMsg.errorTitle"
            :focus="true"
          />
        </div>
        <span
          @click="scrollToCreateIssue"
          v-if="!creatingIssue"
          id="createIssueTopButton"
          class="createIssue d-flex align-items-center text-gray-700 fs-6 py-3 cursor-pointer"
          ><i class="ki-outline ki-plus fs-2 me-1"></i>Create Issue</span
        >
      </div>
    </div>
    <div v-else class="w-300px p-1 bg-light-active mt-6 mx-3">
      <div
        v-if="showEditStatus"
        v-click-outside="() => (showEditStatus = false)"
        class="editStatus rounded-bottom"
      >
        <div class="py-3 bg-gray-300">
          <div class="d-flex justify-content-end mt-1">
            <span v-if="!editStatusProgress" @click="handleEditStatus"
              ><i class="pi pi-check btn btn-sm btn-success"></i
            ></span>
            <Icon
              v-else
              name="svg-spinners:180-ring-with-bg"
              class="p-1"
              size="22"
            />
            <i
              @click="showEditStatus = false"
              class="btn btn-sm btn-light mx-1 pi pi-times"
            ></i>
          </div>
        </div>
      </div>
      <div
        v-else
        class="status-head d-flex justify-content-between align-items-center"
      >
        <span class="fs-4 p-3 text-gray-700">{{ props.status.name }}</span>
        <Icon name="svg-spinners:180-ring-with-bg" class="p-1" size="22" />
      </div>
      <div>
        <p class="fs-4 text-center py-4 text-gray-600">
          No issues in this Status.
        </p>
      </div>
      <div v-if="createIssueProgress" class="disabled">
        <BoardCompIssueCard
          :issue="newIssueData"
          :createIssueProgress="true"
        />
      </div>
      <div
        @click.stop
        @click="creatingIssue = true"
        class="createIssue rounded-bottom"
      >
        <span
          @click="scrollToCreateIssue"
          v-if="!creatingIssue"
          id="createIssueTopButton"
          class="createIssue d-flex align-items-center text-gray-700 fs-6 py-3 cursor-pointer"
          ><i class="ki-outline ki-plus fs-2 me-1"></i>Create Issue</span
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.edit-status {
  display: none;
}
.status-head:hover .edit-status {
  display: flex;
}
.statusesMenuWrapper {
  transition: all 0.3s ease;
  top: 115%;
}
.createIssue:hover {
  background: var(--bs-gray-300);
}
.editStatus:hover {
  background: var(--bs-gray-300);
}
</style>