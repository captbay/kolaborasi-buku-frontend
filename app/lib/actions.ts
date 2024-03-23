import { axios } from "./services";

/*
  auth
  */
export const login = (email: string, password: string) => {
  return axios.post("/auth/login", { email, password });
};

export const logout = (token: string, token_type: string) => {
  return axios.get("/auth/logout", {
    headers: {
      Authorization: `${token_type} ${token}`,
    },
  });
};

export const register = (
  nama_depan: string,
  nama_belakang: string,
  no_telepon: string,
  email: string,
  password: string
) => {
  return axios.post("/auth/register", {
    nama_depan: nama_depan,
    nama_belakang: nama_belakang,
    no_telepon: no_telepon,
    email: email,
    password: password,
  });
};

export const sendEmailForgotPassword = (email: string) => {
  return axios.post("/auth/forgotPassword", { email });
};

export const resetPassword = (
  token: string,
  email: string,
  password: string,
  confirm_password: string
) => {
  return axios.post("/auth/resetPassword", {
    token,
    email,
    password,
    confirm_password,
  });
};

export const gantiPassword = (
  password: string,
  new_password: string,
  confirm_password: string,
  token: string,
  token_type: string
) => {
  return axios.put(
    "/auth/changePassword",
    {
      password,
      new_password,
      confirm_password,
    },
    {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    }
  );
};
