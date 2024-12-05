// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import CourtList from "../views/CourtList.vue";
import CourtDetail from "../views/CourtDetail.vue";
import CreateCourt from "../views/CreateCourt.vue";

const routes = [
  { path: "/", name: "Home", component: CourtList },
  {
    path: "/court/:id",
    name: "CourtDetail",
    component: CourtDetail,
    props: true,
  },
  { path: "/create", name: "CreateCourt", component: CreateCourt },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
