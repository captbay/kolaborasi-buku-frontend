import React from "react";

export default async function priceCards() {
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        Paket Hemat
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">Rp</span>
        <span className="text-5xl font-extrabold tracking-tight">200.000</span>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /bulan
        </span>
      </div>
      <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
        Terdapat 10 judul buku yang bisa diterbitkan.
      </p>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Pilih Paket
      </button>
    </div>
  );
}
