
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../HomePage";
import App from "../../App";

//mock Header component
vi.mock("../../components/Header", () => ({
    default: () => <header>Mock Header</header>
}));

//mock Footer component
vi.mock("../../components/Footer", () => ({
    default: () => <footer>Mock Footer</footer>
}));

//render HomePage with router
const renderWithRouter = (component) => {
    return render(
        <MemoryRouter>
            {component}
        </MemoryRouter>
    );
};

describe("HomePage", () => {
    //homepage renders without crashing
    test("renders homepage without crashing", () => {
        renderWithRouter(<HomePage/>);
    });
    //test the heading displays
    test("displays the heading", () => {
        renderWithRouter(<HomePage/>);
        expect(screen.getByRole("heading", { name: "High Quality Tech Products" })).toBeInTheDocument();
    });

    //tests the homepage content is displayed
    test("displays the homepage content correctly", () => {
        renderWithRouter(<HomePage/>);

        //checks the subtitle
        expect(screen.getByText("Search for Tech Products Perfect for your Setup.")).toBeInTheDocument();
        //checks h2 text
        expect(screen.getByRole("heading", { name: "Why Shop with Us?" })).toBeInTheDocument();
        //checks that paragraphs display
        expect(screen.getByText(/We offer high quality technology products/)).toBeInTheDocument();
        expect(screen.getByText(/Browse our selection of the best tech products/)).toBeInTheDocument();
    });

    //test the Browse All link on hero
    test("displays the Browse All link", () => {
        renderWithRouter(<HomePage/>);

        expect(screen.getByRole("link", { name: "Browse All" })).toBeInTheDocument();
    });

    //makes sure the Header, Hero, and Footer render
    test("renders mock Header, Footer, and Hero", () => {
        render(<App/>);

        //check the mock Header
        expect(screen.getByText("Mock Header")).toBeInTheDocument();
        //check the Hero, mock didn't work since I check that the actual link renders
        expect(screen.getByRole("heading", { name: "High Quality Tech Products" })).toBeInTheDocument();
        //check the mock Footer
        expect(screen.getByText("Mock Footer")).toBeInTheDocument();
    });
});