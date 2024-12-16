<script setup>
import moment from "moment";

const props = defineProps(["history"]);

// declear get class for history by icon
function getClass(action) {
  return action === "create"
    ? "pi pi-sparkles bg-primary"
    : action === "delete"
    ? "pi pi-trash bg-danger"
    : action === "edit"
    ? "pi pi-file-edit bg-secondary"
    : action === "invite"
    ? "pi pi-user-plus bg-success"
    : action === "remove"
    ? "pi pi-user-minus bg-danger"
    : "";
}
</script>
<template>
  <div class="history-item">
    <!-- Icon -->
    <div class="text-gray-600 fs-5 mb-4 date">
      <i class="pi pi-calendar fs-5 me-2"></i>
      <span
        class="cursor-pointer"
        v-tooltip.top="{
          value: moment(history.created_at).format('MMM D, h:mm A'),
        }"
        >{{ moment(history.created_at).fromNow() }}</span
      >
    </div>
    <div class="timeline-icon">
      <i
        :class="[
          getClass(history?.action),
          'fs-3 p-3 rounded-circle',
          {
            'text-emerald-500': history.action === 'create',
            'text-red-500': history.action === 'delete',
            'text-blue-500': history.action === 'edit',
          },
        ]"
      ></i>
    </div>

    <!-- Content -->
    <div class="history-content">
      <span
        v-if="history.action === 'create'"
        class="bg-light-primary text-primary text-end p-1 rounded"
        >{{ history.action }}</span
      >
      <span
        v-else-if="history.action === 'edit'"
        class="bg-light-secondary text-secondary text-end p-1 rounded"
        >{{ history.action }}</span
      >
      <span
        v-else-if="history.action === 'invite'"
        class="bg-light-success text-success text-end p-1 rounded"
        >{{ history.action }}</span
      >
      <span v-else class="bg-light-danger text-danger text-end p-1 rounded">{{
        history.action
      }}</span>
      <div class="flex items-center gap-2 text-sm">
        <span
          class="font-medium text-success fs-4 cursor-pointer"
          v-tooltip.top="{ value: history.user.email }"
          >@{{ history.user.name }}</span
        >
        <span class="fs-5"> a {{ history.status }}</span>
        <p class="fs-5">from {{ history.project.name }}</p>
        <nuxtLink :to="`/projects/${history.project.project_identify}/backlog`"
          >Project link</nuxtLink
        >
      </div>

      <div class="text-sm text-indigo-500 fs-5 mt-0.5">
        <template v-if="history.type === 'sprint'">
          Sprint Title: {{ history.sprint_which_received_action?.name }}
        </template>
        <template v-if="history.type === 'Issue'">
          Issue Title: {{ history.issue?.title }}
          <span class="text-gray-400">({{ history.issue?.key }})</span>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped>
.history-item {
  position: relative;
  padding-bottom: 1.5rem;
  padding-left: 1rem;
}

.timeline-dot {
  position: absolute;
  left: -23px;
  top: 4px;
  width: 12px;
  height: 12px;
  background: #e2e8f0;
  border-radius: 50%;
  z-index: 2;
}

.timeline-icon {
  position: absolute;
  color: white;
  left: -34px;
  top: -4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.date {
  position: absolute;
  left: -150px;
  top: -4px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.history-content {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-left: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.history-content:hover {
  background-color: var(--bs-app-bg-color);
}
</style>