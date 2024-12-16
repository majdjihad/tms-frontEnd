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
    <ProjectComponentProjectHead v-if="!diableProjectHeadList.includes(route.name)" />
    <slot />
    
  </div>
</template>