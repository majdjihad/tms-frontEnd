<script setup>
import { useUser } from "~/composables/useAuth";
import { useBacklogStore } from "~/stores/backlogStore";
import { useProjectsStore } from "~/stores/projectsStore";

useHead({
  title: "Backlog",
});
definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const projectId = ref(route?.params?.id);
const user = useUser();
const backlogStore = useBacklogStore();
const projectStore = useProjectsStore();

// before render page 
onMounted(() => {
    backlogStore?.getBacklogProject(projectId.value);
});
// declear selected issues array for select issue
const selectedIssue = ref([]);

// Add computed property to check permissions
const hasManagePermission = computed(() => {
  const isOwner = user.value?.id === projectStore?.project?.user_id;
  const isAdmin = projectStore?.project?.team_members?.some(
    (member) =>
      member.user_id === user.value?.id &&
      member.invite_status === "accept" &&
      ["admin", "owner"].includes(member.role.key)
  );
  return isOwner || isAdmin;
});


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
            :can-manage="hasManagePermission"
            v-for="(sprint, index) in backlogStore?.sprintsProject"
            :selectedIssue="selectedIssue"
            @update:selectedIssue="updateSelectedIssue"
            :key="index"
            :sprint="sprint"
          />
          <ProjectCompBacklog
            :can-manage="hasManagePermission"
            :selectedIssue="selectedIssue"
            @update:selectedIssue="updateSelectedIssue"
          />
        </div>
      </div>
    </div>
  </div>
</template>