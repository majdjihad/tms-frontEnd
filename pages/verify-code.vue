<script setup>
import OtpCode from "@/components/form/OtpCode.vue";

useHead({
  title: "تاكيد الرمز",
});
const otp = ref("");
const otpError = ref("");
const sending = ref(false);
const otpRef = ref(null);

watch(otp, (v) => {
  if (otpError.value && v) otpError.value = "";
});

async function onSubmit() {
  otpError.value = "";

  if (!otp.value || otp.value.length < 4) {
    otpError.value = "يرجى إدخال رمز مكوّن من 4 أرقام";
    otpRef.value?.focusFirst?.();
    return;
  }

  sending.value = true;
  try {
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <section class="py-5 pb-9">
    <div class="container">
      <div class="row flex-column-reverse flex-md-row g-9 align-items-stretch">
        <div class="col-lg-4">
          <div class="info-panel h-100 text-white rounded-3 p-4 p-md-5">
            <h2 class="text-white fw-normal mb-3 p-4 px-9">
              <span class="fw-bold fs-1">اكتشــــــف آلاف الإعلانــــــات</span>
              من المستخدمين في مختلف الفئات وبأفضل الأسعار
            </h2>
            <ul class="list-unstyled lh-lg mb-0 mt-4">
              <li class="d-flex align-items-start my-4">
                <Icon
                  name="material-symbols:check-circle"
                  class="text-info fs-3 mt-1 ms-2"
                />
                <span class="fs-4">انضم إلى مئات المستخدمين على منصتنا</span>
              </li>
              <li class="d-flex align-items-start my-4">
                <Icon
                  name="material-symbols:check-circle"
                  class="text-info fs-3 mt-1 ms-2"
                />
                <span class="fs-4">تسجيل الدخول سهل وآمن وسريع</span>
              </li>
              <li class="d-flex align-items-start my-4">
                <Icon
                  name="material-symbols:check-circle"
                  class="text-info fs-3 mt-1 ms-2"
                />
                <span class="fs-4">نشر الإعلانات ورفع الصور بسهولة</span>
              </li>
              <li class="d-flex align-items-start my-4">
                <Icon
                  name="material-symbols:check-circle"
                  class="text-info fs-3 mt-1 ms-2"
                />
                <span class="fs-4">استعرض العروض في المنطقة الأقرب لك</span>
              </li>
              <li class="d-flex align-items-start my-4">
                <Icon
                  name="material-symbols:check-circle"
                  class="text-info fs-3 mt-1 ms-2"
                />
                <span class="fs-4">إدارة إعلاناتك وتتبعها في أي وقت</span>
              </li>
              <li class="d-flex align-items-start my-4">
                <Icon
                  name="material-symbols:check-circle"
                  class="text-info fs-3 mt-1 ms-2"
                />
                <span class="fs-4">اضف التفاصيل والصور لوصف إعلانك بدقة</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-8 py-9">
          <div class="card border-0 py-9 h-100 bg-light">
            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="onSubmit" novalidate>
                <div>
                  <NuxtLink
                    to="/login"
                    class="d-inline-flex align-items-center mb-3 text-primary fw-bold"
                  >
                    <Icon
                      name="material-symbols:arrow-right-alt"
                      class="ms-1"
                      size="28"
                    />
                    <span class="fs-3">رمز التحقق</span>
                  </NuxtLink>
                  <div class="w-md-50 w-75 my-8">
                    <p>
                      لقد ارسلنا رمز تحقق الى بريدك الالكتروني
                      <span class="text-primary">majd@gmail.com</span>
                    </p>
                    <OtpCode
                      v-model="otp"
                      :length="4"
                      :error="otpError"
                      ref="otpRef"
                      class="my-9"
                    />
                    <p class="my-3 text-muted">
                      الرجاء إدخال الرمز لإكمال العملية
                    </p>
                  </div>
                </div>
                <div class="text-end my-3">
                  <button
                    class="btn btn-main mt-3"
                    :disabled="sending"
                    type="submit"
                  >
                    <span class="fw-semibold">تحقق</span>
                    <Icon
                      name="material-symbols:arrow-back-rounded"
                      class="text-white me-2"
                      size="22"
                    />
                  </button>
                  <div class="my-9 fw-semibold">
                    لم تتلقَّ رسالة التحقق؟
                    <nuxtLink
                      to="#"
                      class="text-primary text-decoration-underline"
                      >اضغط هنا لإعادة الأرسال</nuxtLink
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.info-panel {
  background: linear-gradient(135deg, #264fcf, #1838a3);
  box-shadow: 0 0.5rem 1rem rgba(24, 56, 163, 0.15);
}
.btn-main {
  padding: 10px 40px !important;
}
</style>
