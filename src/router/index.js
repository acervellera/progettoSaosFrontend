import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "../views/LoginUser.vue"; // Vista per il login
import UserSignup from "../views/UserSignup.vue"; // Vista per la registrazione

const routes = [
  {
    path: "/",
    name: "UserLogin", // Nome multi-word per il login
    component: UserLogin,
  },
  {
    path: "/signup",
    name: "UserSignup", // Nome multi-word per la registrazione
    component: UserSignup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
