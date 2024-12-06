import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "../views/LoginUser.vue";
import UserSignup from "../views/UserSignup.vue";
import Initiate2FA from "../views/Initiate2FA.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";
import UserDashboard from "@/views/UserDashboard.vue";

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
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
  },
  {
    path: "/user/dashboard",
    name: "UserDashboard",
    component: UserDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
