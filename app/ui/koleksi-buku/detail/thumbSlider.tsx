"use client";
import { GalleryFoto } from "@/app/lib/definitions";
import React from "react";

export default function thumbSlider({
  galleryFoto,
}: {
  galleryFoto: GalleryFoto[];
}) {
  const [active, setActive] = React.useState(
    galleryFoto.length > 0 ? galleryFoto[0].foto : ""
  );

  return (
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={process.env.NEXT_PUBLIC_STORAGE_FILE + active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {galleryFoto.map(({ foto }, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(foto)}
              src={process.env.NEXT_PUBLIC_STORAGE_FILE + foto}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
