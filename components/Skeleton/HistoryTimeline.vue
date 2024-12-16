<template>
      <div class="skeleton history-item rounded">
    <div class="skeleton date rounded"></div>
      <!-- Icon -->
      <div class="timeline-icon skeleton p-3 rounded-circle"></div>
    </div>
</template>
<script>
</script>
<style scoped>
.history-item {
  position: relative;
  width: 300px;
  height: 130px;
  padding-bottom: 1.5rem;
  padding-left: 1rem;
  margin-bottom: 20px;
}
.date {
  position: absolute;
  left: -150px;
  top: -4px;
  width: 100px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.timeline-icon {
  position: absolute;
  left: -37px;
  top: -4px;
  width: 30px;
  height: 30px;
  display: flex;
  z-index: 10;
}
</style>