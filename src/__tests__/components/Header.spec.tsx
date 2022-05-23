import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";

import { useShoppingCart } from "../../hooks/useShoppingCart";
import { Header } from "../../components";

jest.mock("../../hooks/useShoppingCart");

describe("Header component", () => {
  it("should render correctly", () => {
    const useShoppingCartMocked = mocked(useShoppingCart);
    useShoppingCartMocked.mockReturnValueOnce({
      totalAmount: 0,
    } as any);

    render(<Header />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });
});
