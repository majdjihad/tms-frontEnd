<script setup>
const emits = defineEmits(["update:modelValue"]);
const props = defineProps(["selectTitle", "list", "type", "selected"]);
const selectedOption = ref(props.selectTitle);
const optionsVisible = ref(false);

// define background color to user
const getColor = (index) => {
  const colorList = ["4A90E2", "9013FE", "F5A623", "D0021B", "F8E71C"];
  const colorIndex = index % colorList.length;
  return `#${colorList[colorIndex]}`;
};

const toggleOptionsVisible = () => {
  optionsVisible.value = !optionsVisible.value;
};

const selectOption = (option) => {
  if (props?.type === "statusMenu") {
    emits("update:modelValue", option);
  } else if (props?.type === "assigneeMenu") {
    emits("update:modelValue", option);
  } else {
    selectedOption.value = option;
  }
  optionsVisible.value = false;
};

const closeOptions = () => {
  optionsVisible.value = false;
};
</script>

<template>
  <div class="custom-select">
    <div
      class="selected-option"
      v-click-outside="closeOptions"
      @click="toggleOptionsVisible"
    >
      <p class="m-0">{{ selectedOption }}</p>
      <i
        class="fs-5"
        :class="{
          'fa-solid fa-angle-up': optionsVisible,
          'fa-solid fa-angle-down': !optionsVisible,
        }"
      ></i>
    </div>
    <Transition name="menu">
      <div class="options" v-show="optionsVisible">
        <div v-if="type === 'assigneeMenu'">
          <div
            class="option"
            v-for="option in list.filter((m) => m?.user?.name)"
            :key="option.user.id"
            @click="selectOption(option)"
          >
            <div class="w-100 d-flex justify-content-start align-items-center">
              <div class="symbol symbol-circle symbol-30px overflow-hidden">
                <img
                  v-if="option?.user?.photo"
                  :src="option?.user?.url_photo"
                  :alt="option?.user?.name"
                  class="w-100"
                />
                <span
                  v-else
                  class="symbol-label text-inverse-warning fs-2 hover-bg-light"
                  :style="{ backgroundColor: getColor(option?.user?.id) }"
                  >{{
                    option?.user?.name
                      ? option?.user?.name[0].toUpperCase()
                      : "-"
                  }}</span
                >
              </div>
              <span class="ms-5 fs-6">{{ option?.user?.name }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="type === 'statusMenu'">
          <span
            v-for="option in list"
            @click="selectOption(option)"
            :key="option.id"
            class="option"
          >
            {{ option.name }}
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
/* Add your CSS styles here to customize the appearance */
.custom-select {
  position: relative;
  width: 200px;
}

.selected-option {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow-up {
  border-bottom: 5px solid #333;
}

.arrow-down {
  border-top: 5px solid #333;
}

.options {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 100;
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.1s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  top: 30px;
}
</style>