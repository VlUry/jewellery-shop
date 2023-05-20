export interface ParamsI {
  productId: string;
}

export default async function ProductPage({ params }: { params: ParamsI }) {
  const res = await fetch(
    `http://localhost:3000/api/product/${params.productId}`
  );
  const product = await res.json();

  return <h1>{JSON.stringify(product)}</h1>;
}
