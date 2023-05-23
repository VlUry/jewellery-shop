"use client";

import { useState } from "react";
import { BagItemI, useBagStore } from "../store/bag";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const Bag: React.FC = () => {
  const router = useRouter();
  const [checkoutPending, setCheckoutPending] = useState(false);

  const itemsInBag = useBagStore((state) => state.items);
  const totalCost = useBagStore((state) => state.totalCost);
  const closeBag = useBagStore((state) => state.setIsOpen);

  const handleCheckout = async () => {
    if (!itemsInBag) return;

    const line_items = itemsInBag.map((item) => ({
      price: item.priceId,
      quantity: 1,
    }));

    try {
      setCheckoutPending(true);

      const res = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ line_items }),
      });
      const session = await res.json();

      setCheckoutPending(false);

      router.push(session.url);
    } catch (err) {
      setCheckoutPending(false);
    }
  };

  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed right-0 top-0 z-20 flex h-screen w-screen flex-col border border-black bg-white md:right-3 md:top-3 md:h-[calc(100%-1.5rem)] md:w-96 md:rounded-md"
    >
      {itemsInBag ? (
        <>
          <div className="flex h-5/6 flex-col overflow-auto">
            {itemsInBag.map((i) => (
              <BagProduct product={i} key={i.priceId} />
            ))}
          </div>
          <div className="mt-3 flex h-1/5 flex-col items-center justify-center pb-3">
            <p className="w-2/3">Total: EUR {totalCost()}</p>
            <CheckoutButton
              onCheckout={handleCheckout}
              checkoutPending={checkoutPending}
            />
            <div className="w-2/3">
              or{" "}
              <button onClick={closeBag} className="underline">
                continue shopping
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="mb-3 flex h-full flex-col items-center justify-center">
          <p> Nothing in the bag</p>
          <button onClick={closeBag} className="underline">
            Close
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Bag;

interface BagProductProps {
  product: BagItemI;
}

const BagProduct: React.FC<BagProductProps> = ({ product }) => {
  const { img, name, price, currency, description, priceId } = product;

  const removeItemFromBag = useBagStore((state) => state.removeItemFromCart);

  return (
    <div className="flex h-44 border-b border-black p-3">
      <div className="relative h-full w-1/2 overflow-hidden rounded">
        <Image
          fill
          sizes="250px"
          className="object-cover"
          src={img}
          alt={name}
        />
      </div>
      <div className="flex h-full w-1/2 flex-col justify-between gap-3 pl-3">
        <div>
          <p className="text-xl font-bold">{name}</p>
          <p className="truncate">{description}</p>
        </div>
        <div>
          <p className="uppercase">
            {currency} {price}
          </p>
          <button
            className="h-12 w-full rounded bg-black text-lg text-white"
            onClick={() => removeItemFromBag(priceId)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

interface CheckoutButtonProps {
  onCheckout: () => void;
  checkoutPending: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  onCheckout,
  checkoutPending,
}) => {
  return (
    <button
      onClick={onCheckout}
      className="flex h-24 w-2/3 items-center justify-center rounded bg-black text-xl text-white transition-all duration-200"
    >
      {checkoutPending ? (
        <svg
          fill="#000000"
          width="30px"
          height="30px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin fill-white"
        >
          <g>
            <path d="M10,1V3a7,7,0,1,1-7,7H1a9,9,0,1,0,9-9Z" />
          </g>
        </svg>
      ) : (
        <span>Checkout</span>
      )}
    </button>
  );
};
