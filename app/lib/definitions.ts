// definisi var yang masuk

// NotifikasiResponse
export type NotifikasiResponse = {
  count_not_read: number;
  data: Notifikasi[];
};

// Notifikasi
export type Notifikasi = {
  notif_id: string;
  actions: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
};

// user
export type User = {
  id: string;
  nama_lengkap: string;
  nama_depan: string;
  nama_belakang: string;
  email: string;
  no_telepon: string;
  tgl_lahir: string;
  gender: string;
  alamat: string;
  provinsi: string;
  kecamatan: string;
  kota: string;
  kode_pos: string;
  foto_profil: string;
  file_cv: string;
  file_ktp: string;
  file_ttd: string;
  role: string;
  status_verif_email: boolean;
};

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

// Get Detail Buku Dijual
export type getDetailBukuResponse = {
  isbn: string;
  slug: string;
  judul: string;
  harga: number;
  kategori: string;
  deskripsi: string;
  tanggal_terbit: string;
  jumlah_halaman: number;
  bahasa: string;
  penerbit: string;
  list_penulis: string;
  testimoni_pembeli: TestimoniDetail[];
  gallery_foto: GalleryFoto[];
};

export type TestimoniDetail = {
  nama: string;
  foto_profil: string;
  rating: number;
  ulasan: string;
  created_at: string;
};

export type GalleryFoto = {
  foto: string;
};

// Buku Kolaborasi
export type getKolaborasiBukuAllResponse = {
  current_page: number;
  data: CardKolaborasiData[];
  last_page: number;
  total: number;
};

export type CardKolaborasiData = {
  id: string;
  slug: string;
  judul: string;
  kategori: string;
  cover_buku: string;
  jumlah_bab: number;
};

// Get Detail Buku Kolaborasi
export type getDetailBukuKolaborasiResponse = {
  slug: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  cover_buku: string;
  jumlah_bab: number;
  status_kolaborasi: string;
  bab: BabKolaborasi[];
  timeline_kolaborasi: TimelineKolaborasi[];
};

// BabKolaborasi
export type BabKolaborasi = {
  id: string;
  no_bab: number;
  judul: string;
  harga: number;
  durasi_pembuatan: number;
  deskripsi: string;
  is_terjual: boolean;
};

// TimelineKolaborasi
export type TimelineKolaborasi = {
  id: number;
  judul: string;
  count: string;
  status: string;
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
