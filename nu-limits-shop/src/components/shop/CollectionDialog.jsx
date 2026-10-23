import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import ShopModal from "./ShopModal";
import { formatPrice } from "@/lib/shop";

export default function CollectionDialog({ open, onClose, items, currency, onSelect, loading }) {
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category).filter(Boolean)))],
    [items]
  );

  const visible = category === "All" ? items : items.filter((item) => item.category === category);

  return (
    <ShopModal open={open} onClose={onClose} width="max-w-6xl">
      <div className="p-6 md:p-10">
        <p className="text-[10px] uppercase tracking-[0.34em] text-nu-accent">Collection</p>
        <h2 className="mt-3 font-nu text-3xl uppercase tracking-tight text-white md:text-5xl">
          Every piece
        </h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((option) => (
            <button
              key={option}
              onClick={() => setCategory(option)}
              className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                category === option
                  ? "border-nu-accent bg-nu-accent text-white"
                  : "border-white/15 text-white/55 hover:border-white/35 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="mt-12 text-sm text-nu-muted">Loading pieces…</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {visible.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelect(item)}
                className="group overflow-hidden rounded-[22px] border border-white/10 bg-white/5 text-left transition hover:border-white/25"
              >
                <span className="relative block aspect-square overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="block px-3 py-3">
                  <span className="block truncate text-[11px] uppercase tracking-[0.14em] text-white">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-[11px] text-nu-accent">
                    {formatPrice(item.price, currency)}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        )}

        {!loading && visible.length === 0 && (
          <p className="mt-12 text-sm text-nu-muted">Nothing in this category yet.</p>
        )}
      </div>
    </ShopModal>
  );
}