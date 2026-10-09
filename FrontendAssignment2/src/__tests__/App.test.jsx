
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import App from '../App';

//mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};

//mock Header with cart count
vi.mock('../components/Header', async () => {
    const { Link } = await import('react-router-dom');
    return {
        default: ({ cartCount }) => (
            <div>
                <p>Cart count: {cartCount}</p>
                <Link to="/products">Products</Link>
            </div>
        ),
    };
});

//mock Footer
vi.mock('../components/Footer', () => ({
    default: () => <footer>Footer</footer>,
}));

//mock HomePage
vi.mock('../pages/HomePage', () => ({
    default: () => <div>Home Page</div>,
}));

//mock ProductsPage with button to add product
vi.mock('../pages/ProductPage', () => ({
    default: ({ addToCart }) => (
        <div>
            <h1>Products Page</h1>
            <button onClick={() => addToCart({

                    id: 1,
                    name: 'Wireless Headphones',
                    price: 99.99,
                    image: 'https://placehold.co/600x400',
                    description: 'Premium headphones',
                })
            }>Add Test Product</button>
        </div>
    ),
}));

//mock CartPage
vi.mock('../pages/CartPage', () => ({
    default: ({ products }) => (
        <div>Items in cart: {products.length}</div>
    ),
}));

//mock misc pages
vi.mock('../pages/ProductDetails', () => ({
    default: () => <div>Product Details</div>,
}));

vi.mock('../pages/AboutPage', () => ({
    default: () => <div>About Page</div>,
}));

vi.mock('../pages/FAQPage', () => ({
    default: () => <div>FAQ Page</div>,
}));

describe('App localStorage Integration', () => {
    //resets the localStorage mock for each test
    beforeEach(() => {
        vi.stubGlobal('localStorage', localStorageMock);

        localStorageMock.getItem.mockReset();
        localStorageMock.setItem.mockReset();
        localStorageMock.removeItem.mockReset();
        localStorageMock.clear.mockReset();

        //return empty cart by default
        localStorageMock.getItem.mockReturnValue('[]');
    });

    //tests App renders
    test('renders App component', () => {
        render(<App/>);

        expect(screen.getByText('Home Page')).toBeInTheDocument();
        expect(screen.getByText('Cart count: 0')).toBeInTheDocument();
    });

    //test saved cart data loads from localStorage
    test('loads cart data from localStorage', () => {
        //create saved cart data
        const savedCart = JSON.stringify([
            {
                id: 1,
                name: 'Wireless Headphones',
                price: 99.99,
                image: 'https://placehold.co/600x400',
                description: 'Premium headphones',
            },
        ]);

        localStorageMock.getItem.mockReturnValue(savedCart);

        //render the App
        render(<App/>);
        //checks saved cart was loaded
        expect(localStorageMock.getItem).toHaveBeenCalledWith('cart');
        expect(screen.getByText('Cart count: 1')).toBeInTheDocument();
    });

    //tests cart changes are saved to localStorage
    test('saves cart data to localStorage when cart changes', async () => {
        render(<App/>);

        //clicks Products page
        fireEvent.click(screen.getByRole('link', { name: 'Products' }));
        //adds product to the cart
        fireEvent.click(screen.getByRole('button', { name: 'Add Test Product' }));

        //checks localStorage saves the updated cart
        await waitFor(() => {
            expect(localStorageMock.setItem).toHaveBeenCalledWith( 'cart',
                JSON.stringify([
                    {
                        id: 1,
                        name: 'Wireless Headphones',
                        price: 99.99,
                        image: 'https://placehold.co/600x400',
                        description: 'Premium headphones',
                    },
                ])
            );
        });

        //checks cart counted updates
        expect(screen.getByText('Cart count: 1')).toBeInTheDocument();
    });
});
