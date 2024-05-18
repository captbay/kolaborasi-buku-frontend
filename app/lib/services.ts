// "use server";
import ax from "axios";
// import { NextRequest, NextResponse } from "next/server";
// import { useRouter } from "next/navigation";

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

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       console.log(error);
//     }
//     return error;
//   }
// );
