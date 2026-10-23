import React, { useEffect, useState } from "react";
import PillButton from "./PillButton";
import { BACKGROUNDS } from "@/lib/shop";

const SWATCH = {
  noir: "bg-gradient-to-br from-neutral-800 via-neutral-900 to-black",
  aurora: "bg-gradient-to-br from-fuchsia-500/80 via-purple-600/60 to-indigo-700/70",
  grid: "bg-neutral-900 bg-[linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[length:12px_12px]",
  ember: "bg-gradient-to-br from-orange-500/80 via-rose-600/50 to-neutral-900",
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-nu-accent";

export default function ManageAppearance({ settings, onSaveSettings }) {
  const [draft, setDraft] = useState(settings);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const update = (field) => (event) => setDraft((current) => ({ ...current, [field]: event.target.value }));

  const save = (event) => {
    event.preventDefault();
    onSaveSettings({
      store_name: draft.store_name,
      hero_caption: draft.hero_caption,
      panel_description: draft.panel_description,
      currency: draft.currency,
    });
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Background</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {BACKGROUNDS.map((background) => (
            <button
              key={background.id}
              onClick={() => onSaveSettings({ background: background.id })}
              className={`rounded-2xl border p-2 text-left transition ${
                settings.background === background.id
                  ? "border-nu-accent bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/30"
              }`}
            >
              <span className={`block h-11 rounded-xl ${SWATCH[background.id]}`} />
              <span className="mt-2 block text-[10px] uppercase tracking-[0.2em] text-white/70">
                {background.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={save} className="space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Store details</p>
        </div>
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Store name</span>
          <input value={draft.store_name} onChange={update("store_name")} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Hero caption</span>
          <input value={draft.hero_caption} onChange={update("hero_caption")} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Store description</span>
          <textarea
            value={draft.panel_description}
            onChange={update("panel_description")}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Currency symbol</span>
          <input value={draft.currency} onChange={update("currency")} className={inputClass} />
        </label>
        <PillButton type="submit" size="sm" className="w-full">
          Save details
        </PillButton>
      </form>
    </section>
  );
}