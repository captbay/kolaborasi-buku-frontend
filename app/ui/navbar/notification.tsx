"use client";

import React, { useState } from "react";

import { Dropdown } from "flowbite-react";
import {
  BellIcon,
  TrashIcon,
  BellSlashIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { Notifikasi, NotifikasiResponse } from "@/app/lib/definitions";
import { deleteNotifikasi, readNotifikasi } from "@/app/lib/actions";
import { toast } from "react-toastify";
import clsx from "clsx";

export default function Notification({
  data,
  token,
  token_type,
}: {
  data: NotifikasiResponse;
  token: string;
  token_type: string;
}) {
  // state for read notif
  const [readNotif, setReadNotif] = useState<number>(data.count_not_read);
  const [dataNotif, setDataNotif] = useState<Notifikasi[]>(data.data);

  const handleClearNotifications = async () => {
    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    try {
      const res = await deleteNotifikasi(token, token_type);
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });
        setReadNotif(0);
        setDataNotif([]);
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
  };

  const handleReadNotifications = async () => {
    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    try {
      const res = await readNotifikasi(token, token_type);
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });
        setReadNotif(0);
        // set all dataNotif.data.is_read to true
        const newDataNotif = dataNotif.map((notif) => {
          return { ...notif, is_read: true };
        });
        setDataNotif(newDataNotif);
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
  };

  return (
    <Dropdown
      label={
        readNotif > 0 ? (
          <div className="relative inline-block">
            <BellAlertIcon className="text-primaryColor w-auto h-6 m-1" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {data.count_not_read}
            </span>
          </div>
        ) : (
          <BellIcon className="text-primaryColor w-auto h-6" />
        )
      }
      arrowIcon={false}
      placement="bottom-end"
      className="w-1/3"
      inline
    >
      <Dropdown.Header>
        <h1 className="text-base font-medium text-center">Notifikasi</h1>
      </Dropdown.Header>
      <div className="max-h-60 overflow-y-auto">
        {dataNotif.length > 0 ? (
          dataNotif.map((notification, index) => (
            <Dropdown.Item
              key={index}
              className={clsx("bg-blue-100", {
                "bg-gray-100": notification.is_read,
              })}
            >
              <div className="w-full text-left my-3">
                <div className=" text-base font-medium">
                  {notification.title}
                </div>
                <div className="text-gray-500 font-normal text-sm mb-1.5 text-pretty">
                  {notification.body}
                </div>
                <div className="text-xs font-medium text-primary-700">
                  {notification.created_at}
                </div>
              </div>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item>
            <div className="w-full my-8 flex flex-col items-center justify-center ">
              <BellSlashIcon className="text-disableColor w-auto h-6" />
              <p className="text-gray-500 font-normal">
                Kamu tidak memiliki notifikasi
              </p>
            </div>
          </Dropdown.Item>
        )}
      </div>
      {dataNotif.length > 0 && (
        <>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={handleReadNotifications}
            className="flex justify-center text-yellow-400"
          >
            <EyeSlashIcon className="h-4 w-4 mr-1.5 text-yellow-400" />
            Baca semua notifikasi
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={handleClearNotifications}
            className="flex justify-center text-red-400"
          >
            <TrashIcon className="h-4 w-4 mr-1.5 text-red-400" />
            Hapus semua notifikasi
          </Dropdown.Item>
        </>
      )}
    </Dropdown>
  );
}
