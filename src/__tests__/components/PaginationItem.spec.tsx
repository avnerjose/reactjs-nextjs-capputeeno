import { render } from "@testing-library/react";
import { PaginationItem } from "../../components/Pagination/PaginationItem";

describe("PaginationItem component", () => {
  it("should render correctly", () => {
    render(<PaginationItem page={1} category={"mugs"} isCurrent/>);
  });
});
