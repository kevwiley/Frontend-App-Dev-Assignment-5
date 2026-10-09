import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import CartItem from '../CartItem';

describe('CartItem', () => {
    const product = {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
    };

    //test cartitem renders
    test('renders CartItem component', () => {
        const onRemove = vi.fn();

        render(
            <CartItem product={product} onRemove={onRemove}/>
        );
        //test product name appears as heading
        expect(screen.getByRole('heading', { name: 'Wireless Headphones' })).toBeInTheDocument();
    });

    //tests product name and price are displayed
    test('displays product name and price', () => {
        const onRemove = vi.fn();

        render(
            <CartItem product={product} onRemove={onRemove}/>
        );
        //tests product name appears
        expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
        //tests product price appears
        expect(screen.getByText('$99.99')).toBeInTheDocument();
    });

    //tests clicking Remove calls onRemove with product ID
    test('calls onRemove with product ID when Remove is clicked', () => {
        const onRemove = vi.fn();

        render(
            <CartItem product={product} onRemove={onRemove}/>
        );
        //click remove button
        fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
        //checks onRemove was called exactly once
        expect(onRemove).toHaveBeenCalledTimes(1);
        //checks onRemove received the correct product ID
        expect(onRemove).toHaveBeenCalledWith(1);
    });
});
