// src/services/courtService.js
import axios from "axios";

const API_URL = "http://localhost:4000/api/courts";

export const getCourts = () => axios.get(API_URL);
export const getCourtById = (id) => axios.get(`${API_URL}/${id}`);
export const createCourt = (data) => axios.post(API_URL, data);
export const updateCourt = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCourt = (id) => axios.delete(`${API_URL}/${id}`);
