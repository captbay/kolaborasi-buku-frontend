"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

export default function SearchKoleksiBukuPenerbitanUser({
  placeholder,
}: {
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("searchPenerbitan", term);
    } else {
      params.delete("searchPenerbitan");
    }
    replace(`/profil/koleksi-buku-penerbitan-saya?${params.toString()}`);
  }, 1000);

  return (
    <>
      <label htmlFor="searchPenerbitan" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-primaryColor py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("searchPenerbitan")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </>
  );
}
