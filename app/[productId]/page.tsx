import Image from "next/image";
import { ProductI } from "../page";

export interface ParamsI {
  productId: string;
}

export default async function ProductPage({ params }: { params: ParamsI }) {
  const res = await fetch(
    `http://localhost:3000/api/product/${params.productId}`
  );
  const product = (await res.json()) as ProductI;

  const {
    images,
    name,
    description,
    default_price: { currency, unit_amount },
  } = product;

  return (
    <div className="flex w-full gap-6">
      <div className="relative h-[80vh] w-[30vw] overflow-hidden rounded md:h-[80vh] md:w-[30vw]">
        <Image
          fill
          className="object-cover"
          sizes="500px"
          src={images[0]}
          alt={name}
          priority
        />
      </div>
      <div className="w-[30vw] md:w-[30vw]">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          laboriosam aliquam quas harum qui corrupti consectetur accusamus
          excepturi odit recusandae!
        </p>
        <div className="mt-3">
          <p className="uppercase">
            {currency} {unit_amount && unit_amount / 100}
          </p>
          <button className="h-16 w-48 rounded bg-black text-xl text-white">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
