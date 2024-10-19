export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ["@pinia/nuxt", "nuxt-icon"],
    css: [
        "~/node_modules/bootstrap/dist/css/bootstrap.min.css",
        "~/assets/scss/main.scss",
        "~/assets/plugins/global/plugins.bundle.css",
        "~/assets/css/style.bundle.css",
        "~/assets/css/style.css",
    ],
    plugins: [
        '~/plugins/toastification.js',
        '~/plugins/primevue.js'],
    build: {
        transpile: ['vue-toastification']
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
                }
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
        "/": {ssr: true},
    },
});
