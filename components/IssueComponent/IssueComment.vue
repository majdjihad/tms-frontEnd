<script setup>
import moment from "moment";
import { useBacklogStore } from "~/stores/backlogStore";
import { useToast } from "vue-toastification";
import { useProjectsStore } from "~/stores/projectsStore";
import Editor from "primevue/editor";
import TieredMenu from "primevue/tieredmenu";

const props = defineProps(["comment"]);
const { editComment, deleteComment } = useBacklog();
const backlogStore = useBacklogStore();
const projectsStore = useProjectsStore();
const toast = useToast();

// define delete comment function
const handleDeleteComment = () => {
  Swal.fire({
    html: `Are you sure you want to delete <strong><div class="truncate lh-lg" >${props?.comment?.user?.name} comment</div></strong>`,
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
    preConfirm: async () => {
      await deleteComment(
        projectsStore?.project?.project_identify,
        props?.comment?.issue_id,
        props?.comment?.id
      );
      await backlogStore?.getIssueComments(
        projectsStore?.project?.project_identify,
        backlogStore?.issueInfoArray?.id
      );
    },
  });
};
// define action comment menu
const commentMenuOpen = ref(false);
const items = ref([
  {
    label: "Edit",
    icon: "fa-regular fa-pen-to-square",
    command: () => {
      toggleOpenComment();
    },
  },
  {
    label: "Delete",
    icon: "fa-regular fa-trash-can",
    command: () => {
      handleDeleteComment();
    },
  },
]);

// define toggle action comment menu
const commentMenuToggle = async () => {
  commentMenuOpen.value = !commentMenuOpen.value;
};

// define close action Comment menu
const closeCommentMenu = () => {
  commentMenuOpen.value = false;
};

// Define Comment function
const editCommentStatus = ref(false);
const commentValue = ref(null);
const commentIssueLoader = ref(false);
const toggleOpenComment = () => {
  if (commentValue.value !== props?.comment?.content) {
    commentValue.value = props?.comment?.content;
  }
  editCommentStatus.value = true;
};
const handleEditComment = async () => {
  commentIssueLoader.value = true;
  if (commentValue.value !== props?.comment?.content) {
    try {
      await editComment(
        projectsStore?.project?.project_identify,
        props?.comment?.issue_id,
        props?.comment?.id,
        { content: commentValue.value, mentionList: [] }
      );
      await backlogStore?.getIssueComments(
        projectsStore?.project?.project_identify,
        backlogStore?.issueInfoArray?.id
      );
    } catch (error) {
      await showToast("error", error.data.message);
    }
  }
  commentMenuToggle();
  commentIssueLoader.value = false;
  editCommentStatus.value = false;
};
const getColor = (index) => {
  const colorList = ["dc3545", "d63384", "fd7e14", "ffc107", "20c997"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};

function showToast(statusCode, msg) {
  const toastAttr = {
    position: "bottom-right",
    timeout: 5000,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: true,
    rtl: false,
  };
  if (statusCode === "success") {
    toast.success(msg, {
      ...toastAttr,
    });
  } else if (statusCode === "error") {
    toast.error(msg, {
      ...toastAttr,
    });
  }
}
</script>

<template>
  <div>
    <div
      v-if="!editCommentStatus"
      class="comment-content row align-baseline py-3 my-4 rounded-1 overflow-hidden"
    >
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center overflow-hidden cursor-pointer">
          <img
            v-if="comment?.user?.photo"
            :src="comment?.user?.url_photo"
            :alt="comment?.user?.name"
            class="w-35px h-35px rounded-circle"
          />
          <span
            v-else
            class="symbol-label text-inverse-warning w-30px h-30px fs-1 d-flex justify-content-center align-items-center rounded-circle"
            :style="{ backgroundColor: getColor(comment?.user?.id) }"
            >{{
              comment?.user?.name ? comment?.user?.name[0].toUpperCase() : "-"
            }}</span
          >
          <div class="d-flex flex-column ms-2">
            <span class="fs-4 fw-semibold">{{ comment?.user?.name }}</span>
            <span class="fs-8 text-gray-500">{{
              moment(comment?.updated_at).fromNow()
            }}</span>
          </div>
        </div>
        <div class="position-relative">
          <div
            class="py-1 px-3 rounded-1 fw-bold fs-8 text-uppercase text-nowrap"
          >
            <div
              v-click-outside="closeCommentMenu"
              @click="commentMenuToggle"
              class="btn btn-light p-1 rounded d-flex justify-content-center align-items-center overflow-hidden"
            >
              <i
                class="ki-solid ki-dots-horizontal p-0 fs-1 cursor-pointer fs-2x"
              ></i>
            </div>
          </div>
          <div
            v-if="commentMenuOpen"
            class="statusesMenuWrapper z-1 position-absolute end-0 w-auto"
          >
            <TieredMenu v-if="commentMenuOpen" :model="items" />
          </div>
        </div>
      </div>
      <div
        class="content p-3 mt-3 ms-6 fs-5 bg-light rounded"
        v-html="comment?.content"
      ></div>
    </div>
    <div v-else>
      <div class="d-flex align-items-center overflow-hidden cursor-pointer">
        <img
          v-if="comment.user.photo"
          :src="comment.user.url_photo"
          :alt="comment.user.name"
          class="w-35px h-35px rounded-circle"
        />
        <span
          v-else
          class="symbol-label text-inverse-warning fs-2 d-flex justify-content-center align-items-center w-35px h-35px rounded-circle"
          :style="{ backgroundColor: getColor(comment.user.id) }"
          >{{
            comment.user.name ? comment.user.name[0].toUpperCase() : "-"
          }}</span
        >
        <div class="d-flex flex-column">
          <span class="fs-6 ms-3 fw-semibold">{{ comment.user.name }}</span>
          <span class="fs-8 text-gray-600 ms-3">{{
            moment(comment.updated_at).fromNow()
          }}</span>
        </div>
      </div>
      <div>
        <div class="w-100 border-0 pt-3 ps-14 card ms-auto">
          <form @submit.prevent="handleEditComment">
            <Editor v-model="commentValue" />
            <div class="d-flex justify-content-end my-3">
              <button
                type="submit"
                :disabled="commentIssueLoader"
                class="btn btn-sm btn-light-success mx-1"
              >
                <span v-if="!commentIssueLoader">Change comment</span>
                <Icon
                  v-else
                  name="svg-spinners:180-ring-with-bg"
                  class="p-2"
                  size="25"
                />
              </button>
              <p
                @click="editCommentStatus = false"
                class="btn btn-sm btn-secondary mx-1"
              >
                Cansel
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>