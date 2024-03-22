"use client";
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";

const useGetCookie = () => {
  const [cookie, setCookie] = useState({
    token: null,
    role: null,
    nama_lengkap: null,
    email: null,
    id: null,
    token_type: null,
  });
  const cookieData = getCookie("token");

  const { token, role, nama_lengkap, email, id, token_type } = cookieData
    ? JSON.parse(cookieData)
    : {
        token: null,
        role: null,
        nama_lengkap: null,
        email: null,
        id: null,
        token_type: null,
      };
  useEffect(() => {
    setCookie({ token, role, nama_lengkap, email, id, token_type });
  }, [token, role, nama_lengkap, email, id, token_type, cookieData, setCookie]);

  const clearCookie = () => {
    deleteCookie("token");
  };

  return {
    role: cookie?.role,
    token: cookie?.token || (cookieData && JSON.parse(cookieData)?.token),
    email: cookie?.email,
    nama_lengkap: cookie?.nama_lengkap,
    id: cookie?.id,
    token_type: cookie?.token_type,
    clearCookie,
  };
};

export default useGetCookie;
