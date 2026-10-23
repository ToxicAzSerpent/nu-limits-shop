import React, { useRef, useState } from "react";
import { Image } from "@/components/ui/image";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { base44 } from "@/api/base44Client";
import PillButton from "./PillButton";
import { formatPrice } from "@/lib/shop";

const EMPTY = {
  name: "",
  price: "",
  category: "",
  sizes: "",
  stock: 10,
  description: "",
  image_url: "",
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-nu-accent";

export default function ManageInventory({ items, currency, onAddItem, onRemoveItem }) {
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      setForm((current) => ({ ...current, image_url: file_url }));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.price) {
      setError("A name and price are needed.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      await onAddItem({
        name: form.name.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        sizes: form.sizes,
        stock: Number(form.stock) || 0,
        description: form.description.trim(),
        image_url: form.image_url,
        sort_order: items.length,
        active: true,
      });
      setForm(EMPTY);
    } catch (e) {
      console.error(e);
      setError("Couldn't add that piece. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Inventory slots</p>

      <form onSubmit={submit} className="mt-3 space-y-3">
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Piece name</span>
          <input value={form.name} onChange={update("name")} placeholder="Aether Shell Hoodie" className={inputClass} />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Price</span>
            <input value={form.price} onChange={update("price")} inputMode="decimal" placeholder="2450" className={inputClass} />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Stock</span>
            <input value={form.stock} onChange={update("stock")} inputMode="numeric" placeholder="10" className={inputClass} />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Category</span>
            <input value={form.category} onChange={update("category")} placeholder="Outerwear" className={inputClass} />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Sizes</span>
            <input value={form.sizes} onChange={update("sizes")} placeholder="S, M, L, XL" className={inputClass} />
          </label>
        </div>

        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Description</span>
          <textarea
            value={form.description}
            onChange={update("description")}
            rows={2}
            placeholder="Technical shell with sealed seams…"
            className={`${inputClass} resize-none`}
          />
        </label>

        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Image</span>
          <div className="mt-2 flex items-center gap-2">
            <input
              value={form.image_url}
              onChange={update("image_url")}
              placeholder="Paste an image link"
              className="w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-nu-accent"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
              aria-label="Upload image"
            >
              {uploading ? <Upload className="h-4 w-4 animate-pulse" /> : <ImagePlus className="h-4 w-4" />}
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={uploadImage} className="hidden" />
          </div>
        </div>

        {error && <p className="text-xs text-rose-300">{error}</p>}

        <PillButton type="submit" size="sm" onClick={undefined} disabled={busy} className="w-full">
          {busy ? "Adding" : "Add slot"}
        </PillButton>
      </form>

      <div className="mt-7 space-y-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Live in shop — {items.length}</p>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2.5">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg">
              <Image src={item.image_url} alt={item.name} className="h-full w-full" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] uppercase tracking-[0.1em] text-white">{item.name}</p>
              <p className="text-[11px] text-white/40">{formatPrice(item.price, currency)}</p>
            </div>
            <button
              type="button"
              onClick={() => onRemoveItem(item.id)}
              aria-label={`Remove ${item.name}`}
              className="text-white/30 transition hover:text-rose-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-white/35">No pieces yet — add your first slot above.</p>}
      </div>
    </section>
  );
}