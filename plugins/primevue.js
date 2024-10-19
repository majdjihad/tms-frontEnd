import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; // Replace with your desired theme
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default defineNuxtPlugin((nuxtApp) =>
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
);
