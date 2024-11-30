<template>
  <div class="col-md-6 col-xl-4">
    <div class="card my-5">
      <div class="card-header border-0 px-7 pt-7">
        <div class="card-title m-0 skeleton rounded">
          <p class="symbol symbol-50px w-50px bg-light">
            <span class="w-100 object-cover" />
          </p>
        </div>
        <!-- <div class="card-toolbar">
                    <span class="project-fav badge fw-bold me-auto px-4 py-3 Skeleton ">
                        <span style="width: 22px; height: 22px;"></span>
                    </span>
                </div> -->
      </div>
      <div class="card-body p-7">
        <div
          class="project-name w-25 rounded skeleton"
          style="height: 20px"
        ></div>
        <p
          class="text-gray-400 w-50 rounded skeleton my-5"
          style="height: 20px"
        ></p>
        <div class="d-flex flex-wrap mb-5" style="height: 65px">
          <div class="rounded min-w-125px py-3 px-4 me-7 mb-3 skeleton"></div>
          <div class="rounded min-w-90px py-3 px-4 mb-3 skeleton"></div>
        </div>
        <hr class="skeleton" />
        <div class="symbol-group symbol-hover flex-nowrap me-5">
          <div>
            <div
              v-for="index in 4"
              :key="index"
              class="symbol symbol-35px symbol-circle cursor-pointer"
            >
              <div class="symbol symbol-35px symbol-circle">
                <span class="symbol-label text-inverse-warning skeleton-img">
                </span>
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

<style lang="scss" scoped></style>