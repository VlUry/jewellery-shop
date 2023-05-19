"use client";

import { ProductI } from "@/app/page";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProductListProps {
  products: ProductI[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;

interface ProductProps {
  product: ProductI;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { images, description, name } = product;

  return (
    <MotionLink
      href={`${123}`}
      whileHover="hovered"
      whileFocus="hovered"
      initial="initial"
      className="h-[45vh] w-[45vw] md:h-[50vh] md:w-[25vw]"
    >
      <div className="relative h-full w-full overflow-hidden rounded">
        <MotionImage
          fill
          className="object-cover"
          sizes="500px"
          src={images[0]}
          alt={description ? description : name}
          transition={{ duration: 0.2 }}
          variants={{
            hovered: { scale: 1.25 },
            initial: { scale: 1 },
          }}
          priority
        />
      </div>
    </MotionLink>
  );
};

const MotionImage = motion(Image);
const MotionLink = motion(Link);
