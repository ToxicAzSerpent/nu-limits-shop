import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import ShopModal from "./ShopModal";
import PillButton from "./PillButton";
import { formatPrice } from "@/lib/shop";

const EMPTY_FORM = { name: "", email: "", phone: "", address: "", notes: "" };

export default function CheckoutDialog({ open, onClose, lines, subtotal, currency, onPlaceOrder }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!open) {
      setOrder(null);
      setError("");
    }
  }, [open]);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Add your name and email so we can confirm the order.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const placed = await onPlaceOrder(form);
      setOrder(placed);
      setForm(EMPTY_FORM);
    } catch (e) {
      console.error(e);
      setError("We couldn't place that order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ShopModal open={open} onClose={onClose} width="max-w-4xl">
      {order ? (
        <div className="flex flex-col items-center gap-5 px-6 py-16 text-center md:px-12">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-nu-accent text-white">
            <Check className="h-6 w-6" />
          </span>
          <h2 className="font-nu text-3xl uppercase tracking-tight text-white">Order placed</h2>
          <p className="max-w-sm text-sm leading-relaxed text-nu-muted">
            Thanks {order.customer_name.split(" ")[0]} — your order is with the studio. Keep your
            reference handy.
          </p>
          <div className="rounded-2xl border border-white/15 px-6 py-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Reference</p>
            <p className="mt-1 font-nu text-xl tracking-[0.2em] text-white">{order.order_number}</p>
            <p className="mt-2 text-sm text-nu-accent">{formatPrice(order.total, currency)}</p>
          </div>
          <PillButton onClick={onClose}>Keep browsing</PillButton>
        </div>
      ) : (
        <form onSubmit={submit} className="grid gap-8 p-6 md:grid-cols-[1.1fr_1fr] md:p-10">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-nu-accent">Checkout</p>
              <h2 className="mt-2 font-nu text-3xl uppercase tracking-tight text-white">Your details</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Full name</span>
                <input
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Naledi Mokoena"
                  className="mt-2 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-nu-accent"
                />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@studio.com"
                  className="mt-2 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-nu-accent"
                />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Phone</span>
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+27 00 000 0000"
                  className="mt-2 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-nu-accent"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Delivery address</span>
                <textarea
                  value={form.address}
                  onChange={update("address")}
                  rows={3}
                  placeholder="Street, city, postal code"
                  className="mt-2 w-full resize-none rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-nu-accent"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Notes</span>
                <input
                  value={form.notes}
                  onChange={update("notes")}
                  placeholder="Size preference, drop-off note…"
                  className="mt-2 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-nu-accent"
                />
              </label>
            </div>

            {error && <p className="text-xs text-rose-300">{error}</p>}
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Order</p>
            <ul className="mt-4 space-y-3">
              {lines.map((line) => (
                <li key={line.key} className="flex items-start justify-between gap-3 text-[12px]">
                  <span className="text-white/70">
                    {line.qty} × {line.name}
                    {line.size ? ` — ${line.size}` : ""}
                  </span>
                  <span className="whitespace-nowrap text-white">{formatPrice(line.price * line.qty, currency)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
              <span className="text-white/50">Total</span>
              <span className="text-white">{formatPrice(subtotal, currency)}</span>
            </div>
            <div className="mt-5">
              <PillButton type="submit" disabled={submitting || lines.length === 0} className="w-full">
                {submitting ? "Placing order" : "Place order"}
              </PillButton>
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-white/30">
              The studio confirms payment and delivery by email after your order lands.
            </p>
          </div>
        </form>
      )}
    </ShopModal>
  );
}