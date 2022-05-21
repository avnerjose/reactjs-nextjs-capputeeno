import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils";

type Product = {
  id: string;
  name: string;
  image_url: string;
  price_in_cents: number;
};

type ProductListItemProps = {
  product: Product;
};

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="shadow-md cursor-pointer">
        <div className="relative h-[300px]">
          <Image
            layout="fill"
            className="h-[100%] object-cover rounded-t-md hover:scale-105 transition-transform:ease-in-out duration-300"
            src={product.image_url}
            alt={product.name}
          />
        </div>
        <footer className="flex flex-col bg-gray-100 px-3 py-2 rounded-b-md">
          <span className="font-light text-[#41414D] after:content-[''] after:block after:h-[1px] after:w-[90%] after:bg-[#DCE2E5] after:mt-1 after:mx-auto">
            {product.name}
          </span>
          <span className="text-black font-bold mt-1">
            {formatPrice(product.price_in_cents)}
          </span>
        </footer>
      </div>
    </Link>
  );
}
