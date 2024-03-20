// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CoursellSkeleton() {
  return (
    <section
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm w-full h-[375px]`}
    ></section>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <section
        className={`${shimmer} relative overflow-hidden rounded-md bg-gray-100 w-screen h-screen`}
      />
      <CoursellSkeleton />
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
    <section className="grid grid-cols-4 gap-4 mx-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <CardKoleksiBukuSkeleton key={index} />
      ))}
    </section>
  );
}

// FilterBoxBuku
export function FilterBukuSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm w-full h-[375px]`}
    />
  );
}
