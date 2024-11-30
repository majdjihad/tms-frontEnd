<script setup>
definePageMeta({
  layout: "none",
  middleware: ["guest"],
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
                      class="logo-sticky h-20px h-lg-40px h-sm-40px"
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
          <div class="d-flex flex-column flex-center w-100 min-h-350px px-9">
            <!--begin::Heading-->
            <div class="text-center mb-5 mb-lg-10 py-10 py-lg-20">
              <!--begin::Title-->
              <h1 class="text-white lh-base fw-bold fs-2x fs-lg-3x mb-15">
                Build And Manage Your Projects With<br />
                <span class="gradient-text">
                  <span id="kt_landing_hero_text"
                    >The Best Task Management System Ever</span
                  >
                </span>
              </h1>
              <!--end::Title-->
              <!--begin::Action-->
              <NuxtLink to="/join" class="btn btn-light-primary"
                >Sign up for free
              </NuxtLink>
              <!--end::Action-->
            </div>
            <!--end::Heading-->
          </div>
          <!--end::Landing hero-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Header Section-->
      <!--begin::How It Works Section-->
      <div class="mb-n10 mb-lg-n20 z-index-2 py-20">
        <!--begin::Container-->
        <div class="container">
          <!--begin::Heading-->
          <div class="text-center mb-17">
            <!--begin::Title-->
            <h3
              class="fs-2hx text-dark mb-5"
              id="how-it-works"
              data-kt-scroll-offset="{default: 100, lg: 150}"
            >
              How it Works?!
            </h3>
            <!--end::Title-->
            <!--begin::Text-->
            <div class="fs-5 text-muted fw-bold">
              Taskat is a Task Management System and it's <br />
              easy-to-use software for different type of projects.
            </div>
            <!--end::Text-->
          </div>
          <!--end::Heading-->
          <!--begin::Row-->
          <div class="row w-100 gy-10 mb-md-20">
            <!--begin::Col-->
            <div class="col-md-4 px-5">
              <!--begin::Story-->
              <div class="text-center mb-10 mb-md-0">
                <!--begin::Illustration-->
                <img
                  src="~/assets/media/illustrations/sketchy-1/2.png"
                  class="mh-125px mb-9"
                  alt=""
                />
                <!--end::Illustration-->
                <!--begin::Heading-->
                <div class="d-flex flex-center mb-5">
                  <!--begin::Badge-->
                  <span
                    class="badge badge-circle badge-primary fw-bold p-5 me-3 fs-3"
                    >1</span
                  >
                  <!--end::Badge-->
                  <!--begin::Title-->
                  <div class="fs-5 fs-lg-3 fw-bold text-dark">Join Taskat</div>
                  <!--end::Title-->
                </div>
                <!--end::Heading-->
                <!--begin::Description-->
                <div class="fw-semibold fs-6 fs-lg-4 text-muted">
                  Join to taskat software by using <br />
                  your email address.
                </div>
                <!--end::Description-->
              </div>
              <!--end::Story-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-md-4 px-5">
              <!--begin::Story-->
              <div class="text-center mb-10 mb-md-0">
                <!--begin::Illustration-->
                <img
                  src="~/assets/media/illustrations/sketchy-1/8.png"
                  class="mh-125px mb-9"
                  alt=""
                />
                <!--end::Illustration-->
                <!--begin::Heading-->
                <div class="d-flex flex-center mb-5">
                  <!--begin::Badge-->
                  <span
                    class="badge badge-circle badge-primary fw-bold p-5 me-3 fs-3"
                    >2</span
                  >
                  <!--end::Badge-->
                  <!--begin::Title-->
                  <div class="fs-5 fs-lg-3 fw-bold text-dark">
                    Setup Your Project
                  </div>
                  <!--end::Title-->
                </div>
                <!--end::Heading-->
                <!--begin::Description-->
                <div class="fw-semibold fs-6 fs-lg-4 text-muted">
                  Create your project so easy <br />
                  just by 2 clicks and enjoy with the<br />
                  amazing features.
                </div>
                <!--end::Description-->
              </div>
              <!--end::Story-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-md-4 px-5">
              <!--begin::Story-->
              <div class="text-center mb-10 mb-md-0">
                <!--begin::Illustration-->
                <img
                  src="~/assets/media/illustrations/sketchy-1/12.png"
                  class="mh-125px mb-9"
                  alt=""
                />
                <!--end::Illustration-->
                <!--begin::Heading-->
                <div class="d-flex flex-center mb-5">
                  <!--begin::Badge-->
                  <span
                    class="badge badge-circle badge-primary fw-bold p-5 me-3 fs-3"
                    >3</span
                  >
                  <!--end::Badge-->
                  <!--begin::Title-->
                  <div class="fs-5 fs-lg-3 fw-bold text-dark">
                    Manage Your Project
                  </div>
                  <!--end::Title-->
                </div>
                <!--end::Heading-->
                <!--begin::Description-->
                <div class="fw-semibold fs-6 fs-lg-4 text-muted">
                  Start your project development journey <br />invite your team
                  members, create tasks, assign it<br />
                  and a lot more with
                  <span class="gradient-text">Taskat Software.</span>
                </div>
                <!--end::Description-->
              </div>
              <!--end::Story-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
        </div>
        <!--end::Container-->
      </div>
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
                  >&copy; 2023 Taskat Software.</span
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
      <!--begin::Scrolltop-->
      <div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true">
        <i class="ki-duotone ki-arrow-up">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
      </div>
      <!--end::Scrolltop-->
    </div>
    <!--end::Root-->
    <!--begin::Scrolltop-->
    <div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true">
      <i class="ki-duotone ki-arrow-up">
        <span class="path1"></span>
        <span class="path2"></span>
      </i>
    </div>
    <!--end::Scrolltop-->
  </div>
</template>