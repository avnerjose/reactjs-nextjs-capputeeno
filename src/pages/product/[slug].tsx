import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ArrowLeftIcon,
  Header,
  LoadingIndicator,
  ShoppingBagIcon,
} from "../../components";
import { useProduct } from "../../hooks";
import { useShoppingCart } from "../../hooks/useShoppingCart";
import { formatPrice } from "../../utils";

const categories = {
  mugs: "Caneca",
  "t-shirts": "Camiseta",
};

const ProductPage: NextPage = () => {
  const { query } = useRouter();
  const { slug } = query;
  const { product, loading } = useProduct(String(slug));
  const { handleAddProductToCart } = useShoppingCart();

  return (
    <>
      <Head>
        <title>Producto | Capputeeno</title>
      </Head>
      <Header />
      <div className="min-h-[calc(100vh-60px)] max-w-[1120px] mx-auto pt-2 mt-14">
        <Link href="/" passHref>
          <a className="flex align-center justify-center w-16 text-[#617480]">
            <ArrowLeftIcon className="w-6 h-6" />
            <span>Voltar</span>
          </a>
        </Link>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <div className="grid grid-cols-2 min-h-[calc(95vh-60px)]">
            <div className="relative h-[90%] w-[95%] my-auto">
              {product.image_url && (
                <Image
                  layout="fill"
                  src={String(product?.image_url)}
                  alt={product?.name}
                />
              )}
            </div>
            <div className="flex justify-between flex-col p-8">
              <div>
                <h4 className="text-base  text-[#41414D]">
                  {categories[product?.category]}
                </h4>
                <h1 className="text-4xl font-thin text-[#41414D] my-3">
                  {product?.name}
                </h1>
                <p className="text-2xl font-semibold">
                  {formatPrice(Number(product?.price_in_cents))}
                </p>
                <p className="text-sm text-[#737380] mt-10">
                  *Frete de R$40,00 para todo o Brasil. Grátis para compras
                  acima de R$900,00.
                </p>
                <h2 className="text-lg text-[#737380] font-medium mt-12 mb-2">
                  DESCRIÇÃO
                </h2>
                <p className="text-sm text-[#41414D]">{product?.description}</p>
              </div>
              <button
                onClick={() => handleAddProductToCart(product?.id)}
                className="cart-button bg-[#115D8C] text-white p-2 flex align-center justify-center gap-2"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
