<script setup>
import {useSubmit} from "~/composables/useSubmit";
import {useToast} from "vue-toastification";
import {useProjectsStore} from "~/stores/projectsStore";
import {useProjects} from "~/composables/useProjects";
import {useBacklogStore} from "~/stores/backlogStore";
import Dropdown from 'primevue/dropdown';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import moment from "moment/moment";
import {useBacklog} from "~/composables/useBacklog";


const props = defineProps(['sprint'])
const toast = useToast();
const projectsStore = useProjectsStore();
const backlogStore = useBacklogStore();
const {editSprint} = useBacklog();

// declear project Form data
let projectData = null

const errorMsg = reactive({
  errorName: null,
  errorStartDate: null,
  errorDuration: null,
  errorEndDate: null,
  errorGoal: null,
})
const defaultDuration = ref({"name": props?.sprint?.duration, "value": props?.sprint?.duration});
const data = reactive({
  id: props?.sprint?.id,
  project_id: projectsStore?.project?.project_identify,
  name: props?.sprint?.name,
  duration: defaultDuration.value.value,
  start_date: moment(props?.sprint?.created_at).format("YYYY-MM-DD HH:mm:ss"),
  get end_date() {
    return moment(this.start_date).clone().add(parseInt(defaultDuration.value.value), 'week').format('YYYY-MM-DD HH:mm:ss');
  }, goal: null,
});

const durations = ref([
  {name: '1 Week', value: '1 Week'},
  {name: '2 Week', value: '2 Week'},
  {name: '3 Week', value: '3 Week'},
  {name: '4 Week', value: '4 Week'},
]);

const closeBtn = ref(null)

function handleEditSprint() {
  if (!data.name) {
    errorMsg.errorName = 'Feild is required';
    return;
  }
  errorMsg.errorName = null;
  submit();
}

const {
  submit,
  inProgress
} = useSubmit(() => editSprint(projectsStore?.project?.project_identify, props?.sprint?.id, data), {
  onSuccess: async (response) => {
    // Handle the response
    if (closeBtn.value) {
      closeBtn.value.click()
    }
    showToast('success', response.message)
  },
  onError: (error) => {
    showToast('error', error?.data?.message)
  }
});

function showToast(statusCode, msg) {
  const toastAttr = {
    position: "top-right",
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

</script>

<template>
  <div class="modal fade" id="kt_modal_edit_Sprint" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog mw-650px">
      <div class="modal-content">
        <div class="modal-header pb-0 border-0 justify-content-end">
          <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal" id="closeEditSprintModal"
               ref="closeBtn">
            <i class="ki-outline ki-cross fs-1"></i>
          </div>
        </div>
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
          <div class="text-center">
            <h1 class="mb-3">Edit '{{ props?.sprint?.name }}'</h1>
          </div>
          <form @submit.prevent="formHandle" class=" text-center" id="editSprintForm">
            <FormInput type="text" class="my-6" autocomplete="off" labelText="Sprint Name" name="name"
                       placeholder="Sprint Name"
                       v-model:input="data.name" :formDataError="errorMsg.errorName"/>
            <div class="my-6">
              <p class="text-start">Start Date</p>
              <VueDatePicker v-model="data.start_date" class="rounded p-1"/>
            </div>
            <div class="my-6">
              <p class="text-start">Duration</p>
              <Dropdown v-model="defaultDuration" modelValue="Week 1" :options="durations" optionLabel="name"
                        placeholder="Select a durations" class="w-100 p-2 rounded text-start"/>
            </div>
            <FormTextArea name="description" class="my-6" placeholder="sprint goal" labelText="sprint goal"
                          v-model:input="data.goal" :formDataError="errorMsg.errorGoal"/>
            <div>
              <p class="text-start">End date</p>
              <div class="d-flex justify-content-start align-items-center border p-4 rounded bg-light">
                <i class="fa-regular fa-calendar me-2"></i>
                {{ data.end_date }}
              </div>
            </div>

            <button :disabled="inProgress" @click="handleEditSprint" type="submit" class="btn btn-primary w-100 my-5">
              <span v-if="!inProgress" class="indicator-label">Edit</span>
              <icon v-else name="svg-spinners:ring-resize" size="25"/>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>