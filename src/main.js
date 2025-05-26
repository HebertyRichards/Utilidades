import { createApp } from "vue";
import "../src/style/style.css";
import App from "./App.vue";
import router from "./routes";

createApp(App).use(router).mount("#app");
