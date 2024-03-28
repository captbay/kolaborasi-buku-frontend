"use client";
import React, { useRef, useState, FormEvent } from "react";
import { Tabs } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import { toast } from "react-toastify";
import { Button } from "@/app/ui/button";
import { KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { gantiPassword, updateUser, uploadFileMember } from "@/app/lib/actions";
import useGetCookie from "@/app/lib/useGetCookies";
import { User } from "@/app/lib/definitions";
import Link from "next/link";
import { useRouter } from "next/navigation";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      styles: {
        underline: "flex-wrap -mb-px border-b border-gray-200",
      },
      tabitem: {
        base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        styles: {
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "text-primaryColor rounded-t-lg border-b-2 border-primaryColor active",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabitemcontainer: {
      base: "",
      styles: {
        default: "",
        underline: "",
        pills: "",
        fullWidth: "",
      },
    },
    tabpanel: "py-4",
  },
};

export default function CrudUserForm({ data }: { data: User }) {
  const { token, token_type, clearCookie } = useGetCookie();
  const router = useRouter();

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="Edit Profil">
          <FormEdit
            token={token}
            token_type={token_type}
            data={data}
            clearCookie={clearCookie}
            router={router}
          />
        </Tabs.Item>
        {data.role === "CUSTOMER" ? (
          <Tabs.Item active title="Daftar Member">
            <FormMember
              token={token}
              token_type={token_type}
              data={data}
              router={router}
            />
          </Tabs.Item>
        ) : (
          <Tabs.Item active title="Data Member">
            <FormMember
              token={token}
              token_type={token_type}
              data={data}
              router={router}
            />
          </Tabs.Item>
        )}
        <Tabs.Item title="Ganti Kata Sandi">
          <FormGantiPassword
            token={token}
            token_type={token_type}
            clearCookie={clearCookie}
            router={router}
          />
        </Tabs.Item>
        {/* <Tabs.Item disabled title="Disabled">
          Disabled content
        </Tabs.Item> */}
      </Tabs>
    </Flowbite>
  );
}

