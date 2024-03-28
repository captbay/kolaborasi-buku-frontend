"use client";
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";

const useGetCookie = () => {
  const [cookie, setCookie] = useState({
    token: "",
    id: "",
    token_type: "",
  });
  const cookieData = getCookie("token");

  const { token, id, token_type } = cookieData
    ? JSON.parse(cookieData)
    : {
        token: null,
        id: null,
        token_type: null,
      };
  useEffect(() => {
    setCookie({
      token,
      id,
      token_type,
    });
  }, [token, id, token_type, cookieData, setCookie]);

  const clearCookie = () => {
    deleteCookie("token");
  };

  return {
    id: cookie?.id || (cookieData && JSON.parse(cookieData)?.id),
    token: cookie?.token || (cookieData && JSON.parse(cookieData)?.token),
    token_type:
      cookie?.token_type || (cookieData && JSON.parse(cookieData)?.token_type),
    clearCookie,
  };
};

export default useGetCookie;
