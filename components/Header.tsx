"use client";

import { useBagStore } from "../store/bag";
import Bag from "./Bag";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

const Header: React.FC = () => {
  const itemsInBag = useBagStore((state) => state.items);
  const isOpened = useBagStore((state) => state.isOpened);
  const openBag = useBagStore((state) => state.setIsOpen);

  return (
    <header className="flex w-full justify-center">
      <nav className="flex h-12 w-2/3 items-center justify-between border-b border-black px-3">
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
