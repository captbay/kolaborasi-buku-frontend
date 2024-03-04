"use client";

import React, { useState } from "react";

import { Dropdown } from "flowbite-react";
import { BellIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";

export default function Notification() {
  const [notifications, setNotifications] = useState([
    {
      title: "New message",
      message: "Hey, what's up? All set for the presentation?",
      time: "a few moments ago",
    },
  ]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <Dropdown
      label={
        notifications.length > 0 ? (
          <div className="relative inline-block">
            <BellAlertIcon className="text-primaryColor w-auto h-6" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notifications.length}
            </span>
          </div>
        ) : (
          <BellIcon className="text-primaryColor w-auto h-6" />
        )
      }
      arrowIcon={false}
      placement="bottom-end"
      inline
    >
      <Dropdown.Header>
        <h2 className="text-base font-medium text-center">Notifikasi</h2>
      </Dropdown.Header>
      <div className="max-h-60 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Dropdown.Item key={index}>
              <div className="w-full text-left">
                <div className=" text-base font-medium text-primary-700">
                  {notification.title}
                </div>
                <div className="text-gray-500 font-normal text-sm mb-1.5">
                  {notification.message}
                </div>
                <div className="text-xs font-medium text-primary-700">
                  {notification.time}
                </div>
              </div>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item>
            <div className="w-full text-center text-gray-500 font-normal">
              Kamu tidak memiliki notifikasi
            </div>
          </Dropdown.Item>
        )}
      </div>
      {notifications.length > 0 && (
        <>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={clearNotifications}
            className="flex justify-center"
          >
            <TrashIcon className="h-4 w-4 mr-1.5 text-gray-400" />
            Hapus notifikasi
          </Dropdown.Item>
        </>
      )}
    </Dropdown>
  );
}
