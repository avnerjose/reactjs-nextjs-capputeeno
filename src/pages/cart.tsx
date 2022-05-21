import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeftIcon, Header } from "../components";
import { CartProductItem } from "../components/CartProductItem";
import { OrderSummary } from "../components/OrderSummary";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { formatPrice } from "../utils";

const CartPage: NextPage = () => {
  const { totalAmount, totalPrice, products } = useShoppingCart();

  return (
    <>
      <Head>
        <title>Carrinho | Capputeeno</title>
      </Head>
      <Header />
      <div className="min-h-[calc(100vh-65px)] max-w-[1120px] mx-auto pt-2 mt-16">
        <div className="grid grid-cols-custom gap-2">
          <div>
            <Link href="/" passHref>
              <a className="flex align-center justify-center w-16 text-[#617480]">
                <ArrowLeftIcon className="w-6 h-6" />
                <span>Voltar</span>
              </a>
            </Link>
            <h1 className="text-4xl font-regular text-[#41414D] my-3">
              SEU CARRINHO
            </h1>
            <h3 className="text-2xl text-[#41414D] font-thin mb-4">
              Total ({totalAmount} produtos)
              <span className="ml-2 font-semibold ">
                {formatPrice(totalPrice)}
              </span>
            </h3>
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default CartPage;
