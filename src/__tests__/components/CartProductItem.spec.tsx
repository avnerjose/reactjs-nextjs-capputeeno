import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { CartProductItem } from "../../components/CartProductItem";
import { useShoppingCart } from "../../hooks/useShoppingCart";

jest.mock("../../hooks/useShoppingCart.ts");

describe("CartProductItem component", () => {
  const product = {
    id: "product-id",
    name: "product-name",
    image_url: "/capputeeeno.svg",
    description: "product-description",
    price_in_cents: 20,
    amount: 1,
  };
  it("should render correctly", () => {
    const useShoppingCartMocked = mocked(useShoppingCart).mockReturnValueOnce({
      handleUpdateProductAmount: jest.fn(),
      handleRemoveProductFromCart: jest.fn(),
    } as any);
    render(<CartProductItem product={product} />);

    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });

  it("should be able to remove item from cart", () => {
    const mockedRemoveProductFromCart = jest.fn();
    const useShoppingCartMocked = mocked(useShoppingCart).mockReturnValueOnce({
      handleUpdateProductAmount: jest.fn(),
      handleRemoveProductFromCart: mockedRemoveProductFromCart,
    } as any);

    render(<CartProductItem product={product} />);

    const removeButton = screen.getByLabelText("Remove product from cart");
    fireEvent.click(removeButton);

    expect(mockedRemoveProductFromCart).toHaveBeenCalledWith(product.id);
  });

  it("should be able to update productAmount", () => {
    const mockedHandleUpdateProductAmount = jest.fn();
    const useShoppingCartMocked = mocked(useShoppingCart).mockReturnValueOnce({
      handleUpdateProductAmount: mockedHandleUpdateProductAmount,
      handleRemoveProductFromCart: jest.fn(),
    } as any);

    render(<CartProductItem product={product} />);

    const amountSelect = screen.getByTestId("amount-select");
    fireEvent.change(amountSelect, { target: { value: 3 } });
    expect(mockedHandleUpdateProductAmount).toHaveBeenCalledWith(product.id, 3);
  });
});
