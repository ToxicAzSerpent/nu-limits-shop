import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import SidePanel from "./SidePanel";
import PillButton from "./PillButton";
import { formatPrice } from "@/lib/shop";

export default function CartDrawer({ open, onClose, lines, currency, onQty, onRemove, onCheckout, onBrowse }) {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);

  return (
    <SidePanel
      open={open}
      onClose={onClose}
      subtitle="Nu Limits"
      title="Your bag"
      footer={
        lines.length > 0 ? (
          <div>
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Subtotal</span>
              <span className="text-white">{formatPrice(subtotal, currency)}</span>
            </div>
            <p className="mt-1 text-[11px] text-white/35">Shipping confirmed on the next step.</p>
            <div className="mt-4">
              <PillButton onClick={onCheckout} className="w-full">
                Checkout
              </PillButton>
            </div>
          </div>
        ) : null
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-5 py-24 text-center">
          <p className="text-sm text-nu-muted">Your bag is empty.</p>
          <PillButton variant="outline" onClick={onBrowse}>
            Browse collection
          </PillButton>
        </div>
      ) : (
        <ul className="space-y-3">
          {lines.map((line) => (
            <li key={line.key} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={line.image_url} alt={line.name} className="h-full w-full" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] uppercase tracking-[0.14em] text-white">{line.name}</p>
                <p className="mt-1 text-[11px] text-white/40">{line.size || "One size"}</p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onQty(line.key, -1)}
                      aria-label="Decrease quantity"
                      className="grid h-6 w-6 place-items-center rounded-full border border-white/15 text-white/70 transition hover:text-white"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center text-xs text-white">{line.qty}</span>
                    <button
                      onClick={() => onQty(line.key, 1)}
                      aria-label="Increase quantity"
                      className="grid h-6 w-6 place-items-center rounded-full border border-white/15 text-white/70 transition hover:text-white"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="text-xs text-white">{formatPrice(line.price * line.qty, currency)}</span>
                </div>
              </div>

              <button
                onClick={() => onRemove(line.key)}
                aria-label="Remove item"
                className="self-start text-white/30 transition hover:text-nu-accent"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </SidePanel>
  );
}