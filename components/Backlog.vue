<script setup>

import {useBacklogStore} from "~/stores/backlogStore";
import {useSubmit} from "~/composables/useSubmit";
import {useBacklog} from "~/composables/useBacklog";
import {useProjectsStore} from "~/stores/projectsStore";
import {useToast} from "vue-toastification";
import Draggable from "vuedraggable"
import {clickOutSide as vClickOutSide} from '@mahdikhashan/vue3-click-outside';

const props = defineProps(['selectedIssue']);
const route = useRoute()
const toast = useToast()
const projectsStore = useProjectsStore()
const backlogStore = useBacklogStore()
const creating = ref(false);
const arrowIcon = ref('ep:arrow-up-bold')
const {createSprint, createIssue, moveIssue, moveMultipleIssue, deleteMultipleIssues, editMultipleIssue} = useBacklog()
const createIssueInput = ref(null);
const createProgress = ref(false)
const inputFocus = ref(null)
const errorMsg = reactive({
  errorTitle: null,
})
const data = reactive({
  title: null,
  sprint_id: null,
  type: 'task'
})

const createIssueToBacklog = async () => {
  if (!createIssueInput.value?.trim()) {
    errorMsg.errorTitle = 'Issue title is required';
    return;
  } else if (createIssueInput.value?.trim().length <= 2) {
    errorMsg.errorTitle = 'Issue title must be more than 2 characters';
    return;
  }
  errorMsg.errorTitle = null;
  data.title = createIssueInput.value;
  await submit()
}

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(async () => {
  createIssueInput.value = null
  return await createIssue(projectsStore?.project?.project_identify, data)
}, {
  onSuccess: async (response) => {
    // Handle the response
    createProgress.value = true
    await backlogStore?.getBacklogProject(projectsStore?.project?.project_identify)
    createProgress.value = false
  },
  onError: (error) => {
    showToast('error', error.data.message)
  }
});

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
    rtl: false
  }

  if (statusCode === 'success') {
    toast.success(msg, {
      ...toastAttr
    });
  } else if (statusCode === 'error') {
    toast.error(msg, {
      ...toastAttr
    });
  }
}

const closeInput = () => {
  setTimeout(() => {
    creating.value = false;
  }, 0);
};

watch(creating, () => {
  if (creating.value) {
    document.addEventListener('click', handleOutsideClick);
  }
  if (!creating.value) {
    closeInput();
  }
});

const handleOutsideClick = (e) => {
  if (document.getElementById("createBacklogIssueTopButton").contains(e.target)) {
    return;
  }

  if (!document.getElementById('createBacklogIssueWrapper').contains(e.target)) {
    closeInput();

    document.removeEventListener('click', handleOutsideClick);
  }
};

onMounted(() => document.addEventListener('click', handleOutsideClick));

// scroll to create issue input when click on create issue buton at the top of the sprint
const scrollToCreate = () => {
  creating.value = true
  setTimeout(() => {
    inputFocus.value.querySelector('input').focus();
  }, 0)
  const createInput = document.getElementById("createBacklogIssueWrapper");
  if (createInput) {
    window.scrollTo({
      top: createInput.offsetTop,
      behavior: 'smooth' // For smooth scrolling
    });
  }
}
// Define create sprint
const createSprintLoader = ref(false);

// Define create sprint function
const handleCreateSprint = async () => {
  createSprintLoader.value = true;
  try {
    await createSprint(projectsStore?.project?.project_identify);
  } catch (error) {
    await showToast('error', 'error in create sprint')
  }
  createSprintLoader.value = false;
}
// Define row multiple action issue
const selectedIssue = ref([])
const IssuesActionMenu = ref(false)

const selectAllBtn = () => {
  selectedIssue.value = []
  backlogStore?.backlogProject?.forEach((issue) => {
    selectedIssue.value.push(issue?.id)
  })
  selectedIssue.value.length = backlogStore?.backlogProject?.length
}

const clearAllBtn = () => {
  selectedIssue.value = []
}
//menu functionality
const toggleIssueActionVisible = () => {
  IssuesActionMenu.value = !IssuesActionMenu.value;
}

const closeMenu = () => {
  IssuesActionMenu.value = false;
}

// Define handle Multiple Delete Issue
const handleMultipleDeleteIssue = () => {
  Swal.fire({
    html: `Are you sure you want to delete <strong><div class="truncate lh-lg" >${selectedIssue?.value?.length} issues</div></strong>`,
    icon: "warning",
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: "Yes, remove!",
    cancelButtonText: 'No, cancel',
    showLoaderOnConfirm: true,
    customClass: {
      confirmButton: "btn fw-bold btn-danger",
      cancelButton: 'btn fw-bold btn-active-light-primary',
    },
    preConfirm: async () => {
      await submit()
      selectedIssue.value = []
    },
  });
  const {submit} = useSubmit(async () => {
    return await deleteMultipleIssues(projectsStore?.project?.project_identify, {'issues_id': selectedIssue.value})
  }, {
    onSuccess: async (response) => {
    },
    onError: async (error) => {
      await showToast('error', error.data.message)
    }
  });
};

