import NavLinks from "@/app/ui/navbar/nav-links";
import { Button } from "@/app/ui/button";
import { cookies } from "next/headers";
import { CountKeranjang, User } from "@/app/lib/definitions";
import { getCountKeranjang, getUser } from "@/app/lib/data";
import HamburgerBtn from "@/app/ui/navbar/hamburgerBtn";

export default async function NavBar() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, id, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        id: null,
        token_type: null,
      };

  let user: User | null = null;
  let countKeranjang: CountKeranjang | null = null;

  if (token != null) {
    user = await getUser(id, token, token_type);
    countKeranjang = await getCountKeranjang(token, token_type);
  }

  return (
    <section className="sticky top-0 w-full bg-whiteColor px-8 lg:px-28 z-20 shadow-md">
      <div className="flex flex-col">
        <HamburgerBtn
          dataKeranjang={countKeranjang}
          dataUser={user}
          token={token}
        />
        {/* divider */}
        <div className="hidden lg:block h-0.5 w-full bg-primaryCard px-20"></div>
        <nav>
          <ul className="hidden lg:flex py-4">
            <NavLinks />
          </ul>
        </nav>
      </div>
    </section>
  );
}
