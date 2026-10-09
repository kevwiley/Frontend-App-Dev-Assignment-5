import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../ProductCard";

describe("ProductCard", () => {
    //product passed to component as a prop
    const product = {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://placehold.co/600x400",
        description: "Premium noise-cancelling headphones with 30-hour battery life"
    };

    //tests render without crashing
    test("renders without crashing", () => {
        render(
            <MemoryRouter>
                <ProductCard product={product} onAddToCart={() => {}}/>
            </MemoryRouter>
        );
    });

    //tests product name is displayed
    test("displays product name", () => {
        render(
            <MemoryRouter>
                <ProductCard product={product} onAddToCart={() => {}}/>
            </MemoryRouter>
        );
        expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
    });

    //tests product price is displayed
    test("displays product price", () => {
        render(
            <MemoryRouter>
                <ProductCard product={product} onAddToCart={() => {}}/>
            </MemoryRouter>
        );
        expect(screen.getByText("$99.99")).toBeInTheDocument();
    });

    //tests product description is displayed
    test("displays product description", () => {
        render(
            <MemoryRouter>
                <ProductCard product={product} onAddToCart={() => {}}/>
            </MemoryRouter>
        );
        expect(screen.getByText(product.description)).toBeInTheDocument();
    });

    //test Add to Cart button appears
    test("contains Add to Cart button", () => {
        render(
            <MemoryRouter>
                <ProductCard product={product} onAddToCart={() => {}}/>
            </MemoryRouter>
        );
        expect(screen.getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();
    });

    //tests button interaction
    test("calls onAddToCart with the product when clicked", () => {
        //mock function
        const onAddToCart = vi.fn();

        //renders the component with mock function
        render(
            <MemoryRouter>
                <ProductCard product={product} onAddToCart={onAddToCart}/>
            </MemoryRouter>
        );

        //clicks Add to Cart button
        fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }));

        //tests function was called once with correct product
        expect(onAddToCart).toHaveBeenCalledTimes(1);
        expect(onAddToCart).toHaveBeenCalledWith(product);
    });
});

