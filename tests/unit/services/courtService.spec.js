import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getCourts,
  getCourtById,
  createCourt,
  updateCourt,
  deleteCourt,
} from "@/services/courtService";

describe("courtService", () => {
  const mock = new MockAdapter(axios);
  const API_URL = `${import.meta.env.VITE_API_URL}/courts`;

  afterEach(() => {
    mock.reset();
  });

  it("getCourts récupère la liste des tribunaux", async () => {
    const data = [{ _id: "1", name: "Cour Suprême" }];
    mock.onGet(API_URL).reply(200, data);

    const response = await getCourts();
    expect(response.data).toEqual(data);
  });

  it("getCourtById récupère un tribunal spécifique", async () => {
    const data = { _id: "1", name: "Cour Suprême" };
    mock.onGet(`${API_URL}/1`).reply(200, data);

    const response = await getCourtById("1");
    expect(response.data).toEqual(data);
  });

  it("createCourt crée un nouveau tribunal", async () => {
    const data = { name: "Nouveau Tribunal" };
    mock.onPost(API_URL).reply(201, data);

    const response = await createCourt(data);
    expect(response.data).toEqual(data);
  });

  it("updateCourt met à jour un tribunal", async () => {
    const data = { name: "Tribunal Modifié" };
    mock.onPut(`${API_URL}/1`).reply(200, data);

    const response = await updateCourt("1", data);
    expect(response.data).toEqual(data);
  });

  it("deleteCourt supprime un tribunal", async () => {
    mock.onDelete(`${API_URL}/1`).reply(200);

    const response = await deleteCourt("1");
    expect(response.status).toBe(200);
  });
});
