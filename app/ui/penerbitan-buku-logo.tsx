import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex items-center  leading-none text-primaryColor`}
    >
      <GlobeAltIcon className="h-6 w-6 rotate-[15deg]" />
      <div>
        <p className="text-lg">PT Penerbitan Buku</p>
      </div>
    </div>
  );
}
