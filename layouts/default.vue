<script setup>
const route = useRoute();
const diableProjectHeadList = ["projects", "login", 'join', "welcome", "create-project", "complete-registration", "invitation", "your-work", "Profile-id", "profile"];
</script>

<template>
  <div>
    <MainHeader/>
    <ProjectHead v-if="!diableProjectHeadList.includes(route.name)"/>
    <slot/>
  </div>
</template>