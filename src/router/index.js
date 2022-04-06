import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView";
import EditTodo from "@/views/EditTodo";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/todo/:todoId",
    name: "edit",
    component: EditTodo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
