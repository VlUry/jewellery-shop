"use client";

import { BagItemI, useBagStore } from "@/store/bag";

const ProductButton: React.FC<BagItemI> = (product) => {
  const itemsInBag = useBagStore((state) => state.items);
  const addItemsToCart = useBagStore((state) => state.addItemToCart);
  const removeItemFromCart = useBagStore((state) => state.removeItemFromCart);

  const isInCart = () => {
    return itemsInBag?.find((item) => item.priceId === product.priceId)
      ? true
      : false;
  };

  const handleButtonClick = () => {
    if (isInCart()) {
      return removeItemFromCart(product.priceId);
    }
    return addItemsToCart(product);
  };

  return (
    <button
      className="h-16 w-48 rounded bg-black text-xl text-white"
      onClick={handleButtonClick}
    >
      {isInCart() ? "Remove" : "Add"}
    </button>
  );
};

export default ProductButton;
