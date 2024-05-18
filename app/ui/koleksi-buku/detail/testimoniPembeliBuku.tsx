"use client";
import React, { useState } from "react";
import { Avatar } from "flowbite-react";
import { Rating, RatingStar } from "flowbite-react";
import EmptyData from "@/app/ui/emptyData";
import { TestimoniDetail } from "@/app/lib/definitions";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { generatePagination } from "@/app/lib/utils";

export default function TestimoniPembeliBuku({
  data,
}: {
  data: TestimoniDetail[];
}) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const allPages = generatePagination(currentPage, totalPages);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section>
      {/* Testimoni Pembelian Buku */}
      <div className="flex flex-col gap-4">
        {paginatedData.length > 0 ? (
          paginatedData.map((item, index) => (
            <div className="w-full h-fit flex flex-col gap-2" key={index}>
              <Rating>
                {Array.from({ length: 5 }, (_, i) => (
                  <RatingStar key={i} filled={i < item.rating} />
                ))}
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.created_at}
                </p>
              </Rating>
              <div className="flex gap-4 items-center">
                {item.foto_profil == null ? (
                  <Avatar alt="User" img={"/default_profile.jpg"} rounded />
                ) : (
                  <Avatar
                    alt="User"
                    img={
                      process.env.NEXT_PUBLIC_STORAGE_FILE + item.foto_profil
                    }
                    rounded
                  />
                )}
                <h3 className="text-md font-medium">{item.nama}</h3>
              </div>
              <p className="text-gray-500">{item.ulasan}</p>
              <div className="h-[1px] rounded-full w-full bg-gray-300 px-20"></div>
            </div>
          ))
        ) : (
          <EmptyData
            title="Belum ada Testimoni"
            value="Tunggu Testimoni nya ya!"
          />
        )}
      </div>
      <div className="mt-5 flex w-full justify-center">
        {totalPages > 1 && (
          <div className="flex items-center">
            <PaginationArrow
              onClick={handlePrevPage}
              direction="left"
              isDisabled={currentPage === 1}
            />
            {allPages.map((page, index) => {
              let position: "first" | "last" | "single" | "middle" | undefined;

              if (index === 0) position = "first";
              if (index === allPages.length - 1) position = "last";
              if (allPages.length === 1) position = "single";
              if (page === "...") position = "middle";

              return (
                <PaginationNumber
                  key={page}
                  onClick={() => {
                    if (typeof page === "number") {
                      handlePageChange(page);
                    }
                  }}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}
            <PaginationArrow
              onClick={handleNextPage}
              direction="right"
              isDisabled={currentPage === totalPages}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function PaginationNumber({
  page,
  onClick,
  isActive,
  position,
}: {
  page: number | string;
  onClick: () => void;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-primaryColor border-primaryColor text-whiteColor": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button onClick={onClick} className={className}>
      {page}
    </button>
  );
}

function PaginationArrow({
  onClick,
  direction,
  isDisabled,
}: {
  onClick: () => void;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 lg:mr-4": direction === "left",
      "ml-2 lg:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  );
}