// Define a function for handle multiple delete issue
const statusSelected = ref(null)
const assigneeSelected = ref(null)

// define watch statusSelected
watch(statusSelected, () => {
  statusSelected.value ? handleMultipleEditStatus('status_id', statusSelected?.value?.id) : false;
})

// define watch assigneeSelected
watch(assigneeSelected, () => {
  assigneeSelected.value ? handleMultipleEditStatus('assign_to', assigneeSelected?.value?.id) : false;
})

const handleMultipleEditStatus = (keyParam, valueParam) => {
  Swal.fire({
    html: `Are you sure you want to change the status for <strong><div class="truncate lh-lg" >${selectedIssue?.value?.length} issues</div></strong>`,
    icon: "info",
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: "Yes, update!",
    cancelButtonText: 'No, cancel',
    showLoaderOnConfirm: true,
    customClass: {
      confirmButton: "btn fw-bold btn-success",
      cancelButton: 'btn fw-bold btn-active-light-primary',
    },
    preConfirm: async () => {
      await submit();
      selectedIssue.value = []
    },
  });
  const {submit} = useSubmit(async () => {
    const data = reactive({'issues_id': selectedIssue.value})
    data[keyParam] = valueParam;
    data[keyParam] = valueParam;
    return await editMultipleIssue(projectsStore?.project?.project_identify, data)
  }, {
    onSuccess: async (response) => {
    },
    onError: async (error) => {
      await showToast('error', error.data.message)
    }
  });
};
// handle move issue
const emits = defineEmits(['update:selectedIssue'])

const dragStart = () => {
  console.log(selectedIssue.value)
  emits('update:selectedIssue', selectedIssue.value);
}
const dragEnd = (e) => {
  if(selectedIssue.value?.includes(e?.item?._underlying_vm_?.id)) {
    selectedIssue.value = []
  }
  console.log(e)
}
const handleMoveIssue = async (e) => {
  if (e.added) {
    if (props.selectedIssue?.length) {
      if (props?.selectedIssue?.includes(e?.added?.element?.id)) {
        console.log('multiple and include drap element')
        await moveMultipleIssue(projectsStore?.project?.project_identify, {
          'issues_id': props.selectedIssue,
          'sprint_id': null,
          'order': e?.added?.newIndex + 1
        })
        await backlogStore?.getBacklogProject(projectsStore?.project?.project_identify);
      } else {
        console.log('multiple but not include drap element')
        await moveIssue(projectsStore?.project?.project_identify, e?.added?.element.id, {
          'sprint_id': null,
          'order': e?.added?.newIndex + 1
        })
      }
    } else {
      console.log('drap from sprint to sprint')
      await moveIssue(projectsStore?.project?.project_identify, e?.added?.element.id, {
        'sprint_id': null,
        'order': e?.added?.newIndex + 1
      })
    }
  } else if (!e.removed) {
    console.log('drap inside sprint')
    await moveIssue(projectsStore?.project?.project_identify, e?.moved?.element.id, {
      'sprint_id': null,
      'order': e?.moved?.newIndex + 1
    })
  }
}
</script>

