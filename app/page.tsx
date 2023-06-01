import ProductList from "@/components/ProductList";
import { fetchAllProducts } from "@/utils/stripe";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const products = await fetchAllProducts();
  const { images } = products[0];

  const title = "Aell";
  const description =
    "Discover Aell's locally handcrafted jewelry. Find unique handmade necklaces, earrings, rings, and bracelets reflecting individuality and style. Embrace the beauty of handmade adornments. Express your personal flair with Aell's distinctive creations.";

  return { title, description, openGraph: { images, title, description } };
}

export default async function Home() {
  const products = await fetchAllProducts();

  if (!products) throw new Error("Something went wrong on the server");

  return <ProductList products={products} />;
}
