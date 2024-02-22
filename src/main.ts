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
