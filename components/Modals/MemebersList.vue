<script setup>
import { useProjectsStore } from "~/stores/projectsStore";

const projectsStore = useProjectsStore();

const getColor = (index) => {
  const colorList = ["4A90E2", "9013FE", "F5A623", "D0021B", "F8E71C"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};
</script>

<template>
  <div
    class="modal fade"
    id="kt_modal_view_users"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog mw-650px">
      <div class="modal-content">
        <div class="modal-header pb-0 border-0 justify-content-end">
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <i class="ki-outline ki-cross fs-1"> </i>
          </div>
        </div>
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
          <div class="text-center mb-13">
            <h1 class="mb-3">Team Members</h1>
          </div>
          <div class="mb-15">
            <div class="mh-375px scroll-y me-n7 pe-7">
              <div
                v-for="(member, index) in projectsStore?.project?.team_members"
                :key="index"
              >
                <NuxtLink
                :to="`/profile/${member?.user?.identify_number}`"
                  v-if="member?.invite_status != 'wait'"
                  class="d-flex flex-stack px-3 py-5 border-bottom border-gray-300 border-bottom-dashed hover-bg-light"
                >
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-35px symbol-circle">
                      <div
                        v-if="member.invite_status === 'accept'"
                        class="symbol symbol-35px symbol-circle cursor-pointer"
                      >
                        <img
                          v-if="member?.user?.photo"
                          :alt="member?.user?.name"
                          :src="member?.user?.url_photo"
                        />
                        <span
                          v-else
                          class="symbol-label text-inverse-warning fs-2 hover-bg-light"
                          :style="{
                            backgroundColor: getColor(member?.user?.id),
                          }"
                          >{{
                            member?.user?.name
                              ? member?.user?.name[0].toUpperCase()
                              : "-"
                          }}</span
                        >
                      </div>
                    </div>
                    <!--end::Avatar-->
                    <!--begin::Details-->
                    <div class="ms-6">
                      <!--begin::Name-->
                      <div
                        class="d-flex align-items-center fs-5 fw-bold text-dark cursor-pointer"
                      >
                        {{ member?.user?.name }}
                      </div>
                      <div class="fw-semibold text-muted">
                        {{ member?.user?.email }}
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>