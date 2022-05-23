import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { OrderSummary } from "../../components/OrderSummary";
import { useShoppingCart } from "../../hooks";

jest.mock("../../hooks/useShoppingCart.ts");

describe("OrderSummary component", () => {
  it("should render correctly", () => {
    const mockedUseShoppingCart = mocked(useShoppingCart);

    mockedUseShoppingCart.mockReturnValue({
      totalPrice: 1200,
      products: [],
      handleFinishOrder: jest.fn(),
    } as any);
    
    render(<OrderSummary />);

    expect(screen.getByText("RESUMO DO PEDIDO")).toBeInTheDocument();
    expect(screen.getByText("FINALIZAR A COMPRA")).toBeInTheDocument();
    expect(screen.getByText(/52,00/)).toBeInTheDocument();
  });

  it("should not have delivery price with total more than R$ 90", () => {
    const mockedUseShoppingCart = mocked(useShoppingCart);

    mockedUseShoppingCart.mockReturnValue({
      totalPrice: 91000,
      products: [],
      handleFinishOrder: jest.fn(),
    } as any);
    
    render(<OrderSummary />);

    expect(screen.getAllByText(/910,00/)).toHaveLength(2);
  });
});
