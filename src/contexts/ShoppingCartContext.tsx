import { useLazyQuery, useMutation } from "@apollo/client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { GET_PRODUCT_BY_ID } from "../graphql/queries";
import { UPDATE_PRODUCT_SALES } from "../graphql/mutations";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type Product = {
  id: string;
  name: string;
  image_url: string;
  description: string;
  price_in_cents: number;
  amount: number;
  sales: number;
};

type GetProductQueryProps = {
  allProducts: Product[];
};

type UpdateProductSalesMutationProps = {
  updateProduct: {
    id: string;
    name: string;
    sales: string;
  };
};

type ShoppingCartContextProps = {
  handleAddProductToCart: (productId: string) => void;
  handleRemoveProductFromCart: (productId: string) => void;
  handleUpdateProductAmount: (productId: string, amount: number) => void;
  handleFinishOrder: () => void;
  totalPrice: number;
  totalAmount: number;
  products: Product[];
};

export const ShoppingCartContext = createContext<ShoppingCartContextProps>(
  {} as ShoppingCartContextProps
);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const cookies = parseCookies();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState(() =>
    products.reduce((acc, product) => acc + product.amount, 0)
  );
  const [totalPrice, setTotalPrice] = useState(() =>
    products.reduce(
      (acc, product) => acc + product.price_in_cents * product.amount,
      0
    )
  );
  const [getProduct] = useLazyQuery<GetProductQueryProps>(GET_PRODUCT_BY_ID);
  const [updateProductSales] = useMutation<UpdateProductSalesMutationProps>(
    UPDATE_PRODUCT_SALES
  );

  async function handleAddProductToCart(productId: string) {
    const productAlreadyExists = products.find(
      (product) => product.id === productId
    );

    if (productAlreadyExists) {
      const newProducts = products.map((product) =>
        product.id === productId
          ? { ...product, amount: product.amount + 1, sales: product.sales + 1 }
          : product
      );

      setProducts(newProducts);
    } else {
      const { data } = await getProduct({
        variables: { filter: { id: productId } },
      });
      const product = data?.allProducts[0] || ({} as Product);

      setProducts((prevProducts) => [
        ...prevProducts,
        { ...product, amount: 1, sales: product.sales + 1 },
      ]);
    }
  }

  function handleRemoveProductFromCart(productId: string) {
    const newProducts = products.filter((product) => product.id !== productId);
    setProducts(newProducts);
    setCookie(null, "@capputeeno:cart", JSON.stringify(newProducts), {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }

  function handleUpdateProductAmount(productId: string, amount: number) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, amount, sales: amount }
          : product
      )
    );
  }

  async function handleFinishOrder() {
    for (const product of products) {
      await updateProductSales({
        variables: {
          id: product.id,
          sales: product.sales,
        },
      });
    }

    setProducts([]);
    setCookie(null, "@capputeeno:cart", JSON.stringify([]));
    setTotalAmount(0);
    setTotalPrice(0);
  }

  function getTotalPrice() {
    return products.reduce((acc, product) => {
      return acc + product.price_in_cents * product.amount;
    }, 0);
  }

  function getTotalAmount() {
    return products.reduce((acc, product) => {
      return acc + product.amount;
    }, 0);
  }

  useEffect(() => {
    setProducts(
      cookies["@capputeeno:cart"] ? JSON.parse(cookies["@capputeeno:cart"]) : []
    );
  }, []);

  useEffect(() => {
    setTotalAmount(() => getTotalAmount());
    setTotalPrice(() => getTotalPrice());
    if (products.length > 0) {
      setCookie(null, "@capputeeno:cart", JSON.stringify(products), {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
    }
  }, [products]);

  return (
    <ShoppingCartContext.Provider
      value={{
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleUpdateProductAmount,
        handleFinishOrder,
        totalAmount,
        totalPrice,
        products,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
