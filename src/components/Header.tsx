import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { SearchIcon, ShoppingBagIcon } from "./Icons";

export function Header() {
  const { totalAmount } = useShoppingCart();

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between max-w-[1120px] mx-auto py-2 h-[60px]">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <Image
              src="/capputeeno.svg"
              width="220px"
              height="40px"
              alt="Logo"
            />
          </a>
        </Link>
        <div className="flex ">
          <div className="flex bg-[#F3F5F6] items-center justify-between w-[350px] px-4 py-2 rounded-md group group mr-2">
            <input
              className="bg-[#F3F5F6] w-[100%] text-xs outline-none"
              placeholder="Procurando por algo específico?"
            />
            <SearchIcon className="w-6 h-6 text-[#737380]" />
          </div>
          <Link href="/cart" passHref>
            <a className="relative flex align-center justify-center">
              <div
                className={`absolute bottom-[0.5rem] right-[-0.4rem] bg-[#DE3838] rounded-full w-5 h-5 text-sm  text-white flex align-center justify-center ${
                  totalAmount <= 0 && "hidden"
                } `}
              >
                <span>{totalAmount}</span>
              </div>
              <ShoppingBagIcon className="w-6 h-6 mt-2 text-[#737380]" />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
