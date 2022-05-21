import { ProductListItem } from "./ProductListItem";

type Product = {
  id: string;
  name: string;
  image_url: string;
  price_in_cents: number;
};

type ProductsListProps = {
  products?: Product[];
};

export function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="max-w-[1120px] grid grid-cols-4 gap-8 mx-auto mb-5">
      {products?.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
