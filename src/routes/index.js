import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/HomePage.vue";
import Qrcode from "../views/HomeQrcode.vue";
import Conversor from "../views/HomeConversor.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/qrcode", component: Qrcode, meta: { title: "Gerador de QrCode" } },
  {
    path: "/conversor",
    component: Conversor,
    meta: { title: "Conversor de Documentos" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || "Utilidades";
});

export default router;
