import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_PRODUCTS_COUNT } from "../../graphql/queries/getProductsCount";
import { PaginationItem } from "./PaginationItem";

type QueryProps = {
  _allProductsMeta: { count: number };
};

const siblingsCount = 1;

function generatePages(from: number, to: number) {
  return [...new Array(to - from + 1)]
    .map((_, i) => i + from)
    .filter((page) => page >= 0);
}

export function Pagination() {
  const { query } = useRouter();
  const { page: curPage = 0, category } = query;
  const productsPerPage = 12;
  const filter =
    category !== "all" ? { category: String(category) } : undefined;
  const { data } = useQuery<QueryProps>(GET_PRODUCTS_COUNT, {
    variables: {
      filter,
    },
  });
  const lastPage =
    Math.ceil((data?._allProductsMeta?.count || 0) / productsPerPage) - 1;
  const previousPages =
    Number(curPage) > 0
      ? generatePages(Number(curPage) - 1 - siblingsCount, Number(curPage) - 1)
      : [];
  const nextPages =
    Number(curPage) < lastPage
      ? generatePages(
          Number(curPage) + 1,
          Math.min(Number(curPage) + siblingsCount, lastPage)
        )
      : [];

  return (
    <div className="flex gap-1">
      {previousPages.map((page) => (
        <PaginationItem key={page} page={page} category={String(category)} />
      ))}

      <PaginationItem page={Number(curPage)} category={String(category)} isCurrent />

      {nextPages.map((page) => (
        <PaginationItem key={page} page={page} category={String(category)} />
      ))}
    </div>
  );
}
