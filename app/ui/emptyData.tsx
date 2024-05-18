import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Button } from "./button";

export default function EmptyData({
  hrefBack,
  title,
  value,
  isButton = false,
}: {
  hrefBack?: string;
  title: string;
  value: string;
  isButton?: boolean;
}) {
  return (
    <section className="flex min-h-[480px] h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{value}</p>
      {isButton ? (
        <Link href={hrefBack ? hrefBack : "/"}>
          <Button>Kembali</Button>
        </Link>
      ) : null}
    </section>
  );
}
