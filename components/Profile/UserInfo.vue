<script setup>
import { useProfileStore } from "~/stores/profileStore";

const user = useUser();
const profileStore = useProfileStore();

</script>
<template>
  <div class="profileInfo">
    <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <div class="card-header">
        <div class="card-title m-0">
          <p
            v-if="!profileStore?.profileInfo?.user"
            class="rounded skeleton skeleton-title w-150px h-25px"
          ></p>
          <h3 v-else class="fw-bold m-0">Profile Details</h3>
        </div>
      </div>
      <div class="card-body p-9">
        <div v-if="!profileStore?.profileInfo?.user">
          <div class="mb-7" v-for="index in 6" :key="index">
            <label
              class="rounded skeleton skeleton-title w-70px h-25px"
            ></label>
            <div
              class="col-lg-8 rounded skeleton skeleton-title w-150px h-25px"
            ></div>
          </div>
        </div>
        <div v-else>
          <div class="row mb-7">
            <label class="col-lg-4 fw-semibold text-muted">Full Name</label>
            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-gray-800">{{
                profileStore?.profileInfo?.user?.name
              }}</span>
            </div>
          </div>
          <div class="row mb-7">
            <label class="col-lg-4 fw-semibold text-muted">Email</label>
            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-gray-800">{{
                profileStore?.profileInfo?.user?.email
              }}</span>
            </div>
          </div>
          <div class="row mb-7">
            <label class="col-lg-4 fw-semibold text-muted">Job Title</label>
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">{{
                profileStore?.profileInfo?.user?.job_title || "---"
              }}</span>
            </div>
          </div>
          <div class="row mb-7">
            <label class="col-lg-4 fw-semibold text-muted">Phone</label>
            <div class="col-lg-8 d-flex align-items-center">
              <span class="fw-semibold text-gray-800 fs-6">{{
                profileStore?.profileInfo?.user?.phone || "---"
              }}</span>
            </div>
          </div>
          <div class="row">
            <label class="col-lg-4 fw-semibold text-muted">Location</label>
            <div class="col-lg-8">
              <span class="fw-semibold text-gray-800 fs-6">{{
                profileStore?.profileInfo?.user?.location || "---"
              }}</span>
            </div>
          </div>
          <div class="row mt-15">
            <label class="col-lg-4 fw-semibold text-muted">Skills</label>
            <div class="col-lg-8">
              <div class="fw-semibold fs-6 text-gray-800 mt-3">
                <span
                  class="py-2 px-4 me-1 bg-light-success rounded-3"
                  v-for="(skill, index) in profileStore?.profileInfo?.user
                    ?.skills"
                  :key="index"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>