<script setup>
import moment from "moment/moment";
import { useBacklogStore } from "~/stores/backlogStore";

const props = defineProps(["history"]);
const backlogStore = useBacklogStore();
// define background color by user id
const getColor = (index) => {
  const colorList = ["dc3545", "d63384", "fd7e14", "ffc107", "20c997"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};
</script>

<template>
  <div class="comment-content p-3 pb-5 my-6 rounded-1 border-bottom">
    <div class="d-flex justify-content-between align-center">
      <p class="fs-5 mb-1 fw-semibold text-capitalize">
        <NuxtLink
          :to="`/profile/${history?.user?.identify_number}`"
          class="link-success"
          >@{{ history?.user?.name }}</NuxtLink
        >
        {{ history?.status }}
      </p>
      <div class="d-flex align-items-center overflow-hidden">
        <!--        <img v-if="history?.user?.photo"-->
        <!--             :src="history?.user?.url_photo"-->
        <!--             :alt="history?.user?.name" class="w-30px h-30px rounded-circle"/>-->
        <!--        <span v-else class="symbol-label text-inverse-warning fw-bold fs-2 d-flex justify-content-center align-items-center w-30px h-30px rounded-circle"-->
        <!--              :style="{ backgroundColor: getColor(history?.user?.id) }">{{-->
        <!--            history?.user?.name ? history?.user?.name[0].toUpperCase() : '-'-->
        <!--          }}</span>-->
        <div class="d-flex justify-content-between align-center">
          <i class="fa-solid fa-calendar-days fs-4 d-flex align-center" />
          <span class="text-gray-600 ms-2 fs-6">{{
            moment(history?.updated_at).fromNow()
          }}</span>
        </div>
      </div>
    </div>
    <div>
      <div
        v-if="history?.type === 'assignee'"
        class="fs-6 d-flex align-items-center"
      >
        <NuxtLink
          :to="`/profile/${history?.assign_from_team_member?.user?.identify_number}`"
          v-if="history?.assign_from_team_member?.user?.name"
        >
          <!--          <img v-if="history?.assign_from_team_member?.user?.photo"-->
          <!--               :src="history?.assign_from_team_member?.user?.url_photo"-->
          <!--               :alt="history?.assign_from_team_member?.user?.name" class="w-25px h-25px rounded-circle"/>-->
          <!--          <span v-else class="symbol-label text-inverse-warning fw-bold w-25px h-25px rounded-circle"-->
          <!--                :style="{ backgroundColor: getColor(history?.assign_from_team_member?.user?.id) }">{{-->
          <!--              history?.assign_from_team_member?.user?.name ? history?.assign_from_team_member?.user?.name[0].toUpperCase() : '-'-->
          <!--            }}</span>-->
          @ {{ history?.assign_from_team_member?.user?.name }}
        </NuxtLink>
        <span v-else class="text-gray-500">Unassignee</span>
        <i class="fa-solid fa-arrow-right fs-4 mx-4"></i>
        <NuxtLink
          :to="`/profile/${history?.assign_to_team_member?.user?.identify_number}`"
          v-if="history?.assign_to_team_member?.user?.name"
        >
          <!--            <img v-if="history?.assign_to_team_member?.user?.photo"-->
          <!--                 :src="history?.assign_to_team_member?.user?.url_photo"-->
          <!--                 :alt="history?.assign_to_team_member?.user?.name" class="w-25px h-25px rounded-circle"/>-->
          <!--            <span v-else class="symbol-label text-inverse-warning fw-bold w-25px h-25px rounded-circle"-->
          <!--                  :style="{ backgroundColor: getColor(history?.assign_to_team_member?.user?.id) }">{{-->
          <!--                history?.assign_to_team_member?.user?.name ? history?.assign_to_team_member?.user?.name[0].toUpperCase() : '-'-->
          <!--              }}</span>-->
          @{{ history?.assign_to_team_member?.user?.name }}
        </NuxtLink>
        <span v-else class="text-gray-500">Unassignee</span>
      </div>
      <div
        v-if="history?.type === 'estimated_at'"
        class="fs-6 d-flex align-items-center"
      >
        <div class="d-flex align-items-center gap-2">
          <span class="badge fs-7 badge-light-dark"
            >{{ history?.old_estimated_at[0] }} d</span
          >
          <span class="badge fs-7 badge-light-primary"
            >{{ history?.old_estimated_at[1] }} h
          </span>
          <span class="badge fs-7 badge-light-warning"
            >{{ history?.old_estimated_at[2] }} m
          </span>
        </div>
        <i class="fa-solid fa-arrow-right fs-4 mx-4"></i>
        <div class="d-flex align-items-center gap-2">
          <span class="badge fs-7 badge-light-dark"
            >{{ history?.new_estimated_at[0] }} d</span
          >
          <span class="badge fs-7 badge-light-primary"
            >{{ history?.new_estimated_at[1] }} h
          </span>
          <span class="badge fs-7 badge-light-warning"
            >{{ history?.new_estimated_at[2] }} m
          </span>
        </div>
      </div>
      <div
        v-if="history?.type === 'status'"
        class="fs-6 d-flex align-items-center"
      >
        <span
          class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap"
          :class="
            history?.old_data === 'TO DO'
              ? 'bg-light-active'
              : history?.old_data === 'DONE'
              ? 'bg-light-primary text-primary'
              : 'bg-light-success text-success'
          "
          >{{ history?.old_data }}</span
        >
        <i class="fa-solid fa-arrow-right fs-4 mx-4"></i>
        <span
          class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap"
          :class="
            history?.new_data === 'TO DO'
              ? 'bg-light-active'
              : history?.new_data === 'DONE'
              ? 'bg-light-primary text-primary'
              : 'bg-light-success text-success'
          "
          >{{ history?.new_data }}</span
        >
      </div>
    </div>
    <div
      v-if="history?.type === 'description'"
      v-html="history?.new_data"
      class="p-4 mt-5 fs-6 rounded-1 hover-bg-light"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
</style>