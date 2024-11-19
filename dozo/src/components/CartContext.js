import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Inicializar carrito desde localStorage
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Error al cargar carrito desde localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        // Guardar carrito en localStorage cada vez que cambie
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item.id === product.id && item.talla === product.talla
            );

            if (existingProduct) {
                // Si el producto ya está en el carrito, incrementa la cantidad
                return prevCart.map((item) =>
                    item.id === product.id && item.talla === product.talla
                        ? { ...item, cantidad: item.cantidad + (product.cantidad || 1) }
                        : item
                );
            } else {
                // Si el producto no está en el carrito, añade con cantidad 1 por defecto
                return [...prevCart, { ...product, cantidad: product.cantidad || 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== id));
    };

    const updateProductQuantity = (id, cantidad) => {
        setCart((prevCart) =>
            prevCart.map((product) =>
                product.id === id ? { ...product, cantidad } : product
            )
        );
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateProductQuantity, setCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
