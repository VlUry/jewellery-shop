"use client";

import { useState } from "react";
import { useBagStore } from "../store/bag";
import Bag from "./Bag";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";

const Header: React.FC = () => {
  const itemsInBag = useBagStore((state) => state.items);
  const isOpened = useBagStore((state) => state.isOpened);
  const openBag = useBagStore((state) => state.setIsOpen);

  const [isAtTop, setIsAtTop] = useState(true);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isAtTop && latest > 12) {
      setIsAtTop(false);
    }
    if (!isAtTop && latest <= 12) {
      setIsAtTop(true);
    }
  });

  return (
    <header className="sticky top-0 z-10 flex w-full justify-center bg-stone-50">
      <nav
        className={`flex h-12 items-center justify-between border-b border-black transition-all delay-75 duration-200 ${
          isAtTop ? "w-2/3 px-3" : "w-full px-6"
        }`}
      >
        <a
          href="https://instagram.com/aellsun"
          target="_blank"
          className="hidden hover:underline md:block"
        >
          instagram
        </a>
        <Link href="/">
          <h1 className="text-2xl">Aell</h1>
        </Link>
        <button className="h-full" onClick={openBag}>{`bag ( ${
          itemsInBag ? itemsInBag.length : 0
        } )`}</button>
      </nav>
      <AnimatePresence>{isOpened && <Bag />}</AnimatePresence>
    </header>
  );
};

export default Header;
