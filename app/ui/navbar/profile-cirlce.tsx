"use client";

import React, { useEffect, useState } from "react";

import { Avatar, Dropdown } from "flowbite-react";
import useGetCookie from "@/app/lib/useGetCookies";
import { logout } from "@/app/lib/actions";
import { toast } from "react-toastify";
import router from "next/router";

export default function ProfileCircle() {
  const { token, nama_lengkap, token_type, email, clearCookie } =
    useGetCookie();

  const handleLogout = () => {
    if (token && token_type) {
      logout(token, token_type)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            clearCookie();
            setTimeout(() => window.location.reload(), 5000);
            toast.success("Berhasil Keluar");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Dropdown
      label={<Avatar alt="User settings" img="/coursell/1.jpg" rounded />}
      arrowIcon={false}
      placement="bottom"
      inline
    >
      <Dropdown.Header>
        <span className="block text-sm">{nama_lengkap}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
      <Dropdown.Item>Akun</Dropdown.Item>
      <Dropdown.Item>Transaksi</Dropdown.Item>
      <Dropdown.Item>Koleksi Buku Saya</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleLogout}>Keluar</Dropdown.Item>
    </Dropdown>
  );
}