// form edit data member
function FormEdit({
  token,
  token_type,
  data,
  clearCookie,
  router,
}: {
  token: string;
  token_type: string;
  data: User;
  clearCookie: () => void;
  router: any;
}) {
  // ref form
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const noTelpRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const tglLahirRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const alamatRef = useRef<HTMLInputElement>(null);
  const provinsiRef = useRef<HTMLInputElement>(null);
  const kecamatanRef = useRef<HTMLInputElement>(null);
  const kotaRef = useRef<HTMLInputElement>(null);
  const kodeposRef = useRef<HTMLInputElement>(null);

  // error state
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageFirstName, setErrorMessageFirstName] =
    useState<string>("");
  const [errorMessageLastName, setErrorMessageLastName] = useState<string>("");
  const [errorMessageNoTelp, setErrorMessageNoTelp] = useState<string>("");
  const [errorMessageMail, setErrorMessageMail] = useState<string>("");
  const [errorMessageTglLahir, setErrorMessageTglLahir] = useState<string>("");
  const [errorMessageGender, setErrorMessageGender] = useState<string>("");
  const [errorMessageAlamat, setErrorMessageAlamat] = useState<string>("");
  const [errorMessageProvinsi, setErrorMessageProvinsi] = useState<string>("");
  const [errorMessageKecamatan, setErrorMessageKecamatan] =
    useState<string>("");
  const [errorMessageKota, setErrorMessageKota] = useState<string>("");
  const [errorMessageKodepos, setErrorMessageKodepos] = useState<string>("");

  // handle update
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    // reset error message
    setErrorMessage("");
    setErrorMessageFirstName("");
    setErrorMessageLastName("");
    setErrorMessageNoTelp("");
    setErrorMessageMail("");
    setErrorMessageTglLahir("");
    setErrorMessageGender("");
    setErrorMessageAlamat("");
    setErrorMessageProvinsi("");
    setErrorMessageKecamatan("");
    setErrorMessageKota("");
    setErrorMessageKodepos("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();
    const nama_depan: string = firstNameRef.current?.value as string;
    const nama_belakang: string = lastNameRef.current?.value as string;
    const no_telepon: string = noTelpRef.current?.value as string;
    const email: string = emailRef.current?.value as string;
    const tgl_lahir: string = tglLahirRef.current?.value as string;
    const gender: string = genderRef.current?.value as string;
    const alamat: string = alamatRef.current?.value as string;
    const provinsi: string = provinsiRef.current?.value as string;
    const kecamatan: string = kecamatanRef.current?.value as string;
    const kota: string = kotaRef.current?.value as string;
    const kode_pos: number = kodeposRef.current?.value as unknown as number;

    try {
      const res = await updateUser(
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
        token,
        token_type
      );
      if (res.status === 200 || res.status === 201) {
        if (
          res.data.message ===
          "Berhasil update data user. Silahkan verifikasi email anda kembali."
        ) {
          toast.update(loading, {
            render: res.data.message,
            type: "success",
            autoClose: 10000,
            closeButton: true,
            isLoading: false,
          });

          // clear cookie
          clearCookie();
          router.refresh();
        } else {
          toast.update(loading, {
            render: "Data Berhasil Diubah!",
            type: "success",
            autoClose: 10000,
            closeButton: true,
            isLoading: false,
          });
        }
      }
    } catch (error: any) {
      toast.update(loading, {
        render: "Terjadi Kesalahan!",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });

      if (error?.response?.data?.message.nama_depan !== undefined) {
        setErrorMessageFirstName(
          error?.response?.data?.message.nama_depan[0] || "An error occurred."
        );
      }
      if (error?.response?.data?.message.nama_belakang !== undefined) {
        setErrorMessageLastName(
          error?.response?.data?.message.nama_belakang[0] ||
            "An error occurred."
        );
      }
      if (error?.response?.data?.message.no_telepon !== undefined) {
        setErrorMessageNoTelp(
          error?.response?.data?.message.no_telepon[0] || "An error occurred."
        );
      }
      if (error?.response?.data?.message.email !== undefined) {
        setErrorMessageMail(
          error?.response?.data?.message.email[0] || "An error occurred."
        );
      }
      if (error?.response?.data?.message.tgl_lahir !== undefined) {
        setErrorMessageTglLahir(
          error?.response?.data?.message.tgl_lahir[0] || "An error occurred."
        );
      }
      if (error?.response?.data?.message.gender !== undefined) {
        setErrorMessageGender(
          error?.response?.data?.message.gender[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.alamat !== undefined) {
        setErrorMessageAlamat(
          error?.response?.data?.message.alamat[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.provinsi !== undefined) {
        setErrorMessageProvinsi(
          error?.response?.data?.message.provinsi[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.kecamatan !== undefined) {
        setErrorMessageKecamatan(
          error?.response?.data?.message.kecamatan[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.kota !== undefined) {
        setErrorMessageKota(
          error?.response?.data?.message.kota[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.kode_pos !== undefined) {
        setErrorMessageKodepos(
          error?.response?.data?.message.kode_pos[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.success === false) {
        setErrorMessage(error?.response?.data?.message || "An error occurred.");
      }
    }
  };

  return (
    <section className="px-8">
      <form onSubmit={handleUpdate} className="space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8">
          {/* email */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                id="email"
                type="email"
                name="email"
                placeholder="Masukan Email Anda"
                ref={emailRef}
                defaultValue={data.email}
                required
              />
            </div>
            {/* label for verification email */}
            {data.status_verif_email == true ? (
              <p className="text-xs text-green-600 mt-2">
                Email Sudah Terverifikasi, jika mengubah perlu verifikasi dan
                masuk kembali
              </p>
            ) : (
              <p className="text-xs text-dangerColor mt-2">
                Email Belum Terverifikasi
              </p>
            )}
            {errorMessageMail && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">{errorMessageMail}</p>
              </div>
            )}
          </div>

          {/* no phone */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="noPhone"
            >
              Nomor Telepon
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                id="noPhone"
                type="number"
                name="noPhone"
                placeholder="Masukan Nomor Telepon Anda"
                ref={noTelpRef}
                defaultValue={data.no_telepon}
                required
              />
            </div>
            {errorMessageNoTelp && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">{errorMessageNoTelp}</p>
              </div>
            )}
          </div>

          {/* firstname */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="firstName"
            >
              Nama Depan
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Masukan Nama Depan Anda"
                ref={firstNameRef}
                defaultValue={data.nama_depan}
                required
              />
            </div>
            {errorMessageFirstName && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessageFirstName}
                </p>
              </div>
            )}
          </div>

          {/* lastname */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="lastName"
            >
              Nama Belakang
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Masukan Nama Belakang Anda"
                ref={lastNameRef}
                defaultValue={data.nama_belakang}
                required
              />
            </div>
            {errorMessageLastName && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessageLastName}
                </p>
              </div>
            )}
          </div>

          {/* tgl_lahir */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="tglLahir"
            >
              Tanggal Lahir
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                id="tglLahir"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                name="tglLahir"
                ref={tglLahirRef}
                defaultValue={data.tgl_lahir}
                required
              />
            </div>
            {errorMessageTglLahir && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessageTglLahir}
                </p>
              </div>
            )}
          </div>

          {/* gender with select option */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="gender"
            >
              Gender
            </label>
            <div className="relative">
              <select
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                defaultValue={data.gender == null ? "" : data.gender}
                ref={genderRef}
                required
              >
                <option disabled={true} value={""}>
                  Silahkan Pilih Gender
                </option>
                <option value={"Pria"}>Pria</option>
                <option value={"Wanita"}>Wanita</option>
                <option value={"Memilih Untuk Tidak Diisi"}>
                  Memilih untuk tidak diisi
                </option>
              </select>
            </div>
            {errorMessageGender && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">{errorMessageGender}</p>
              </div>
            )}
          </div>

          {/* alamat */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="alamat"
            >
              Alamat
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                id="alamat"
                type="text"
                name="alamat"
                placeholder="Masukan Alamat Anda"
                ref={alamatRef}
                defaultValue={data.alamat}
                required
              />
            </div>
            {errorMessageAlamat && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">{errorMessageAlamat}</p>
              </div>
            )}
          </div>

          {/* provinsi */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="provinsi"
            >
              Provinsi
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                id="provinsi"
                type="text"
                name="provinsi"
                placeholder="Masukan Provinsi Anda"
                ref={provinsiRef}
                defaultValue={data.provinsi}
                required
              />
            </div>
            {errorMessageProvinsi && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessageProvinsi}
                </p>
              </div>
            )}
          </div>

          {/* kota */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="kota"
            >
              Kota / Kabupaten
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                id="kota"
                type="text"
                name="kota"
                placeholder="Masukan Kota Anda"
                ref={kotaRef}
                defaultValue={data.kota}
                required
              />
            </div>
            {errorMessageKota && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">{errorMessageKota}</p>
              </div>
            )}
          </div>

          {/* kecamatan */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="kecamatan"
            >
              Kecamatan
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                id="kecamatan"
                type="text"
                name="kecamatan"
                placeholder="Masukan Kecamatan Anda"
                ref={kecamatanRef}
                defaultValue={data.kecamatan}
                required
              />
            </div>
            {errorMessageKecamatan && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessageKecamatan}
                </p>
              </div>
            )}
          </div>

          {/* kodepos */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="kodepos"
            >
              Kodepos
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                id="kodepos"
                type="number"
                name="kodepos"
                placeholder="Masukan Kodepos Anda"
                ref={kodeposRef}
                defaultValue={data.kode_pos}
                required
              />
            </div>
            {errorMessageKodepos && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessageKodepos}
                </p>
              </div>
            )}
          </div>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Simpan Perubahan
        </Button>
        {errorMessage && (
          <div
            className="flex h-8 items-center space-x-1 mt-2"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
            <p className="text-sm text-dangerColor">{errorMessage}</p>
          </div>
        )}
      </form>
    </section>
  );
}

// form ganti password
function FormGantiPassword({
  token,
  token_type,
  clearCookie,
  router,
}: {
  token: string;
  token_type: string;
  clearCookie: () => void;
  router: any;
}) {
  // refs
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordNewRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  // state
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [errorMessagePasswordNew, setErrorMessagePasswordNew] =
    useState<string>("");
  const [errorMessagePasswordConfirm, setErrorMessagePasswordConfirm] =
    useState<string>("");

  // handle ganti password
  const handleGantiPassword = async (e: FormEvent<HTMLFormElement>) => {
    // ganti error message
    setErrorMessage("");
    setErrorMessagePassword("");
    setErrorMessagePasswordNew("");
    setErrorMessagePasswordConfirm("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();
    const password = passwordRef.current?.value as string;
    const passwordNew = passwordNewRef.current?.value as string;
    const passwordConfirm = passwordConfirmRef.current?.value as string;
    try {
      const res = await gantiPassword(
        password,
        passwordNew,
        passwordConfirm,
        token,
        token_type
      );
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });

        // clear cookie
        clearCookie();
        router.refresh();
      }
    } catch (error: any) {
      toast.update(loading, {
        render: "Terjadi Kesalahan!",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });

      if (error?.response?.data?.message.password !== undefined) {
        setErrorMessagePassword(
          error?.response?.data?.message.password[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.new_password !== undefined) {
        setErrorMessagePasswordNew(
          error?.response?.data?.message.new_password[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.confirm_password !== undefined) {
        setErrorMessagePasswordConfirm(
          error?.response?.data?.message.confirm_password[0] ||
            "An error occurred."
        );
      }

      if (error?.response?.data?.success === false) {
        setErrorMessage(
          error?.response?.data?.message || "Invalid credentials"
        );
      }
    }
  };

  return (
    <section className="px-8">
      <form onSubmit={handleGantiPassword} className="space-y-3">
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="oldPassword"
            >
              Kata Sandi Lama
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] pl-10 text-sm outline-2 placeholder:text-disableColor"
                id="password"
                type="password"
                name="password"
                placeholder="Masukan Kata Sandi"
                ref={passwordRef}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
            </div>
            {errorMessagePassword && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessagePassword}
                </p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="newPassword"
            >
              Kata Sandi Baru
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] pl-10 text-sm outline-2 placeholder:text-disableColor"
                id="newPassword"
                type="password"
                name="newPassword"
                placeholder="Masukan Ulang Kata Sandi"
                ref={passwordNewRef}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
            </div>
            {errorMessagePasswordNew && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessagePasswordNew}
                </p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="confirmPassword"
            >
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] pl-10 text-sm outline-2 placeholder:text-disableColor"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Masukan Ulang Kata Sandi"
                ref={passwordConfirmRef}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
            </div>
            {errorMessagePasswordConfirm && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessagePasswordConfirm}
                </p>
              </div>
            )}
          </div>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Ganti Kata Sandi
        </Button>
        {errorMessage && (
          <div
            className="flex h-8 items-center space-x-1 mt-2"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
            <p className="text-sm text-dangerColor">{errorMessage}</p>
          </div>
        )}
      </form>
    </section>
  );
}

// form data diri member
function FormMember({
  token,
  token_type,
  data,
  router,
}: {
  token: string;
  token_type: string;
  data: User;
  router: any;
}) {
  // refs
  const [fileCv, setFileCv] = useState<File | undefined>();
  const [fileKtp, setFileKtp] = useState<File | undefined>();
  const [fileTtd, setFileTtd] = useState<File | undefined>();

  // state
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageFileCv, setErrorMessageFileCv] = useState<string>("");
  const [errorMessageFileKtp, setErrorMessageFileKtp] = useState<string>("");
  const [errorMessageFileTtd, setErrorMessageFileTtd] = useState<string>("");

  // handle error message
  const handleUploadFile = async (e: FormEvent<HTMLFormElement>) => {
    // ganti error message
    setErrorMessage("");
    setErrorMessageFileCv("");
    setErrorMessageFileKtp("");
    setErrorMessageFileTtd("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();

    if (fileCv && fileKtp && fileTtd) {
      const form = new FormData();
      form.append("file_cv", fileCv);
      form.append("file_ktp", fileKtp);
      form.append("file_ttd", fileTtd);

      try {
        const res = await uploadFileMember(form, token, token_type);
        if (res.status === 200 || res.status === 201) {
          toast.update(loading, {
            render: "Data Berhasil Diupload!",
            type: "success",
            autoClose: 5000,
            isLoading: false,
          });
          router.refresh();
        }
      } catch (error: any) {
        toast.update(loading, {
          render: "Terjadi Kesalahan!",
          type: "error",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });

        if (error?.response?.data?.message.file_cv !== undefined) {
          setErrorMessageFileCv(
            error?.response?.data?.message.file_cv[0] || "An error occurred."
          );
        }

        if (error?.response?.data?.message.file_ktp !== undefined) {
          setErrorMessageFileKtp(
            error?.response?.data?.message.file_ktp[0] || "An error occurred."
          );
        }

        if (error?.response?.data?.message.file_ttd !== undefined) {
          setErrorMessageFileTtd(
            error?.response?.data?.message.file_ttd[0] || "An error occurred."
          );
        }

        if (error?.response?.data?.success === false) {
          setErrorMessage(
            error?.response?.data?.message || "Invalid credentials"
          );
        }
      }
    } else {
      setErrorMessage("Semua file harus diisi");

      toast.update(loading, {
        render: "Semua file harus diisi",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };

  return (
    <section className="px-8">
      {data.role === "CUSTOMER" &&
      data.file_cv != null &&
      data.file_ktp != null &&
      data.file_ttd != null ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-blackColor">
            Anda Telah Mengunggah File Verifikasi Member, Silahkan Tunggu
          </p>
          <div className="flex flex-col items-center justify-center mt-4">
            <Link
              href={`http://kolaborasi-buku-backend.test/storage/${data.file_cv}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="w-full">Lihat File CV</Button>
            </Link>
            <Link
              href={`http://kolaborasi-buku-backend.test/storage/${data.file_ktp}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="w-full mt-4">Lihat File KTP</Button>
            </Link>
            <Link
              href={`http://kolaborasi-buku-backend.test/storage/${data.file_ttd}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="w-full mt-4">Lihat File Tanda Tangan</Button>
            </Link>
          </div>
        </div>
      ) : data.role === "MEMBER" ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-blackColor">
            Anda Telah Menjadi Member, Ayo Berkolaborasi Bersama Kami
          </p>
          <div className="flex flex-col items-center justify-center mt-4">
            <Link
              href={`http://kolaborasi-buku-backend.test/storage/${data.file_cv}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="w-full">Lihat File CV</Button>
            </Link>
            <Link
              href={`http://kolaborasi-buku-backend.test/storage/${data.file_ktp}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="w-full mt-4">Lihat File KTP</Button>
            </Link>
            <Link
              href={`http://kolaborasi-buku-backend.test/storage/${data.file_ttd}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="w-full mt-4">Lihat File Tanda Tangan</Button>
            </Link>
          </div>
        </div>
      ) : (
        <section>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-semibold text-blackColor">
              Silahkan Mengunggah File Untuk Verifikasi
            </p>
          </div>
          <form onSubmit={handleUploadFile} className="space-y-3">
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                  htmlFor="filecv"
                >
                  File CV
                </label>
                <div className="relative">
                  <input
                    id="filecv"
                    type="file"
                    accept=".pdf , .doc , .docx"
                    name="filecv"
                    placeholder="Masukan File CV anda"
                    onChange={(e) => {
                      setFileCv(e.target.files?.[0]);
                    }}
                  />
                </div>
                {errorMessageFileCv && (
                  <div
                    className="flex h-8 items-center space-x-1 mt-2"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                    <p className="text-sm text-dangerColor">
                      {errorMessageFileCv}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                  htmlFor="filektp"
                >
                  File KTP
                </label>
                <div className="relative">
                  <input
                    id="filektp"
                    type="file"
                    accept="image/jpeg, image/png, image/jpg, .pdf , .doc , .docx"
                    name="filektp"
                    placeholder="Masukan File KTP anda"
                    onChange={(e) => {
                      setFileKtp(e.target.files?.[0]);
                    }}
                  />
                </div>
                {errorMessageFileKtp && (
                  <div
                    className="flex h-8 items-center space-x-1 mt-2"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                    <p className="text-sm text-dangerColor">
                      {errorMessageFileKtp}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                  htmlFor="filettd"
                >
                  File Tanda Tangan Anda
                </label>
                <div className="relative">
                  <input
                    id="filettd"
                    type="file"
                    accept="image/png"
                    name="filettd"
                    placeholder="Masukan File Tanda Tangan anda"
                    onChange={(e) => {
                      setFileTtd(e.target.files?.[0]);
                    }}
                  />
                </div>
                {errorMessageFileTtd && (
                  <div
                    className="flex h-8 items-center space-x-1 mt-2"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                    <p className="text-sm text-dangerColor">
                      {errorMessageFileTtd}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Button className="mt-4 w-full" type="submit">
              Simpan
            </Button>
            {errorMessage && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">{errorMessage}</p>
              </div>
            )}
          </form>
        </section>
      )}
    </section>
  );
}
