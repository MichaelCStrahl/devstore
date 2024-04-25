"use client";

import { useCart } from "@/contexts/card-context";
import { ShoppingBag } from "lucide-react";

export function CartWidget() {
	const { items } = useCart();
	const quantity = items.length;

	return (
		<div className="flex items-center gap-2">
			<ShoppingBag className="h-4 w-4" />
			<span className="text-sm">Cart ({quantity})</span>
		</div>
	);
}
