<script setup>
</script>
<template>
  <div class="w-300px p-1 bg-light-active mt-6 mx-3">
        <div class="py-3">
          <p class="h-15px w-25 rounded p-3 bg-gray-300"></p>
        <div v-for="index in 5" :key="index" class="card my-5">
          <div class="card-body p-3">
            <div>
              <p class="h-15px w-25 rounded skeleton m-0"></p>
            </div>
            <p class="text-gray-400 w-50 h-15px rounded skeleton mt-3 mb-5"></p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="w-25 h-15px rounded skeleton"></span>
              <div class="w-35px h-35px skeleton rounded-circle"></div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<style scoped>
</style>