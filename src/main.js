import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import ConfirmationService from 'primevue/confirmationservice';
import { ToastService } from 'primevue';
import { createPinia } from 'pinia';


const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(PrimeVue,{
  theme:
    {
      preset: Lara,
    }
});
app.use(ConfirmationService);
app.use(ToastService);
app.use(createPinia());

app.mount('#app')
