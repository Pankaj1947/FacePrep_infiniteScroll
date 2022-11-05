import { render } from "@testing-library/react";
import { Home } from "../components/Pages/Home";

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />)
  })
  
    it("renders the correct content", () => {
    const { getByText } = render(<Home />);
    getByText("Home");
  });

  it("should have a logout button",() => {
    let logoutBtn= getByText("Logout");
    expect(logoutBtn).toBeInTheDocument();
    })
});
