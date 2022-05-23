import { render, screen } from "@testing-library/react";
import { ProductListItem } from "../../components";

describe("ProductListItem component", () => {
  const product = {
    id: "product-id",
    name: "product-name",
    image_url: "/product-img",
    price_in_cents: 120,
  };
  it("should render correctly", () => {
    render(<ProductListItem product={product} />);

    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
});
