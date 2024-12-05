import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "../views/LoginUser.vue";
import UserSignup from "../views/UserSignup.vue";
import Initiate2FA from "../views/Initiate2FA.vue"; // Importa la nuova vista

const routes = [
  {
    path: "/",
    name: "UserLogin",
    component: UserLogin,
  },
  {
    path: "/signup",
    name: "UserSignup",
    component: UserSignup,
  },
  {
    path: "/initiate-2fa",
    name: "Initiate2FA", // Nuova vista per il QR code
    component: Initiate2FA,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