<template>
  <div class="app-content">
    <div class="card mb-5">
      <div class="card-header py-4">
        <div class="card-title d-flex flex-column">
          <div class="d-flex align-items-center position-relative">
            <div class="d-flex justify-content-between align-items-center cursor-pointer me-3"
                 @click="arrowIcon === 'ep:arrow-up-bold'? arrowIcon = 'ep:arrow-down-bold': arrowIcon = 'ep:arrow-up-bold'"
                 data-bs-toggle="collapse" data-bs-target="#collapseBacklog" aria-expanded="true"
                 aria-controls="collapseBacklog">
              <h2 class="me-3">Backlog</h2>
              <icon :name="arrowIcon" color="black" class="cursor-pointer ms-2 p-1"
                    size="25"/>
            </div>
            <span v-if="backlogStore?.backlogProject?.length > 0"
                  class="fs-6 fw-normal badge badge-light-success text-success px-3">{{
                backlogStore?.backlogProject?.length
              }} issues</span>
          </div>
        </div>
        <div class="card-toolbar">
          <div class="d-flex justify-content-end gap-4">
            <button type="button" :disabled="createSprintLoader" @click="handleCreateSprint"
                    class="btn btn-primary btn-sm">
              <div v-if="!createSprintLoader" class="d-flex justify-content-end">
                <icon name="tabler:360" class="fs-2 me-1"/>
                Create Sprint
              </div>
              <div v-else>
                <icon name="svg-spinners:ring-resize" class="p-1" size="20"/>
              </div>
            </button>
            <button @click="scrollToCreate" id="createBacklogIssueTopButton" type="button"
                    class="btn btn-light-primary btn-sm">
              <i class="ki-outline ki-plus fs-2"></i>Create Issue
            </button>
          </div>
        </div>
      </div>
      <div class="card-body p-0 collapse show" id="collapseBacklog">
        <div>
          <div v-if="selectedIssue.length"
               class="sprint-action d-flex align-items-center justify-content-between py-2 px-6 border border-dashed border-success">
            <div class="d-flex justify-content-between align-items-center gap-2">
              <div>
                <div class="btn btn-sm btn-icon btn-bg-light" v-click-out-side="closeMenu"
                     @click="toggleIssueActionVisible">
                  <i class="ki-solid ki-dots-horizontal fs-2x"></i>
                </div>
                <Transition name="menu">
                  <div class="position-relative" v-show="IssuesActionMenu">
                    <ul class="position-absolute m-0 mt-2 w-125px p-0 top-100 left-0 bg-white list-style-none z-index-3 w-90px">
                      <li class="p-3 bgLight cursor-pointer fs-6 fw-normal text-start" @click="selectAllBtn">select
                        all
                      </li>
                      <li class="p-3 bgLight cursor-pointer fs-6 fw-normal text-start" @click="clearAllBtn">clear all
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>
              <p class="m-0 fw-bold">{{ selectedIssue.length }} Selected</p>
            </div>
            <div class="d-flex justify-content-between align-items-center gap-2">
              <FormVSelect class="mx-3" selectTitle="Change issue status" v-model="statusSelected"
                           :list="backlogStore?.statusesArray" type="statusMenu"/>
              <FormVSelect class="mx-3" selectTitle="Change issue assignee" v-model="assigneeSelected"
                           :list="projectsStore?.project?.team_members" type="assigneeMenu"/>
            </div>
            <div class="btn btn-light btn-active-light-danger btn-flex btn-center btn-sm cursor-pointer"
                 @click="handleMultipleDeleteIssue">
              <i class="ki-duotone ki-trash fs-5">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
                <span class="path5"></span>
              </i>
              <span style="line-height: 15px;">Delete</span>
            </div>
          </div>
          <div v-if="backlogStore?.backlogProject?.length > 0">
            <Draggable v-model="backlogStore.backlogProject"
                       @start="dragStart" @end="dragEnd"
                       group="issues"
                       @change="handleMoveIssue"
                       ghost-class="ghost"
                       itemKey="id"
            >
              <template #item="{element: issue}">
                <IssueComponentIssueCard :data-draggable="issue" v-model:input="selectedIssue"
                           :issue="issue"/>
              </template>
            </Draggable>
          </div>
          <div v-if="inProgress || createProgress">
            <IssueComponentIssueCard :data-draggable="issue" :issue="data" :progress="true"/>
          </div>

          <div v-show="!backlogStore?.backlogProject?.length > 0 && (!inProgress && !createProgress)"
               class="alert bg-light-active px-5 py-10 text-center border-2 border-dashed">
            <div class="d-flex flex-column text-center">
              <h4 class="fw-semibold p-0 m-0">Your backlog is empty.</h4>
            </div>
          </div>

          <div @click.stop id="createBacklogIssueWrapper" ref="inputFocus"
               class="createIssue py-3 px-6 cursor-pointer rounded-bottom">
            <FormInput v-if="creating" type="text" @keyup.enter="createIssueToBacklog" autocomplete="off"
                       labelText="Issue Title:" name="title"
                       placeholder="Issue Title"
                       v-model:input="createIssueInput" :formDataError="errorMsg.errorTitle"/>
            <span @click="scrollToCreate" id="createBacklogIssueTopButton" v-else
                  class="d-flex align-items-center py-2"><i class="ki-outline ki-plus fs-2 me-1"></i>Create Issue</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.createIssue {
  transition: all 0.3s ease;
}

.createIssue:hover {
  background: var(--bs-gray-200);
}

.issueDetails-enter-active,
.issueDetails-leave-active {
  transition: all 0.3s ease;
}

.issueDetails-enter-from,
.issueDetails-leave-to {
  right: -100% !important;
}

.project-backlog div:last-child .teamMembersContainer .assignMenuWrapper {
  top: 0 !important;
  background-color: red !important;
}
</style>