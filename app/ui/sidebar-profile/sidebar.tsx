"use client";

import { Sidebar } from "flowbite-react";
import useGetCookie from "@/app/lib/useGetCookies";
import { logout, uploadFotoProfil } from "@/app/lib/actions";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { PencilIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRef, useState } from "react";

export default function SidebarProfile({
  fotoProfil,
  namaLengkap,
  role,
  email,
}: {
  fotoProfil: string;
  namaLengkap: string;
  role: string;
  email: string;
}) {
  const { token, token_type, clearCookie } = useGetCookie();
  const pathname = usePathname();
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // if file size is more than 2MB
      if (file.size > 2000000) {
        toast.error("Ukuran file terlalu besar, maksimal 2MB");
      } else {
        // Create a FileReader instance
        const reader = new FileReader();

        // Set up the onload callback function
        reader.onload = () => {
          const previewURL = reader.result as string; // Convert result to string
          setPreviewImage(previewURL); // Set state to store the preview image URL
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);

        // hit the upload function
        handleUpload(file);
      }
    }
  };

  const handleUpload = async (file: File) => {
    if (file) {
      const loading = toast.loading("Silahkan tunggu sebentar...");

      const foto_profil = new FormData();
      foto_profil.append("foto_profil", file);

      // Fetch API
      try {
        const res = await uploadFotoProfil(foto_profil, token, token_type);
        if (res.status === 200 || res.status === 201) {
          toast.update(loading, {
            render: "Foto Profil berhasil diubah",
            type: "success",
            autoClose: 5000,
            isLoading: false,
          });
          router.refresh();
        }
      } catch (error: any) {
        toast.update(loading, {
          render: error.response.data.message,
          type: "error",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });
      }
    } else {
      // Handle case where no file is selected
      toast.error("Pilih file terlebih dahulu");
    }
  };

  const handleLogout = () => {
    if (token && token_type) {
      logout(token, token_type)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            clearCookie();
            router.refresh();
            toast.success("Berhasil Keluar");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Sidebar
      aria-label="Sidebar Profil"
      className="h-fit w-auto lg:min-w-72 lg:w-max bg-whiteColor"
    >
      <Sidebar.Items className="bg-whiteColor">
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            {fotoProfil == null ? (
              <Image
                alt="Gambar Profil"
                height="500"
                src={
                  previewImage != null ? previewImage : "/default_profile.jpg"
                }
                width="500"
                className="w-28 h-28 rounded-full shadow-lg"
              />
            ) : (
              <Image
                alt="Gambar Profil"
                height="500"
                src={
                  previewImage != null
                    ? previewImage
                    : `http://kolaborasi-buku-backend.test/storage/${fotoProfil}`
                }
                width="500"
                className="w-28 h-28 rounded-full shadow-lg"
              />
            )}

            {/* Edit icon */}
            <button
              className="absolute bottom-0 right-0 bg-primaryColor rounded-full p-1"
              onClick={() => fileInputRef.current?.click()} // Trigger file input click
            >
              <PencilIcon className="w-4 h-4 m-1 text-white" />
            </button>

            {/* File input */}
            <input
              name="foto_profil"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              style={{ display: "none" }}
              max={2048}
              ref={fileInputRef}
            />
          </div>
          <h1 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {namaLengkap}
          </h1>
          <span className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {email}
          </span>
          <div
            className={clsx("rounded-full px-2 py-1", {
              "bg-green-500": role === "MEMBER",
              "bg-yellow-500 ": role === "CUSTOMER",
            })}
          >
            <p className="text-whiteColor text-xs">{role}</p>
          </div>
        </div>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            className={clsx("text-sm font-medium hover:text-primaryColor", {
              "text-primaryColor": pathname === "/profil/akun",
            })}
            href="/profil/akun"
          >
            Akun
          </Sidebar.Item>
          <Sidebar.Item
            className={clsx("text-sm font-medium hover:text-primaryColor", {
              "text-primaryColor":
                pathname === "/profil/transaksi-pembelian-buku",
            })}
            href="/profil/transaksi-pembelian-buku"
          >
            Transaksi Pembelian Buku
          </Sidebar.Item>
          <Sidebar.Item
            className={clsx("text-sm font-medium hover:text-primaryColor", {
              "text-primaryColor":
                pathname === "/profil/transaksi-kolaborasi-buku",
            })}
            href="/profil/transaksi-kolaborasi-buku"
          >
            Transaksi Kolaborasi Buku
          </Sidebar.Item>
          <Sidebar.Item
            className={clsx("text-sm font-medium hover:text-primaryColor", {
              "text-primaryColor":
                pathname === "/profil/transaksi-paket-penerbitan",
            })}
            href="/profil/transaksi-paket-penerbitan"
          >
            Transaksi Paket Penerbitan
          </Sidebar.Item>
          <Sidebar.Item
            className={clsx("text-sm font-medium hover:text-primaryColor", {
              "text-primaryColor": pathname === "/profil/koleksi-buku-saya",
            })}
            href="/profil/koleksi-buku-saya"
          >
            Koleksi Buku Saya
          </Sidebar.Item>
          <Sidebar.Item
            className={clsx("text-sm font-medium hover:text-primaryColor", {
              "text-primaryColor":
                pathname === "/profil/koleksi-buku-kolaborasi-saya",
            })}
            href="/profil/koleksi-buku-kolaborasi-saya"
          >
            Koleksi Buku Kolaborasi Saya
          </Sidebar.Item>
          <Sidebar.Item
            className={clsx("text-sm font-medium hover:text-primaryColor", {
              "text-primaryColor":
                pathname === "/profil/koleksi-buku-penerbitan-saya",
            })}
            href="/profil/koleksi-buku-penerbitan-saya"
          >
            Koleksi Buku Penerbitan Saya
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            className="text-sm font-medium hover:text-primaryColor hover:cursor-pointer"
            onClick={handleLogout}
          >
            Keluar
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
