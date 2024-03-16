import { axios } from "@/app/lib/services";
import { unstable_noStore as noStore } from "next/cache";

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

export async function getDetailBuku(slug: string) {
  noStore();
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

export async function getAds() {
  noStore();
  return await axios.get("/buku/all", {
    params: {
      limit: 5,
      bookAds: true,
    },
  });
}

export async function getBestSeller() {
  noStore();
  return await axios.get("/buku/best-seller");
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

/*
 TODO: Belum kepake
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await signIn('credentials', formData);
  } catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.';
    //     default:
    //       return 'Something went wrong.';
    //   }
    // }
    throw error;
  }
}
