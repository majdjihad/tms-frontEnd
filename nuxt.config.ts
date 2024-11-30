import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
      },
    },
  },
});

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-icon", "@primevue/nuxt-module"],

  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        option: {
          prefix: "p",
          cssLayer: false,
        },
      },
    },
  },
  css: [
    "bootstrap/dist/css/bootstrap.css",
    "~/assets/plugins/global/plugins.bundle.css",
    "~/assets/css/style.bundle.css",
    "~/assets/css/style.css",
    "primeicons/primeicons.css",
  ],

  plugins: ["~/plugins/toastification.js", "~/plugins/clickOutside.js"],

  build: {
    transpile: ["vue-toastification"],
  },

  app: {
    head: {
      script: [
        {
          // metronic plugins bundle
          type: "text/javascript",
          src: "https://preview.keenthemes.com/metronic8/demo32/assets/plugins/global/plugins.bundle.js",
        },
        {
          // metronic script bundle
          type: "text/javascript",
          src: "https://preview.keenthemes.com/metronic8/demo32/assets/js/scripts.bundle.js",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_BACKEND_URL,
      frontendUrl: process.env.NUXT_FRONTEND_URL,
    },
  },

  imports: {
    dirs: ["./utils"],
  },

  ssr: false,

  // allow the ssr only on landing page
  routeRules: {
    "/": { ssr: true },
  },

  compatibilityDate: "2024-11-23",
});
