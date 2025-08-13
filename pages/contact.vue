<script setup>
useHead({
  title: "تواصل معنا",
});
</script>
<template>
  <section class="contact-section py-5" dir="rtl">
    <div class="container">
      <div class="p-md-5">
        <div class="p-9">
          <h1>تواصل معنا</h1>
          <div class="d-flex align-items-center">
            <h2 class="fs-3 m-0 fw-normal text-primary d-inline">الرئيسية</h2>
            <Icon
              name="mdi:chevron-left-circle-outline"
              class="fs-3 mx-3 text-secondary"
            />
            <h2 class="fs-3 m-0 fw-semibold text-muted">تواصل معنا</h2>
          </div>
        </div>
        <form class="px-9">
          <div>
            <div class="row g-4 rounded-1 p-9 bg-white shadow-sm">
              <div class="mb-4 py-4">
                <h2 class="fw-bold text-primary mb-2">نحن هنا من أجلك!</h2>
                <p class="fs-5 text-dark mb-0">
                  يسعدنا تواصلك معنا للإجابة عن استفساراتك، استقبال اقتراحاتك.
                  لا تتردد في مراسلتنا وسنرد عليك في أقرب وقت ممكن.
                </p>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">الإسم الكامل</label>
                <input
                  name="full_name"
                  type="text"
                  class="form-control form-control-lg bg-light border-0 rounded-0"
                  placeholder="مجد قويدر"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">رقم الجوال</label>
                <input
                  name="phone"
                  type="tel"
                  class="form-control form-control-lg bg-light border-0 text-end rounded-0"
                  placeholder="+972592072429"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">البريد الإلكتروني</label>
                <input
                  name="email"
                  type="email"
                  class="form-control form-control-lg bg-light border-0 rounded-0"
                  placeholder="husseinsawalhy8@gmail.com"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">المدينة</label>
                <select
                  class="form-select form-select-lg bg-light border-0 rounded-0"
                  name="city"
                >
                  <option class="text-light" selected disabled>
                    اختر المدينة
                  </option>
                  <option>غزة</option>
                  <option>جباليا</option>
                  <option>خان يونس</option>
                  <option>رفح</option>
                  <option>دير البلح</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">موضوع الرسالة</label>
                <textarea
                  name="message_subject"
                  class="form-control form-control-lg bg-light border-0 rounded-0"
                  rows="8"
                  placeholder="اكتب تفاصيل الطلب هنا..."
                ></textarea>
              </div>
            </div>
            <div class="text-center my-8">
              <button type="submit" class="btn btn-lg btn-view-all">
                <span class="mb-0 text-white">أرسال الرسالة</span>
                <Icon
                  name="material-symbols:arrow-back-rounded"
                  class="text-white"
                  size="20"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<style>
.bg-scandary .form-control-lg,
.form-select-lg {
  min-height: 3.25rem;
}
textarea.form-control-lg {
  min-height: 220px;
}

.bg-light::placeholder {
  color: #b7bcc5;
}
input:focus {
  border: var(--bs-primary) 1px solid !important;
}
textarea:focus {
  border: var(--bs-primary) 2px solid !important;
  outline: none !important;
  box-shadow: none !important;
}
.rounded-4 {
  border-radius: 0.5rem !important;
}
</style>
