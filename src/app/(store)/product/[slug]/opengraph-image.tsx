import { api } from "@/data/api";
import type { Product } from "@/data/types/products";
import { env } from "@/env";
import { ImageResponse } from "next/og";
import colors from "tailwindcss/colors";

// Image metadata
export const alt = "About Acme";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

async function getProduct(slug: string): Promise<Product> {
	const response = await api(`/product/${slug}`, {
		next: {
			revalidate: 60 * 60, // 1 hour
		},
	});

	const product = await response.json();

	return product;
}

// Image generation
export default async function OgImage({
	params,
}: { params: { slug: string } }) {
	const product = await getProduct(params.slug);

	const baseUrl = env.APP_URL;

	const productImageUrl = new URL(product.image, baseUrl).toString();

	return new ImageResponse(
		// ImageResponse JSX element
		<div
			style={{
				background: colors.zinc[950],
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<img src={productImageUrl} alt="" style={{ width: "100%" }} />
		</div>,
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
		},
	);
}
