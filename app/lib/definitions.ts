export type Event = {
  id: string;
  tipe: string;
  file: string;
  waktu_mulai: string;
  waktu_selesai: string;
  active_flag: number;
  created_at: string;
  updated_at: string;
};

export type CardData = {
  id: string;
  slug: string;
  judul: string;
  harga: number;
  kategori: string;
  cover_buku: string;
  pembeli: number;
  rating: number;
};

export type CardKolaborasiData = {
  id: string;
  slug: string;
  judul: string;
  kategori: string;
  cover_buku: string;
  jumlah_bab: number;
};

export type Testimoni = {
  ulasan: string;
  rating: number;
  nama_lengkap: string;
  foto_profil: string;
};

export type BookAds = {
  id: string;
  slug: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  cover_buku: string;
};
