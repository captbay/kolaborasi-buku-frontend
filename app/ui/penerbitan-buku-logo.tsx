// import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import LogoPenerbitan from "@/app/ABAA.png";
import Image from "next/image";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex items-center leading-none text-primaryColor`}
    >
      <Image
        src={LogoPenerbitan}
        alt="logo"
        width={100}
        height={100}
        className="h-6 w-6 mr-1"
      />
      {/* <GlobeAltIcon className="h-6 w-6 rotate-[15deg]" /> */}
      <div>
        <p className="text-xs lg:text-lg">Arunika Budi Agung Abadi</p>
      </div>
    </div>
  );
}
