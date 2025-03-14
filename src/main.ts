import { createApp } from "vue";
import App from "./App.vue";

// Vue Router
import router from "./router";
// Vue Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

/* Style.Tailwind Import */
import "./style.tailwind.css";
/* Style Constants Import */
import "./style.constants.css";

createApp(App).use(router).use(pinia).mount("#app");
