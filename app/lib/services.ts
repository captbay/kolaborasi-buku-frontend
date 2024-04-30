import ax from "axios";

export const axios = ax.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
  // withCredentials: true,
  // withXSRFToken: true,
});
