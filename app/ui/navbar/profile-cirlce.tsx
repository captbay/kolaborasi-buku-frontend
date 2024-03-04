"use client";

import React from "react";

import { Avatar, Dropdown } from "flowbite-react";

export default function ProfileCircle() {
  return (
    <Dropdown
      label={<Avatar alt="User settings" img="/coursell/1.jpg" rounded />}
      arrowIcon={false}
      placement="bottom"
      inline
    >
      <Dropdown.Header>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">
          name@flowbite.com
        </span>
      </Dropdown.Header>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
