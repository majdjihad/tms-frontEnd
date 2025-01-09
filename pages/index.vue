<script setup>
// Uses a custom layout with guest middleware to ensure only non-authenticated users can access
definePageMeta({
  layout: "none",
});
</script>

<template>
  <div>
    <!--begin::Root-->
    <div
      class="d-grid min-vh-100"
      style="grid-template-rows: auto auto 1fr auto"
      id="kt_app_root"
    >
      <!--begin::Header Section-->
      <div class="mb-0" id="home">
        <!--begin::Wrapper-->
        <div
          class="bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-bottom landing-hero-bg"
          style="
            background-image: url(~/assets/media/svg/illustrations/landing.svg);
          "
        >
          <!--begin::Header-->
          <div
            class="landing-header"
            data-kt-sticky="true"
            data-kt-sticky-name="landing-header"
            data-kt-sticky-offset="{default: '200px', lg: '300px'}"
          >
            <!--begin::Container-->
            <div class="container h-80px">
              <!--begin::Wrapper-->
              <div
                class="d-flex align-items-center justify-content-between h-100"
              >
                <!--begin::Logo-->
                <div class="d-flex align-items-center flex-equal">
                  <!--begin::Mobile menu toggle-->
                  <button
                    class="btn btn-icon btn-active-color-primary me-3 d-flex d-lg-none"
                    id="kt_landing_menu_toggle"
                  >
                    <i class="ki-duotone ki-abstract-14 fs-2hx">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                  </button>
                  <!--end::Mobile menu toggle-->
                  <!--begin::Logo image-->
                  <NuxtLink to="/">
                    <img
                      alt="Logo"
                      src="~/assets/media/logos/logo-light.png"
                      class="logo-sticky h-20px h-lg-50px h-sm-40px"
                    />
                  </NuxtLink>
                  <!--end::Logo image-->
                </div>
                <!--end::Logo-->
                <!--begin::Menu wrapper-->
                <div class="d-lg-block" id="kt_header_nav_wrapper">
                  <div
                    class="d-lg-block p-5 p-lg-0"
                    data-kt-drawer="true"
                    data-kt-drawer-name="landing-menu"
                    data-kt-drawer-activate="{default: true, lg: false}"
                    data-kt-drawer-overlay="true"
                    data-kt-drawer-width="200px"
                    data-kt-drawer-direction="start"
                    data-kt-drawer-toggle="#kt_landing_menu_toggle"
                    data-kt-swapper="true"
                    data-kt-swapper-mode="prepend"
                    data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav_wrapper'}"
                  >
                    <!--begin::Menu-->
                    <div
                      class="menu menu-column flex-nowrap menu-rounded menu-lg-row menu-title-gray-600 menu-state-title-primary nav nav-flush fs-5 fw-semibold"
                      id="kt_landing_menu"
                    >
                      <!--begin::Menu item-->
                      <div class="menu-item">
                        <!--begin::Menu link-->
                        <a
                          class="menu-link nav-link active py-3 px-4 px-xxl-6"
                          href="#kt_body"
                          data-kt-scroll-toggle="true"
                          data-kt-drawer-dismiss="true"
                          >Home</a
                        >
                        <!--end::Menu link-->
                      </div>
                      <!--end::Menu item-->
                      <!--begin::Menu item-->
                      <div class="menu-item">
                        <!--begin::Menu link-->
                        <a
                          class="menu-link nav-link py-3 px-4 px-xxl-6"
                          href="#how-it-works"
                          data-kt-scroll-toggle="true"
                          data-kt-drawer-dismiss="true"
                          >How it Works</a
                        >
                        <!--end::Menu link-->
                      </div>
                      <!--end::Menu item-->
                    </div>
                    <!--end::Menu-->
                  </div>
                </div>
                <!--end::Menu wrapper-->
                <!--begin::Toolbar-->
                <div class="flex-equal text-end ms-1">
                  <NuxtLink
                    to="/login"
                    class="btn btn-outline-primary text-white border border-secondary me-5"
                    >Log In</NuxtLink
                  >
                  <NuxtLink to="/join" class="btn btn-primary">
                    Sign Up</NuxtLink
                  >
                </div>
                <!--end::Toolbar-->
              </div>
              <!--end::Wrapper-->
            </div>
            <!--end::Container-->
          </div>
          <!--end::Header-->
          <!--begin::Landing hero-->
          <section class="d-flex justify-content-center p-7 text-center">
            <div class="hero-content text-center">
              <h1 class="btn-show">
                Streamline Your Tasks, Amplify Your Productivity
              </h1>
              <p class="text-white">
                The intelligent task management system that helps teams work
                smarter and achieve more together.
              </p>
              <div class="cta-buttons">
                <NuxtLink to="/join" class="btn btn-lg btn-primary"
                  >Start Free Trial</NuxtLink
                >
              </div>
            </div>
          </section>
          <!--end::Landing hero-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Header Section-->
      <!--begin::How It Works Section-->
      <section class="mb-n10 mb-lg-n20 z-index-2 py-20">
        <!--begin::Container-->
        <div class="container">
          <!--begin::Heading-->
          <div class="text-center mb-17">
            <!--begin::Title-->
            <h3
              class="btn-show display-4 mb-5"
              id="how-it-works"
              data-kt-scroll-offset="{default: 100, lg: 150}"
            >
              How it Works?
            </h3>
            <!--end::Title-->
            <!--begin::Text-->
            <div class="fs-5 text-muted fw-bold">
              TaskSwift is a Task Management System and it's <br />
              easy-to-use software for different type of projects.
            </div>
            <!--end::Text-->
          </div>
          <div class="timeline">
            <div>
              <span class="btn btn-success fs-3 p-3 rounded ms-3">Join</span>
              <div
                class="row justify-content-between align-items-center"
                style="margin: 9rem 0"
              >
                <div class="col-12 col-lg-6 text-center mb-5 p-6">
                  <div class="fs-5 fs-lg-3 fw-bold text-dark">
                    <h3 class="display-4">Join TaskSwif</h3>
                  </div>
                  <!--end::Title-->
                  <div class="fw-semibold fs-6 fs-lg-4 text-muted">
                    Join to TaskSwift software by using your email address.
                  </div>
                </div>
                <div class="col-12 col-lg-6 text-center te">
                  <img
                    src="~/assets\media\images-desgin\wellcome-desgin.png"
                    class="w-300px img-fluid rounded shadow text-center"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div>
              <span class="btn btn-success fs-3 p-3 rounded ms-3">Startup</span>
              <div
                class="row justify-content-between align-items-center"
                style="margin: 9rem 0"
              >
                <div class="col-12 col-lg-6 text-center mb-5 p-6">
                  <div class="fs-5 fs-lg-3 fw-bold text-dark">
                    <h3 class="display-4">Setup Your Project</h3>
                  </div>
                  <!--end::Title-->
                  <div class="fw-semibold fs-6 fs-lg-4 text-muted">
                    Create your project so easy just by 2 clicks and enjoy with
                    the amazing features.
                  </div>
                </div>
                <div class="col-12 col-lg-6 text-center shadow text-center">
                  <img
                    src="~/assets\media\images-desgin\projects-desgin.png"
                    class="img-fluid rounded"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div>
              <span class="btn btn-success fs-3 p-3 rounded ms-3">Manager</span>
              <div
                class="row justify-content-between align-items-center"
                style="margin: 9rem 0"
              >
                <div class="col-12 col-lg-6 text-center mb-5 p-6">
                  <div class="fs-5 fs-lg-3 fw-bold text-dark">
                    <h3 class="display-4">Manage Your Project</h3>
                  </div>
                  <!--end::Title-->
                  <div class="fw-semibold fs-6 fs-lg-4 text-muted">
                    Start your project development journey invite your team
                    members, create tasks, assign it and a lot more with TaskSwift
                    Software.
                  </div>
                </div>
                <div class="col-12 col-lg-6 text-center shadow text-center">
                  <img
                    src="~/assets\media\images-desgin\board-desgin.png"
                    class="img-fluid rounded"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Container-->
      </section>
      <!--end::How It Works Section-->
      <!--begin::Footer Section-->
      <div class="mb-0">
        <!--begin::Wrapper-->
        <div class="landing-hero-bg">
          <!--begin::Container-->
          <div class="container">
            <!--begin::Row-->
            <!--end::Row-->
          </div>
          <!--end::Container-->
          <!--begin::Separator-->
          <div class="landing-dark-separator"></div>
          <!--end::Separator-->
          <!--begin::Container-->
          <div class="container">
            <!--begin::Wrapper-->
            <div class="d-flex flex-stack py-7 justify-content-between">
              <!--begin::Copyright-->
              <div class="d-flex align-items-center">
                <!--begin::Logo-->
                <NuxtLink to="/">
                  <img
                    alt="Logo"
                    src="~/assets/media/logos/logo-light.png"
                    class="logo-sticky h-20px h-lg-40px h-sm-40px"
                  />
                </NuxtLink>
                <!--end::Logo image-->
              </div>
              <div>
                <span class="mx-5 fs-6 fw-semibold text-gray-600 pt-1" href="#"
                  >&copy; 2023-2025 copyright in TaskSwift Software.</span
                >
              </div>
              <!--end::Copyright-->
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Container-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Footer Section-->
    </div>
  </div>
</template>
<style scoped>
.hero-content {
  max-width: 600px;
}

.btn-show {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #5fb751 0%, #14f88b 100%);
  -webkit-background-clip: text;
  color: transparent;
}

p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}
.timeline {
  position: relative;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 4px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #99a1b7;
  z-index: 1;
}
.timeline-icon {
  position: absolute;
  color: white;
  left: -34px;
  top: -4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 6rem;
  }

  h1 {
    font-size: 2.5rem;
  }
}
</style>