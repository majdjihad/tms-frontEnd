<script setup>
import { useSubmit } from "~/composables/useSubmit";
import { useBacklogStore } from "~/stores/backlogStore";
import { useBacklog } from "~/composables/useBacklog";
import { useToast } from "vue-toastification";
import { useProjectsStore } from "~/stores/projectsStore";

const createIssueInput = ref("");
const backlogStore = useBacklogStore();
const { createIssue } = useBacklog();
const projectsStore = useProjectsStore();
const toast = useToast();
const closeBtn = ref(false);
const errorMsg = reactive({
  errorTitle: null,
});
const data = reactive({
  title: null,
  sprint_id: null,
  type: "task",
});
const createIssueToBacklog = () => {
  !createIssueInput.value.trim()
    ? (errorMsg.errorTitle = "issue title is required")
    : "";
  if (createIssueInput.value.trim()) {
    data.title = createIssueInput.value;
    submit();
  }
};

const { submit, inProgress } = useSubmit(
  () => createIssue(projectsStore?.project?.project_identify, data),
  {
    onSuccess: async (response) => {
      // Handle the response
      await backlogStore?.getBacklogProject(
        projectsStore?.project?.project_identify
      );
      showToast("success", response.message);
      if (closeBtn.value) {
        closeBtn.value.click();
      }
      createIssueInput.value = null;
    },
    onError: (error) => {
      // Handle the error
      showToast("error", error.data.message);
    },
  }
);

function showToast(statusCode, msg) {
  const toastAttr = {
    position: "top-center",
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
</script>

<template>
  <div
    class="modal fade"
    id="kt_modal_create_issue"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog mw-650px">
      <div class="modal-content">
        <div class="modal-header pb-0 border-0 justify-content-end">
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
            id="closeCreateIssueModal"
            ref="closeBtn"
          >
            <i class="ki-outline ki-cross fs-1"></i>
          </div>
        </div>
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
          <div class="text-center mb-13">
            <h1 class="mb-3">Create Issue</h1>
          </div>
          <FormInput
            type="text"
            autocomplete="off"
            labelText="Issue Title"
            name="title"
            @keyup.enter="createIssueToBacklog"
            placeholder="Issue Title"
            v-model="createIssueInput"
            :formDataError="errorMsg.errorTitle"
            :focus="true"
          />

          <button
            @click="createIssueToBacklog"
            :disabled="inProgress"
            type="submit"
            class="btn btn-primary w-100 mt-5"
          >
            <span v-if="!inProgress" class="indicator-label">Create</span>
            <icon
              v-else
              name="svg-spinners:ring-resize"
              class="indicator-label"
              size="25"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>