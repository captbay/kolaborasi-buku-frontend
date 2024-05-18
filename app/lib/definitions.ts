// definisi var yang masuk

// configData
export type configData = {
  id: string;
  key: string;
  tipe: string;
  value: string;
  active_flag: number;
};

export type BukuPenerbitanUserDetail = {
  id: string;
  judul: string;
  deskripsi: string;
  cover_buku: string;
  file_buku: string;
  file_mou: string;
  dijual: boolean;
  isbn: string;
  created_at: string;
  transaksi_paket_penerbitan: {
    trx_id: string;
    no_transaksi: string;
    total_harga: number;
    status: string;
    date_time_exp: string;
    note: string;
  };
  array_status: Array<string>;
};

// Trx Paket Penerbitan Buku
export type getTrxPaketResponse = {
  trx_id: string;
  no_transaksi: string;
  status: string;
  date_time_exp: string;
  date_time_dp_lunas: string;
  date_time_lunas: string;
  total_harga: number;
  created_at: string;
  // detail transaksi
  jasa_tambahan: JasaTambahan[];
  paket_penerbitan: PaketPenerbitan;
  buku_permohonan_terbit: BukuPermohonanTerbit;
};

// buku permohonan terbit
export type BukuPermohonanTerbit = {
  id: string;
  judul: string;
  cover_buku: string;
  deskripsi: string;
};

// paket penerbitan
export type PaketPenerbitan = {
  id: string;
  nama: string;
  harga: number;
  deskripsi: string;
  jasa_paket_penerbitan: JasaPaketPenerbitan[];
};

// jasa paket penerbitan
export type JasaPaketPenerbitan = {
  paket_penerbitan_id: string;
  nama: string;
};

// jasa tambahan
export type JasaTambahan = {
  id: string;
  nama: string;
  harga: number;
};

// response getKoleksiBukuKolaborasiResponse
export type getKoleksiBukuKolaborasiResponse = {
  current_page: number;
  data: KoleksiBukuKolaborasiUser[];
  last_page: number;
  total: number;
};

export type KoleksiBukuKolaborasiUser = {
  id: string;
  bab_buku_kolaborasi_id: string;
  status: string;
  note: string;
  file_bab: string;
  datetime_deadline: string;
  created_at: string;
  no_bab: number;
  judul_bab: string;
  deskripsi_bab: string;
  judul_buku: string;
  deskripsi_buku: string;
  cover_buku: string;
  kategori_buku: string;
  file_mou: string;
  file_hak_cipta: string;
  timeline_kolaborasi: TimelineKolaborasi[];
  buku_kolaborasi_id: string;
};

// response koleksi buku
export type getKoleksiBukuResponse = {
  current_page: number;
  data: KoleksiBukuUser[];
  last_page: number;
  total: number;
};

// response koleksi buku penerbitan
export type getKoleksiBukuPenerbitanResponse = {
  current_page: number;
  last_page: number;
  total: number;
  data: BukuPermohonanTerbit[];
};

export type KoleksiBukuUser = {
  buku_dijual_id: string;
  slug: string;
  cover_buku: string;
  judul: string;
  kategori: string;
  active_flag: boolean;
};

// Trx Penjualan Buku
export type getTrxPenjualanBukuResponse = {
  trx_id: string;
  no_transaksi: string;
  status: string;
  date_time_exp: string;
  date_time_lunas: string;
  total_harga: number;
  created_at: string;
  jumlah_buku: number;
  list_transaksi_buku: TrxBuku[];
};

export type TrxBuku = {
  buku_dijual_id: string;
  kategori: string;
  judul: string;
  harga: number;
  cover_buku: string;
  jumlah_halaman: number;
  bahasa: string;
  isbn: string;
};

// Keranjang
export type Keranjang = {
  keranjang_id: string;
  buku_dijual_id: string;
  judul: string;
  harga: number;
  kategori: string;
  cover_buku: string;
};

// NotifikasiResponse
export type NotifikasiResponse = {
  count_not_read: number;
  data: Notifikasi[];
  message: string;
};

// countKeranjang
export type CountKeranjang = {
  count: number;
};

// Notifikasi
export type Notifikasi = {
  notif_id: string;
  actions: [];
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
  message: string;
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

// Ads
export type getBukuAdsResponse = {
  current_page: number;
  data: BookAds[];
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
  id: string;
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
  isDibeli: boolean;
  isTransaksi: boolean;
  isTestimoni: boolean;
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
  id: string;
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
  isDibeli: boolean;
  isTransaksi: boolean;
};

// Trx Bab Kolaborasi Buku
export type getTrxBabKolaborasiResponse = {
  trx_id: string;
  no_transaksi: string;
  status: string;
  date_time_exp: string;
  date_time_lunas: string;
  total_harga: number;
  created_at: string;
  // detail bab
  bab_buku: BabKolaborasi;
  buku_kolaborasi: CardKolaborasiData;
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

// rekeningData
export type rekeningData = {
  no_rek: string;
  bank_rek: string;
  nama_rek: string;
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
