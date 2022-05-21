import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($filter: ProductFilter) {
    allProducts(filter: $filter) {
      id
      name
      image_url
      price_in_cents
      category
      description
      sales
    }
  }
`;
