import Stripe from "stripe";

export interface ProductI extends Stripe.Product {
  default_price: Stripe.Price;
}

export default function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET ?? "", {
    apiVersion: "2022-11-15",
  });
}

export function handleStripeError(error: any) {
  if (error.type === "StripeInvalidRequestError") {
    return { message: "Invalid request data", code: 400 };
  }

  return { message: "Internal server error", code: 400 };
}

export async function fetchAllProducts() {
  if (!process.env.URL) {
    return null;
  }
  const res = await fetch(`${process.env.URL}/api/product`);
  const products = (await res.json()) as ProductI[];

  return products;
}

export async function fetchProduct(productId: string) {
  if (!process.env.URL) {
    return null;
  }
  const res = await fetch(`${process.env.URL}/api/product/${productId}`);
  const product = (await res.json()) as ProductI;

  return product;
}
