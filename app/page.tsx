import ProductList from "@/components/ProductList";
import { fetchAllProducts } from "@/utils/stripe";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Aell";
  const description =
    "Discover Aell's locally handcrafted jewelry. Find unique handmade necklaces, earrings, rings, and bracelets reflecting individuality and style. Embrace the beauty of handmade adornments. Express your personal flair with Aell's distinctive creations.";

  return { title, description, openGraph: { title, description } };
}

export default async function Home() {
  const products = await fetchAllProducts();

  if (!products) return <div>There are no products yet</div>;

  return <ProductList products={products} />;
}
