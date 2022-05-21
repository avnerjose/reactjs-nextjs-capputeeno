import { ApolloError, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";

type Product = {
  id: string;
  name: string;
  image_url: string;
  price_in_cents: number;
};

type useProductsReturn = {
  products?: Product[];
  loading: boolean;
  error: ApolloError | undefined;
};

type Filter = { category: string } | undefined;

export function useProducts(page: string, filter: Filter): useProductsReturn {
  const { loading, error, data, fetchMore } = useQuery<{
    allProducts: Product[];
  }>(GET_PRODUCTS, {
    variables: {
      page: Number(page),
      filter,
    },
  });

  return {
    products: data?.allProducts,
    error,
    loading,
  };
}
