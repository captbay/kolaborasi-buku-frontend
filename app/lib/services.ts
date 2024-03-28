import ax from "axios";

export const axios = ax.create({
  baseURL: "http://kolaborasi-buku-backend.test/api",
  headers: {
    "Content-Type": "application/json",
    // "X-Requested-With": "XMLHttpRequest",
  },
  // withCredentials: true,
  // withXSRFToken: true,
});
