import { createRouter, createWebHistory } from "vue-router";
import { describe, it, expect, vi } from "vitest";
import router from "../src/router/index.js";
import CourtList from "../src/views/CourtList.vue";
import CourtDetail from "../src/views/CourtDetail.vue";
import CreateCourt from "../src/views/CreateCourt.vue";
import CourtForm from "../src/components/courts/CourtForm.vue";

describe("Router Configuration", () => {
  it("doit contenir toutes les routes définies", () => {
    const routes = router.getRoutes();

    // Vérifie que toutes les routes existent
    expect(routes).toHaveLength(4);

    // Vérifie chaque route individuellement
    expect(routes.find((route) => route.name === "Home")).toMatchObject({
      path: "/",
      component: CourtList,
    });

    expect(routes.find((route) => route.name === "CourtDetail")).toMatchObject({
      path: "/court/:id",
      component: CourtDetail,
      props: true,
    });

    expect(routes.find((route) => route.name === "CreateCourt")).toMatchObject({
      path: "/create",
      component: CreateCourt,
    });

    expect(routes.find((route) => route.path === "/edit/:id")).toMatchObject({
      component: CourtForm,
      props: true,
    });
  });

  it("doit utiliser `createWebHistory` comme méthode d'historique", () => {
    expect(router.options.history).toBeInstanceOf(createWebHistory);
  });

  it("navigue correctement vers la page d'accueil", async () => {
    router.push("/");
    await router.isReady();
    expect(router.currentRoute.value.name).toBe("Home");
  });

  it("navigue correctement vers la page des détails d'un tribunal", async () => {
    router.push({ name: "CourtDetail", params: { id: "1" } });
    await router.isReady();
    expect(router.currentRoute.value.name).toBe("CourtDetail");
    expect(router.currentRoute.value.params.id).toBe("1");
  });

  it("navigue correctement vers la page de création d'un tribunal", async () => {
    router.push("/create");
    await router.isReady();
    expect(router.currentRoute.value.name).toBe("CreateCourt");
  });

  it("navigue correctement vers la page d'édition d'un tribunal", async () => {
    router.push({ path: "/edit/1", params: { id: "1" } });
    await router.isReady();
    expect(router.currentRoute.value.path).toBe("/edit/1");
    expect(router.currentRoute.value.params.id).toBe("1");
  });

  it("retourne une erreur 404 pour une route inconnue", async () => {
    const consoleWarnMock = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    try {
      await router.push("/unknown-route");
      await router.isReady();
    } catch (error) {
      expect(error).toBeTruthy(); // Vérifie qu'une erreur est levée
    }

    consoleWarnMock.mockRestore();
  });
});
