import ax from "axios";

export const axios = ax.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  //   // "X-Requested-With": "XMLHttpRequest",
  // },
  // withCredentials: true,
  // withXSRFToken: true,
});
