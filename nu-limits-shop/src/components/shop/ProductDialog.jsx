import React, { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Image } from "@/components/ui/image";
import ShopModal from "./ShopModal";
import PillButton from "./PillButton";
import { formatPrice } from "@/lib/shop";

export default function ProductDialog({ item, currency, onClose, onAdd }) {
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!item) return;
    const sizes = (item.sizes || "").split(",").map((s) => s.trim()).filter(Boolean);
    setSize(sizes[0] || "");
    setQty(1);
  }, [item]);

  const sizes = (item?.sizes || "").split(",").map((s) => s.trim()).filter(Boolean);
  const soldOut = item?.stock === 0;

  return (
    <ShopModal open={!!item} onClose={onClose} width="max-w-5xl">
      {item && (
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[560px]">
            <Image src={item.image_url} alt={item.name} className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center gap-6 p-6 md:p-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-nu-accent">
                {item.category || "Nu Limits"}
              </p>
              <h2 className="mt-3 font-nu text-3xl uppercase leading-[1.05] tracking-tight text-white md:text-4xl">
                {item.name}
              </h2>
              <p className="mt-3 text-base text-white/70">{formatPrice(item.price, currency)}</p>
            </div>

            {item.description && (
              <p className="text-[13px] leading-relaxed text-nu-muted">{item.description}</p>
            )}

            {sizes.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Size</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSize(option)}
                      className={`min-w-[44px] rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition ${
                        size === option
                          ? "border-nu-accent bg-nu-accent text-white"
                          : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 rounded-full border border-white/15 px-2 py-1.5">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-7 w-7 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm text-white">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="grid h-7 w-7 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <PillButton onClick={() => onAdd(item, size, qty)} disabled={soldOut}>
                {soldOut ? "Sold out" : "Add to bag"}
              </PillButton>
            </div>

            <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
              {soldOut ? "Restocking soon" : "Ships in 2–4 days"}
            </p>
          </div>
        </div>
      )}
    </ShopModal>
  );
}