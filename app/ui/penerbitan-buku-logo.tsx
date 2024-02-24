import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex items-center  leading-none text-primaryColor`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <div>
        <p className="text-[20px]">PT Penerbitan Buku</p>
      </div>
    </div>
  );
}
