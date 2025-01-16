<script setup>
// Uses a custom layout with guest middleware to ensure only non-authenticated users can access
definePageMeta({
  layout: "none",
});
let currentImage = ref("board");
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
        <div
          class="bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-bottom landing-dark-bg"
          style="background-color: #071437 !important"
        >
          <div
            class="landing-header"
            data-kt-sticky="true"
            data-kt-sticky-name="landing-header"
            data-kt-sticky-offset="{default: '200px', lg: '300px'}"
          >
            <div class="container h-80px">
              <div
                class="d-flex align-items-center justify-content-between h-100"
              >
                <div class="d-flex align-items-center flex-equal">
                  <NuxtLink to="/">
                    <img
                      alt="Logo"
                      src="~/assets/media/logos/logo-light.png"
                      class="logo-sticky h-20px h-lg-50px h-sm-40px"
                    />
                  </NuxtLink>
                </div>
                <div class="d-lg-block" id="kt_header_nav_wrapper">
                  <div class="d-lg-block p-5 p-lg-0">
                    <div
                      class="menu flex-nowrap menu-rounded menu-lg-row menu-title-gray-600 menu-state-title-primary nav nav-flush fs-5 fw-semibold"
                    >
                      <div class="menu-item">
                        <NuxtLink
                          class="menu-link nav-link active py-3 px-4 px-xxl-6"
                          href="#"
                          data-kt-scroll-toggle="true"
                          data-kt-drawer-dismiss="true"
                          >Home</NuxtLink
                        >
                      </div>
                      <div class="menu-item">
                        <NuxtLink
                          class="menu-link nav-link py-3 px-4 px-xxl-6"
                          href="#how-it-works"
                          data-kt-scroll-toggle="true"
                          data-kt-drawer-dismiss="true"
                          >How it Works</NuxtLink
                        >
                      </div>
                      <div class="menu-item">
                        <NuxtLink
                          class="menu-link nav-link py-3 px-4 px-xxl-6"
                          href="#customers"
                          data-kt-scroll-toggle="true"
                          data-kt-drawer-dismiss="true"
                          >Customers</NuxtLink
                        >
                      </div>
                      <div class="menu-item">
                        <NuxtLink
                          class="menu-link nav-link py-3 px-4 px-xxl-6"
                          href="#questions"
                          data-kt-scroll-toggle="true"
                          data-kt-drawer-dismiss="true"
                          >Questions</NuxtLink
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-equal text-end ms-1">
                  <NuxtLink
                    to="/login"
                    class="btn border border-primary border-2 text-white me-5"
                    >Log In</NuxtLink
                  >
                  <NuxtLink to="/join" class="btn btn-primary">
                    Sign Up</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
          <section class="d-flex justify-content-center p-7 text-center">
            <div class="hero-content text-center">
              <img src="~/assets/media/logos/logo-light.png" class="w-75" alt="Logo" />
              <h1 class="btn-show">
                Streamline Your Tasks, Amplify Your Productivity
              </h1>
              <p class="text-white fs-3 px-9 my-6">
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
        </div>
        <div class="landing-curve landing-dark-color mb-10 mb-lg-20">
          <svg
            viewBox="15 12 1470 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 11C3.93573 11.3356 7.85984 11.6689 11.7725 12H1488.16C1492.1 11.6689 1496.04 11.3356 1500 11V12H1488.16C913.668 60.3476 586.282 60.6117 11.7725 12H0V11Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <!--end::Header Section-->
      <!--begin::How It Works Section-->
      <section class="mb-n10 mb-lg-n20 z-index-2 py-20">
        <div class="container text-center mb-17">
          <div class="title">
            <h3
              class="display-4 text-dark mb-5"
              id="how-it-works"
              data-kt-scroll-offset="{default: 100, lg: 150}"
            >
              How it <span class="btn-show">Works?</span>
            </h3>
            <p class="fs-5 text-muted">
              TaskSwift is a Task Management System and it's <br />
              easy-to-use software for different type of projects.
            </p>
          </div>
          <div>
            <div class="relative row mt-1 bg-slate-50 rounded-lg p-6">
              <div class="d-flex col-12 col-lg-7">
                <svg
                  class="col-2"
                  width="80"
                  height="348"
                  viewBox="0 0 46 348"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_f_1491_132638)">
                    <path
                      d="M22.0234 31.9944L24.3548 330"
                      stroke="url(#paint0_linear_1491_132638)"
                      stroke-width="4"
                      stroke-opacity="0.7"
                      stroke-linecap="round"
                      opacity="1"
                      pathLength="1"
                      stroke-dashoffset="0px"
                      stroke-dasharray="1px 1px"
                    ></path>
                  </g>
                  <path
                    d="M22.0234 31.9944L24.3548 330"
                    stroke="url(#paint1_linear_1491_132638)"
                    stroke-width="4"
                    stroke-linecap="round"
                    opacity="1"
                    pathLength="1"
                    stroke-dashoffset="0px"
                    stroke-dasharray="1px 1px"
                  ></path>
                  <g filter="url(#filter1_f_1491_132638)">
                    <mask id="path-3-inside-1_1491_132638" fill="white">
                      <path
                        d="M32 22C32 27.5228 27.5228 32 22 32C16.4772 32 12 27.5228 12 22C12 16.4772 16.4772 12 22 12C27.5228 12 32 16.4772 32 22ZM15.1906 22C15.1906 25.7607 18.2393 28.8094 22 28.8094C25.7607 28.8094 28.8094 25.7607 28.8094 22C28.8094 18.2393 25.7607 15.1906 22 15.1906C18.2393 15.1906 15.1906 18.2393 15.1906 22Z"
                      ></path>
                    </mask>
                    <path
                      d="M32 22C32 27.5228 27.5228 32 22 32C16.4772 32 12 27.5228 12 22C12 16.4772 16.4772 12 22 12C27.5228 12 32 16.4772 32 22ZM15.1906 22C15.1906 25.7607 18.2393 28.8094 22 28.8094C25.7607 28.8094 28.8094 25.7607 28.8094 22C28.8094 18.2393 25.7607 15.1906 22 15.1906C18.2393 15.1906 15.1906 18.2393 15.1906 22Z"
                      fill="#14f88b"
                    ></path>
                    <path
                      d="M32 22C32 27.5228 27.5228 32 22 32C16.4772 32 12 27.5228 12 22C12 16.4772 16.4772 12 22 12C27.5228 12 32 16.4772 32 22ZM15.1906 22C15.1906 25.7607 18.2393 28.8094 22 28.8094C25.7607 28.8094 28.8094 25.7607 28.8094 22C28.8094 18.2393 25.7607 15.1906 22 15.1906C18.2393 15.1906 15.1906 18.2393 15.1906 22Z"
                      stroke="#14f88b"
                      stroke-width="2"
                      mask="url(#path-3-inside-1_1491_132638)"
                    ></path>
                  </g>
                  <circle
                    cx="22"
                    cy="22"
                    r="8.5"
                    fill="#0B0D10"
                    stroke="#14f88b"
                    stroke-width="3"
                  ></circle>
                  <g filter="url(#filter2_f_1491_132638)">
                    <mask id="path-5-inside-2_1491_132638" fill="white">
                      <path
                        d="M34 164C34 169.523 29.5228 174 24 174C18.4772 174 14 169.523 14 164C14 158.477 18.4772 154 24 154C29.5228 154 34 158.477 34 164ZM17.1906 164C17.1906 167.761 20.2393 170.809 24 170.809C27.7607 170.809 30.8094 167.761 30.8094 164C30.8094 160.239 27.7607 157.191 24 157.191C20.2393 157.191 17.1906 160.239 17.1906 164Z"
                      ></path>
                    </mask>
                    <path
                      d="M34 164C34 169.523 29.5228 174 24 174C18.4772 174 14 169.523 14 164C14 158.477 18.4772 154 24 154C29.5228 154 34 158.477 34 164ZM17.1906 164C17.1906 167.761 20.2393 170.809 24 170.809C27.7607 170.809 30.8094 167.761 30.8094 164C30.8094 160.239 27.7607 157.191 24 157.191C20.2393 157.191 17.1906 160.239 17.1906 164Z"
                      fill="#14f88b"
                    ></path>
                    <path
                      d="M34 164C34 169.523 29.5228 174 24 174C18.4772 174 14 169.523 14 164C14 158.477 18.4772 154 24 154C29.5228 154 34 158.477 34 164ZM17.1906 164C17.1906 167.761 20.2393 170.809 24 170.809C27.7607 170.809 30.8094 167.761 30.8094 164C30.8094 160.239 27.7607 157.191 24 157.191C20.2393 157.191 17.1906 160.239 17.1906 164Z"
                      stroke="#14f88b"
                      stroke-width="2"
                      mask="url(#path-5-inside-2_1491_132638)"
                    ></path>
                  </g>
                  <circle
                    cx="24"
                    cy="164"
                    r="8.5"
                    fill="#0B0D10"
                    stroke="#14f88b"
                    stroke-width="3"
                  ></circle>
                  <g filter="url(#filter3_f_1491_132638)">
                    <mask id="path-7-inside-3_1491_132638" fill="white">
                      <path
                        d="M33 326C33 331.523 28.5228 336 23 336C17.4772 336 13 331.523 13 326C13 320.477 17.4772 316 23 316C28.5228 316 33 320.477 33 326ZM16.1906 326C16.1906 329.761 19.2393 332.809 23 332.809C26.7607 332.809 29.8094 329.761 29.8094 326C29.8094 322.239 26.7607 319.191 23 319.191C19.2393 319.191 16.1906 322.239 16.1906 326Z"
                      ></path>
                    </mask>
                    <path
                      d="M33 326C33 331.523 28.5228 336 23 336C17.4772 336 13 331.523 13 326C13 320.477 17.4772 316 23 316C28.5228 316 33 320.477 33 326ZM16.1906 326C16.1906 329.761 19.2393 332.809 23 332.809C26.7607 332.809 29.8094 329.761 29.8094 326C29.8094 322.239 26.7607 319.191 23 319.191C19.2393 319.191 16.1906 322.239 16.1906 326Z"
                      fill="#14f88b"
                    ></path>
                    <path
                      d="M33 326C33 331.523 28.5228 336 23 336C17.4772 336 13 331.523 13 326C13 320.477 17.4772 316 23 316C28.5228 316 33 320.477 33 326ZM16.1906 326C16.1906 329.761 19.2393 332.809 23 332.809C26.7607 332.809 29.8094 329.761 29.8094 326C29.8094 322.239 26.7607 319.191 23 319.191C19.2393 319.191 16.1906 322.239 16.1906 326Z"
                      stroke="#14f88b"
                      stroke-width="2"
                      mask="url(#path-7-inside-3_1491_132638)"
                    ></path>
                  </g>
                  <circle
                    cx="23"
                    cy="326"
                    r="8.5"
                    fill="#0B0D10"
                    stroke="#14f88b"
                    stroke-width="3"
                  ></circle>
                  <defs>
                    <filter
                      id="filter0_f_1491_132638"
                      x="8.02344"
                      y="17.9944"
                      width="30.332"
                      height="326.005"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      ></feBlend>
                      <feGaussianBlur
                        stdDeviation="6"
                        result="effect1_foregroundBlur_1491_132638"
                      ></feGaussianBlur>
                    </filter>
                    <filter
                      id="filter1_f_1491_132638"
                      x="0"
                      y="0"
                      width="44"
                      height="44"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      ></feBlend>
                      <feGaussianBlur
                        stdDeviation="6"
                        result="effect1_foregroundBlur_1491_132638"
                      ></feGaussianBlur>
                    </filter>
                    <filter
                      id="filter2_f_1491_132638"
                      x="2"
                      y="142"
                      width="44"
                      height="44"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      ></feBlend>
                      <feGaussianBlur
                        stdDeviation="6"
                        result="effect1_foregroundBlur_1491_132638"
                      ></feGaussianBlur>
                    </filter>
                    <filter
                      id="filter3_f_1491_132638"
                      x="1"
                      y="304"
                      width="44"
                      height="44"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      ></feBlend>
                      <feGaussianBlur
                        stdDeviation="6"
                        result="effect1_foregroundBlur_1491_132638"
                      ></feGaussianBlur>
                    </filter>
                    <linearGradient
                      id="paint0_linear_1491_132638"
                      x1="22.0018"
                      y1="32.0036"
                      x2="14.5092"
                      y2="387.333"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#14f88b"></stop>
                      <stop offset="1" stop-color="#14f88b"></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1491_132638"
                      x1="22.0018"
                      y1="32.0036"
                      x2="14.5092"
                      y2="387.333"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#14f88b"></stop>
                      <stop offset="1" stop-color="#14f88b"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div class="p-0 d-flex flex-column">
                  <div class="step-item">
                    <div
                      class="step-content bg-gray-200 p-6 rounded mt-3 cursor-pointer"
                      @click="currentImage = 'board'"
                    >
                      <p class="h2 text-dark m-0 text-start">Board</p>
                      <p class="text-muted px-1 fs-5 text-start">
                        Organize tasks visually with a Kanban-style board. Drag
                        and drop tasks to update their status.
                      </p>
                    </div>
                  </div>
                  <div class="step-item">
                    <div
                      class="step-content bg-gray-200 p-6 rounded mt-3 cursor-pointer"
                      @click="currentImage = 'backlog'"
                    >
                      <p class="h2 text-dark m-0 text-start">Backlog</p>
                      <p class="text-muted px-1 fs-5 text-start">
                        Manage your task backlog efficiently. Prioritize tasks
                        and plan sprints with ease.
                      </p>
                    </div>
                  </div>

                  <div class="step-item">
                    <div
                      class="step-content bg-gray-200 p-6 rounded mt-3 cursor-pointer"
                      @click="currentImage = 'teams'"
                    >
                      <p class="h2 text-dark m-0 text-start">Teams</p>
                      <p class="text-muted px-1 fs-5 text-start">
                        Collaborate with your team. Assign tasks, track
                        progress, and communicate seamlessly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-5 m-auto d-none d-lg-flex justify-content-center align-items-center"
              >
                <img
                  v-if="currentImage == 'board'"
                  src="~/assets/media/images-desgin/board.png"
                  class="d-sm-none d-lg-block mw-100 shadow"
                />
                <img
                  v-else-if="currentImage == 'backlog'"
                  src="~/assets/media/images-desgin/backlog.png"
                  class="d-sm-none d-lg-block mw-100 shadow"
                />
                <img
                  v-else-if="currentImage == 'teams'"
                  src="~/assets/media/images-desgin/team.png"
                  class="d-sm-none d-lg-block mw-100 shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--end::How It Works Section-->
      <!-- Start customers Section -->
      <section
        class="customers mb-n10 mb-lg-n20 z-index-2 py-20"
        id="customers"
      >
        <div class="container text-center mb-17">
          <div class="title">
            <h3
              class="display-4 mb-5"
              id="how-it-works"
              data-kt-scroll-offset="{default: 100, lg: 150}"
            >
            Customer <span class="btn-show">Reviews</span>
            </h3>
            <p class="fs-5 text-muted">
              Customer reviews on use TaskSwift.
            </p>
          </div>
          <div
            id="carouselExampleDark"
            class="carousel carousel-dark slide py-4"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators m-0">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="3"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner col-12 col-lg-8 py-4 position-relative">
              <div
                class="carousel-item position-relative w-100 active overflow-hidden"
                data-bs-interval="10000"
              >
                <div
                  class="carousel-caption bg-white pb-0 position-relative start-0 top-0 d-md-block card"
                >
                  <p
                    class="card-body d-flex align-items-center m-4 p-3 fs-2 text-muted"
                  >
                    “I’ve been using TaskSwift for several months now, and I
                    couldn’t be happier. The user interface is easy to navigate,
                    and the pages load quickly. I love how tasks are organized
                    and tracked, which has helped me manage my personal and work
                    projects much more effectively.”
                  </p>
                  <div
                    class="card-footer bg-light p-3 d-flex justify-content-center align-items-center"
                  >
                    <img
                      src="~/assets/media/avatars/blank.png"
                      alt="customer"
                    />
                    <div class="text ms-3">
                      <h4 class="fw-bold m-0">Carl Rowan</h4>
                      <span>Aglets Inc</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="carousel-item position-relative w-100"
                data-bs-interval="2000"
              >
                <div
                  class="carousel-caption pb-0 position-relative start-0 top-0 d-md-block card"
                >
                  <p
                    class="card-body d-flex align-items-center m-4 p-3 fs-2 text-muted"
                  >
                    “I’ve tried several task management websites, but TaskSwift
                    is by far the best for me. It allows me to easily add tasks
                    and projects, with plenty of options for categorizing and
                    organizing them flexibly.”
                  </p>
                  <div
                    class="card-footer bg-light p-3 d-flex justify-content-center align-items-center"
                  >
                    <img
                      src="~/assets/media/avatars/blank.png"
                      alt="customer"
                    />
                    <div class="text ms-3">
                      <h4 class="fw-bold m-0">Joe Rowan</h4>
                      <span>Aglets Inc</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="carousel-item position-relative w-100"
                data-bs-interval="3000"
              >
                <div
                  class="carousel-caption pb-0 position-relative start-0 top-0 d-md-block card"
                >
                  <p
                    class="card-body d-flex align-items-center m-4 p-3 fs-2 text-muted"
                  >
                    “While the website is generally good, I had trouble
                    customizing some tasks and advanced options. Sometimes it’s
                    difficult to adjust deadlines or set priorities as flexibly
                    as I’d like.”
                  </p>
                  <div
                    class="card-footer bg-light p-3 d-flex justify-content-center align-items-center"
                  >
                    <img
                      src="~/assets/media/avatars/blank.png"
                      alt="customer"
                    />
                    <div class="text ms-3">
                      <h4 class="fw-bold m-0">Sara Ahmed</h4>
                      <span>Aglets Inc</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="carousel-item position-relative w-100"
                data-bs-interval="4000"
              >
                <div
                  class="carousel-caption pb-0 position-relative start-0 top-0 d-md-block card"
                >
                  <p
                    class="card-body d-flex align-items-center m-4 p-3 fs-2 text-muted"
                  >
                    “The site is fine overall, but I found it a bit hard to
                    navigate between sections. For instance, it took me a while
                    to find old tasks or organize them in a more structured way.
                    I think improving the navigation structure would greatly
                    enhance the user experience.”
                  </p>
                  <div
                    class="card-footer bg-light p-3 d-flex justify-content-center align-items-center"
                  >
                    <img
                      src="~/assets/media/avatars/blank.png"
                      alt="customer"
                    />
                    <div class="text ms-3">
                      <h4 class="fw-bold m-0">Ali Rowan</h4>
                      <span>Aglets Inc</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev top-50 btn-slider d-none d-lg-flex"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next top-50 btn-slider d-none d-lg-flex"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      <!-- End customers Section -->
      <!-- Start questions Section -->
      <section
        class="questions mb-n10 mb-lg-n20 z-index-2 py-20"
        id="questions"
      >
        <div class="container text-center mb-17">
          <div class="title">
            <h3
              class="display-4 mb-5"
              id="how-it-works"
              data-kt-scroll-offset="{default: 100, lg: 150}"
            >
              Got <span class="btn-show">questions?</span>
            </h3>
            <p class="fs-5 text-muted">
              Get the answers to your questions about TaskSwift.
            </p>
          </div>
          <div class="ques my-5 mx-3">
            <div class="accordion col-12 col-lg-8 m-auto" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button fs-3 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    What is TaskSwift?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body text-start fs-4">
                    TaskSwift is an easy-to-use task management system designed
                    to help teams and individuals manage projects, tasks,
                    deadlines, and workflows. It offers features like task
                    creation, assignment, progress tracking, and collaboration
                    tools to streamline project management.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button fs-3 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    How can I sign up for TaskSwift?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body text-start fs-4">
                    To sign up, simply visit our website and click on the “Sign
                    Up” button. You’ll need to provide your email address and
                    create a password. After registering, you can start managing
                    your tasks right away!
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button fs-3 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Can I use TaskSwift for multiple projects?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body text-start fs-4">
                    Yes! TaskSwift allows you to create and manage multiple
                    projects. You can easily switch between projects, track
                    progress, and assign tasks to different team members within
                    each project.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button fs-3 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    aria-expanded="false"
                    aria-controls="collapse3"
                  >
                    Is there a free version of TaskSwift?
                  </button>
                </h2>
                <div
                  id="collapse3"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body text-start fs-4">
                    Yes, we offer a free version of TaskSwift with basic
                    features like task creation, project management, and
                    collaboration. If you need more advanced features such as
                    additional integrations, reporting tools, and priority
                    support, we offer paid plans.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button fs-3 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse5"
                    aria-expanded="false"
                    aria-controls="collapse5"
                  >
                    Can I export my project data from TaskSwift?
                  </button>
                </h2>
                <div
                  id="collapse5"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body text-start fs-4">
                    Yes! TaskSwift allows you to export your project data into
                    various formats, including CSV and PDF, so you can share
                    reports or analyze your project progress externally.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End questions Section -->
      <!--begin::Footer Section-->
      <footer class="mb-0">
        <div class="bg-white">
          <div class="container">
            <div class="d-flex flex-stack py-7 justify-content-between">
              <div class="d-flex align-items-center">
                <NuxtLink to="/">
                  <img
                    alt="Logo"
                    src="~/assets/media/logos/logo-dark.png"
                    class="logo-sticky h-20px h-lg-40px h-sm-40px"
                  />
                </NuxtLink>
              </div>
              <div>
                <span class="mx-5 fs-6 fw-semibold text-gray-600 pt-1" href="#"
                  >&copy; 2023-2025 copyright in TaskSwift Software.</span
                >
              </div>
            </div>
          </div>
        </div>
      </footer>
      <!--end::Footer Section-->
    </div>
  </div>
