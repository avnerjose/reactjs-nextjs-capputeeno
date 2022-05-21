import { gql } from "@apollo/client";

export const GET_PRODUCTS_COUNT = gql`
  query GetProductsCount($filter: ProductFilter) {
    _allProductsMeta(filter: $filter) {
        count
    }
  }
`;
