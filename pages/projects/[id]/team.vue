<script setup>
import { useProjectsStore } from "~/stores/projectsStore";
import { useUser } from "~/composables/useAuth";

useHead({
  title: "Team",
});
definePageMeta({
  middleware: ["auth"],
});
const user = useUser();
const projectsStore = useProjectsStore();
if (projectsStore?.changeStatus) {
  projectsStore?.getAllProjects();
}
</script>

<template>
  <div class="app-container container-xxl">
    <div class="app-main flex-column flex-row-fluid">
      <div class="d-flex flex-column flex-column-fluid">
        <div class="app-content flex-column-fluid">
          <div class="card">
            <div class="card-header border-0 pt-3">
              <div class="card-title">
                <div class="d-flex align-items-center position-relative my-1">
                  <h1>Team Members</h1>
                </div>
              </div>
              <div
                class="card-toolbar"
                v-if="user?.id === projectsStore?.project?.user_id"
              >
                <div
                  class="d-flex justify-content-end"
                  data-kt-user-table-toolbar="base"
                >
                  <button
                    type="button"
                    class="d-flex align-items-center justify-content-center gap-2 btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_invite_friends"
                  >
                  <Icon name="mdi:account-multiple-plus-outline" size="20" />
                  <span>Invite</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body py-4 custom-table-style">
              <table class="table align-middle table-row-dashed fs-6 gy-5">
                <thead>
                  <tr class="text-start fw-bold fs-7 text-uppercase gs-0">
                    <th class="min-w-150px">Name</th>
                    <th class="min-w-200px">Email</th>
                    <th class="min-w-125px">Role</th>
                    <th class="min-w-40px">Status</th>
                    <th class="min-w-40px text-end px-6">Actions</th>
                  </tr>
                </thead>
                <tbody v-if="!projectsStore?.project?.team_members">
                  <SkeletonMemberRow v-for="m in 3" :key="m" />
                </tbody>
                <tbody v-else class="text-gray-600 fw-semibold">
                  <ProjectCompMemberInfo
                    v-for="(
                      member, index
                    ) in projectsStore?.project?.team_members.filter(
                      (m) => m.invite_status === 'accept'
                    )"
                    :key="index"
                    :member="member"
                    :index="index"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>