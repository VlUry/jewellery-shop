import { fetchAllProducts } from "@/utils/stripe";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [""];

  const routesSitemap: MetadataRoute.Sitemap = routes.map((route) => ({
    url: route ? `${process.env.URL}/${route}` : `${process.env.URL}`,
    lastModified: new Date(),
  }));

  const products = await fetchAllProducts();
  const productSitemap: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${process.env.URL}/${product.id}`,
    lastModified: new Date(product.updated),
  }));

  return [...routesSitemap, ...productSitemap];
}
