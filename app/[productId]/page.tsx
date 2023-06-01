import Image from "next/image";
import ProductButton from "@/components/ProductButton";
import { notFound } from "next/navigation";
import { fetchProduct } from "@/utils/stripe";

export interface ParamsI {
  productId: string;
}

export default async function ProductPage({ params }: { params: ParamsI }) {
  const product = await fetchProduct(params.productId);

  if (!product) notFound();

  const {
    images,
    name,
    description,
    default_price: { id: priceId, currency, unit_amount },
  } = product;

  const price = unit_amount ? unit_amount / 100 : 444;

  return (
    <div className="flex w-full flex-col items-center gap-6 md:w-auto md:flex-row">
      <div className="relative h-[50vh] w-full overflow-hidden rounded md:h-[85vh] md:w-[35vw]">
        <Image
          fill
          className="object-cover"
          sizes="500px"
          quality={100}
          src={images[0]}
          alt={name}
          priority
        />
      </div>
      <div className="flex w-full flex-col items-center md:w-[20vw] md:items-start">
        <div>
          <h1 className="text-center text-2xl font-bold md:text-start">
            {name}
          </h1>
          <p className="mt-3">{description}</p>
        </div>
        <div className="mt-6">
          <p className="uppercase">
            {currency} {price}
          </p>
          <ProductButton
            priceId={priceId}
            img={images[0]}
            name={name}
            price={price}
            currency={currency}
            description={description}
          />
        </div>
      </div>
    </div>
  );
}
