import Link from "next/link";

type PaginationItemProps = {
  page: number;
  category: string;
  isCurrent?: boolean;
};

export function PaginationItem({
  page,
  category,
  isCurrent,
}: PaginationItemProps) {
  return (
    <Link href={`/?page=${page}&category=${category}`}>
      <span
        className={`p-1 h-[32px] w-[32px] bg-[#E9E9F0] flex align-center justify-center rounded-lg cursor-pointer text-[#737380]  ${
          isCurrent && "border-2 border-[#FFA585] bg-white-100 text-[#FFA585]"
        }`}
      >
        {page}
      </span>
    </Link>
  );
}
