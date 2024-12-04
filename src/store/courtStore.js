// src/store/courtStore.js
import { defineStore } from "pinia";
import { mockCourts } from "../mocks/mockData";

export const useCourtStore = defineStore("court", {
  state: () => ({
    courts: [],
    court: null,
    loading: false,
    error: null,
  }),
  actions: {
    fetchCourts() {
      this.loading = true;
      try {
        this.courts = mockCourts;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    fetchCourt(id) {
      this.loading = true;
      try {
        this.court = mockCourts.find((court) => court._id === id);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    addCourt(data) {
      try {
        data._id = (mockCourts.length + 1).toString();
        mockCourts.push(data);
        this.fetchCourts();
      } catch (error) {
        this.error = error;
      }
    },
    editCourt(id, data) {
      try {
        const index = mockCourts.findIndex((court) => court._id === id);
        if (index !== -1) {
          mockCourts[index] = { ...mockCourts[index], ...data };
          this.fetchCourts();
        }
      } catch (error) {
        this.error = error;
      }
    },
    removeCourt(id) {
      try {
        const index = mockCourts.findIndex((court) => court._id === id);
        if (index !== -1) {
          mockCourts.splice(index, 1);
          this.fetchCourts();
        }
      } catch (error) {
        this.error = error;
      }
    },
  },
});
