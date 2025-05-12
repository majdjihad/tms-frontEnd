<script setup>
import { useMember } from "~/composables/useMember";
import { useSubmit } from "~/composables/useSubmit";
import { useProjectsStore } from "~/stores/projectsStore";
import { showToast } from "~/composables/useToast";
import { useUser } from "~/composables/useAuth";

const user = useUser();
const route = useRoute();
const props = defineProps(["member", "index"]);
const projectsStore = useProjectsStore();
const { removeMember } = useMember();
const handleDeleteMember = () => {
  Swal.fire({
    html: `Are you sure you want to remove <strong>${
      props.member?.user?.name || props.member?.user?.email
    }</strong>,
             from your team members?`,
    icon: "warning",
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: "Yes, remove!",
    cancelButtonText: "No, cancel",
    showLoaderOnConfirm: true,
    customClass: {
      confirmButton: "btn fw-bold btn-danger",
      cancelButton: "btn fw-bold btn-active-light-primary",
    },
    preConfirm: () => {
      submit();
    },
  });
};

const { submit } = useSubmit(
  () => {
    return removeMember(
      route.params.id,
      props.member?.id
    );
  },
  {
    onSuccess: (response) => {
      // Handle the response
      projectsStore?.getProject(route?.params?.id);
      showToast("success", response.message);
    },
    onError: (error) => {
      showToast("error", error.data.message);
    },
  }
);

// define background color by user id
const getColor = (index) => {
  const colorList = ["4A90E2", "9013FE", "F5A623", "D0021B", "F8E71C"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};
</script>

<template>
  <tr
    class="text-start px-2 min-w-200px"
    v-if="user?.id === projectsStore?.project?.user_id"
  >
    <NuxtLink
      :to="`/profile/${member?.user?.identify_number}`"
      class="d-flex align-items-center gap-3 w-auto px-2"
    >
      <div class="symbol symbol-circle symbol-30px overflow-hidden">
        <img
          v-if="member?.user?.photo"
          :src="member?.user?.url_photo"
          :alt="member?.user?.name"
          class="w-100"
        />
        <span
          v-else
          class="symbol-label text-inverse-warning fw-bold"
          :style="{ backgroundColor: getColor(member?.user?.id) }"
          >{{
            member?.user?.name ? member?.user?.name[0].toUpperCase() : "-"
          }}</span
        >
      </div>
      <div class="truncate" style="max-width: 100px">
        {{ member?.user?.name || "---" }}
      </div>
    </NuxtLink>
    <td class="truncate" style="max-width: 100px">
      {{ member?.user?.email }}
    </td>
    <td>{{ member?.role?.name }}</td>
    <td>
      <div
        class="badge fw-bold text-uppercase"
        :class="{
          'badge-light-warning': member?.invite_status === 'wait',
          'badge-light-primary': member?.invite_status === 'accept',
          'badge-light-danger': member?.invite_status === 'reject',
        }"
      >
        {{ member?.invite_status }}
      </div>
    </td>
    <td
      v-if="member?.user?.id !== projectsStore?.project?.user_id"
      @click="handleDeleteMember"
      class="text-end px-2"
    >
      <div
        class="btn btn-light-danger btn-flex btn-center btn-sm cursor-pointer"
      >
        <div class="d-flex align-items-center gap-1">
          <i class="ki-duotone ki-trash fs-5">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
            <span class="path4"></span>
            <span class="path5"></span>
          </i>
          <span>Remove</span>
        </div>
      </div>
    </td>
    <td v-else class="text-end px-2">
      <div class="btn">Owner</div>
    </td>
  </tr>
  <tr
    class="text-start cursor-pointer px-2 min-w-200px"
    v-else-if="
      projectsStore?.project?.team_members?.filter(
        (e) => e.user_id === user?.id && e.role.key === 'admin'
      )
    "
  >
    <NuxtLink
      :to="`/profile/${member?.user?.identify_number}`"
      class="d-flex align-items-center gap-3 w-auto px-2"
    >
      <div class="symbol symbol-circle symbol-40px overflow-hidden">
        <img
          v-if="member?.user?.photo"
          :src="member?.user?.url_photo"
          :alt="member?.user?.name"
          class="w-100"
        />
        <span
          v-else
          class="symbol-label text-inverse-warning fs-1"
          :style="{ backgroundColor: getColor(member?.user?.id) }"
          >{{
            member?.user?.name ? member?.user?.name[0].toUpperCase() : "-"
          }}</span
        >
      </div>
      <div class="truncate" style="max-width: 100px">
        {{ member?.user?.name || "---" }}
      </div>
    </NuxtLink>

    <td class="truncate" style="max-width: 100px">
      {{ member?.user?.email }}
    </td>
    <td>{{ member?.role?.name }}</td>
    <td>
      <div
        class="badge fw-bold text-uppercase"
        :class="{
          'badge-light-warning': member?.invite_status === 'wait',
          'badge-light-primary': member?.invite_status === 'accept',
          'badge-light-danger': member?.invite_status === 'reject',
        }"
      >
        {{ member?.invite_status }}
      </div>
    </td>
    <td
      v-if="member?.role?.key !== 'admin' && member?.role?.key !== 'owner'"
      @click="handleDeleteMember"
      class="text-end px-2"
    >
      <div
        class="btn btn-light-danger btn-flex btn-center btn-sm cursor-pointer"
      >
        <div class="d-flex align-items-center gap-1">
          <i class="ki-duotone ki-trash fs-5">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
            <span class="path4"></span>
            <span class="path5"></span>
          </i>
          <span>Remove</span>
        </div>
      </div>
    </td>
    <td v-else class="text-end px-2">
      <div class="btn">{{ member?.role?.key }}</div>
    </td>
  </tr>
</template>

<style>
.custom-button {
  display: inline-block;

  border-radius: 7px;
  padding: calc(0.775rem + 1px) 1.28rem;
  line-height: 15px;
  font-size: 12px;
  font-weight: 500;
}

.custom-color-owner {
  background-color: #eefbec;
  color: #50cd89;
}

.custom-color-owner > div > i {
  color: #50cd89;
}

.custom-color-info {
  background-color: var(--bs-info-light);
  color: var(--bs-info);
}

.custom-color-info > div > i {
  color: var(--bs-info);
}
</style>