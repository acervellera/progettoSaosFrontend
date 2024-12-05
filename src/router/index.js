import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "../views/LoginUser.vue"; // Aggiorna il nome importato

const routes = [
  {
    path: "/",
    name: "UserLogin", // Usa il nome multi-word
    component: UserLogin, // Nome aggiornato
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
