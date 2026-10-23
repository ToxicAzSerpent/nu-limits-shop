import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import InventoryTile from "./InventoryTile";
import PillButton from "./PillButton";

const PER_PAGE = 4;

export default function ShopPanel({ items, settings, loading, onSelect, onBrowse }) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(items.length / PER_PAGE));

  useEffect(() => {
    if (page > pages - 1) setPage(pages - 1);
  }, [page, pages]);

  const visible = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <aside className="nu-glass relative flex w-full flex-col rounded-[34px] p-5 md:p-7 lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/80">{settings.store_name}</span>
        <span className="text-[9px] uppercase tracking-[0.24em] text-white/35">{items.length} pieces</span>
      </div>

      <p className="mt-5 text-[12.5px] leading-relaxed text-nu-muted">{settings.panel_description}</p>

      <div className="mt-5">
        <PillButton size="sm" onClick={onBrowse}>
          Discover
        </PillButton>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {loading
          ? [0, 1, 2, 3].map((slot) => (
              <div key={slot} className="aspect-square animate-pulse rounded-[22px] bg-white/5" />
            ))
          : (
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item, index) => (
                <InventoryTile
                  key={item.id}
                  item={item}
                  currency={settings.currency}
                  index={index}
                  onSelect={onSelect}
                />
              ))}
            </AnimatePresence>
          )}
      </div>

      {!loading && items.length === 0 && (
        <p className="mt-6 rounded-2xl border border-dashed border-white/15 px-4 py-6 text-center text-[11px] uppercase tracking-[0.2em] text-white/35">
          Inventory empty
        </p>
      )}

      <div className="mt-5 flex items-end justify-between">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: pages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              aria-label={`Page ${index + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === page ? "w-6 bg-nu-accent" : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous pieces"
            className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white disabled:opacity-25 disabled:hover:border-white/15"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={page >= pages - 1}
            aria-label="Next pieces"
            className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white disabled:opacity-25 disabled:hover:border-white/15"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-px top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-nu-accent to-transparent lg:block"
        animate={{ opacity: [0.2, 0.9, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </aside>
  );
}