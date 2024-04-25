"use client";

import { type ReactNode, createContext, useContext, useState } from "react";

interface CartItem {
	productId: string;
	quantity: number;
}

interface CardContextType {
	items: CartItem[];
	addToCart: (productId: string) => void;
}

const CardContext = createContext({} as CardContextType);

export function CardProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	function addToCart(productId: string) {
		setCartItems((state) => {
			const productInCart = state.some((item) => item.productId === productId);

			if (productInCart) {
				return state.map((item) => {
					if (item.productId === productId) {
						return {
							...item,
							quantity: item.quantity + 1,
						};
					}
					return item;
				});
			}

			return [...state, { productId, quantity: 1 }];
		});
	}

	return (
		<CardContext.Provider value={{ items: cartItems, addToCart }}>
			{children}
		</CardContext.Provider>
	);
}

export const useCart = () => useContext(CardContext);
