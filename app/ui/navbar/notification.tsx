"use client";

import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import {
  BellIcon,
  TrashIcon,
  BellSlashIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { NotifikasiResponse } from "@/app/lib/definitions";
import { deleteNotifikasi, readNotifikasi } from "@/app/lib/actions";
import { toast } from "react-toastify";
import { getNotifikasi } from "@/app/lib/data";
import clsx from "clsx";
import useGetCookie from "@/app/lib/useGetCookies";
import { pusher } from "@/app/lib/pusher/clientEvent";
import { useRouter } from "next/navigation";

export default function Notification() {
  const router = useRouter();
  // initial
  const [data, setData] = useState<NotifikasiResponse>({
    count_not_read: 0,
    data: [],
  });
  const { token, token_type, id } = useGetCookie();
  const [isClient, setIsClient] = useState(false);

  // get notifikasi
  const getNotif = async () => {
    const notifikasi: NotifikasiResponse = await getNotifikasi(
      token,
      token_type
    );
    setData(notifikasi);
  };

  // use effect
  useEffect(() => {
    setIsClient(true);

    getNotif();

    const channel = pusher(token, token_type).subscribe(
      "private-App.Models.User." + id
    );

    channel.bind("database-notifications.sent", function (data: any) {
      getNotif();
      router.refresh();
    });

    channel.bind("pusher:subscription_succeeded", function (members: any) {
      // alert("successfully subscribed!");
    });
  }, [token, token_type, id]);

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
        getNotif();
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
        getNotif();
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

  return isClient && token && token_type ? (
    <Dropdown
      label={
        data.count_not_read > 0 ? (
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
      className="w-2/3"
      inline
    >
      <Dropdown.Header>
        <h1 className="text-base font-medium text-center">Notifikasi</h1>
      </Dropdown.Header>
      <div className="max-h-60 overflow-y-auto">
        {data.data.length > 0 ? (
          data.data.map((notification, index) => (
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
      {data.data.length > 0 && (
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
  ) : (
    <BellIcon className="text-primaryColor w-auto h-6" />
  );
}
