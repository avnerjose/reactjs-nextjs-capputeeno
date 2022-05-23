import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Pagination } from "../../components";
import { GET_PRODUCTS_COUNT } from "../../graphql/queries";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      category: "mugs",
      page: 1,
    },
  }),
}));

const mocks = [
  {
    request: {
      query: GET_PRODUCTS_COUNT,
      variables: {
        filter: {
            category: "mugs",
        },
      },
    },
    result: {
      data: {
        _allProductsMeta: { count: 30 },
      },
    },
  },
];

function renderWithApollo(children: any) {
  return render(<MockedProvider mocks={mocks}>{children}</MockedProvider>);
}

describe("Pagination component", () => {
  it("should render correctly", () => {
    renderWithApollo(<Pagination />);
  });
});
