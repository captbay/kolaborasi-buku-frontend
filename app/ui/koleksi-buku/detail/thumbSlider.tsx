"use client";
import { GalleryFoto } from "@/app/lib/definitions";
import React from "react";
import Image from "next/image";

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
        <Image
          className="h-auto w-full max-w-full rounded-lg object-cover object-center lg:h-[480px]"
          src={"http://kolaborasi-buku-backend.test/storage/" + active}
          alt="hero_image"
          width={500}
          height={500}
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {galleryFoto.map(({ foto }, index) => (
          <div key={index}>
            <Image
              onClick={() => setActive(foto)}
              src={"http://kolaborasi-buku-backend.test/storage/" + foto}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
