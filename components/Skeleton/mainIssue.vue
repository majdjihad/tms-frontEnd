<template>
  <div class="bg-white">
    <div class="modal-dialog bg-white m-0 position-absolute top-0 end-0 h-100">
      <div class="modal-content w-650px position-absolute end-0 h-100">
        <div class="modal-header mx-5 mt-2">
          <div class="d-flex justify-content-between align-items-center w-100">
            <p class="d-flex justify-content-between position-relative w-25">
              <span class="skeleton rounded-1 w-60px h-20px"></span>
              <span class="skeleton rounded-1 w-60px h-20px"></span>
            </p>
          </div>
        </div>
        <div class="modal-body overflow-hidden mx-5 pt-0 pb-15">
          <p class="skeleton w-150px h-20px rounded-1 my-5"></p>
          <div class="d-flex w-50">
            <p class="skeleton w-80px h-20px rounded-1 py-2 px-3 me-3"></p>
            <p class="skeleton w-80px h-20px rounded-1 py-2 px-3"></p>
          </div>
          <div class="description">
            <p class="skeleton rounded-1 w-70px h-20px my-6"></p>
            <p class="skeleton rounded-1 m-4 w-90 h-40px"></p>
          </div>
          <div class="mt-6 position-relative">
            <div class="d-flex justify-content-between align-items-center p-4">
              <p class="skeleton w-70px rounded-1 h-20px m-0"></p>
            </div>
            <div class="p-0 pb-6">
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <span class="skeleton rounded-1 w-90px h-30px"></span>
                <div class="w-300px text-center">
                  <p class="skeleton w-200px h-30px rounded-1"></p>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <span class="skeleton rounded-1 w-90px h-30px"></span>
                <div class="w-300px text-center">
                  <p class="skeleton w-200px h-30px rounded-1"></p>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <span class="skeleton rounded-1 w-90px h-30px"></span>
                <div class="w-300px text-center">
                  <p class="skeleton w-200px h-30px rounded-1"></p>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <span class="skeleton rounded-1 w-90px h-30px"></span>
                <div class="w-300px text-center">
                  <p class="skeleton w-200px h-30px rounded-1"></p>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <span class="skeleton rounded-1 w-90px h-30px"></span>
                <div class="w-300px text-center">
                  <p class="skeleton w-200px h-30px rounded-1"></p>
                </div>
              </div>
              <div class="mt-4">
                <p class="skeleton rounded-1 my-2 w-150px h-20px"></p>
                <p class="skeleton rounded-1 my-2 w-175px h-20px"></p>
              </div>
            </div>
          </div>
          <div class="my-4">
            <p class="skeleton rounded-1 my-6 w-125px h-20px"></p>
            <div v-for="index in 4" :key="index">
              <SkeletonSubIssueCard />
            </div>
          </div>
          <div class="my-4">
            <p class="skeleton rounded-1 w-70px h-20px my-6"></p>
            <ul class="p-0 d-flex list-unstyled">
              <li class="w-50 py-3 text-center">
                <p class="skeleton rounded-1 m-auto w-150px h-20px"></p>
              </li>
              <li class="w-50 py-3 text-center">
                <p class="skeleton rounded-1 m-auto w-150px h-20px"></p>
              </li>
            </ul>
            <div>
              <div class="row mb-4">
                <div class="col-1 overflow-hidden">
                  <p class="w-35px h-35px skeleton rounded-circle"></p>
                </div>
                <div class="col-11">
                  <p class="skeleton p-3 w-90 h-40px m-auto rounded-1"></p>
                </div>
              </div>
              <div v-for="(comment, index) in 4" :key="index">
                <SkeletonCommentCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
</style>