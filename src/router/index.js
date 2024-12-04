// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import CourtList from "../views/CourtList.vue";
import CourtCreate from "../views/CourtCreate.vue";
import CourtEdit from "../views/CourtEdit.vue";

const routes = [
  {
    path: "/",
    redirect: "/courts",
  },
  {
    path: "/courts",
    name: "CourtList",
    component: CourtList,
  },
  {
    path: "/courts/create",
    name: "CourtCreate",
    component: CourtCreate,
  },
  {
    path: "/courts/edit/:id",
    name: "CourtEdit",
    component: CourtEdit,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
