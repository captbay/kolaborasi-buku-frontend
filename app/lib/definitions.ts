// event
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

// Buku Dijual
export type getBukuAllResponse = {
  current_page: number;
  data: CardData[];
  last_page: number;
  total: number;
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

// Buku Kolaborasi
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

// faqData
export type faqData = {
  id: string;
  judul: string;
  answer: string;
  active_flag: number;
};

// kategori
export type kategoriData = {
  id: string;
  nama: string;
  slug: string;
};

// paketData
export type paketData = {
  id: string;
  nama: string;
  harga: number;
  deskripsi: string;
  jasa_paket_penerbitan: jasaPaketData[];
};

export type jasaPaketData = {
  pake_penerbitan_id: string;
  nama: string;
};
