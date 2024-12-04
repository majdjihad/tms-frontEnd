<script setup>
const props = defineProps(["member", "index"]);

const roleOptions = ref(["Admin"]);

const getColor = (index) => {
  const colorList = ["4A90E2", "9013FE", "F5A623", "D0021B", "F8E71C"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};
</script>

<template>
  <div
    v-if="member?.invite_status != 'wait'"
    class="d-flex flex-stack border-bottom border-gray-300 border-bottom-dashed py-2"
  >
    <!--begin::Details-->
    <div class="d-flex align-items-center">
      <!--begin::Avatar-->
      <div class="symbol symbol-35px symbol-circle">
        <img
          v-if="member?.user?.photo"
          alt="Pic"
          :src="member?.user?.url_photo"
        />
        <span
          v-else
          class="symbol-label text-inverse-warning fw-bold"
          :style="{ backgroundColor: getColor(member?.user?.id) }"
          >{{ member?.user?.name ? member?.user?.name[0] : "-" }}</span
        >
      </div>
      <!--end::Avatar-->
      <!--begin::Details-->
      <div class="ms-5">
        <div class="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
          {{ member?.user?.name || "---" }}
        </div>
        <div class="fw-semibold text-muted truncate" style="max-width: 300px">
          {{ member?.user?.email }}
        </div>
      </div>
      <!--end::Details-->
    </div>
    <!--end::Details-->
    <!--begin::Access menu-->
    <div class="ms-2 w-100px">
      <SelectMenu :options="roleOptions" disabled />
    </div>
    <!--end::Access menu-->
  </div>
</template>
