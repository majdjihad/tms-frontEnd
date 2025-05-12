<script setup>
import { useBacklogStore } from "~/stores/backlogStore";

useHead({
  title: "Backlog",
});
definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const projectId = ref(route?.params?.id);
const backlogStore = useBacklogStore();

// before render page 
onMounted(() => {
    backlogStore?.getBacklogProject(projectId.value);
});
// declear selected issues array for select issue
const selectedIssue = ref([]);

// Function to update the selectedIssue value when emitted from SprintComponent
const updateSelectedIssue = (value) => {
  selectedIssue.value = [];
  selectedIssue.value = value;
};
</script>

<template>
  <div class="app-container container-xxl">
    <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div class="d-flex flex-column flex-column-fluid">
        <div v-if="!backlogStore?.sprintsProject">
          <SkeletonSprintCard v-for="index in 3" :key="index" />
        </div>
        <div v-else>
          <ProjectCompSprint
            v-for="(sprint, index) in backlogStore?.sprintsProject"
            :selectedIssue="selectedIssue"
            @update:selectedIssue="updateSelectedIssue"
            :key="index"
            :sprint="sprint"
          />
          <ProjectCompBacklog
            :selectedIssue="selectedIssue"
            @update:selectedIssue="updateSelectedIssue"
          />
        </div>
      </div>
    </div>
  </div>
</template>