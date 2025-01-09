<script setup>
// Import required
import { useBacklogStore } from "~/stores/backlogStore";
import { useProjectsStore } from "~/stores/projectsStore";
import { useUser } from "~/composables/useAuth";
import Draggable from "vuedraggable";

useHead({
  title: "boards",
});

definePageMeta({
  middleware: ["auth"],
});

const backlogStore = useBacklogStore();
const projectsStore = useProjectsStore();
const user = useUser();
const route = useRoute();
const projectId = ref(route?.params?.id);
// before render page
onMounted(() => {
  console.log(backlogStore?.backlogProject);
  if (backlogStore?.backlogProject === null) {
    backlogStore?.getBacklogProject(projectId.value);
  }
});

const { createStatus, moveStatus } = useBacklog();

let showCreateStatus = ref(false);
let createStatusInput = ref("");
let errorMsg = reactive({
  errorTitle: null,
});

const scrollToCreateStatus = () => {
  showCreateStatus.value = true;
  setTimeout(() => {
    document.querySelector(".craeteStatus input").focus();
  }, 0);
};

// data for request
const newStatusdata = reactive({
  name: null,
  user_id: user.identify_number,
  order: 0,
});

// chack create issue input
let createStatusProgress = ref(false);
const handelCreateStatus = async () => {
  if (!createStatusInput.value?.trim()) {
    errorMsg.errorTitle = "status title is required";
    return;
  } else if (createStatusInput.value?.trim().length <= 2) {
    errorMsg.errorTitle = "status title must be more than 2 characters";
    return;
  }
  errorMsg.errorTitle = null;
  newStatusdata.name = createStatusInput.value;
  newStatusdata.order = backlogStore.statusesArray.length + 1;
  await submit();
};

// create Status input function
const { submit, inProgress } = useSubmit(
  async () => {
    createStatusInput.value = null;
    return await createStatus(
      projectsStore?.project?.project_identify,
      newStatusdata
    );
  },
  {
    onSuccess: async (response) => {
      // Handle the response
      createStatusProgress.value = true;
      await backlogStore?.getBacklogProject(
        projectsStore?.project?.project_identify
      );
      createStatusProgress.value = false;
    },
    onError: (error) => {
      showToast("error", error.data.message);
    },
  }
);

// handle move issue
const handleMoveStatus = async (e) => {
  if (e.added) {
    await moveStatus(
      projectsStore?.project?.project_identify,
      e?.added?.element.id,
      {
        sprint_id: null,
        order: e?.added?.newIndex + 1,
      }
    );
  } else if (!e.removed) {
    await moveStatus(
      projectsStore?.project?.project_identify,
      e?.moved?.element.id,
      {
        order: e?.moved?.newIndex + 1,
      }
    );
  }
};
</script>
<template>
  <div class="app-container container-xxl py-9 d-flex overflow-auto">
    <div
      class="d-flex"
      v-if="backlogStore.statusesArray && backlogStore.allIssues"
    >
      <Draggable
        class="d-flex"
        v-model="backlogStore.statusesArray"
        group="statuses"
        @change="handleMoveStatus"
        ghost-class="ghost"
        itemKey="id"
      >
        <template #item="{ element: status }">
          <BoardCompStatusCard :status="status" />
        </template>
      </Draggable>
      <div v-if="createStatusProgress || inProgress" class="disabled">
        <BoardCompStatusCard
          :status="newStatusdata"
          :createStatusProgress="true"
        />
      </div>
      <div class="craeteStatus">
        <div
          class="position-relative"
          v-if="showCreateStatus"
          v-click-outside="() => (showCreateStatus = false)"
        >
          <FormInput
            class="w-300px p-1 mt-6 mx-3"
            type="text"
            ref="inputFocus"
            autocomplete="off"
            labelText="status Title:"
            name="statusTitle"
            @keyup.enter="handelCreateStatus"
            placeholder="status Title"
            v-model="createStatusInput"
            :formDataError="errorMsg.errorTitle"
            :focus="true"
          />
          <div class="d-flex justify-content-end mt-1">
            <span v-if="!inProgress" @click="handelCreateStatus"
              ><i class="pi pi-check btn btn-sm btn-success"></i
            ></span>
            <Icon
              v-else
              name="svg-spinners:180-ring-with-bg"
              class="p-1"
              size="22"
            />
            <i
              @click="showCreateStatus = false"
              class="btn btn-sm btn-light mx-1 pi pi-times"
            ></i>
          </div>
        </div>

        <div v-else class="mt-6 mx-3" @click="scrollToCreateStatus">
          <i
            class="ki-outline ki-plus h1 rounded-1 text-dark createIssue cursor-pointer bg-light-active text-gray-500 p-1"
          ></i>
        </div>
      </div>
    </div>
    <div v-else class="d-flex">
      <SkeletonStatusCard v-for="index in 4" :key="index" />
    </div>
  </div>
</template>
<style scoped>
.createIssue:hover {
  background: var(--bs-gray-300) !important;
}
</style>