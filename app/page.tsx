import ProductList from "@/components/ProductList";
import { fetchAllProducts } from "@/utils/stripe";

export default async function Home() {
  const products = await fetchAllProducts();

  if (!products) throw new Error("Something went wrong on the server");

  return <ProductList products={products} />;
}
