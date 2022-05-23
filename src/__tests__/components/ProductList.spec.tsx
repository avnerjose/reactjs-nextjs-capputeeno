import { render, screen } from "@testing-library/react";
import { ProductsList } from "../../components";

describe("ProductsList component", () => {
  const products = [
    {
      id: "product-id1",
      name: "product-name1",
      image_url: "/product-img1",
      price_in_cents: 120,
    },
    {
      id: "product-id2",
      name: "product-name2",
      image_url: "/product-img2",
      price_in_cents: 120,
    },
  ];
  it("should render correctly", () => {
    render(<ProductsList products={products} />);

    for (const product of products) {
      expect(screen.getByAltText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.name)).toBeInTheDocument();
    }
  });
});