</template>
<style scoped>
.hero-content {
  max-width: 600px;
}
.card-body i {
  transition: transform 0.3s ease;
}

.card-body i.fa-angle-up {
  transform: rotate(180deg);
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
/* Timeline container styles */
.step-content {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.step-content:hover {
  background-color: var(--bs-app-bg-color);
}
/* Start customers section */
.customers .carousel .carousel-indicators button {
  font-size: 0;
  height: 16px;
  width: 16px;
  padding: 0;
  border-radius: 100px;
  background: white;
  border: 2px solid #eee;
  transition: all 0.3s ease;
}
.customers img {
  max-width: 40px;
  border-radius: 50%;
}

.customers .carousel .carousel-indicators button.active {
  width: 32px;
}
.customers .carousel .carousel-inner {
  width: 60%;
  margin: auto;
}
.customers .carousel .carousel-caption .card-body {
  padding: 50px;
}
.customers .carousel button.btn-slider {
  border-radius: 50%;
  background-color: #eee;
  width: 50px;
  height: 50px;
}
@media (width < 991px) {
  .customers .carousel .carousel-inner,
  .how-work {
    width: 80% !important;
  }
}
@media (width > 991px) {
  .customers .carousel .carousel-control-next {
    right: 10%;
  }
  .customers .carousel .carousel-control-prev {
    left: 10%;
  }
}
/* End customers section */
/* Start questions section */
.questions .container .ques .card {
  width: 60%;
  margin: auto;
  height: auto;
  height: 62px;
  background-color: transparent;
  overflow: hidden;
  transition: ease-in-out 0.2s;
}
.questions .container .ques .card:not(:last-child) {
  border-bottom: 1px solid #e5dbfb !important;
}
.accordion-item .accordion-button {
  color: black;
}
/* End questions section */
</style>