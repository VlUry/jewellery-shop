import ProductList from "@/components/ProductList";
import Stripe from "stripe";

export interface ProductI extends Stripe.Product {
  default_price: Stripe.Price;
}

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/product");
  const products = (await res.json()) as ProductI[];

  return <ProductList products={products} />;
}
