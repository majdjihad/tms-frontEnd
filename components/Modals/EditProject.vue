<script setup>
import { useProjectsStore } from "~/stores/projectsStore";
import { useProjects } from "~/composables/useProjects";
import { useSubmit } from "~/composables/useSubmit";
import { showToast } from "~/composables/useToast";

const projectsStore = useProjectsStore();
const { editProject } = useProjects();

let projectData = null;
const errorMsg = reactive({
  errorName: null,
  errorDescription: null,
});

const data = reactive({
  name: null,
  description: null,
});

// Watch for changes in projectsStore.project
watch(
  () => projectsStore?.project,
  (newProject, oldProject) => {
    if (newProject !== oldProject) {
      // Update data properties once the project data is available
      data.name = newProject?.name;
      data.description = newProject?.description;
    }
  }
);
const closeBtn = ref(null);
function formHandle() {
  !data.name
    ? (errorMsg.errorName = "Title is required")
    : !data.description
    ? (errorMsg.errorDescription = "Description is required")
    : "";
  projectData = new FormData(document.getElementById("editProjectForm"));
  if (data.name && data.description) {
    errorMsg.errorName = null;
    errorMsg.errorDescription = null;
    submit();
  }
}

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  () => editProject(projectsStore?.project?.project_identify, projectData),
  {
    onSuccess: async (response) => {
      // Handle the response
      if (closeBtn.value) {
        closeBtn.value.click();
      }
      await projectsStore?.getProject(projectsStore?.project?.project_identify);
      projectsStore.changeStatus = true;
      showToast("success", response.message);
    },
    onError: (error) => {
      showToast("error", error);
    },
  }
);
</script>

<template>
  <div
    class="modal fade"
    id="kt_modal_edit_project"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog mw-650px">
      <div class="modal-content">
        <div class="modal-header pb-0 border-0 justify-content-end">
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
            id="closeEditProjectModal"
            ref="closeBtn"
          >
            <i class="ki-outline ki-cross fs-1"></i>
          </div>
        </div>
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
          <div class="text-center mb-13">
            <h1 class="mb-3">Edit Project Info</h1>
          </div>
          <form
            @submit.prevent="formHandle"
            class="text-center"
            id="editProjectForm"
          >
            <FormAvatarInput currentImage="" from="project" formDataError="" />

            <FormInput
              type="text"
              autocomplete="off"
              labelText="Project Name"
              name="name"
              placeholder="Project Name"
              v-model="data.name"
              :formDataError="errorMsg.errorName"
            />

            <FormTextArea
              placeholder="Project Description"
              labelText="Project Description"
              name="description"
              v-model="data.description"
              :formDataError="errorMsg.errorDescription"
            />

            <button
              :disabled="inProgress"
              type="submit"
              class="btn btn-primary w-100 mt-5"
            >
              <span v-if="!inProgress" class="indicator-label">Edit</span>
              <icon v-else name="svg-spinners:ring-resize" size="25" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>