<script setup>
import { useProjectsStore } from "~/stores/projectsStore";
import { showToast } from "~/composables/useToast";
import { useBacklogStore } from "~/stores/backlogStore";

const props = defineProps(["issue", "createIssueProgress"]);
const projectsStore = useProjectsStore();
const backlogStore = useBacklogStore();

// get issue description
const getInfoIssue = async () => {
  if (
    backlogStore?.issueInfoArray?.id !== props?.issue?.id &&
    !props?.progress
  ) {
    backlogStore.issueInfoArray = null;
    backlogStore.issueCommentArray = null;
    await backlogStore?.getIssueInfo(
      projectsStore?.project?.project_identify,
      props?.issue?.id
    );
    await backlogStore?.getIssueComments(
      projectsStore?.project?.project_identify,
      props?.issue?.id
    );
  }
};

// declear delete confirm
const { deleteIssue, editIssue } = useBacklog();
const handleDeleteIssue = async () => {
  await Swal.fire({
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

// declear status action
const toggleIssueMenu = (event) => {
  issueActionMenu.value.toggle(event);
};
const issueActionMenu = ref();
const statusActionItems = ref([
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
    label: "Delete",
    icon: "pi pi-fw pi-trash",
    command: () => {
      handleDeleteIssue();
    },
  },
]);

// declear getColor function for member no have image
const getColor = (index) => {
  const colorList = ["4A90E2", "9013FE", "F5A623", "D0021B", "F8E71C"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};

// assignee menu functionality
const assigneeOpen = ref(false);
const assigneeLoading = ref(false);
const EditAssigneeLoading = ref(false);
const assigneeToggle = () => {
  assigneeOpen.value = !assigneeOpen.value;
};

const closeAssignee = () => {
  assigneeOpen.value = false;
};
// Define function handle change statuses or assignee issues
const changeAssigneeIssue = async (AssigneeValue) => {
  closeAssignee();
  EditAssigneeLoading.value = true;
  try {
    await editIssue(
      projectsStore?.project?.project_identify,
      props?.issue?.id,
      { assign_to: AssigneeValue }
    );
    await backlogStore?.getBacklogProject(
      projectsStore?.project?.project_identify
    );
  } catch (error) {
    showToast("error", error.data.message);
  }
  EditAssigneeLoading.value = false;
};
</script>
<template>
  <div>
    <div
      v-if="!props.createIssueProgress"
      class="issue-card h-150px d-flex flex-column justify-content-evenly bg-light p-4 mt-3 shadow-sm rounded-1 "
    >
      <div class="d-flex justify-content-between align-items-center">
        <p
          class="fs-5 issue-title"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_issue_info"
          @click="getInfoIssue"
        >
          {{ issue?.title }}
        </p>
        <div
          @click="toggleIssueMenu"
          class="btn btn-sm btn-icon btn-bg-light"
          aria-haspopup="true"
          aria-controls="issueAction_tmenu"
        >
          <i class="ki-solid ki-dots-horizontal fs-2x btn-s rounded-1"></i>
        </div>
        <TieredMenu
          ref="issueActionMenu"
          id="issueAction_tmenu"
          :model="statusActionItems"
          popup
        />
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <img
            v-if="issue?.type === 'task'"
            src="~/assets/media/issue/type/task.svg"
            class="me-1"
            alt="task"
          />
          <img
            v-else-if="issue?.type === 'story'"
            src="~/assets/media/issue/type/story.svg"
            class="me-1"
            alt="story"
          />
          <img
            v-else-if="issue?.type === 'bug'"
            src="~/assets/media/issue/type/bug.svg"
            class="me-1"
            alt="bug"
          />
          <span class="text-gray-600 truncate text-nowrap fs-6">{{
            issue?.key
          }}</span>
        </div>
        <div class="position-relative col-auto">
          <div
            class="d-flex justify-content-center align-items-center rounded-1 fw-bold fs-8 text-uppercase text-nowrap cursor-pointer"
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
              class="statusesMenuWrapper position-absolute bg-white shadow p-0 d-flex flex-column gap-0 rounded-1 overflow-y-auto z-1"
              style="
                min-width: 130px !important;
                width: max-content !important;
                max-height: 138px !important;
              "
            >
              <div v-if="assigneeLoading" class="text-center">
                Loading...
                <Icon name="svg-spinners:180-ring-with-bg" size="16" />
              </div>
              <div
                @click="changeAssigneeIssue(null)"
                class="unAssignee w-100 d-flex justify-content-start align-items-center hover-bg-light cursor-pointer p-2 border-bottom"
                v-if="issue?.assign_to"
              >
                <div class="symbol symbol-circle symbol-30px overflow-hidden">
                  <img
                    src="~/assets/media/avatars/blank.png"
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
                @click="changeAssigneeIssue(member?.id)"
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
      </div>
    </div>
    <div
      v-else
      class="h-150px d-flex flex-column justify-content-evenly bg-light p-4 mt-3 shadow-sm rounded-1"
    >
      <div class="d-flex justify-content-between align-items-center">
        <p class="fs-5 issue-title">{{ issue?.title }}</p>
        <div
          @click="toggleIssueMenu"
          class="btn btn-sm btn-icon btn-bg-light"
          aria-haspopup="true"
          aria-controls="issueAction_tmenu"
        >
          <i class="ki-solid ki-dots-horizontal fs-2x"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <Icon name="svg-spinners:180-ring-with-bg" size="16" />
        </div>
        <div class="position-relative col-auto">
          <div
            class="d-flex justify-content-center align-items-center rounded-1 fw-bold fs-8 text-uppercase text-nowrap cursor-pointer"
          >
            <div
              v-click-outside="closeAssignee"
              @click="assigneeToggle"
              class="symbol symbol-circle symbol-30px overflow-hidden"
            >
              <div>
                <img
                  src="~/assets/media/avatars/blank.png"
                  alt="Unassigned"
                  class="w-35px h-35px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <IssueCompIssueModal />
  </div>
</template>
<style scoped>
.issue-card {
  cursor: grab;
}
.issue-title:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>