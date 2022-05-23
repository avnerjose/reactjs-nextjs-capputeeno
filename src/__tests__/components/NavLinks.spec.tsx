import { render, screen } from "@testing-library/react";
import { NavLinks } from "../../components";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      category: "all",
    },
  }),
}));

describe("NavLinks component", () => {
  it("should render correctly", () => {
    render(<NavLinks />);

    expect(screen.getByText("Todos os produtos")).toBeInTheDocument();
    expect(screen.getByText("Camisetas")).toBeInTheDocument();
    expect(screen.getByText("Canecas")).toBeInTheDocument();
  });
});
