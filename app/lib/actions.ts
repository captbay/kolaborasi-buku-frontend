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

// hubungi-kami
export const hubungiKami = (
  nama: string,
  email: string,
  subjek: string,
  pesan: string
) => {
  return axios.post("/auth/hubungi-kami", { nama, email, subjek, pesan });
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
    `/user/update`,
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

export const uploadMouKolaborasi = (
  id: string,
  file_mou: FormData,
  token: string,
  token_type: string
) => {
  return axios.post("/koleksi-buku-kolaborasi-user/uploadMou/" + id, file_mou, {
    headers: {
      Authorization: `${token_type} ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadBabKolaborasi = (
  id: string,
  file_bab: FormData,
  token: string,
  token_type: string
) => {
  return axios.post("/koleksi-buku-kolaborasi-user/uploadBab/" + id, file_bab, {
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
  return axios.delete("/user/notifikasi/delete", {
    headers: {
      Authorization: `${token_type} ${token}`,
    },
  });
};

// read notifikasi
export const readNotifikasi = (token: string, token_type: string) => {
  return axios.put("/user/notifikasi/read", null, {
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
    "/keranjang/add",
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

// delete keranjang
export const deleteKeranjang = (
  keranjang_id: string,
  token: string,
  token_type: string
) => {
  return axios.delete(`/keranjang/delete/${keranjang_id}`, {
    headers: {
      Authorization: `${token_type} ${token}`,
    },
  });
};

// add transaksi buku
export const addTransaksiBuku = (
  buku_dijual: Array<string>,
  token: string,
  token_type: string
) => {
  return axios.post(
    "/transaksi-buku-dijual/add",
    {
      buku_dijual,
    },
    {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    }
  );
};

// update status gagal transaksi buku
export const updateStatusTransaksiBuku = (
  transaksi_buku_id: string,
  token: string,
  token_type: string
) => {
  return axios.put(
    `/transaksi-buku-dijual/gagal`,
    {
      transaksi_buku_id,
    },
    {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    }
  );
};

// update status gagal transaksi penerbitan
export const updateTrxPenerbitanAgain = (
  id: string,
  token: string,
  token_type: string
) => {
  return axios.get(`/transaksi-paket-penerbitan/transaction-again/${id}`, {
    headers: {
      Authorization: `${token_type} ${token}`,
    },
  });
};

// update status gagal transaksi penerbitan
export const updateStatusTransaksiPenerbitan = (
  trx_id: string,
  token: string,
  token_type: string
) => {
  return axios.put(
    `/transaksi-paket-penerbitan/gagal`,
    {
      trx_id,
    },
    {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    }
  );
};

// upload bukti bayar pembelian paket penerbitan
export const uploadBuktiBayarPenerbitanBuku = (
  id: string,
  form: FormData,
  token: string,
  token_type: string
) => {
  return axios.post(
    `/transaksi-paket-penerbitan/upload-bukti-pembayaran/${id}`,
    form,
    {
      headers: {
        Authorization: `${token_type} ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// upload bukti bayar pembelian buku
export const uploadBuktiBayarPembelianBuku = (
  transaksi_buku_id: string,
  form: FormData,
  token: string,
  token_type: string
) => {
  return axios.post(
    `/transaksi-buku-dijual/upload-bukti-pembayaran/${transaksi_buku_id}`,
    form,
    {
      headers: {
        Authorization: `${token_type} ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// upload buku review
export const uploadBukuReview = (
  form: FormData,
  token: string,
  token_type: string
) => {
  return axios.post(`/transaksi-paket-penerbitan/add`, form, {
    headers: {
      Authorization: `${token_type} ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// getDownloadBuku
export const getDownloadBuku = (
  buku_dijual_id: string,
  token: string,
  token_type: string
) => {
  return axios.get(`/koleksi-buku-user/download/${buku_dijual_id}`, {
    responseType: "blob",
    headers: {
      Authorization: `${token_type} ${token}`,
      Accept: "application/pdf",
    },
  });
};

// getDownloadBukuPermohonanTerbit
export const getDownloadBukuPermohonanTerbit = (
  id: string,
  token: string,
  token_type: string
) => {
  return axios.get(`/koleksi-buku-penerbitan-user/download/${id}`, {
    responseType: "blob",
    headers: {
      Authorization: `${token_type} ${token}`,
      Accept: "application/pdf",
    },
  });
};

// getDownloadMou
export const getDownloadMou = (
  filter: string,
  token: string,
  token_type: string
) => {
  return axios.get(`/mou/downloadMou/${filter}`, {
    responseType: "blob",
    headers: {
      Authorization: `${token_type} ${token}`,
      Accept: "application/pdf",
    },
  });
};

// add testimoni
export const addTestimoni = (
  buku_dijual_id: string,
  rating: number,
  ulasan: string,
  token: string,
  token_type: string
) => {
  return axios.post(
    `/koleksi-buku-user/add-testimoni/${buku_dijual_id}`,
    {
      rating,
      ulasan,
    },
    {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    }
  );
};

// add transaksi kolaborasi
export const addTransaksiKolaborasi = (
  bab_buku_kolaborasi_id: string,
  token: string,
  token_type: string
) => {
  return axios.post(
    "/transaksi-buku-kolaborasi/add",
    {
      bab_buku_kolaborasi_id,
    },
    {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    }
  );
};

// update status gagal transaksi kolaborasi buku
export const updateStatusTransaksiKolaborasiBuku = (
  transaksi_kolaborasi_buku_id: string,
  token: string,
  token_type: string
) => {
  return axios.put(
    `/transaksi-buku-kolaborasi/gagal`,
    {
      transaksi_kolaborasi_buku_id,
    },
    {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    }
  );
};

// update failed for user kolaborasi
export const updateTimeExpKolaborasiUser = (
  id: string,
  token: string,
  token_type: string
) => {
  return axios.put(
    `/koleksi-buku-kolaborasi-user/failedKolaborasi/${id}`,
    {},
    {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    }
  );
};

// upload bukti bayar pembelian kolaborasi buku
export const uploadBuktiBayarPembelianKolaborasiBuku = (
  transaksi_kolaborasi_buku_id: string,
  form: FormData,
  token: string,
  token_type: string
) => {
  return axios.post(
    `/transaksi-buku-kolaborasi/upload-bukti-pembayaran/${transaksi_kolaborasi_buku_id}`,
    form,
    {
      headers: {
        Authorization: `${token_type} ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
