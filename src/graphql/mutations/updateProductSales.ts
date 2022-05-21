import { gql } from "@apollo/client";

export const UPDATE_PRODUCT_SALES = gql`
  mutation UpdateProductSales($id: ID!, $sales: Int!) {
    updateProduct(id: $id, sales: $sales){
        id
        name
        sales
    }
  }
`;