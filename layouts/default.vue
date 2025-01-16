<script setup>
const route = useRoute();

// this  page you is content project head
const diableProjectHeadList = [
  "projects",
  "login",
  "join",
  "welcome",
  "create-project",
  "complete-registration",
  "invitation",
  "your-work",
  "Profile-id",
  "profile-id",
];
</script>

<template>
  <div>
    <MainHeader />
    <ProjectCompProjectHead
      v-if="!diableProjectHeadList.includes(route.name)"
    />
    <slot />
    <!--begin::Footer Section-->
    <!-- end::Footer Section -->
  </div>
</template>