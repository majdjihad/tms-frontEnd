<template>
  <div class="app-content">
    <div class="card">
      <div class="card-header py-4">
        <div class="card-title d-flex flex-column">
          <div class="d-flex align-items-center position-relative mb-3">
            <span class="rounded skeleton" style="width: 120px; height: 25px"></span>
          </div>
          <div class="rounded skeleton" style="width: 70px; height: 20px">
          </div>
        </div>
        <div class="card-toolbar">
          <div class="d-flex justify-content-end gap-4">
            <p class="rounded skeleton" style="width: 75px; height: 22px">
            </p>
            <p class="rounded skeleton" style="width: 30px; height: 22px">
            </p>
          </div>
        </div>
      </div>
      <div class="card-body p-0 collapse show" id="collapseSprint">
        <div>
          <IssueCard v-for="issue in 2"/>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped>

</style>
<script setup lang="ts">
import IssueCard from "~/components/Skeleton/issueCard.vue";
</script>