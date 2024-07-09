"use client";

import React from "react";
import { Button } from "@/app/ui/button";
import { toast } from "react-toastify";
import useGetCookie from "@/app/lib/useGetCookies";
import { getDownloadBuku } from "@/app/lib/actions";
import { saveAs } from "file-saver";

export default function downloadBukuUser({
  buku_dijual_id,
  judul,
}: {
  buku_dijual_id: string;
  judul: string;
}) {
  const { token, token_type } = useGetCookie();

  const handleDownload = async () => {
    const loading = toast.loading("Sedang Download File...");

    try {
      const res = await getDownloadBuku(buku_dijual_id, token, token_type);
      if (res.status === 200 || res.status === 201) {
        const blob = new Blob([res.data], { type: "application/pdf" });
        saveAs(blob, `${judul}.pdf`);

        toast.update(loading, {
          render: "Berhasil Download Buku",
          type: "success",
          autoClose: 5000,
          isLoading: false,
        });
      }
    } catch (error: any) {
      toast.update(loading, {
        render: error.response.data,
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };
  return (
    <Button className="mt-4 w-full" onClick={handleDownload}>
      Download Buku
    </Button>
  );
}
