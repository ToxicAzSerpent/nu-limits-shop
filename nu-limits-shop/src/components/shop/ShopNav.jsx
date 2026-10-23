import React from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingBag } from "lucide-react";

export default function ShopNav({ storeName, cartCount, onCart, onMenu }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-4 py-4 md:px-10 md:py-6">
        <Link
          to="/"
          className="font-nu text-[13px] font-semibold uppercase tracking-[0.42em] text-white transition-opacity hover:opacity-70 md:text-[15px]"
        >
          {storeName}
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onCart}
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3.5 py-2.5 text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur-md transition hover:border-white/40 hover:text-white md:px-4"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
            <span className="hidden sm:inline">Bag</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-nu-accent px-1 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          </button>

          <button
            onClick={onMenu}
            className="group flex items-center gap-3 rounded-full border border-white/15 bg-black/20 px-3.5 py-2.5 text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur-md transition hover:border-white/40 hover:text-white md:px-4"
          >
            <span className="hidden sm:inline">Menu</span>
            <Menu className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </header>
  );
}