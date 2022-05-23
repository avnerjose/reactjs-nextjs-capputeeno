import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { formatPrice } from "../utils";
import { TrashIcon } from "./Icons";

type Product = {
  id: string;
  name: string;
  image_url: string;
  description: string;
  price_in_cents: number;
  amount: number;
};

type CartProductItemProps = {
  product: Product;
};

export function CartProductItem({ product }: CartProductItemProps) {
  const {
    handleUpdateProductAmount,
    handleRemoveProductFromCart,
  } = useShoppingCart();

  return (
    <div key={product.id} className="flex bg-white rounded-md shadow-md mb-4">
      <div className="relative w-[300px] ">
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          src={product.image_url}
          alt={product.name}
        />
      </div>
      <div className="w-[66%] p-4 text-[#41414D]">
        <header className="flex justify-between items-center mb-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-thin text-2xl hover:underline cursor-pointer ">
              {product.name}
            </h3>
          </Link>
          <TrashIcon
            onClick={() => handleRemoveProductFromCart(product.id)}
            className="w-5 h-5 text-[#DE3838] cursor-pointer"
            aria-label="Remove product from cart"
          />
        </header>
        <h3>{product.description}</h3>
        <footer className="mt-6 font-semibold flex align-center justify-between text-xl text-black">
          <select
            id="amount"
            data-testid="amount-select"
            className=" bg-[#F3F5F6] py-1 px-4 border-2 border-color-[#A8A8B3] rounded-md text-[#A8A8B3] font-semibold"
            onChange={(e) =>
              handleUpdateProductAmount(product.id, Number(e.target.value))
            }
            name="amount"
            value={product.amount}
          >
            {[...new Array(15)].map((_, index) => (
              <option key={index}>{index + 1}</option>
            ))}
          </select>
          <p>{formatPrice(product.price_in_cents)}</p>
        </footer>
      </div>
    </div>
  );
}
