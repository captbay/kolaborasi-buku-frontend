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

export const resendEmailVerification = (email: string) => {
  return axios.post("/auth/email/resend", { email });
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

// update User
export const updateUser = (
  nama_depan: string,
  nama_belakang: string,
  no_telepon: string,
  email: string,
  tgl_lahir: string,
  gender: string,
  alamat: string,
  provinsi: string,
  kecamatan: string,
  kota: string,
  kode_pos: number,
  token: string,
  token_type: string
) => {
  return axios.put(
    `user/update`,
    {
      nama_depan,
      nama_belakang,
      no_telepon,
      email,
      tgl_lahir,
      gender,
      alamat,
      provinsi,
      kecamatan,
      kota,
      kode_pos,
    },
    {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    }
  );
};

export const uploadFotoProfil = (
  foto_profil: FormData,
  token: string,
  token_type: string
) => {
  return axios.post("/user/uploadFotoProfil", foto_profil, {
    headers: {
      Authorization: `${token_type} ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadFileMember = (
  form: FormData,
  token: string,
  token_type: string
) => {
  return axios.post("/user/uploadFileMember", form, {
    headers: {
      Authorization: `${token_type} ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// delete notifikasi
export const deleteNotifikasi = (token: string, token_type: string) => {
  return axios.delete("user/notifikasi/delete", {
    headers: {
      Authorization: `${token_type} ${token}`,
    },
  });
};

// read notifikasi
export const readNotifikasi = (token: string, token_type: string) => {
  return axios.put("user/notifikasi/read", null, {
    headers: {
      Authorization: `${token_type} ${token}`,
    },
  });
};

// add keranjang
export const addKeranjang = (
  buku_dijual_id: string,
  token: string,
  token_type: string
) => {
  return axios.post(
    "keranjang/add",
    {
      buku_dijual_id,
    },
    {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    }
  );
};
