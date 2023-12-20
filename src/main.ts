/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import axios from "axios";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import interceptors from "@/plugins/interceptors";
import router from "@/router";

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);

registerPlugins(app)

app.mount('#app')




// import { createApp } from "vue";
// import axios from "axios";
// import { createPinia } from "pinia";
// import { VueQueryPlugin } from "@tanstack/vue-query";
// import App from "@/App.vue";
// import interceptors from "@/plugins/interceptors";
// import router from "@/router";

// // api interceptors
// interceptors(axios);

// // define libs
// const pinia = createPinia();

// // create app
// const app = createApp(App);

// // use libs
// app.use(pinia);
// app.use(router);
// app.use(VueQueryPlugin);

// // mount app
// app.mount("#app");