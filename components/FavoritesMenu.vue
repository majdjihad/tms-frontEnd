
<script setup>
import img1 from "@/assets/media/ecommerce/1.gif";
import img2 from "@/assets/media/ecommerce/2.gif";
import img3 from "@/assets/media/ecommerce/3.gif";
import img4 from "@/assets/media/ecommerce/4.gif";
import img5 from "@/assets/media/ecommerce/5.gif";

const props = defineProps({
  show: Boolean,
});

const items = [
  {
    title: "كاميرا احترافية بحالة ممتازة",
    location: "فلسطين - دير البلح",
    price: "3,500 شيكل",
    image: img1,
  },
  {
    title: "فلل سياحية وسكنية عظم للبيع بسعر مغري",
    location: "فلسطين - مدينة غزة",
    price: "80,500 شيكل",
    image: img2,
  },
  {
    title: "ساعة بلوتوث لاسلكية اصلية",
    location: "فلسطين - مدينة غزة",
    price: "80,500 شيكل",
    image: img3,
  },
  {
    title: "عطر خليجي برائحة العود ثابت قوي",
    location: "فلسطين - مدينة غزة",
    price: "80,500 شيكل",
    image: img4,
  },
  {
    title: "iPhone 14 Pro Max للبيع",
    location: "فلسطين - مدينة غزة",
    price: "80,500 شيكل",
    image: img5,
  },
  {
    title: "فلل سياحية وسكنية عظم للبيع بسعر مغري",
    location: "فلسطين - مدينة غزة",
    price: "80,500 شيكل",
    image: img2,
  },
  {
    title: "ساعة بلوتوث لاسلكية اصلية",
    location: "فلسطين - مدينة غزة",
    price: "80,500 شيكل",
    image: img3,
  },
  {
    title: "عطر خليجي برائحة العود ثابت قوي",
    location: "فلسطين - مدينة غزة",
    price: "80,500 شيكل",
    image: img4,
  },
  {
    title: "iPhone 14 Pro Max للبيع",
    location: "فلسطين - مدينة غزة",
    price: "80,500 شيكل",
    image: img5,
  },
];
</script>

<template>
  <div
    v-if="show"
    class="dropdown-menu show shadow w-100 p-3 position-absolute start-0"
    style="max-height: 500px; min-width: 350px; overflow-y: auto"
  >
    <h5 class="fw-bold border-bottom text-end pb-2 mb-3">
      المفضلة ({{ items.length }})
    </h5>

    <div
      v-for="(item, index) in items"
      :key="index"
      class="d-flex align-items-start mb-3"
    >
      <div class="flex-grow-1 border-bottom pb-2">
        <div class="row justify-content-around align-items-center">
          <img
            :src="item.image"
            class="rounded-circle col-5"
            style="width: 50px; height: 50px; object-fit: cover"
          />
          <div class="data text-end col-7">
            <div class="d-flex justify-content-between align-items-center">
              <span class="fw-semibold fs-5">{{ item.title }}</span>
              <Icon name="fa-solid:heart" class="text-primary fs-5 me-2 mt-1" />
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <small class="fs-7 text-muted d-block mt-1">{{
                item.location
              }}</small>
              <small class="fs-7 text-primary fw-bold mt-1">{{
                item.price
              }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <NuxtLink
        to="/favorites"
        class="text-primary py-2 d-block fw-bold text-decoration-underline"
        >عرض جميع المفضلة</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.dropdown-menu {
  right: 0;
  left: auto;
}
</style>
