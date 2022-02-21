import { render } from "@testing-library/react";
import Products from "../pages/Products/Products";

describe("Products component tests", () => {
  it("Render products component", () => {
    render(<Products />);
  });

  it("Check if label 'Filter Products' is in the document", () => {
    const { getByText } = render(<Products />);
    expect(getByText("Filter Products")).toBeInTheDocument();
  });

  it("Check if products page matches recent snapshot", () => {
    const products = render(<Products />);
    expect(products).toMatchSnapshot();
  });
});
