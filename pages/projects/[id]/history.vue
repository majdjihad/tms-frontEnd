<script setup>
// Import required store and composable for project management
import { useProjectsStore } from "~/stores/projectsStore";
import { useProjects } from "~/composables/useProjects";
import { showToast } from "~/composables/useToast";

// Set page metadata with title
useHead({
  title: "History",
});

// Configure authentication middleware for this page
definePageMeta({
  middleware: ["auth"],
});

// Initialize project store and composables
const projectStore = useProjectsStore();
const { projectHistory } = useProjects();
const route = useRoute();
const projectId = ref(route?.params?.id);

// Fetch project history data when component is mounted
onMounted(async () => {
  if (!projectStore.history) {
    try {
      // Attempt to fetch project history for the current project
      const response = await projectHistory(projectId.value, 1);
      // Update store with fetched history data
      projectStore.history = response.projectHistory;
    } catch (error) {
      // Redirect to projects page if history fetch fails
      showToast("error", error.data.message);
      return navigateTo(`/projects`, { replace: true });
    }
  }
});
</script>

<template>
  <!-- Main container with padding and styling -->
  <div class="app-container container-xxl">
    <div class="app-main ps-20 pt-20">
      <!-- History section with background and rounded corners -->
      <div class="relative bg-slate-50 rounded-lg p-6 history">
        <!-- Render history timeline if data is available -->
        <div v-if="projectStore.history" class="history-timeline">
          <HistoryTimeline
            v-for="history in projectStore.history"
            :key="history.id"
            :history="history"
          />
        </div>
        <!-- Show skeleton loading state while data is being fetched -->
        <div v-else class="history-timeline">
          <SkeletonHistoryTimeline v-for="index in 10" :key="index"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Timeline container styles */
.history-timeline {
  position: relative;
  padding-left: 2rem;
}

/* History container padding */
.history {
  padding-left: 150px !important;
}

/* Timeline vertical line decoration */
.history-timeline::before {
  content: "";
  position: absolute;
  left: 4px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
  z-index: 1;
}
</style>