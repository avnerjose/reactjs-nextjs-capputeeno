import { render, screen } from "@testing-library/react";
import { LoadingIndicator } from "../../components";

describe("LoadingIndicator component", () => {
  it("should render correctly", () => {
    render(<LoadingIndicator />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
