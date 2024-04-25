// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CoursellSkeleton() {
  return (
    <section className="w-full h-56 sm:h-64 xl:h-80 2xl:h-96 bg-gray-200"></section>
  );
}

export function KoleksiBukuBerandaSkeleton() {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8 lg:px-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <CardKoleksiBukuSkeleton key={index} />
      ))}
    </section>
  );
}

export function ProdukTerlarisSkeleton() {
  return (
    <section className={`flex flex-col justify-center items-center`}>
      <div className="flex w-full justify-between items-center mb-4 lg:px-8">
        <div className="bg-gray-200 h-5 w-full"></div>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <KoleksiBukuBerandaSkeleton />
    </section>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <section
        className={`${shimmer} relative overflow-hidden rounded-md bg-gray-100 w-screen h-full`}
      >
        <CoursellSkeleton />
        <div className="px-14 lg:px-20 py-16">
          <ProdukTerlarisSkeleton />
        </div>
        <div className="px-14 lg:px-20 py-16">
          <ProdukTerlarisSkeleton />
        </div>
        <div className="px-14 lg:px-20 py-16">
          <ProdukTerlarisSkeleton />
        </div>
      </section>
    </>
  );
}

//CardKoleksiBukuSkeleton
export function CardKoleksiBukuSkeleton() {
  return (
    <section
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm w-full h-[375px]`}
    >
      <div className="flex justify-center">
        <div className="p-4 w-48 h-48 bg-gray-200" />
      </div>
      <div className="px-5 pb-5">
        <h2 className="text-sm font-light bg-gray-200 h-5 w-20 mb-2.5" />
        <h3 className="text-base font-semibold tracking-tight text-blackColor line-clamp-2 bg-gray-200 h-5 w-40 mb-2.5" />
        <p className="text-xl font-bold text-blackColor bg-gray-200 h-5 w-20" />
        <div className="flex items-center mt-2.5 justify-between">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <div className="bg-gray-200 h-5 w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}

// KoleksiBukuSkeleton
export function KoleksiBukuSkeleton() {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 mx-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <CardKoleksiBukuSkeleton key={index} />
      ))}
    </section>
  );
}

// FilterBoxBuku
export function FilterBukuSkeleton() {
  return (
    <section
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm w-[200px] h-[375px] flex flex-col gap-8`}
    >
      <div className="w-full h-10 bg-gray-200" />
      <div className="w-full h-10 bg-gray-200" />
      <div className="w-full h-10 bg-gray-200" />
      <div className="w-full h-10 bg-gray-200" />
    </section>
  );
}

// keranjang
export function KeranjangSkeleton() {
  return (
    <section className="flex flex-col lg:flex-row justify-between gap-8">
      <div className="flex-1 flex flex-col gap-4">
        <div className="h-5 bg-gray-200 w-full"></div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ItemKeranjangSkeleton key={index} />
          ))}
        </div>
      </div>
      <div className="flex-[0.5]">
        <section
          className={`${shimmer} h-fit relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm w-full `}
        >
          <div className="flex flex-col m-6 gap-8">
            <div className="h-5 w-20 bg-gray-200"></div>
            <div className="h-5 w-20 bg-gray-200"></div>
            <div className="h-5 w-20 bg-gray-200"></div>
          </div>
        </section>
      </div>
    </section>
  );
}

// item keranjang
export function ItemKeranjangSkeleton() {
  return (
    <section
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm w-full h-[100px]`}
    >
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <div className="h-5 w-5 bg-gray-200"></div>
          <div className="w-20 h-20 bg-gray-200"></div>
          <div className="flex flex-col gap-2">
            <div className="h-5 w-40 bg-gray-200"></div>
            <div className="h-5 w-20 bg-gray-200"></div>
            <div className="h-5 w-20 bg-gray-200"></div>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <div className="h-5 w-20 bg-gray-200"></div>
        </div>
      </div>
    </section>
  );
}

// detail buku skeleton
export function DetailBukuSkeleton() {
  return (
    <section
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm w-full h-full`}
    >
      <section className="px-14 lg:px-28 py-12">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col lg:w-3/4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="lg:w-1/2 flex flex-col lg:sticky lg:top-[182px] h-fit">
                <div className="max-w-full rounded-lg object-cover object-center min-h-52 lg:h-[480px] bg-gray-200"></div>
                <div className="grid grid-cols-5 gap-4">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index}>
                      <div className="mt-4 h-20 max-w-full cursor-pointer rounded-lg object-cover object-center bg-gray-200"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col">
                {/* head */}
                <div>
                  <div className="h-5 w-full mb-4 bg-gray-200"></div>

                  <div className="h-5 w-full mb-4 bg-gray-200"></div>

                  <div className="h-5 w-full mb-4 bg-gray-200"></div>
                </div>
                {/* deskripsi */}
                <div>
                  <div className="h-5 w-full mb-4 bg-gray-200"></div>
                  <div className="h-5 w-full mb-4 bg-gray-200"></div>
                </div>
                {/* detail data */}
                <div className="flex flex-col lg:flex-row gap-16 mt-8">
                  <div className="flex flex-col gap-8">
                    {/* isbn */}
                    <div className="flex flex-col gap-2">
                      <div className="h-5 w-full mb-4 bg-gray-200"></div>

                      <div className="h-5 w-full mb-4 bg-gray-200"></div>
                    </div>
                    {/* tanggal terbit */}
                    <div className="flex flex-col gap-2">
                      <div className="h-5 w-full mb-4 bg-gray-200"></div>
                      <div className="h-5 w-full mb-4 bg-gray-200"></div>
                    </div>
                    {/* jumlah halaman */}
                    <div className="flex flex-col gap-2">
                      <div className="h-5 w-full mb-4 bg-gray-200"></div>
                      <div className="h-5 w-full mb-4 bg-gray-200"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-8">
                    {/* bahasa */}
                    <div className="flex flex-col gap-2">
                      <div className="h-5 w-full mb-4 bg-gray-200"></div>
                      <div className="h-5 w-full mb-4 bg-gray-200"></div>
                    </div>
                    {/* penerbit */}
                    <div className="flex flex-col gap-2">
                      <div className="h-5 w-full mb-4 bg-gray-200"></div>
                      <div className="h-5 w-full mb-4 bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center px-8 mt-16">
              <div className="h-5 w-full mb-4 bg-gray-200"></div>
              <div className="h-5 w-full mb-4 bg-gray-200"></div>
            </div>
            <div className="mt-4">
              <div className="w-full h-fit flex flex-col gap-2">
                <div className="h-5 w-full mb-4 bg-gray-200"></div>
                <div className="flex gap-4 items-center">
                  <div className="h-5 w-full mb-4 bg-gray-200"></div>
                  <div className="h-5 w-full mb-4 bg-gray-200"></div>
                </div>
                <div className="h-5 w-full mb-4 bg-gray-200"></div>
                <div className="h-[1px] rounded-full w-full bg-gray-300 px-20"></div>
              </div>
            </div>
          </div>
          <div className="lg:ml-8 lg:w-1/4 h-fit">
            <section className="bg-gray-200 border border-gray-200 rounded-lg min-w-full">
              <div className="flex flex-col m-6">
                <div className="h-5 w-full mb-4 bg-white"></div>
                <div className="h-5 w-full mb-4 bg-white"></div>
                <div className="h-5 w-full mb-4 bg-white"></div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <div className="px-14 lg:px-20 py-16">
        <ProdukTerlarisSkeleton />
      </div>
    </section>
  );
}
