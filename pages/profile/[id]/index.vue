<script setup>
import { useUser } from "~/composables/useAuth";
import { useProjectsStore } from "~/stores/projectsStore";
import moment from "moment";
import { useProfileStore } from "~/stores/profileStore";

definePageMeta({
  middleware: ["auth"],
});
const user = useUser();
useHead({
  title: user?.value?.name,
});
const projectsStore = useProjectsStore();
const profileStore = useProfileStore();
const sectionActive = ref("Overview");
const changeActive = (section) => {
  if (profileStore?.profileInfo?.user) {
    sectionActive.value = section;
  }
};

if (projectsStore?.changeStatus) {
  projectsStore?.getAllProjects();
}
if (profileStore?.changeStatus) {
  profileStore?.getProfileInfo(user?.value?.identify_number);
}
</script>
<template>
  <div class="d-flex flex-column flex-root app-root">
    <div class="app-page flex-column flex-column-fluid">
      <div class="app-wrapper flex-column flex-row-fluid">
        <div class="app-container container-xxl">
          <div class="app-main flex-column flex-row-fluid">
            <div class="d-flex flex-column flex-column-fluid">
              <div id="kt_app_content" class="app-content flex-column-fluid">
                <div class="card mb-5 mb-xl-10">
                  <div class="card-body pt-9 pb-0">
                    <div class="d-flex flex-wrap flex-sm-nowrap">
                      <div class="me-7 mb-4">
                        <div
                          class="symbol symbol-160px symbol-lg-175px symbol-fixed position-relative"
                        >
                          <img
                            v-if="profileStore?.profileInfo?.user?.url_photo"
                            :alt="profileStore?.profileInfo?.user?.name"
                            :src="profileStore?.profileInfo?.user?.url_photo"
                          />
                          <img
                            v-else
                            :alt="user.name"
                            src="~/assets/media/avatars/blank.png"
                          />
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <div
                          class="d-flex justify-content-between align-items-start flex-wrap mb-2"
                        >
                          <div class="d-flex flex-column">
                            <div
                              class="d-flex align-items-center mb-2"
                              :class="[
                                !profileStore?.profileInfo?.user?.name
                                  ? 'rounded Skeleton Skeleton-title w-125px h-20px'
                                  : '',
                              ]"
                            >
                              <span class="text-gray-900 fs-2 fw-bold me-1">{{
                                profileStore?.profileInfo?.user?.name
                              }}</span>
                            </div>
                            <div
                              class="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2"
                            >
                              <span
                                class="d-flex align-items-center text-gray-400 mb-2"
                                :class="[
                                  !profileStore?.profileInfo?.user?.email
                                    ? 'rounded Skeleton Skeleton-title w-100px h-20px z-index-3'
                                    : '',
                                ]"
                              >
                                <i
                                  v-if="profileStore?.profileInfo?.user?.email"
                                  class="ki-outline ki-sms fs-4 me-1"
                                ></i>
                                <span>{{
                                  profileStore?.profileInfo?.user?.email
                                }}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="d-flex flex-wrap flex-stack">
                          <div class="d-flex flex-column flex-grow-1 pe-8">
                            <div class="d-flex flex-wrap align-items-center">
                              <div
                                v-if="!profileStore?.profileInfo?.Projects"
                                class="rounded skeleton skeleton-title w-125px h-70px ms-2 me-2"
                              ></div>
                              <div
                                v-else
                                class="border border-gray-300 border-dashed rounded min-w-100px py-3 px-4 me-6 mb-3 text-center"
                              >
                                <div class="fs-2 fw-bold">
                                  {{ profileStore?.profileInfo?.Projects }}
                                </div>
                                <div class="fw-semibold fs-6 text-gray-400">
                                  Projects
                                </div>
                              </div>
                              <div
                                v-if="!profileStore?.profileInfo?.Projects"
                                class="rounded skeleton skeleton-title w-125px h-70px ms-2 me-2"
                              ></div>
                              <div
                                v-else
                                class="border border-gray-300 border-dashed rounded min-w-100px py-3 px-4 me-6 mb-3 text-center"
                              >
                                <div class="fs-2 fw-bold">
                                  {{ profileStore?.profileInfo?.ActiveIssues }}
                                </div>
                                <div class="fw-semibold fs-6 text-gray-400">
                                  Opened Issues
                                </div>
                              </div>
                              <div
                                v-if="!profileStore?.profileInfo?.Projects"
                                class="rounded skeleton skeleton-title w-125px h-70px ms-2 me-2"
                              ></div>
                              <div
                                v-else
                                class="border border-gray-300 border-dashed rounded min-w-100px py-3 px-4 me-6 mb-3 text-center"
                              >
                                <div class="fs-2 fw-bold">
                                  {{
                                    profileStore?.profileInfo?.issuesAssignToMe
                                  }}
                                </div>
                                <div class="fw-semibold fs-6 text-gray-400">
                                  Assigned to me
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            v-if="!profileStore?.profileInfo?.Projects"
                            class="rounded skeleton skeleton-title w-70px h-20px"
                          ></div>
                          <div v-else class="mt-3">
                            <span
                              class="d-block py-2 px-4 bg-light-success rounded-1 fw-semibold fs-7 text-success"
                              >{{
                                moment(
                                  profileStore?.profileInfo?.user?.created_at
                                ).format("ll")
                              }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul
                      v-if="!profileStore?.profileInfo?.user"
                      class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold"
                    >
                      <li class="nav-item mt-2">
                        <p
                          v-if="profileStore?.profileInfo?.user"
                          class="rounded skeleton skeleton-title w-70px h-25px m-3"
                        ></p>
                      </li>
                      <li class="nav-item mt-2">
                        <p
                          v-if="profileStore?.profileInfo?.user"
                          class="rounded skeleton skeleton-title w-70px h-25px m-3"
                        ></p>
                      </li>
                      <li class="nav-item mt-2">
                        <p
                          v-if="profileStore?.profileInfo?.user"
                          class="rounded skeleton skeleton-title w-70px h-25px m-3"
                        ></p>
                      </li>
                    </ul>
                    <ul
                      v-else
                      class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold"
                    >
                      <li class="nav-item mt-2">
                        <span
                          @click="changeActive('Overview')"
                          :class="{
                            active: sectionActive == 'Overview',
                            'nav-link cursor-pointer':
                              profileStore?.profileInfo?.user,
                          }"
                          class="text-active-primary text-hover-primary ms-0 me-10 py-5 overview"
                          >Overview</span
                        >
                      </li>
                      <li class="nav-item mt-2">
                        <span
                          @click="changeActive('Setting')"
                          :class="{
                            active: sectionActive == 'Setting',
                            'nav-link cursor-pointer':
                              profileStore?.profileInfo?.user,
                          }"
                          class="text-active-primary text-hover-primary ms-0 me-10 py-5 setting"
                          >Setting</span
                        >
                      </li>
                      <li class="nav-item mt-2">
                        <span
                          @click="changeActive('Reset Password')"
                          :class="{
                            active: sectionActive == 'Reset Password',
                            'nav-link cursor-pointer':
                              profileStore?.profileInfo?.user,
                          }"
                          class="text-active-primary text-hover-primary ms-0 me-10 py-5 reset-password"
                          >Reset Password</span
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <profileUserInfo v-if="sectionActive === 'Overview'" />
                <profileUserEdit v-else-if="sectionActive === 'Setting'" />
                <profileResetPassword
                  v-else-if="sectionActive === 'Reset Password'"
                />
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