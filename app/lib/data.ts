import { axios } from "@/app/lib/services";
import { unstable_noStore as noStore } from "next/cache";

/*
 getDetailBukuPenerbitanUser
 */
export async function getDetailBukuPenerbitanUser(
  id: string,
  token: string,
  token_type: string
) {
  noStore();
  return await axios
    .get("/koleksi-buku-penerbitan-user/detail/" + id, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
 getDetailKolaborasiUser
 */
export async function getDetailKolaborasiUser(
  id: string,
  token: string,
  token_type: string
) {
  noStore();
  return await axios
    .get("/koleksi-buku-kolaborasi-user/detail/" + id, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
  getKoleksiBukuKolaborasiUser
  */
export async function getKoleksiBukuKolaborasiUser({
  limit = 10,
  page,
  search,
  token,
  token_type,
}: {
  limit: number;
  page: number;
  search?: string;
  token: string;
  token_type: string;
}) {
  noStore();
  return await axios
    .get("/koleksi-buku-kolaborasi-user/all", {
      params: {
        limit: limit,
        page: page,
        search: search,
      },
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
  getKoleksiBukuPenerbitanUser
  */
export async function getKoleksiBukuPenerbitanUser({
  limit = 10,
  page,
  search,
  token,
  token_type,
}: {
  limit: number;
  page: number;
  search?: string;
  token: string;
  token_type: string;
}) {
  noStore();
  return await axios
    .get("/koleksi-buku-penerbitan-user/all", {
      params: {
        limit: limit,
        page: page,
        search: search,
      },
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
  getKoleksiBukuUser
  */
export async function getKoleksiBukuUser({
  limit = 10,
  page,
  search,
  token,
  token_type,
}: {
  limit: number;
  page: number;
  search?: string;
  token: string;
  token_type: string;
}) {
  noStore();
  return await axios
    .get("/koleksi-buku-user/all", {
      params: {
        limit: limit,
        page: page,
        search: search,
      },
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
Transaksi Pembelian Buku
*/
export async function getPembelianBukuAll(
  status: string,
  token: string,
  token_type: string
) {
  noStore();
  return await axios
    .get("/transaksi-buku-dijual/all/?status=" + status, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getTrxPenjualanBuku(
  token_trx: string,
  token: string,
  token_type: string
) {
  noStore();
  return await axios
    .get("/transaksi-buku-dijual/detail/" + token_trx, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getPaketPenerbitanById(
  id: string,
  token: string,
  token_type: string
) {
  noStore();
  return await axios
    .get("/transaksi-paket-penerbitan/detail-paket/" + id, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getJasaTambahan(
  id: string,
  token: string,
  token_type: string
) {
  noStore();
  return await axios
    .get("/transaksi-paket-penerbitan/jasa-tambahan/" + id, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
Transaksi Pembelian Paket Penerbitan
*/
export async function getPembelianPaketPenerbitanAll(
  status: string,
  token: string,
  token_type: string
) {
  noStore();
  return await axios
    .get("/transaksi-paket-penerbitan/all/?status=" + status, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getTrxPaketPenerbitanById(
  token_trx: string,
  token: string,
  token_type: string
) {
  noStore();
  return await axios
    .get("/transaksi-paket-penerbitan/detail/" + token_trx, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
Transaksi Pembelian Kolaborasi Buku
*/
export async function getPembelianBukuKolaborasiAll(
  status: string,
  token: string,
  token_type: string
) {
  noStore();
  return await axios
    .get("/transaksi-buku-kolaborasi/all/?status=" + status, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
 Bab Kolaborasi Buku
 */
export async function getTrxBabKolaborasi(
  token_trx: string,
  token: string,
  token_type: string
) {
  noStore();
  return await axios
    .get("/transaksi-buku-kolaborasi/detail/" + token_trx, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
 User
 */
export async function getUser(id: string, token: string, token_type: string) {
  noStore();
  return await axios
    .get("/user/show/" + id, {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
  Notifikasi
  */
export async function getNotifikasi(token: string, token_type: string) {
  noStore();
  return await axios
    .get("/user/notifikasi", {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
      if (error.response.data.message === "Unauthenticated.") {
        return "Unauthenticated.";
      }
    });
}

/*
  Count Keranjang
  */
export async function getCountKeranjang(token: string, token_type: string) {
  noStore();
  return await axios
    .get("/keranjang/count", {
      headers: {
        Authorization: token_type + " " + token,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
  Keranjang
  */
export async function getKeranjang(token: string, token_type: string) {
  noStore();
  return await axios.get("keranjang/all", {
    headers: {
      Authorization: token_type + " " + token,
    },
  });
}

/*
 event
 */
export async function getEvent() {
  noStore();
  return await axios
    .get("/event/all")
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
 Paket
 */
export async function getPaket() {
  noStore();
  return await axios
    .get("/paket/all")
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
 kategori
 */
export async function getKategori() {
  noStore();
  return await axios
    .get("/kategori/all")
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
 buku
 */
export async function getBuku({
  limit = 10,
  page,
  search,
  order,
  kategori,
  hargaMin,
  hargaMax,
}: {
  limit: number;
  page: number;
  search?: string;
  order?: string;
  kategori?: string;
  hargaMin?: number;
  hargaMax?: number;
}) {
  noStore();
  return await axios
    .get("/buku/all", {
      params: {
        limit: limit,
        page: page,
        search: search,
        order: order,
        kategori: kategori,
        hargaMin: hargaMin,
        hargaMax: hargaMax,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function getDetailBuku(
  slug: string,
  token: string,
  token_type: string
) {
  noStore();

  if (token != null && token_type != null) {
    return await axios
      .get(`/buku/detail/${slug}`, {
        headers: {
          Authorization: token_type + " " + token,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.data.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    return await axios
      .get(`/buku/detail/${slug}`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.data.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export async function getBestSeller() {
  noStore();
  return await axios
    .get("/buku/best-seller")
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getAds() {
  noStore();
  return await axios
    .get("/buku/all", {
      params: {
        limit: 5,
        bookAds: true,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
 kolaborasi buku
 */
export async function getKolaborasi({
  limit = 10,
  search,
  page,
  order,
  kategori,
}: {
  limit: number;
  search?: string;
  page: number;
  order?: string;
  kategori?: string;
}) {
  noStore();
  return await axios
    .get("/buku-kolaborasi/all", {
      params: {
        limit: limit,
        page: page,
        search: search,
        order: order,
        kategori: kategori,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getDetailBukuKolaborasi(
  slug: string,
  token: string,
  token_type: string
) {
  noStore();

  if (token != null && token_type != null) {
    return await axios
      .get(`/buku-kolaborasi/detail/${slug}`, {
        headers: {
          Authorization: token_type + " " + token,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.data.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    return await axios
      .get(`/buku-kolaborasi/detail/${slug}`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.data.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

/*
 Testimoni
 */
export async function getTestimoni(limit: number) {
  noStore();
  return await axios
    .get("/testimoni/all", {
      params: {
        limit: limit,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
  FAQ
  */
export async function getFaq() {
  noStore();
  return await axios
    .get("/faq/all")
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
