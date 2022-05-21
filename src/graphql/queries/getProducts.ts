import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($page: Int, $filter: ProductFilter) {
    allProducts(page: $page, perPage: 12, filter: $filter) {
      id
      name
      image_url
      price_in_cents
    }
  }
`;