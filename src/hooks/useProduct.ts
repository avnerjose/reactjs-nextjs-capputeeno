import { ApolloError, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_PRODUCT_BY_ID } from "../graphql/queries";

type Product = {
  id: string;
  name: string;
  image_url: string;
  price_in_cents: number;
  category: "mugs" | "t-shirts";
  description: string;
};

type useProductsReturn = {
  product: Product;
  loading: boolean;
  error: ApolloError | undefined;
};

type QueryProps = {
  allProducts: Product[];
};

export function useProduct(productId: string): useProductsReturn {
  const [getProduct, { loading, error, data }] = useLazyQuery<QueryProps>(
    GET_PRODUCT_BY_ID,
    {
      variables: {
        filter: {
          id: productId,
        },
      },
    }
  );

  useEffect(() => {
    if (productId !== "" && productId !== "undefined") {
      getProduct();
    }
  }, [productId]);

  return {
    product: data?.allProducts[0] || ({} as Product),
    error,
    loading,
  };
}
